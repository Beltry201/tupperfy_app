import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

type Chef = {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  reviews: number;
  dishes: number;
};

const CHEFS_DATA: Chef[] = [
  { id: '1', name: 'Chef María García',  specialty: 'Cocina Mexicana', distance: '1.2 km', rating: 4.8, reviews: 128, dishes: 24 },
  { id: '2', name: 'Chef Juan Martínez', specialty: 'Comida Italiana',  distance: '3.5 km', rating: 4.5, reviews: 87,  dishes: 18 },
  { id: '3', name: 'Chef Ana López',     specialty: 'Cocina Asiática',  distance: '2.1 km', rating: 4.9, reviews: 201, dishes: 32 },
  { id: '4', name: 'Chef Pedro Sánchez', specialty: 'BBQ & Parrilla',   distance: '5.0 km', rating: 4.3, reviews: 65,  dishes: 15 },
  { id: '5', name: 'Chef Laura Ramírez', specialty: 'Repostería',       distance: '3.7 km', rating: 4.7, reviews: 143, dishes: 29 },
];

const FavoriteChefs = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [chefs, setChefs] = useState<Chef[]>(CHEFS_DATA);

  const AVATAR_COLORS = [colors.primary, colors.success, '#8B5CF6', '#F59E0B', '#EF4444'];

  const getInitials = (name: string) =>
    name.replace('Chef ', '').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const handleRemove = (id: string, name: string) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Quieres eliminar a ${name} de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setChefs(prev => prev.filter(c => c.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item, index }: { item: Chef; index: number }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={[styles.avatar, { backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }]}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>

        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>{item.name}</Text>
          <View style={styles.tagRow}>
            <Icon name="restaurant-outline" size={12} color={colors.primary} />
            <Text style={styles.specialty}>{item.specialty}</Text>
          </View>
          <View style={styles.tagRow}>
            <Icon name="location-outline" size={12} color={colors.gray400} />
            <Text style={styles.distance}>{item.distance} de distancia</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => handleRemove(item.id, item.name)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="heart" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Icon name="star" size={14} color={colors.star} />
          <Text style={styles.statValue}>{item.rating}</Text>
          <Text style={styles.statLabel}>({item.reviews} reseñas)</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Icon name="restaurant" size={13} color={colors.gray400} />
          <Text style={styles.statValue}>{item.dishes}</Text>
          <Text style={styles.statLabel}>platillos</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuBtn} activeOpacity={0.85}>
        <Icon name="bag-handle-outline" size={16} color="#FFFFFF" />
        <Text style={styles.menuBtnText}>Ver menú</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />

      <FlatList
        data={chefs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="heart-outline" size={56} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Sin chefs favoritos</Text>
            <Text style={styles.emptySub}>
              Explora y agrega tus chefs favoritos desde el menú principal
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.md, gap: spacing.sm, paddingBottom: spacing.xl },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  chefInfo: { flex: 1, gap: 5 },
  chefName: { fontSize: 15, fontWeight: '700', color: colors.text },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specialty: { fontSize: 13, color: colors.primary, fontWeight: '500' },
  distance: { fontSize: 12, color: colors.textSecondary },
  heartBtn: { padding: 4, marginTop: 2 },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: spacing.sm,
    gap: spacing.md,
  },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statValue: { fontSize: 14, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 12, color: colors.textSecondary },
  statDivider: { width: 1, height: 16, backgroundColor: colors.border },

  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 12,
    ...shadows.sm,
  },
  menuBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.gray400 },
  emptySub: { fontSize: 13, color: colors.textLight, textAlign: 'center', lineHeight: 20 },
});

export default FavoriteChefs;
