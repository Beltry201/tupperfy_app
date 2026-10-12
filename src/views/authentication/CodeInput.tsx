import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const CODE_LENGTH = 4;

const CodeInput = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const id = setInterval(() => setCountdown(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (value && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    if (next.every(d => d !== '') && index === CODE_LENGTH - 1) {
      setTimeout(() => navigation.navigate('ResetPassword'), 150);
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      const next = [...code];
      next[index - 1] = '';
      setCode(next);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setCode(Array(CODE_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  const filled = code.filter(d => d !== '').length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>

          {/* Icon */}
          <View style={styles.illustrationWrap}>
            <View style={styles.illustrationCircle}>
              <Icon name="mail-unread" size={52} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.title}>Verifica tu correo</Text>
          <Text style={styles.subtitle}>
            Ingresa el código de 4 dígitos que enviamos a tu correo electrónico.
          </Text>

          {/* Code boxes */}
          <View style={styles.boxRow}>
            {code.map((digit, i) => (
              <TextInput
                key={i}
                ref={r => { inputRefs.current[i] = r; }}
                style={[styles.box, digit !== '' && styles.boxFilled, i === filled && styles.boxActive]}
                value={digit}
                onChangeText={v => handleChange(i, v)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
                caretHidden
              />
            ))}
          </View>

          {/* Progress dots */}
          <View style={styles.dotsRow}>
            {code.map((d, i) => (
              <View key={i} style={[styles.dot, d !== '' && styles.dotFilled]} />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.btn, filled < CODE_LENGTH && styles.btnDisabled]}
            onPress={() => navigation.navigate('ResetPassword')}
            disabled={filled < CODE_LENGTH}
            activeOpacity={0.85}
          >
            <Icon name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.btnText}>Verificar código</Text>
          </TouchableOpacity>

          {/* Resend */}
          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>¿No recibiste el código?</Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Reenviar</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendTimer}>Reenviar en {countdown}s</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.card },
  content: {
    flex: 1, paddingHorizontal: spacing.lg,
    justifyContent: 'center', gap: spacing.lg,
  },

  illustrationWrap: { alignItems: 'center' },
  illustrationCircle: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },

  title: { fontSize: 24, fontWeight: '700', color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },

  boxRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md },
  box: {
    width: 64, height: 72, borderRadius: radius.lg,
    borderWidth: 2, borderColor: colors.border,
    backgroundColor: colors.surface,
    fontSize: 28, fontWeight: '700', color: colors.text,
  },
  boxFilled: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  boxActive: { borderColor: colors.primary },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotFilled: { backgroundColor: colors.primary },

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 16, ...shadows.md,
  },
  btnDisabled: { backgroundColor: colors.gray300 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  resendLabel: { fontSize: 14, color: colors.textSecondary },
  resendLink: { fontSize: 14, fontWeight: '700', color: colors.primary },
  resendTimer: { fontSize: 14, fontWeight: '600', color: colors.gray400 },
});

export default CodeInput;
