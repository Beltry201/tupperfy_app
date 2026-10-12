import React, { useMemo, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

type Order = {
  id: string; dish: string; chef: string; date: string;
  price: string; total: string; status: 'Entregado' | 'Cancelado' | 'En proceso';
  items: number;
};

const ORDERS: Order[] = [
  { id: '1', dish: 'Arepas con Pollo',        chef: 'Chef María García',  date: '21 jun 2024', price: '$65',  total: '$80',  status: 'Entregado',  items: 2 },
  { id: '2', dish: 'Pasta Alfredo',            chef: 'Chef Juan Martínez', date: '18 jun 2024', price: '$90',  total: '$105', status: 'Entregado',  items: 1 },
  { id: '3', dish: 'Sushi Variado',            chef: 'Chef Ana López',     date: '15 jun 2024', price: '$130', total: '$148', status: 'Entregado',  items: 3 },
  { id: '4', dish: 'BBQ Costillas',            chef: 'Chef Pedro Sánchez', date: '10 jun 2024', price: '$120', total: '$138', status: 'Cancelado',  items: 1 },
  { id: '5', dish: 'Tarta de Queso',           chef: 'Chef Laura Ramírez', date: '5 jun 2024',  price: '$55',  total: '$70',  status: 'Entregado',  items: 2 },
  { id: '6', dish: 'Paella Valenciana',        chef: 'Chef Carlos Díaz',   date: '1 jun 2024',  price: '$150', total: '$170', status: 'Entregado',  items: 4 },
];

const STATUS_CONFIG = {
  Entregado:  { icon: 'checkmark-circle', color: '#10B981', bg: '#F0FDF4' },
  Cancelado:  { icon: 'close-circle',     color: '#EF4444', bg: '#FFF1F2' },
  'En proceso': { icon: 'time',           color: '#F59E0B', bg: '#FEF3C7' },
};

const FILTERS = ['Todos', 'Entregado', 'En proceso', 'Cancelado'] as const;

const OrdersCompleted = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [filter, setFilter] = useState<typeof FILTERS[number]>('Todos');

  const filteredOrders = useMemo(
    () => filter === 'Todos' ? ORDERS : ORDERS.filter(o => o.status === filter),
    [filter],
  );

  const renderItem = ({ item }: { item: Order }) => {
    const cfg = STATUS_CONFIG[item.status];
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.dishImageBox}>
            <Icon name="restaurant" size={22} color={colors.primary} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.dishName} numberOfLines={1}>{item.dish}</Text>
            <Text style={styles.chefName}>{item.chef}</Text>
            <View style={styles.metaRow}>
              <Icon name="calendar-outline" size={12} color={colors.textLight} />
              <Text style={styles.metaText}>{item.date}</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.metaText}>{item.items} {item.items === 1 ? 'platillo' : 'platillos'}</Text>
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.total}>{item.total}</Text>
            <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
              <Icon name={cfg.icon} size={11} color={cfg.color} />
              <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
            </View>
          </View>
        </View>

        {item.status === 'Entregado' && (
          <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.8}>
            <Icon name="refresh-outline" size={15} color={colors.primary} />
            <Text style={styles.reorderText}>Pedir de nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.filterRow}>
            {FILTERS.map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterChip, filter === f && styles.filterChipActive]}
                onPress={() => setFilter(f)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="receipt-outline" size={52} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Sin pedidos aún</Text>
            <Text style={styles.emptySub}>
              {filter === 'Todos' ? 'Tus pedidos completados aparecerán aquí' : `No tienes pedidos "${filter}"`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.md, gap: spacing.sm },
  filterRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  filterChipTextActive: { color: colors.white },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    gap: spacing.sm, ...shadows.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  dishImageBox: {
    width: 56, height: 56, borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  cardInfo: { flex: 1, gap: 3 },
  dishName: { fontSize: 14, fontWeight: '700', color: colors.text },
  chefName: { fontSize: 12, color: colors.textSecondary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  metaText: { fontSize: 11, color: colors.textLight },
  metaSep: { fontSize: 11, color: colors.gray300 },

  rightCol: { alignItems: 'flex-end', gap: 6 },
  total: { fontSize: 15, fontWeight: '700', color: colors.text },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  statusText: { fontSize: 11, fontWeight: '700' },

  reorderBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm,
    borderTopWidth: 1, borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  reorderText: { fontSize: 13, fontWeight: '600', color: colors.primary },

  emptyState: { alignItems: 'center', paddingTop: 80, gap: spacing.sm },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: colors.gray400 },
  emptySub: { fontSize: 13, color: colors.textLight, textAlign: 'center' },
});

export default OrdersCompleted;
