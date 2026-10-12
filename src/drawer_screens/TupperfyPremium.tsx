import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const BENEFITS = [
  { icon: 'restaurant',       text: 'Platillos privados de chefs exclusivos' },
  { icon: 'pricetag',         text: 'Descuentos exclusivos en cada pedido' },
  { icon: 'rocket',           text: 'Entregas con prioridad' },
  { icon: 'headset',          text: 'Soporte al cliente 24/7' },
  { icon: 'book',             text: 'Cursos de cocina y recetas privadas' },
  { icon: 'person',           text: 'Elige a tu cocinero favorito en Mi Menú' },
  { icon: 'fitness',          text: 'Plan de alimentación personalizado' },
  { icon: 'chatbubbles',      text: 'Chat directo con los cocineros' },
  { icon: 'gift',             text: 'Pedido gratis en tu cumpleaños' },
];

const PLANS = [
  {
    id: 'monthly',
    label: 'Mensual',
    price: '$6.99',
    period: 'USD / mes',
    note: 'Total anual: $83.88 USD',
    badge: null,
  },
  {
    id: 'annual',
    label: 'Anual',
    price: '$72.99',
    period: 'USD / año',
    note: '$6.08 USD / mes · Ahorras $10.89 USD',
    badge: 'MEJOR PRECIO',
  },
];

const TupperfyPremium = () => {
  const { colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [selectedPlan, setSelectedPlan] = useState<string>('annual');

  const handleSubscribe = () => {
    const plan = PLANS.find(p => p.id === selectedPlan);
    Alert.alert(
      '¡30 días gratis!',
      `Empezarás con tu prueba gratuita del plan ${plan?.label}. Cancela cuando quieras.`,
      [{ text: 'Comenzar prueba gratis', style: 'default' }, { text: 'Cancelar', style: 'cancel' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EA580C" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name="star" size={36} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>Tupperfy Premium</Text>
          <Text style={styles.heroSub}>
            La mejor experiencia gastronómica casera, sin límites
          </Text>
          <View style={styles.trialBadge}>
            <Icon name="gift-outline" size={14} color="#EA580C" />
            <Text style={styles.trialBadgeText}>30 días gratis · Cancela cuando quieras</Text>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.sectionTitle}>¿Qué incluye?</Text>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <View style={styles.benefitCheck}>
                <Icon name="checkmark" size={14} color={colors.white} />
              </View>
              <View style={[styles.benefitIconWrap]}>
                <Icon name={b.icon} size={18} color="#EA580C" />
              </View>
              <Text style={styles.benefitText}>{b.text}</Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        <Text style={styles.plansLabel}>Elige tu plan</Text>
        {PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planCard, selectedPlan === plan.id && styles.planCardActive]}
            onPress={() => setSelectedPlan(plan.id)}
            activeOpacity={0.8}
          >
            {plan.badge && (
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>{plan.badge}</Text>
              </View>
            )}
            <View style={styles.planRow}>
              <View style={[styles.radio, selectedPlan === plan.id && styles.radioActive]}>
                {selectedPlan === plan.id && <View style={styles.radioDot} />}
              </View>
              <View style={styles.planInfo}>
                <Text style={[styles.planLabel, selectedPlan === plan.id && styles.planLabelActive]}>
                  {plan.label}
                </Text>
                <Text style={styles.planNote}>{plan.note}</Text>
              </View>
              <View style={styles.planPriceWrap}>
                <Text style={[styles.planPrice, selectedPlan === plan.id && styles.planPriceActive]}>
                  {plan.price}
                </Text>
                <Text style={styles.planPeriod}>{plan.period}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton} onPress={handleSubscribe} activeOpacity={0.85}>
          <Icon name="star" size={20} color={colors.white} />
          <Text style={styles.ctaText}>Comenzar prueba gratis</Text>
        </TouchableOpacity>

        <Text style={styles.cancelNote}>
          Cancela en cualquier momento antes del fin del período de prueba sin cargos.
        </Text>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const ORANGE = '#EA580C';
const ORANGE_LIGHT = '#FFF7ED';

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { gap: spacing.md },

  hero: {
    backgroundColor: ORANGE,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: colors.white, letterSpacing: -0.5 },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 20 },
  trialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: ORANGE_LIGHT,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: spacing.xs,
  },
  trialBadgeText: { fontSize: 12, fontWeight: '700', color: ORANGE },

  benefitsCard: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 4,
  },
  benefitCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: ORANGE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },

  plansLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginHorizontal: spacing.md,
    marginBottom: -spacing.xs,
  },
  planCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.sm,
  },
  planCardActive: {
    borderColor: ORANGE,
    backgroundColor: ORANGE_LIGHT,
  },
  planBadge: {
    position: 'absolute',
    top: -11,
    right: spacing.md,
    backgroundColor: ORANGE,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  planBadgeText: { color: colors.white, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: { borderColor: ORANGE },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: ORANGE },
  planInfo: { flex: 1 },
  planLabel: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  planLabelActive: { color: ORANGE },
  planNote: { fontSize: 12, color: colors.textSecondary },
  planPriceWrap: { alignItems: 'flex-end' },
  planPrice: { fontSize: 20, fontWeight: '800', color: colors.text },
  planPriceActive: { color: ORANGE },
  planPeriod: { fontSize: 11, color: colors.textSecondary, marginTop: 1 },

  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.md,
    backgroundColor: ORANGE,
    borderRadius: radius.md,
    paddingVertical: 16,
    ...shadows.md,
  },
  ctaText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  cancelNote: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginHorizontal: spacing.lg,
    lineHeight: 18,
  },
});

export default TupperfyPremium;
