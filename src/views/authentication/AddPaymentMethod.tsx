import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const BENEFITS = [
  { icon: 'flash-outline',    text: 'Pagos rápidos y seguros en cada pedido' },
  { icon: 'shield-checkmark-outline', text: 'Tu información está protegida' },
  { icon: 'card-outline',     text: 'Acepta tarjetas, Mercado Pago y efectivo' },
];

const AddPaymentMethod = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          <View style={styles.illustrationCircle}>
            <Icon name="wallet" size={56} color={colors.primary} />
          </View>
        </View>

        <Text style={styles.title}>Agrega un método de pago</Text>
        <Text style={styles.subtitle}>
          Para realizar pedidos necesitas tener un método de pago vinculado a tu cuenta.
        </Text>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Icon name={b.icon} size={18} color={colors.primary} />
              </View>
              <Text style={styles.benefitText}>{b.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('PaymentSelection')}
          activeOpacity={0.85}
        >
          <Icon name="add-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryBtnText}>Agregar método de pago</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => navigation.navigate('HomePage')}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Ahora no, lo haré después</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },

  content: {
    flex: 1, paddingHorizontal: spacing.lg,
    justifyContent: 'center', gap: spacing.lg,
  },

  illustrationWrap: { alignItems: 'center' },
  illustrationCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
    ...shadows.sm,
  },

  title: { fontSize: 24, fontWeight: '700', color: colors.text, textAlign: 'center' },
  subtitle: {
    fontSize: 15, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 22,
  },

  benefitsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    gap: spacing.md, ...shadows.sm,
  },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  benefitIcon: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  benefitText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },

  actions: {
    paddingHorizontal: spacing.md, paddingBottom: spacing.lg,
    paddingTop: spacing.sm, gap: spacing.md,
  },
  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 16, ...shadows.md,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  skipBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  skipText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
});

export default AddPaymentMethod;
