import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const ForgotPasswordView = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [email, setEmail] = useState('');

  const handleSend = () => {
    navigation.navigate('CodeInput');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>

          {/* Illustration */}
          <View style={styles.illustrationWrap}>
            <View style={styles.illustrationCircle}>
              <Icon name="lock-open" size={52} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo y te enviaremos un código para restablecerla.
          </Text>

          {/* Email field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={styles.inputRow}>
              <Icon name="mail-outline" size={18} color={colors.gray400} />
              <TextInput
                style={styles.input}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={t => setEmail(t.toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btn, !email.trim() && styles.btnDisabled]}
            onPress={handleSend}
            disabled={!email.trim()}
            activeOpacity={0.85}
          >
            <Icon name="send-outline" size={18} color="#FFFFFF" />
            <Text style={styles.btnText}>Recibir código</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.backLinkText}>Volver al inicio de sesión</Text>
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

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 16, ...shadows.md,
  },
  btnDisabled: { backgroundColor: colors.gray300 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  backLink: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: spacing.sm,
  },
  backLinkText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
});

export default ForgotPasswordView;
