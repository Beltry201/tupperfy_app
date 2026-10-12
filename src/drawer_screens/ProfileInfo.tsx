import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const MenuItem = ({ item, onPress }: { item: any; onPress: () => void }) => {
  const { colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.menuIcon, { backgroundColor: item.iconBg }]}>
        <Icon name={item.icon} size={20} color={item.iconColor} />
      </View>
      <Text style={styles.menuLabel}>{item.label}</Text>
      {item.badge && (
        <View style={styles.badge}>
          {item.badge === 'star'
            ? <Icon name="star" size={11} color={colors.white} />
            : <Text style={styles.badgeText}>{item.badge}</Text>}
        </View>
      )}
      <Icon name="chevron-forward" size={18} color={colors.gray300} />
    </TouchableOpacity>
  );
};

const ProfileInfo = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const SECTIONS = [
    {
      title: 'Mi cuenta',
      items: [
        { label: 'Datos de perfil', icon: 'person-outline', screen: 'ProfileData', iconBg: '#EBF3FF', iconColor: colors.primary },
        { label: 'Mensajes', icon: 'chatbubble-outline', screen: 'MessagesScreen', iconBg: '#F0FDF4', iconColor: colors.success, badge: '3' },
        { label: 'Chefs favoritos', icon: 'heart-outline', screen: 'FavoriteChefs', iconBg: '#FFF1F2', iconColor: '#E11D48' },
        { label: 'Asistente IA', icon: 'sparkles-outline', screen: 'AIChatScreen', iconBg: '#F3E8FF', iconColor: '#7C3AED' },
      ],
    },
    {
      title: 'Finanzas',
      items: [
        { label: 'Métodos de pago', icon: 'card-outline', screen: 'PaymentSelection', iconBg: '#F0FDF4', iconColor: colors.success },
        { label: 'Mis direcciones', icon: 'location-outline', screen: 'UserAddresses', iconBg: '#FEF3C7', iconColor: '#D97706' },
        { label: 'Tupperfy Premium', icon: 'star-outline', screen: 'TupperfyPremium', iconBg: '#FFF7ED', iconColor: '#EA580C', badge: 'star' },
      ],
    },
    {
      title: 'Promociones',
      items: [
        { label: 'Refiere amigos', icon: 'share-social-outline', screen: 'ReferFriends', iconBg: '#EBF3FF', iconColor: colors.primary },
        { label: 'Códigos de promoción', icon: 'gift-outline', screen: 'PromotionCodes', iconBg: '#FFF1F2', iconColor: '#E11D48' },
      ],
    },
    {
      title: 'Información',
      items: [
        { label: 'Configuración', icon: 'settings-outline', screen: 'SettingsScreen', iconBg: colors.surface, iconColor: colors.gray500 },
        { label: 'Ayuda', icon: 'help-circle-outline', screen: 'HelpScreen', iconBg: colors.surface, iconColor: colors.gray500 },
        { label: 'Trabaja con nosotros', icon: 'briefcase-outline', screen: 'WorkWithUs', iconBg: '#F0FDF4', iconColor: colors.success },
      ],
    },
  ];
  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: () => navigation.navigate('SignIn'), style: 'destructive' },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      'Esta acción es permanente e irreversible. ¿Deseas continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => navigation.navigate('SignIn'), style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* User card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Diego Arria</Text>
            <Text style={styles.userEmail}>diego.arria19@gmail.com</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('ProfileData')}
          >
            <Icon name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Premium banner */}
        <TouchableOpacity
          style={styles.premiumBanner}
          onPress={() => navigation.navigate('TupperfyPremium')}
          activeOpacity={0.85}
        >
          <View style={styles.premiumLeft}>
            <View style={styles.premiumIconBox}>
              <Icon name="star" size={18} color="#EA580C" />
            </View>
            <View>
              <Text style={styles.premiumTitle}>Activa Tupperfy Premium</Text>
              <Text style={styles.premiumSub}>30 días gratis · Cancela cuando quieras</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={18} color="#EA580C" />
        </TouchableOpacity>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, i) => (
                <View key={item.label}>
                  <MenuItem item={item} onPress={() => navigation.navigate(item.screen)} />
                  {i < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Danger zone */}
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout} activeOpacity={0.7}>
              <View style={[styles.menuIcon, { backgroundColor: '#FFF1F2' }]}>
                <Icon name="log-out-outline" size={20} color={colors.danger} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.danger }]}>Cerrar sesión</Text>
              <Icon name="chevron-forward" size={18} color={colors.danger} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount} activeOpacity={0.7}>
              <View style={[styles.menuIcon, { backgroundColor: '#FFF1F2' }]}>
                <Icon name="trash-outline" size={20} color={colors.danger} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.danger }]}>Eliminar cuenta</Text>
              <Icon name="chevron-forward" size={18} color={colors.danger} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.version}>Tupperfy v1.0.0</Text>
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: colors.white, fontSize: 22, fontWeight: '700' },
  userInfo: { flex: 1 },
  userName: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 2 },
  userEmail: { fontSize: 13, color: colors.textSecondary },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: '#FFF7ED',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  premiumIconBox: {
    width: 36, height: 36, borderRadius: radius.md,
    backgroundColor: 'rgba(234,88,12,0.12)', justifyContent: 'center', alignItems: 'center',
  },
  premiumTitle: { fontSize: 14, fontWeight: '700', color: '#92400E', marginBottom: 2 },
  premiumSub: { fontSize: 12, color: '#B45309' },
  section: { marginTop: spacing.md, paddingHorizontal: spacing.md },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    gap: spacing.md,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: colors.text },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: spacing.xs,
  },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  separator: { height: 1, backgroundColor: colors.borderLight, marginLeft: 68 },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textLight,
    marginTop: spacing.lg,
  },
});

export default ProfileInfo;
