import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const ResetPassword = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = password.length >= 8 && passwordsMatch;

  const matchColor = confirmPassword.length === 0
    ? colors.border
    : passwordsMatch ? colors.primary : '#EF4444';

  const handleCreate = () => {
    navigation.navigate('LogIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>

          {/* Illustration */}
          <View style={styles.illustrationWrap}>
            <View style={styles.illustrationCircle}>
              <Icon name="lock-closed" size={52} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.title}>Crea una nueva contraseña</Text>
          <Text style={styles.subtitle}>
            Tu contraseña debe tener al menos 8 caracteres.
          </Text>

          {/* Password field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Nueva contraseña</Text>
            <View style={styles.inputRow}>
              <Icon name="lock-closed-outline" size={18} color={colors.gray400} />
              <TextInput
                style={styles.input}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.gray400}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm password field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={[styles.inputRow, { borderColor: matchColor }]}>
              <Icon name="lock-closed-outline" size={18} color={colors.gray400} />
              <TextInput
                style={styles.input}
                placeholder="Repite tu contraseña"
                placeholderTextColor={colors.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                <Icon
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.gray400}
                />
              </TouchableOpacity>
            </View>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.btn, !canSubmit && styles.btnDisabled]}
            onPress={handleCreate}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            <Icon name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.btnText}>Guardar contraseña</Text>
          </TouchableOpacity>

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

  fieldWrap: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, height: 52,
  },
  input: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },
  errorText: { fontSize: 12, color: '#EF4444', fontWeight: '500' },

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 16, ...shadows.md,
  },
  btnDisabled: { backgroundColor: colors.gray300 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

export default ResetPassword;
