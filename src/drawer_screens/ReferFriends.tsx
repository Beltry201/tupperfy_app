import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, Share, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const REFERRAL_CODE = 'TU1234';

const STEPS = [
  { step: '1', text: 'Comparte tu código único con amigos' },
  { step: '2', text: 'Tu amigo se registra y hace su primer pedido' },
  { step: '3', text: 'Ambos reciben $15 MXN de crédito' },
];

const ReferFriends = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const STATS = [
    { label: 'Referidos', value: '3', icon: 'people-outline', color: colors.primary },
    { label: 'Créditos ganados', value: '$45', icon: 'cash-outline', color: colors.success },
    { label: 'Pendientes', value: '1', icon: 'time-outline', color: '#D97706' },
  ];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Únete a Tupperfy y disfruta de comidas caseras deliciosas! Usa mi código de referencia: ${REFERRAL_CODE} y obtén $15 MXN de descuento en tu primer pedido.`,
      });
    } catch {
      Alert.alert('Error', 'No se pudo compartir el código.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Icon name="people" size={36} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Refiere amigos</Text>
          <Text style={styles.heroSub}>
            Invita a tus amigos a Tupperfy y gana créditos para tus próximos pedidos
          </Text>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardBadgeText}>Tú y tu amigo ganan $15 MXN</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Icon name={stat.icon} size={18} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Referral code */}
        <View style={styles.codeCard}>
          <Text style={styles.sectionTitle}>Tu código de referencia</Text>
          <View style={styles.codeBox}>
            <View style={styles.codeLeft}>
              <Icon name="gift-outline" size={20} color={colors.primary} />
              <Text style={styles.codeText}>{REFERRAL_CODE}</Text>
            </View>
            <TouchableOpacity
              style={[styles.copyBtn, copied && styles.copyBtnSuccess]}
              onPress={handleCopy}
              activeOpacity={0.8}
            >
              <Icon name={copied ? 'checkmark' : 'copy-outline'} size={16} color={copied ? colors.white : colors.primary} />
              <Text style={[styles.copyBtnText, copied && styles.copyBtnTextSuccess]}>
                {copied ? 'Copiado' : 'Copiar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare} activeOpacity={0.85}>
          <Icon name="share-social-outline" size={20} color={colors.white} />
          <Text style={styles.shareButtonText}>Compartir código</Text>
        </TouchableOpacity>

        {/* How it works */}
        <View style={styles.stepsCard}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          {STEPS.map((s, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepBubble}>
                <Text style={styles.stepNumber}>{s.step}</Text>
              </View>
              {i < STEPS.length - 1 && <View style={styles.stepLine} />}
              <Text style={styles.stepText}>{s.text}</Text>
            </View>
          ))}
        </View>

        {/* Terms note */}
        <View style={styles.termsNote}>
          <Icon name="information-circle-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.termsText}>
            El crédito se acredita tras el primer pedido del referido (mínimo $100 MXN). Válido 30 días.
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

  hero: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.sm,
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: colors.text, letterSpacing: -0.3 },
  heroSub: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  rewardBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginTop: spacing.xs,
  },
  rewardBadgeText: { fontSize: 13, fontWeight: '700', color: colors.success },

  statsRow: { flexDirection: 'row', gap: spacing.sm },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 11, color: colors.textSecondary, textAlign: 'center' },

  codeCard: {
    backgroundColor: colors.card,
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
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
  },
  codeLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  codeText: { fontSize: 22, fontWeight: '800', color: colors.primary, letterSpacing: 3 },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  copyBtnSuccess: { backgroundColor: colors.success, borderColor: colors.success },
  copyBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  copyBtnTextSuccess: { color: colors.white },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 15,
    ...shadows.md,
  },
  shareButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },

  stepsCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
    position: 'relative',
  },
  stepBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: { color: colors.white, fontWeight: '800', fontSize: 14 },
  stepLine: {
    position: 'absolute',
    left: 15,
    top: 32,
    width: 2,
    height: spacing.md + 8,
    backgroundColor: colors.borderLight,
  },
  stepText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20, paddingTop: 6 },

  termsNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
  },
  termsText: { flex: 1, fontSize: 11, color: colors.textSecondary, lineHeight: 16 },
});

export default ReferFriends;
