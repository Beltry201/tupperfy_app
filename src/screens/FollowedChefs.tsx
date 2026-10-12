import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

type Chef = {
  id: string; name: string; specialty: string;
  rating: number; dishes: number; followers: string;
};

const CHEFS: Chef[] = [
  { id: '1',  name: 'Chef María García',    specialty: 'Cocina Mexicana',   rating: 4.8, dishes: 24, followers: '1.2k' },
  { id: '2',  name: 'Chef Juan Martínez',   specialty: 'Comida Italiana',   rating: 4.5, dishes: 18, followers: '890'  },
  { id: '3',  name: 'Chef Ana López',       specialty: 'Cocina Asiática',   rating: 4.9, dishes: 32, followers: '3.4k' },
  { id: '4',  name: 'Chef Pedro Sánchez',   specialty: 'BBQ & Parrilla',    rating: 4.3, dishes: 15, followers: '670'  },
  { id: '5',  name: 'Chef Laura Ramírez',   specialty: 'Repostería',        rating: 4.7, dishes: 29, followers: '2.1k' },
  { id: '6',  name: 'Chef Carlos Díaz',     specialty: 'Cocina Española',   rating: 4.6, dishes: 21, followers: '1.5k' },
  { id: '7',  name: 'Chef Sofía Herrera',   specialty: 'Comida Vegana',     rating: 4.8, dishes: 27, followers: '980'  },
  { id: '8',  name: 'Chef Roberto Flores',  specialty: 'Mariscos',          rating: 4.4, dishes: 19, followers: '740'  },
];

const AVATAR_COLORS = ['#006BFF', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16'];

const getInitials = (name: string) =>
  name.replace('Chef ', '').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

const FollowedChefs = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [followed, setFollowed] = useState<Set<string>>(new Set(CHEFS.map(c => c.id)));
  const [query, setQuery] = useState('');

  const toggleFollow = (id: string) =>
    setFollowed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filteredChefs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CHEFS;
    return CHEFS.filter(c =>
      c.name.toLowerCase().includes(q) || c.specialty.toLowerCase().includes(q));
  }, [query]);

  const renderItem = ({ item, index }: { item: Chef; index: number }) => {
    const isFollowing = followed.has(item.id);
    return (
      <View style={styles.card}>
        <View style={[styles.avatar, { backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }]}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.tagRow}>
            <Icon name="restaurant-outline" size={12} color={colors.primary} />
            <Text style={styles.specialty}>{item.specialty}</Text>
          </View>
          <View style={styles.statsRow}>
            <Icon name="star" size={12} color={colors.star} />
            <Text style={styles.stat}>{item.rating}</Text>
            <Text style={styles.statSep}>·</Text>
            <Text style={styles.stat}>{item.dishes} platillos</Text>
            <Text style={styles.statSep}>·</Text>
            <Text style={styles.stat}>{item.followers} seguidores</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.followBtn, isFollowing && styles.followBtnActive]}
          onPress={() => toggleFollow(item.id)}
          activeOpacity={0.8}
        >
          <Text style={[styles.followBtnText, isFollowing && styles.followBtnTextActive]}>
            {isFollowing ? 'Siguiendo' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <FlatList
        data={filteredChefs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={styles.searchBar}>
              <Icon name="search-outline" size={16} color={colors.textLight} />
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar chef o especialidad"
                placeholderTextColor={colors.textLight}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Icon name="close-circle" size={16} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.listHeaderCount}>{followed.size} chefs seguidos</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="search-outline" size={48} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptySub}>No encontramos chefs para "{query}"</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.md, paddingTop: 0, flexGrow: 1 },
  listHeader: { paddingVertical: spacing.md, gap: spacing.sm },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.sm, paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text, padding: 0 },
  listHeaderCount: { fontSize: 13, color: colors.textSecondary, fontWeight: '600' },

  emptyState: { alignItems: 'center', paddingTop: 60, gap: spacing.sm },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.gray400 },
  emptySub: { fontSize: 13, color: colors.textLight, textAlign: 'center' },

  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    gap: spacing.md, ...shadows.sm,
  },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },

  info: { flex: 1, gap: 4 },
  name: { fontSize: 14, fontWeight: '700', color: colors.text },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specialty: { fontSize: 12, color: colors.primary, fontWeight: '500' },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  stat: { fontSize: 11, color: colors.textSecondary },
  statSep: { fontSize: 11, color: colors.gray300 },

  followBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: radius.full,
    borderWidth: 1.5, borderColor: colors.primary,
  },
  followBtnActive: { backgroundColor: colors.primary },
  followBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  followBtnTextActive: { color: '#FFFFFF' },

  separator: { height: spacing.sm },
});

export default FollowedChefs;
