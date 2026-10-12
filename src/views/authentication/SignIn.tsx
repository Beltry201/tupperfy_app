import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, typography, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const COLLAGE = [
  { src: require('../../../assets/images/dishes/lasana.png'), rotate: '-3deg' },
  { src: require('../../../assets/images/dishes/tamales.png'), rotate: '2deg' },
  { src: require('../../../assets/images/dishes/churros.png'), rotate: '3deg' },
  { src: require('../../../assets/images/dishes/flan.png'), rotate: '-2deg' },
];

const TRUST_STATS = [
  { icon: 'star', value: '4.8', label: 'Calificación' },
  { icon: 'people', value: '500+', label: 'Chefs caseros' },
  { icon: 'time', value: '~25 min', label: 'Entrega' },
];

// Simulated gradient fade (no linear-gradient dependency) — stacked bands of
// increasing opacity over the background color.
const FADE_STEPS = [0.05, 0.12, 0.22, 0.35, 0.5, 0.68, 0.85, 1];

const SignInView = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.card} />

      <View style={styles.hero}>
        <View style={styles.collageRow}>
          {COLLAGE.map((tile, i) => (
            <View
              key={i}
              style={[styles.collageTile, { transform: [{ rotate: tile.rotate }] }]}
            >
              <Image source={tile.src} style={styles.collageImage} resizeMode="cover" />
            </View>
          ))}
        </View>

        <View style={styles.fadeStack}>
          {FADE_STEPS.map((opacity, i) => (
            <View key={i} style={[styles.fadeBand, { backgroundColor: colors.background, opacity }]} />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo-tupperfy-v1.png')}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Tranqui, dejale tus tuppers a Tupperfy</Text>

        <View style={styles.trustRow}>
          {TRUST_STATS.map((s) => (
            <View key={s.label} style={styles.trustStat}>
              <Icon name={s.icon} size={14} color={colors.primary} />
              <Text style={styles.trustValue}>{s.value}</Text>
              <Text style={styles.trustLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('LogIn')} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
          <Icon name="arrow-forward" size={18} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('CreateAccount')} activeOpacity={0.85}>
          <Text style={styles.secondaryButtonText}>Crear una cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('HomePage')} activeOpacity={0.7}>
          <Text style={styles.skipText}>Continuar sin cuenta</Text>
          <Icon name="chevron-forward" size={14} color={colors.textSecondary} />
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Al continuar aceptas nuestros{' '}
          <Text style={styles.termsLink}>Términos de uso</Text>
          {' '}y{' '}
          <Text style={styles.termsLink}>Política de privacidad</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  hero: { height: 260, backgroundColor: colors.primaryDark },
  collageRow: {
    flex: 1, flexDirection: 'row', flexWrap: 'wrap',
    padding: spacing.sm, gap: spacing.sm,
  },
  collageTile: {
    width: '46%', height: '46%',
    borderRadius: radius.lg, overflow: 'hidden',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.25)',
    ...shadows.md,
  },
  collageImage: { width: '100%', height: '100%' },
  fadeStack: {
    position: 'absolute', left: 0, right: 0, bottom: 0, height: 100,
    flexDirection: 'column',
  },
  fadeBand: { flex: 1, width: '100%' },

  content: {
    alignItems: 'center', paddingHorizontal: spacing.xl,
    marginTop: -spacing.lg, gap: spacing.md,
  },
  logo: { width: '80%', height: 170 },
  tagline: {
    ...typography.h3, textAlign: 'center', color: colors.gray600,
    fontWeight: '400', lineHeight: 26,
  },

  trustRow: {
    flexDirection: 'row', backgroundColor: colors.card,
    borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    paddingVertical: spacing.sm, width: '100%', ...shadows.sm,
  },
  trustStat: { flex: 1, alignItems: 'center', gap: 2 },
  trustValue: { fontSize: 15, fontWeight: '800', color: colors.text, marginTop: 2 },
  trustLabel: { fontSize: 10, color: colors.textSecondary, fontWeight: '500' },

  bottomSection: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, paddingTop: spacing.lg, gap: spacing.sm },
  primaryButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingVertical: 16, ...shadows.md,
  },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    paddingVertical: 16, alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border,
  },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontWeight: '600' },
  skipBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, paddingVertical: spacing.xs },
  skipText: { textAlign: 'center', fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
  termsText: {
    textAlign: 'center', fontSize: 12, color: colors.textLight,
    marginTop: spacing.xs, lineHeight: 18,
  },
  termsLink: { color: colors.primary, fontWeight: '600' },
});

export default SignInView;
