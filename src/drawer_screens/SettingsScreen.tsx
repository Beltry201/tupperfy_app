import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, Switch, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import { spacing, radius, shadows, AppColors } from '../theme';

const SettingsScreen = () => {
  const { isDark, toggleDark, language, setLanguage, colors, t } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [langPickerOpen, setLangPickerOpen] = useState(false);

  const styles = useMemo(() => makeStyles(colors), [colors]);

  const selectedLang = LANGUAGE_OPTIONS.find(l => l.value === language);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.card}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Appearance */}
        <Text style={styles.sectionLabel}>{t('settingsLanguage') === 'Language' ? 'Appearance' : 'Apariencia'}</Text>
        <View style={styles.card}>
          {/* Dark mode row */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: isDark ? '#1E3A5F' : '#EBF3FF' }]}>
              <Icon name={isDark ? 'moon' : 'sunny-outline'} size={20} color={colors.primary} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>{t('settingsDarkMode')}</Text>
              <Text style={styles.rowSub}>{isDark ? (language === 'en' ? 'Dark theme active' : 'Tema oscuro activo') : (language === 'en' ? 'Light theme active' : 'Tema claro activo')}</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleDark}
              trackColor={{ false: colors.gray300, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray300}
            />
          </View>
        </View>

        {/* Language */}
        <Text style={styles.sectionLabel}>{t('settingsLanguage')}</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setLangPickerOpen(!langPickerOpen)}
            activeOpacity={0.7}
          >
            <View style={[styles.rowIcon, { backgroundColor: '#F0FDF4' }]}>
              <Icon name="globe-outline" size={20} color={colors.success} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>{t('settingsLanguage')}</Text>
              <Text style={styles.rowSub}>{selectedLang?.nativeLabel}</Text>
            </View>
            <Icon
              name={langPickerOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.gray400}
            />
          </TouchableOpacity>

          {langPickerOpen && (
            <>
              <View style={styles.separator} />
              {LANGUAGE_OPTIONS.map((opt, i) => (
                <View key={opt.value}>
                  <TouchableOpacity
                    style={styles.langOption}
                    onPress={() => { setLanguage(opt.value); setLangPickerOpen(false); }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.langNative}>{opt.nativeLabel}</Text>
                    <Text style={styles.langLabel}>{opt.label}</Text>
                    {language === opt.value && (
                      <Icon name="checkmark" size={18} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                  {i < LANGUAGE_OPTIONS.length - 1 && <View style={styles.langSeparator} />}
                </View>
              ))}
            </>
          )}
        </View>

        {/* Notifications */}
        <Text style={styles.sectionLabel}>{t('settingsNotifications')}</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#FEF3C7' }]}>
              <Icon name="notifications-outline" size={20} color="#D97706" />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>{t('settingsNotifications')}</Text>
              <Text style={styles.rowSub}>{notificationsEnabled ? (language === 'en' ? 'Enabled' : 'Habilitadas') : (language === 'en' ? 'Disabled' : 'Deshabilitadas')}</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.gray300, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray300}
            />
          </View>
        </View>

        {/* Privacy */}
        <Text style={styles.sectionLabel}>{t('settingsPrivacy')}</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={[styles.rowIcon, { backgroundColor: '#FFF1F2' }]}>
              <Icon name="shield-checkmark-outline" size={20} color={colors.danger} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>{t('settingsPrivacy')}</Text>
              <Text style={styles.rowSub}>{language === 'en' ? 'Manage your privacy' : 'Gestiona tu privacidad'}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    scroll: { padding: spacing.md, gap: spacing.sm },
    sectionLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textLight,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: 4,
      marginTop: spacing.sm,
      marginLeft: spacing.xs,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      ...shadows.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: 14,
      gap: spacing.md,
    },
    rowIcon: {
      width: 40,
      height: 40,
      borderRadius: radius.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowInfo: { flex: 1 },
    rowLabel: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 2 },
    rowSub: { fontSize: 12, color: colors.textSecondary },
    separator: { height: 1, backgroundColor: colors.borderLight },
    langOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: 13,
      gap: spacing.sm,
    },
    langNative: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
    langLabel: { fontSize: 13, color: colors.textSecondary },
    langSeparator: { height: 1, backgroundColor: colors.borderLight, marginLeft: 16 },
  });

export default SettingsScreen;
