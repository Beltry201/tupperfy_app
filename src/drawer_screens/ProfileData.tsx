import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, TextInput,
  ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const ProfileData = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [isEditing, setEditing] = useState(false);
  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date('1990-01-01'));
  const [email, setEmail] = useState('juan@example.com');
  const [phone, setPhone] = useState('+52 123 456 7890');
  const [address, setAddress] = useState('Calle 123, Colonia Centro, Ciudad');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [e, p, a, b] = await Promise.all([
          AsyncStorage.getItem('email'),
          AsyncStorage.getItem('phone'),
          AsyncStorage.getItem('address'),
          AsyncStorage.getItem('birthdate'),
        ]);
        if (e) setEmail(e);
        if (p) setPhone(p);
        if (a) setAddress(a);
        if (b) setBirthdate(new Date(b));
      } catch {}
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.multiSet([
        ['email', email],
        ['phone', phone],
        ['address', address],
        ['birthdate', birthdate.toISOString()],
      ]);
      setEditing(false);
      Alert.alert('Guardado', 'Los cambios se guardaron correctamente.');
    } catch {}
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setPwdModalVisible(false);
    setNewPassword('');
    Alert.alert('Éxito', 'Contraseña actualizada correctamente.');
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

  const fields = [
    {
      key: 'email',
      label: 'Correo electrónico',
      icon: 'mail-outline',
      value: email,
      onChangeText: (t: string) => setEmail(t.charAt(0).toLowerCase() + t.slice(1)),
      keyboardType: 'email-address' as const,
    },
    {
      key: 'phone',
      label: 'Teléfono',
      icon: 'call-outline',
      value: phone,
      onChangeText: setPhone,
      keyboardType: 'phone-pad' as const,
    },
    {
      key: 'address',
      label: 'Dirección',
      icon: 'location-outline',
      value: address,
      onChangeText: setAddress,
      keyboardType: 'default' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Avatar section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>D</Text>
            </View>
            <TouchableOpacity style={styles.changePhotoBtn}>
              <Icon name="camera-outline" size={15} color={colors.primary} />
              <Text style={styles.changePhotoText}>Cambiar foto</Text>
            </TouchableOpacity>
          </View>

          {/* Birthdate card */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fecha de nacimiento</Text>
            <TouchableOpacity
              style={styles.fieldRow}
              onPress={() => isEditing && setShowDatePicker(true)}
              disabled={!isEditing}
            >
              <Icon name="calendar-outline" size={20} color={colors.gray400} />
              <Text style={[styles.fieldValue, !isEditing && styles.fieldValueDisabled]}>
                {formatDate(birthdate)}
              </Text>
              {isEditing && <Icon name="chevron-forward" size={18} color={colors.gray300} />}
            </TouchableOpacity>
            {showDatePicker && (
              <Modal transparent animationType="fade" visible={showDatePicker}>
                <View style={styles.dateModalBg}>
                  <View style={styles.dateModalCard}>
                    <Text style={styles.dateModalTitle}>Fecha de nacimiento</Text>
                    <DateTimePicker
                      value={birthdate}
                      mode="date"
                      display="spinner"
                      onChange={(_, d) => d && setBirthdate(d)}
                      maximumDate={new Date()}
                    />
                    <TouchableOpacity
                      style={styles.dateConfirmBtn}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.dateConfirmText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>

          {/* Password */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contraseña</Text>
            <TouchableOpacity style={styles.fieldRow} onPress={() => setPwdModalVisible(true)}>
              <Icon name="lock-closed-outline" size={20} color={colors.gray400} />
              <Text style={styles.fieldValue}>••••••••</Text>
              <View style={styles.changePwdBadge}>
                <Text style={styles.changePwdText}>Cambiar</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Other fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de contacto</Text>
            {fields.map((field, i) => (
              <View key={field.key}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  {isEditing ? (
                    <View style={styles.inputWrapper}>
                      <Icon name={field.icon} size={18} color={colors.gray400} style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        value={field.value}
                        onChangeText={field.onChangeText}
                        keyboardType={field.keyboardType}
                        autoCapitalize="none"
                        placeholder={field.label}
                        placeholderTextColor={colors.textLight}
                      />
                    </View>
                  ) : (
                    <View style={styles.fieldRow}>
                      <Icon name={field.icon} size={18} color={colors.gray400} />
                      <Text style={styles.fieldValue}>{field.value}</Text>
                    </View>
                  )}
                </View>
                {i < fields.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>

          {/* Actions */}
          {isEditing ? (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditing(false)}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                <Icon name="checkmark" size={18} color={colors.white} />
                <Text style={styles.saveBtnText}>Guardar cambios</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditing(true)}
              activeOpacity={0.85}
            >
              <Icon name="create-outline" size={18} color={colors.white} />
              <Text style={styles.editBtnText}>Editar perfil</Text>
            </TouchableOpacity>
          )}

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Password modal */}
      <Modal transparent animationType="fade" visible={pwdModalVisible} onRequestClose={() => setPwdModalVisible(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Cambiar contraseña</Text>
            <View style={styles.inputWrapper}>
              <Icon name="lock-closed-outline" size={18} color={colors.gray400} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                placeholderTextColor={colors.textLight}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.gray400} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword} activeOpacity={0.85}>
              <Text style={styles.saveBtnText}>Guardar contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPwdModalVisible(false)}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, gap: spacing.md },
  avatarSection: { alignItems: 'center', paddingVertical: spacing.md },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  avatarText: { color: colors.white, fontSize: 36, fontWeight: '700' },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changePhotoText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  section: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  fieldGroup: { gap: spacing.xs },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  fieldValue: { flex: 1, fontSize: 15, color: colors.text, fontWeight: '500' },
  fieldValueDisabled: { color: colors.textSecondary },
  changePwdBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  changePwdText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  separator: { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.sm },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  inputIcon: {},
  input: { flex: 1, fontSize: 15, color: colors.text },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  saveBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    ...shadows.md,
  },
  saveBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  cancelBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  cancelBtnText: { color: colors.textSecondary, fontSize: 15, fontWeight: '600' },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    ...shadows.md,
  },
  editBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  dateModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateModalCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    width: '85%',
    alignItems: 'center',
    ...shadows.lg,
  },
  dateModalTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  dateConfirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
  dateConfirmText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    width: '100%',
    gap: spacing.md,
    ...shadows.lg,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
});

export default ProfileData;
