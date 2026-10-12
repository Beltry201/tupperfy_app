import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Alert, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

type CardBrand = 'visa' | 'mastercard' | 'amex' | null;

const detectCardBrand = (cardNumber: string): CardBrand => {
  const num = cardNumber.replace(/\s/g, '');
  if (/^4/.test(num)) return 'visa';
  if (/^(5[1-5]|2(2[2-9][1-9]|2[3-9]\d|[3-6]\d{2}|7[01]\d|720))/.test(num)) return 'mastercard';
  if (/^3[47]/.test(num)) return 'amex';
  return null;
};

// Brand marks drawn with real brand colors (icon fonts only render single-tone glyphs).
const CardBrandMark = ({ brand, large }: { brand: Exclude<CardBrand, null>; large?: boolean }) => {
  if (brand === 'mastercard') {
    const d = large ? 22 : 15;
    return (
      <View style={{ flexDirection: 'row', width: d * 1.65, height: d }}>
        <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: '#EB001B' }} />
        <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: '#F79E1B', marginLeft: -d * 0.42, opacity: 0.92 }} />
      </View>
    );
  }
  if (brand === 'visa') {
    return (
      <View style={{
        backgroundColor: '#FFFFFF', borderRadius: 4,
        paddingHorizontal: large ? 8 : 6, paddingVertical: large ? 4 : 2,
      }}>
        <Text style={{
          fontSize: large ? 17 : 12, fontStyle: 'italic', fontWeight: '800',
          color: '#1434CB', letterSpacing: 0.5,
        }}>VISA</Text>
      </View>
    );
  }
  // amex
  return (
    <View style={{
      backgroundColor: '#006FCF', borderRadius: 4,
      paddingHorizontal: large ? 7 : 5, paddingVertical: large ? 4 : 2,
    }}>
      <Text style={{
        fontSize: large ? 11 : 8, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3,
      }}>AMEX</Text>
    </View>
  );
};

const AddPayment = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formatCardNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '').slice(0, 16);
    return cleaned.match(/.{1,4}/g)?.join(' ') ?? cleaned;
  };

  const formatExpiry = (input: string) => {
    const cleaned = input.replace(/\D/g, '').slice(0, 4);
    return cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
  };

  const cardBrand = useMemo(() => detectCardBrand(cardNumber), [cardNumber]);

  const handleSave = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    Alert.alert('¡Listo!', 'Tarjeta guardada correctamente.', [
      { text: 'OK', onPress: () => navigation.navigate('HomePage') },
    ]);
  };

  const displayNumber = cardNumber || '•••• •••• •••• ••••';
  const displayName = cardName || 'NOMBRE EN TARJETA';
  const displayExpiry = expiryDate || 'MM/YY';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card preview */}
          <View style={styles.cardPreview}>
            <View style={styles.cardPreviewInner}>
              <View style={styles.cardTop}>
                <Icon name="wifi-outline" size={24} color="rgba(255,255,255,0.8)" style={{ transform: [{ rotate: '90deg' }] }} />
                {cardBrand
                  ? <CardBrandMark brand={cardBrand} large />
                  : <Icon name="card-outline" size={26} color="rgba(255,255,255,0.6)" />}
              </View>
              <Text style={styles.cardNumber}>{displayNumber}</Text>
              <View style={styles.cardBottom}>
                <View>
                  <Text style={styles.cardFieldLabel}>TITULAR</Text>
                  <Text style={styles.cardFieldValue} numberOfLines={1}>{displayName}</Text>
                </View>
                <View>
                  <Text style={styles.cardFieldLabel}>VENCE</Text>
                  <Text style={styles.cardFieldValue}>{displayExpiry}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Número de tarjeta</Text>
              <View style={[styles.inputWrapper, focusedField === 'num' && styles.inputWrapperFocused]}>
                <Icon name="card-outline" size={18} color={colors.gray400} />
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={colors.textLight}
                  value={cardNumber}
                  onChangeText={(t) => setCardNumber(formatCardNumber(t))}
                  keyboardType="numeric"
                  maxLength={19}
                  onFocus={() => setFocusedField('num')}
                  onBlur={() => setFocusedField(null)}
                />
                {cardBrand && (
                  <View style={styles.brandBadge}>
                    <CardBrandMark brand={cardBrand} />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nombre en la tarjeta</Text>
              <View style={[styles.inputWrapper, focusedField === 'name' && styles.inputWrapperFocused]}>
                <Icon name="person-outline" size={18} color={colors.gray400} />
                <TextInput
                  style={styles.input}
                  placeholder="JUAN PÉREZ"
                  placeholderTextColor={colors.textLight}
                  value={cardName}
                  onChangeText={(t) => setCardName(t.toUpperCase())}
                  autoCapitalize="characters"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Fecha de expiración</Text>
                <View style={[styles.inputWrapper, focusedField === 'exp' && styles.inputWrapperFocused]}>
                  <Icon name="calendar-outline" size={18} color={colors.gray400} />
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor={colors.textLight}
                    value={expiryDate}
                    onChangeText={(t) => setExpiryDate(formatExpiry(t))}
                    keyboardType="numeric"
                    maxLength={5}
                    onFocus={() => setFocusedField('exp')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <View style={[styles.inputWrapper, focusedField === 'cvv' && styles.inputWrapperFocused]}>
                  <Icon name="lock-closed-outline" size={18} color={colors.gray400} />
                  <TextInput
                    style={styles.input}
                    placeholder="•••"
                    placeholderTextColor={colors.textLight}
                    value={cvv}
                    onChangeText={(t) => setCvv(t.replace(/\D/g, '').slice(0, 4))}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    onFocus={() => setFocusedField('cvv')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Security note */}
          <View style={styles.securityNote}>
            <Icon name="shield-checkmark-outline" size={16} color={colors.success} />
            <Text style={styles.securityText}>
              Tus datos están protegidos con encriptación SSL de 256 bits
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
            <Icon name="checkmark-circle-outline" size={20} color={colors.white} />
            <Text style={styles.saveButtonText}>Guardar tarjeta</Text>
          </TouchableOpacity>

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, gap: spacing.md },
  cardPreview: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  cardPreviewInner: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 3,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFieldLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '600', marginBottom: 3 },
  cardFieldValue: { fontSize: 14, color: colors.white, fontWeight: '600', maxWidth: 160 },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.sm,
  },
  fieldGroup: { gap: spacing.xs },
  label: { fontSize: 13, fontWeight: '600', color: colors.gray600 },
  row: { flexDirection: 'row', gap: spacing.md },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 50,
    gap: spacing.sm,
  },
  inputWrapperFocused: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  brandBadge: { marginLeft: spacing.xs },
  input: { flex: 1, fontSize: 15, color: colors.text },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#F0FDF4',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityText: { flex: 1, fontSize: 12, color: '#166534' },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 15,
    ...shadows.md,
  },
  saveButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default AddPayment;
