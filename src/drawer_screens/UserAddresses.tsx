import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  TextInput, Alert, SafeAreaView, StatusBar,
} from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp, Address } from '../context/AppContext';

const ADDRESS_TYPES = [
  { id: 'Casa',    label: 'Casa',    icon: 'home-outline' },
  { id: 'Trabajo', label: 'Trabajo', icon: 'briefcase-outline' },
  { id: 'Otro',    label: 'Otro',    icon: 'location-outline' },
];

const UserAddresses = () => {
  const { colors, isDark, addresses, setAddresses, defaultAddressId, setDefaultAddressId } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [selectedType, setSelectedType] = useState('Casa');
  const [editingId, setEditingId] = useState<string | null>(null);

  const openSheet = (addr?: Address) => {
    if (addr) {
      setNewAddress(addr.address);
      setSelectedType(addr.type);
      setEditingId(addr.id);
    } else {
      setNewAddress('');
      setSelectedType('Casa');
      setEditingId(null);
    }
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setNewAddress('');
    setEditingId(null);
  };

  const handleSave = () => {
    if (!newAddress.trim()) {
      Alert.alert('Error', 'Por favor ingresa una dirección válida.');
      return;
    }
    if (editingId) {
      const updated = addresses.map(a =>
        a.id === editingId ? { ...a, address: newAddress, type: selectedType } : a
      );
      setAddresses(updated);
    } else {
      const newId = Date.now().toString();
      setAddresses([...addresses, { id: newId, address: newAddress, type: selectedType }]);
    }
    closeSheet();
  };

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar dirección', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: () => {
          setAddresses(addresses.filter(a => a.id !== id));
          if (defaultAddressId === id) setDefaultAddressId(null);
        },
      },
    ]);
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddressId(id === defaultAddressId ? null : id);
  };

  const typeConfig: Record<string, { icon: string; bg: string; color: string }> = {
    Casa:    { icon: 'home',      bg: '#EBF3FF', color: colors.primary },
    Trabajo: { icon: 'briefcase', bg: '#F0FDF4', color: colors.success },
    Otro:    { icon: 'location',  bg: '#FEF3C7', color: '#D97706' },
  };

  const renderItem = ({ item }: { item: Address }) => {
    const cfg = typeConfig[item.type] ?? typeConfig['Otro'];
    const isDefault = item.id === defaultAddressId;

    return (
      <TouchableOpacity
        style={[styles.addressCard, isDefault && styles.addressCardDefault]}
        activeOpacity={0.85}
        onPress={() => handleSetDefault(item.id)}
      >
        <View style={[styles.addressIcon, { backgroundColor: cfg.bg }]}>
          <Icon name={cfg.icon} size={22} color={cfg.color} />
        </View>
        <View style={styles.addressInfo}>
          <View style={styles.addressTypeRow}>
            <Text style={styles.addressType}>{item.type}</Text>
            {isDefault && (
              <View style={styles.defaultBadge}>
                <Icon name="checkmark-circle" size={13} color={colors.primary} />
                <Text style={styles.defaultBadgeText}>Predeterminada</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText} numberOfLines={2}>{item.address}</Text>
          <Text style={styles.tapHint}>
            {isDefault ? 'Toca para quitar' : 'Toca para seleccionar como predeterminada'}
          </Text>
        </View>
        <View style={styles.addressActions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => openSheet(item)}>
            <Icon name="create-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(item.id)}>
            <Icon name="trash-outline" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      {defaultAddressId && (
        <View style={styles.infoBanner}>
          <Icon name="location" size={15} color={colors.primary} />
          <Text style={styles.infoBannerText} numberOfLines={1}>
            Entregando en:{' '}
            <Text style={styles.infoBannerAddress}>
              {addresses.find(a => a.id === defaultAddressId)?.address}
            </Text>
          </Text>
        </View>
      )}

      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="location-outline" size={52} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Sin direcciones</Text>
            <Text style={styles.emptySub}>Agrega tu primera dirección de entrega</Text>
          </View>
        }
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addButton} onPress={() => openSheet()} activeOpacity={0.85}>
          <Icon name="add" size={20} color={colors.white} />
          <Text style={styles.addButtonText}>Agregar dirección</Text>
        </TouchableOpacity>
      </View>

      {sheetVisible && (
        <Animated.View
          entering={SlideInDown.duration(320).springify()}
          exiting={SlideOutDown.duration(280)}
          style={styles.sheet}
        >
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{editingId ? 'Editar dirección' : 'Nueva dirección'}</Text>
            <TouchableOpacity onPress={closeSheet}>
              <Icon name="close" size={22} color={colors.gray500} />
            </TouchableOpacity>
          </View>

          <View style={styles.typeRow}>
            {ADDRESS_TYPES.map(t => (
              <TouchableOpacity
                key={t.id}
                style={[styles.typeBtn, selectedType === t.id && styles.typeBtnActive]}
                onPress={() => setSelectedType(t.id)}
              >
                <Icon name={t.icon} size={16} color={selectedType === t.id ? colors.white : colors.gray500} />
                <Text style={[styles.typeBtnText, selectedType === t.id && styles.typeBtnTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="location-outline" size={18} color={colors.gray400} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ingresa la dirección completa..."
              placeholderTextColor={colors.textLight}
              value={newAddress}
              onChangeText={setNewAddress}
              autoFocus
              multiline
              numberOfLines={2}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
            <Text style={styles.saveButtonText}>{editingId ? 'Actualizar' : 'Guardar dirección'}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {sheetVisible && (
        <TouchableOpacity style={styles.backdrop} onPress={closeSheet} activeOpacity={1} />
      )}
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.md, paddingBottom: 100, gap: spacing.sm },

  infoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primaryLight, borderBottomWidth: 1, borderBottomColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: 10,
  },
  infoBannerText: { flex: 1, fontSize: 13, color: colors.textSecondary },
  infoBannerAddress: { fontWeight: '700', color: colors.primary },

  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.sm,
  },
  addressCardDefault: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  addressIcon: {
    width: 48, height: 48, borderRadius: radius.md,
    justifyContent: 'center', alignItems: 'center',
  },
  addressInfo: { flex: 1 },
  addressTypeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 3 },
  addressType: { fontSize: 12, fontWeight: '700', color: colors.primary },
  defaultBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: colors.card,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.primary,
  },
  defaultBadgeText: { fontSize: 10, fontWeight: '700', color: colors.primary },
  addressText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  tapHint: { fontSize: 11, color: colors.textLight, marginTop: 3 },
  addressActions: { flexDirection: 'row', gap: spacing.xs },
  actionBtn: {
    width: 34, height: 34, borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  deleteBtn: { backgroundColor: '#FEF2F2' },
  emptyState: { alignItems: 'center', paddingTop: 80, gap: spacing.sm },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.gray400 },
  emptySub: { fontSize: 14, color: colors.textLight, textAlign: 'center' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border,
    padding: spacing.md,
  },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 14, ...shadows.md,
  },
  addButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  backdrop: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    padding: spacing.md, paddingBottom: 36,
    zIndex: 10, ...shadows.lg,
  },
  sheetHandle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: colors.gray300, alignSelf: 'center', marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.md,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  typeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  typeBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 10, borderRadius: radius.sm,
    borderWidth: 1.5, borderColor: colors.border,
  },
  typeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeBtnText: { fontSize: 13, fontWeight: '600', color: colors.gray500 },
  typeBtnTextActive: { color: colors.white },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    marginBottom: spacing.md, gap: spacing.sm,
  },
  inputIcon: { marginTop: 2 },
  input: { flex: 1, fontSize: 15, color: colors.text, minHeight: 52 },
  saveButton: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingVertical: 14, alignItems: 'center', ...shadows.md,
  },
  saveButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});

export default UserAddresses;
