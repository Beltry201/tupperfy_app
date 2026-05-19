import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, AppColors } from '../theme';
import { translations, Language } from '../i18n/translations';

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
  isDark: boolean;
  toggleDark: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  colors: AppColors;
  t: (key: keyof typeof translations['es']) => string;
  cartItems: CartItem[];
  addToCart: (item: any, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  defaultAddressId: string | null;
  setDefaultAddressId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType>({
  isDark: false,
  toggleDark: () => {},
  language: 'es',
  setLanguage: () => {},
  colors: lightColors,
  t: (key) => key as string,
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
  deliveryAddress: '',
  setDeliveryAddress: () => {},
  addresses: INITIAL_ADDRESSES,
  setAddresses: () => {},
  defaultAddressId: null,
  setDefaultAddressId: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLang] = useState<Language>('es');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addresses, _setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [defaultAddressId, _setDefaultAddressId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [dark, lang, addrsJson, defId] = await Promise.all([
          AsyncStorage.getItem('isDark'),
          AsyncStorage.getItem('language'),
          AsyncStorage.getItem('addresses'),
          AsyncStorage.getItem('defaultAddressId'),
        ]);
        if (dark !== null) setIsDark(JSON.parse(dark));
        if (lang) setLang(lang as Language);
        if (addrsJson) _setAddresses(JSON.parse(addrsJson));
        if (defId) _setDefaultAddressId(defId);
      } catch {}
    };
    load();
  }, []);

  // Keep deliveryAddress in sync with the selected default address
  useEffect(() => {
    const addr = addresses.find(a => a.id === defaultAddressId);
    if (addr) setDeliveryAddress(addr.address);
  }, [defaultAddressId, addresses]);

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

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(ci => ci.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(ci => ci.item.id === itemId ? { ...ci, quantity } : ci)
    );
  };

  const clearCart = () => setCartItems([]);

  const setAddresses = async (addrs: Address[]) => {
    _setAddresses(addrs);
    try { await AsyncStorage.setItem('addresses', JSON.stringify(addrs)); } catch {}
  };

  const setDefaultAddressId = async (id: string | null) => {
    _setDefaultAddressId(id);
    try { await AsyncStorage.setItem('defaultAddressId', id ?? ''); } catch {}
  };

  return (
    <AppContext.Provider value={{
      isDark,
      toggleDark,
      language,
      setLanguage,
      colors: isDark ? darkColors : lightColors,
      t,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      deliveryAddress,
      setDeliveryAddress,
      addresses,
      setAddresses,
      defaultAddressId,
      setDefaultAddressId,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
