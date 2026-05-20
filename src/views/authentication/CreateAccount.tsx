import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator,
  ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';
import { signUp } from '../../services/auth.service';
import { isSupabaseConfigured } from '../../lib/supabase';

const CreateAccountView = ({ navigation }: { navigation: any }) => {
  const { colors, isDark, signIn } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [firstName, setFirstName]             = useState('');
  const [lastName, setLastName]               = useState('');
  const [email, setEmail]                     = useState('');
  const [phoneNumber, setPhoneNumber]         = useState('');
  const [gender, setGender]                   = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [dateOfBirth, setDateOfBirth]         = useState<Date | null>(null);
  const [openDate, setOpenDate]               = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleSignUp = async () => {
    if (!firstName || !email || !password) { setError('Completa los campos obligatorios'); return; }
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setError('');
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        await signUp(email.trim(), password, `${firstName} ${lastName}`.trim(), phoneNumber || undefined);
        await signIn(email.trim(), password);
        navigation.navigate('HomePage');
      } else {
        navigation.navigate('FavoriteDishesForm');
      }
    } catch (e: any) {
      setError(e?.message ?? 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({
    label, value, onChangeText, placeholder, keyboardType, secureTextEntry,
    icon, rightElement, onPress,
  }: any) => (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputRow}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <Icon name={icon} size={18} color={colors.gray400} />
        {onPress ? (
          <Text style={[styles.inputText, !value && styles.inputPlaceholder]}>
            {value || placeholder}
          </Text>
        ) : (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
        )}
        {rightElement}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Completa tu información para comenzar</Text>

          {/* Name row */}
          <View style={styles.nameRow}>
            <View style={[styles.fieldWrap, { flex: 1 }]}>
              <Text style={styles.label}>Nombre *</Text>
              <View style={styles.inputRow}>
                <Icon name="person-outline" size={18} color={colors.gray400} />
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Nombre"
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </View>
            <View style={[styles.fieldWrap, { flex: 1 }]}>
              <Text style={styles.label}>Apellido *</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Apellido"
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </View>
          </View>

          <Field
            label="Correo electrónico *"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
          />
          <Field
            label="Teléfono *"
            icon="call-outline"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+52 000 000 0000"
            keyboardType="phone-pad"
          />
          <Field
            label="Fecha de nacimiento *"
            icon="calendar-outline"
            value={formatDate(dateOfBirth)}
            placeholder="dd/mm/aaaa"
            onPress={() => setOpenDate(true)}
            rightElement={<Icon name="chevron-down" size={16} color={colors.gray400} />}
          />
          <Field
            label="Género"
            icon="people-outline"
            value={gender}
            onChangeText={setGender}
            placeholder="Hombre / Mujer / Otro"
          />

          {/* Password */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Contraseña *</Text>
            <View style={styles.inputRow}>
              <Icon name="lock-closed-outline" size={18} color={colors.gray400} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
                <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.gray400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Confirmar contraseña *</Text>
            <View style={styles.inputRow}>
              <Icon name="lock-closed-outline" size={18} color={colors.gray400} />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repite tu contraseña"
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                <Icon name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.gray400} />
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.btn} onPress={handleSignUp} activeOpacity={0.85} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Text style={styles.btnText}>Crear cuenta</Text>
                  <Icon name="arrow-forward" size={18} color="#FFFFFF" />
                </>}
          </TouchableOpacity>

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={openDate}
        mode="date"
        date={dateOfBirth ?? new Date(2000, 0, 1)}
        maximumDate={new Date()}
        onConfirm={date => { setOpenDate(false); setDateOfBirth(date); }}
        onCancel={() => setOpenDate(false)}
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  scroll: { padding: spacing.md, paddingTop: spacing.lg },

  title: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 6 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg },

  nameRow: { flexDirection: 'row', gap: spacing.sm },
  fieldWrap: { marginBottom: spacing.md },
  label: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, height: 50,
  },
  input: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },
  inputText: { flex: 1, fontSize: 15, color: colors.text },
  inputPlaceholder: { color: colors.textLight },

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 16,
    marginTop: spacing.sm, ...shadows.md,
  },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '500', textAlign: 'center', marginBottom: 4 },
});

export default CreateAccountView;
