import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const SAVED_CARDS = [
  { id: 'c1', last4: '4242', brand: 'Visa', expiry: '12/26' },
  { id: 'c2', last4: '1234', brand: 'Mastercard', expiry: '08/25' },
];

const PaymentSelection = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const METHODS = [
    {
      id: 'card',
      label: 'Tarjeta de crédito/débito',
      sub: 'Visa, Mastercard, Amex',
      icon: 'card-outline',
      iconBg: '#EBF3FF',
      iconColor: colors.primary,
      screen: 'AddPayment',
    },
    {
      id: 'mercadopago',
      label: 'Mercado Pago',
      sub: 'Paga con tu cuenta MP',
      icon: 'wallet-outline',
      iconBg: '#F0FDF4',
      iconColor: colors.success,
      screen: null,
    },
    {
      id: 'cash',
      label: 'Efectivo',
      sub: 'Paga al momento de la entrega',
      icon: 'cash-outline',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      screen: 'HomePage',
    },
  ];
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (method: typeof METHODS[0]) => {
    setSelected(method.id);
    if (method.screen) {
      setTimeout(() => navigation.navigate(method.screen), 150);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Saved cards */}
        {SAVED_CARDS.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tarjetas guardadas</Text>
            {SAVED_CARDS.map((card, i) => (
              <View key={card.id}>
                <TouchableOpacity
                  style={[styles.methodRow, selected === card.id && styles.methodRowActive]}
                  onPress={() => setSelected(card.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.methodIcon, { backgroundColor: '#EBF3FF' }]}>
                    <Icon name="card" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodLabel}>{card.brand} •••• {card.last4}</Text>
                    <Text style={styles.methodSub}>Vence {card.expiry}</Text>
                  </View>
                  <View style={[styles.radio, selected === card.id && styles.radioActive]}>
                    {selected === card.id && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
                {i < SAVED_CARDS.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}

        {/* Add new methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agregar método de pago</Text>
          {METHODS.map((method, i) => (
            <View key={method.id}>
              <TouchableOpacity
                style={styles.methodRow}
                onPress={() => handleSelect(method)}
                activeOpacity={0.7}
              >
                <View style={[styles.methodIcon, { backgroundColor: method.iconBg }]}>
                  <Icon name={method.icon} size={20} color={method.iconColor} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodLabel}>{method.label}</Text>
                  <Text style={styles.methodSub}>{method.sub}</Text>
                </View>
                <Icon name="chevron-forward" size={18} color={colors.gray300} />
              </TouchableOpacity>
              {i < METHODS.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Security note */}
        <View style={styles.securityNote}>
          <Icon name="shield-checkmark-outline" size={18} color={colors.success} />
          <Text style={styles.securityText}>
            Tus datos de pago están protegidos con encriptación de 256 bits
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, gap: spacing.md },
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
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    gap: spacing.md,
  },
  methodRowActive: {
    backgroundColor: colors.primaryLight,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: { flex: 1 },
  methodLabel: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 2 },
  methodSub: { fontSize: 12, color: colors.textSecondary },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: { borderColor: colors.primary },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  separator: { height: 1, backgroundColor: colors.borderLight, marginLeft: 72 },
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
  securityText: { flex: 1, fontSize: 13, color: '#166534', lineHeight: 18 },
});

export default PaymentSelection;
