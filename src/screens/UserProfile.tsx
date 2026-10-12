import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, RefreshControl, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const TABS = [
  { key: 'platillos', label: 'Favoritos', icon: 'favorite' as const },
  { key: 'cocineros', label: 'Likes', icon: 'favorite-border' as const },
  { key: 'guardadas', label: 'Guardados', icon: 'bookmark-border' as const },
  { key: 'notificaciones', label: 'Alertas', icon: 'notifications-none' as const },
];

const UserProfile = ({ navigation }: { navigation: any }) => {
  const { colors } = useApp();
  const [activeTab, setActiveTab] = useState('platillos');
  const [refreshing, setRefreshing] = useState(false);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const user = {
    firstName: 'Diego',
    lastName: 'Arria',
    username: '@diego.arria',
    followedCount: 25,
    ordersCount: 75,
    likesCount: 200,
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Header / Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerTop}>
            <Text style={styles.bannerTitle}>Mi Perfil</Text>
            <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('SettingsScreen')}>
              <Icon name="settings-outline" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarRow}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.firstName[0]}</Text>
              </View>
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.userHandle}>{user.username}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('ProfileEdit')}>
              <Icon name="create-outline" size={16} color={colors.primary} />
              <Text style={styles.editBtnText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('FollowedChefs')}>
            <Text style={styles.statValue}>{user.followedCount}</Text>
            <Text style={styles.statLabel}>Chefs seguidos</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('OrdersCompleted')}>
            <Text style={styles.statValue}>{user.ordersCount}</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.likesCount}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          {[
            { label: 'Mi cuenta', bg: '#EBF3FF', icon: 'person-outline', iconColor: colors.primary, screen: 'ProfileInfo' },
            { label: 'Direcciones', bg: '#FEF3C7', icon: 'location-outline', iconColor: '#D97706', screen: 'UserAddresses' },
            { label: 'Pagos', bg: '#F0FDF4', icon: 'card-outline', iconColor: colors.success, screen: 'PaymentSelection' },
            { label: 'Premium', bg: '#FFF7ED', icon: 'star-outline', iconColor: '#EA580C', screen: 'TupperfyPremium' },
          ].map(qa => (
            <TouchableOpacity key={qa.label} style={styles.quickAction} onPress={() => navigation.navigate(qa.screen)}>
              <View style={[styles.quickIcon, { backgroundColor: qa.bg }]}>
                <Icon name={qa.icon} size={20} color={qa.iconColor} />
              </View>
              <Text style={styles.quickLabel}>{qa.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <MaterialIcon name={tab.icon} size={20} color={activeTab === tab.key ? colors.primary : colors.gray400} />
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content placeholder */}
        <View style={styles.contentArea}>
          <View style={styles.emptyState}>
            <Icon name="grid-outline" size={48} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Nada por aquí aún</Text>
            <Text style={styles.emptySubtitle}>Tus {TABS.find(t => t.key === activeTab)?.label.toLowerCase()} aparecerán aquí</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  banner: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + spacing.md,
  },
  bannerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  bannerTitle: { fontSize: 20, fontWeight: '700', color: colors.white },
  settingsBtn: {
    width: 38, height: 38, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center',
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.white },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.success, borderWidth: 2.5, borderColor: colors.primary,
  },
  userInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: '700', color: colors.white, marginBottom: 2 },
  userHandle: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.white, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 7,
  },
  editBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  statsCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, marginHorizontal: spacing.md, marginTop: -spacing.lg,
    borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, ...shadows.md,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.xs },
  statValue: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 2 },
  statLabel: { fontSize: 11, color: colors.textSecondary, textAlign: 'center' },
  statDivider: { width: 1, height: 36, backgroundColor: colors.border },
  quickActions: { flexDirection: 'row', paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: spacing.sm },
  quickAction: {
    flex: 1, alignItems: 'center', backgroundColor: colors.card,
    borderRadius: radius.md, padding: spacing.sm,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm, gap: 6,
  },
  quickIcon: { width: 44, height: 44, borderRadius: radius.sm, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textAlign: 'center' },
  tabBar: {
    flexDirection: 'row', backgroundColor: colors.card,
    marginHorizontal: spacing.md, marginTop: spacing.md,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden', ...shadows.sm,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.primary, backgroundColor: colors.primaryLight },
  tabLabel: { fontSize: 10, fontWeight: '600', color: colors.gray400 },
  tabLabelActive: { color: colors.primary },
  contentArea: {
    minHeight: 240, marginHorizontal: spacing.md, marginTop: spacing.sm, marginBottom: spacing.xl,
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', ...shadows.sm,
  },
  emptyState: { alignItems: 'center', padding: spacing.xl, gap: spacing.sm },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.gray400 },
  emptySubtitle: { fontSize: 13, color: colors.textLight, textAlign: 'center' },
});

export default UserProfile;
