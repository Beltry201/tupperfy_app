import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

type PromoCode = {
  id: string;
  code: string;
  description: string;
  discount: string;
  expiry: string;
  icon: string;
  iconBg: string;
  iconColor: string;
};

const ACTIVE_CODES: PromoCode[] = [
  {
    id: '1',
    code: 'BIENVENIDO20',
    description: '20% de descuento en tu primer pedido',
    discount: '20%',
    expiry: 'Vence 31 dic 2025',
    icon: 'gift-outline',
    iconBg: '#FFF1F2',
    iconColor: '#E11D48',
  },
  {
    id: '2',
    code: 'VERANO10',
    description: '$10 MXN de descuento en pedidos +$150',
    discount: '$10',
    expiry: 'Vence 30 jun 2025',
    icon: 'sunny-outline',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
];

const PromotionCodes = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [inputCode, setInputCode] = useState('');
  const [activeCodes, setActiveCodes] = useState<PromoCode[]>(ACTIVE_CODES);

  const handleApply = () => {
    const trimmed = inputCode.trim().toUpperCase();
    if (!trimmed) return;
    if (trimmed === 'ABC123') {
      const newCode: PromoCode = {
        id: Date.now().toString(),
        code: trimmed,
        description: '15% de descuento en cualquier pedido',
        discount: '15%',
        expiry: 'Vence 31 mar 2026',
        icon: 'pricetag-outline',
        iconBg: '#F0FDF4',
        iconColor: colors.success,
      };
      setActiveCodes(prev => [...prev, newCode]);
      setInputCode('');
      Alert.alert('¡Código aplicado!', `El código ${trimmed} fue agregado a tu cuenta.`);
    } else {
      Alert.alert('Código inválido', 'El código ingresado no es válido o ya expiró.');
    }
  };

  const handleRemove = (id: string) => {
    Alert.alert('Eliminar código', '¿Deseas eliminar este código de promoción?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setActiveCodes(prev => prev.filter(c => c.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Input section */}
        <View style={styles.inputCard}>
          <Text style={styles.inputCardTitle}>Ingresar código</Text>
          <Text style={styles.inputCardSub}>
            Escribe tu código de promoción y presiona Aplicar
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <Icon name="pricetag-outline" size={18} color={colors.gray400} />
              <TextInput
                style={styles.input}
                placeholder="Ej. ABC123"
                placeholderTextColor={colors.textLight}
                value={inputCode}
                onChangeText={t => setInputCode(t.toUpperCase())}
                autoCapitalize="characters"
                returnKeyType="done"
                onSubmitEditing={handleApply}
              />
            </View>
            <TouchableOpacity
              style={[styles.applyBtn, !inputCode.trim() && styles.applyBtnDisabled]}
              onPress={handleApply}
              activeOpacity={0.85}
              disabled={!inputCode.trim()}
            >
              <Text style={styles.applyBtnText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active codes */}
        {activeCodes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Códigos activos</Text>
            {activeCodes.map((code, i) => (
              <View key={code.id}>
                <View style={styles.codeRow}>
                  <View style={[styles.codeIcon, { backgroundColor: code.iconBg }]}>
                    <Icon name={code.icon} size={20} color={code.iconColor} />
                  </View>
                  <View style={styles.codeInfo}>
                    <View style={styles.codeTopRow}>
                      <Text style={styles.codeLabel}>{code.code}</Text>
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{code.discount} OFF</Text>
                      </View>
                    </View>
                    <Text style={styles.codeDesc}>{code.description}</Text>
                    <Text style={styles.codeExpiry}>{code.expiry}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => handleRemove(code.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Icon name="close" size={16} color={colors.gray400} />
                  </TouchableOpacity>
                </View>
                {i < activeCodes.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}

        {activeCodes.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="pricetag-outline" size={48} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Sin códigos activos</Text>
            <Text style={styles.emptySub}>Ingresa un código para obtener descuentos en tus pedidos</Text>
          </View>
        )}

        {/* Info note */}
        <View style={styles.infoNote}>
          <Icon name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.infoText}>
            Los códigos se aplican automáticamente al confirmar tu pedido. Solo se puede usar un código por pedido.
          </Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, gap: spacing.md },

  inputCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.sm,
  },
  inputCardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  inputCardSub: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  inputRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  input: { flex: 1, fontSize: 15, color: colors.text, fontWeight: '600', letterSpacing: 1 },
  applyBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  applyBtnDisabled: { backgroundColor: colors.gray300 },
  applyBtnText: { color: colors.white, fontSize: 14, fontWeight: '700' },

  section: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  codeIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInfo: { flex: 1, gap: 3 },
  codeTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  codeLabel: { fontSize: 14, fontWeight: '800', color: colors.text, letterSpacing: 0.5 },
  discountBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  discountText: { fontSize: 11, fontWeight: '700', color: colors.success },
  codeDesc: { fontSize: 13, color: colors.text, lineHeight: 18 },
  codeExpiry: { fontSize: 11, color: colors.textSecondary },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  separator: { height: 1, backgroundColor: colors.borderLight, marginLeft: 72 },

  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.gray400 },
  emptySub: { fontSize: 13, color: colors.textLight, textAlign: 'center', paddingHorizontal: spacing.lg },

  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoText: { flex: 1, fontSize: 12, color: colors.primary, lineHeight: 18 },
});

export default PromotionCodes;
