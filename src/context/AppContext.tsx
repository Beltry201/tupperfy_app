import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '@supabase/supabase-js';
import { lightColors, darkColors, AppColors } from '../theme';
import { translations, Language } from '../i18n/translations';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import * as authService from '../services/auth.service';
import * as addressService from '../services/addresses.service';

export interface CartItem {
  item: any;
  quantity: number;
}

export interface Address {
  id: string;
  address: string;
  type: string;
}

const INITIAL_ADDRESSES: Address[] = [
  { id: '1', address: 'Calle 123, Colonia Centro, Monterrey, NL', type: 'Casa' },
  { id: '2', address: 'Avenida Principal 456, Colonia Moderna, Guadalajara, JAL', type: 'Trabajo' },
  { id: '3', address: 'Boulevard Central 789, Colonia Norte, CDMX', type: 'Otro' },
];

interface AppContextType {
  // Auth
  user: User | null;
  profile: any | null;
  isLoadingAuth: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  // Theme / i18n
  isDark: boolean;
  toggleDark: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  colors: AppColors;
  t: (key: keyof typeof translations['es']) => string;
  // Cart
  cartItems: CartItem[];
  addToCart: (item: any, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  // Addresses
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  defaultAddressId: string | null;
  setDefaultAddressId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType>({
  user: null, profile: null, isLoadingAuth: true,
  signIn: async () => {}, signOut: async () => {},
  isDark: false, toggleDark: () => {},
  language: 'es', setLanguage: () => {},
  colors: lightColors,
  t: (key) => key as string,
  cartItems: [],
  addToCart: () => {}, removeFromCart: () => {},
  updateCartQuantity: () => {}, clearCart: () => {},
  deliveryAddress: '', setDeliveryAddress: () => {},
  addresses: INITIAL_ADDRESSES, setAddresses: () => {},
  defaultAddressId: null, setDefaultAddressId: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [isDark, setIsDark] = useState(false);
  const [language, setLang] = useState<Language>('es');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addresses, _setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [defaultAddressId, _setDefaultAddressId] = useState<string | null>(null);

  // Load persisted prefs + restore Supabase session
  useEffect(() => {
    const init = async () => {
      try {
        const [dark, lang] = await Promise.all([
          AsyncStorage.getItem('isDark'),
          AsyncStorage.getItem('language'),
        ]);
        if (dark !== null) setIsDark(JSON.parse(dark));
        if (lang) setLang(lang as Language);

        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await loadUserData(session.user.id);
          } else {
            await loadLocalAddresses();
          }
        } else {
          await loadLocalAddresses();
        }
      } catch {
        await loadLocalAddresses();
      } finally {
        setIsLoadingAuth(false);
      }
    };
    init();

    if (!isSupabaseConfigured()) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        await loadUserData(nextUser.id);
      } else {
        setProfile(null);
        await loadLocalAddresses();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      const [prof, addrs, defId] = await Promise.all([
        authService.getProfile(userId).catch(() => null),
        addressService.fetchAddresses(userId).catch(() => null),
        addressService.getDefaultAddressId(userId).catch(() => null),
      ]);
      if (prof) setProfile(prof);
      if (addrs && addrs.length > 0) {
        _setAddresses(addrs);
        if (defId) _setDefaultAddressId(defId);
      } else {
        await loadLocalAddresses();
      }
    } catch {}
  };

  const loadLocalAddresses = async () => {
    try {
      const [addrsJson, defId] = await Promise.all([
        AsyncStorage.getItem('addresses'),
        AsyncStorage.getItem('defaultAddressId'),
      ]);
      if (addrsJson) _setAddresses(JSON.parse(addrsJson));
      if (defId) _setDefaultAddressId(defId);
    } catch {}
  };

  // Keep deliveryAddress in sync with default
  useEffect(() => {
    const addr = addresses.find(a => a.id === defaultAddressId);
    if (addr) setDeliveryAddress(addr.address);
  }, [defaultAddressId, addresses]);

  const signIn = async (email: string, password: string) => {
    const data = await authService.signIn(email, password);
    setUser(data.user ?? null);
    if (data.user) await loadUserData(data.user.id);
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) await authService.signOut();
    setUser(null);
    setProfile(null);
    setCartItems([]);
  };

  const toggleDark = async () => {
    const next = !isDark;
    setIsDark(next);
    try { await AsyncStorage.setItem('isDark', JSON.stringify(next)); } catch {}
  };

  const setLanguage = async (lang: Language) => {
    setLang(lang);
    try { await AsyncStorage.setItem('language', lang); } catch {}
  };

  const t = (key: keyof typeof translations['es']) =>
    (translations[language]?.[key] ?? translations['es'][key] ?? key) as string;

  const addToCart = (item: any, quantity: number) => {
    setCartItems(prev => {
      const idx = prev.findIndex(ci => ci.item.id === item.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) =>
    setCartItems(prev => prev.filter(ci => ci.item.id !== itemId));

  const updateCartQuantity = (itemId: string, quantity: number) =>
    setCartItems(prev => prev.map(ci => ci.item.id === itemId ? { ...ci, quantity } : ci));

  const clearCart = () => setCartItems([]);

  const setAddresses = async (addrs: Address[]) => {
    _setAddresses(addrs);
    if (!isSupabaseConfigured() || !user) {
      try { await AsyncStorage.setItem('addresses', JSON.stringify(addrs)); } catch {}
    }
  };

  const setDefaultAddressId = async (id: string | null) => {
    _setDefaultAddressId(id);
    if (isSupabaseConfigured() && user) {
      try { await addressService.setDefaultAddress(user.id, id); } catch {}
    } else {
      try { await AsyncStorage.setItem('defaultAddressId', id ?? ''); } catch {}
    }
  };

  return (
    <AppContext.Provider value={{
      user, profile, isLoadingAuth, signIn, signOut,
      isDark, toggleDark,
      language, setLanguage,
      colors: isDark ? darkColors : lightColors,
      t,
      cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart,
      deliveryAddress, setDeliveryAddress,
      addresses, setAddresses,
      defaultAddressId, setDefaultAddressId,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
