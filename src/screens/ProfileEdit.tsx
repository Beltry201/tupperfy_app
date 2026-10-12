import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';
import * as authService from '../services/auth.service';

const getInitials = (name: string) =>
  name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

const ProfileEdit = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark, user, profile, refreshProfile } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [saving, setSaving] = useState(false);

  const isDirty = fullName !== (profile?.full_name ?? '') || phone !== (profile?.phone ?? '');

  const handleSave = async () => {
    if (!user) return;
    if (!fullName.trim()) {
      Alert.alert('Nombre requerido', 'Ingresa tu nombre completo.');
      return;
    }
    setSaving(true);
    try {
      await authService.updateProfile(user.id, {
        full_name: fullName.trim(),
        phone: phone.trim() || null,
      });
      await refreshProfile();
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('No se pudo guardar', e?.message ?? 'Intenta de nuevo más tarde.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(fullName || 'Tú')}</Text>
              </View>
              <TouchableOpacity
                style={styles.cameraBtn}
                activeOpacity={0.8}
                onPress={() => Alert.alert('Próximamente', 'La carga de foto de perfil estará disponible pronto.')}
              >
                <Icon name="camera" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>{user?.email ?? 'Sin correo'}</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.fieldLabel}>Nombre completo</Text>
            <View style={styles.inputWrapper}>
              <Icon name="person-outline" size={18} color={colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Tu nombre completo"
                placeholderTextColor={colors.textLight}
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.fieldLabel}>Teléfono</Text>
            <View style={styles.inputWrapper}>
              <Icon name="call-outline" size={18} color={colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Agrega tu número"
                placeholderTextColor={colors.textLight}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.infoNote}>
            <Icon name="information-circle-outline" size={16} color={colors.textLight} />
            <Text style={styles.infoNoteText}>El correo no se puede modificar desde aquí.</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, (!isDirty || saving) && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isDirty || saving}
            activeOpacity={0.85}
          >
            {saving
              ? <ActivityIndicator color={colors.white} />
              : <Text style={styles.saveButtonText}>Guardar cambios</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },

  avatarSection: { alignItems: 'center', paddingVertical: spacing.lg, gap: spacing.sm },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    ...shadows.md,
  },
  avatarText: { fontSize: 34, fontWeight: '700', color: colors.white },
  cameraBtn: {
    position: 'absolute', right: -2, bottom: -2,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 3, borderColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  email: { fontSize: 13, color: colors.textSecondary },

  formCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
    ...shadows.sm,
  },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  inputIcon: { marginRight: 8 },
  input: {
    flex: 1, fontSize: 15, color: colors.text,
    paddingVertical: 12,
  },
  divider: { height: spacing.md },

  infoNote: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: spacing.xs, paddingTop: spacing.md,
  },
  infoNoteText: { fontSize: 12, color: colors.textLight, flex: 1 },

  footer: {
    padding: spacing.md,
    borderTopWidth: 1, borderTopColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonDisabled: { backgroundColor: colors.gray300 },
  saveButtonText: { fontSize: 16, fontWeight: '700', color: colors.white },
});

export default ProfileEdit;
