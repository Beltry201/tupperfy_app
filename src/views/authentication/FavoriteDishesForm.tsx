import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const DISHES = [
  { name: 'Milanesa de Pollo',        icon: 'food-drumstick-outline' },
  { name: 'Carne Asada',              icon: 'food-steak' },
  { name: 'Enchiladas',               icon: 'taco' },
  { name: 'Tacos',                    icon: 'taco' },
  { name: 'Chiles Rellenos',          icon: 'chili-hot' },
  { name: 'Pozole',                   icon: 'bowl-mix' },
  { name: 'Tamales',                  icon: 'food-variant' },
  { name: 'Quesadillas',              icon: 'cheese' },
  { name: 'Sopes',                    icon: 'bread-slice-outline' },
  { name: 'Pasta',                    icon: 'pasta' },
  { name: 'Pizza Margarita',          icon: 'pizza' },
  { name: 'Sushi de Salmón',          icon: 'fish' },
  { name: 'Hamburguesa con Queso',    icon: 'hamburger' },
  { name: 'Pasta Alfredo',            icon: 'pasta' },
  { name: 'Paella',                   icon: 'rice' },
  { name: 'Curry de Pollo',           icon: 'pot-steam' },
  { name: 'Lasaña',                   icon: 'pasta' },
  { name: 'Filete de Salmón',         icon: 'fish' },
  { name: 'Pollo a la Parrilla',      icon: 'food-drumstick-outline' },
  { name: 'Risotto de Champiñones',   icon: 'mushroom' },
  { name: 'Tostadas de Aguacate',     icon: 'bread-slice' },
  { name: 'Sopa de Tomate',           icon: 'bowl-mix' },
  { name: 'Pad Thai',                 icon: 'noodles' },
  { name: 'Pescado a la Parrilla',    icon: 'fish' },
  { name: 'Fajitas de Res',           icon: 'taco' },
  { name: 'Burritos',                 icon: 'taco' },
  { name: 'Tarta de Queso',           icon: 'cake-variant' },
  { name: 'Bistec con Puré',          icon: 'food-steak' },
  { name: 'Sopa de Lentejas',         icon: 'bowl-mix' },
  { name: 'Espagueti Boloñesa',       icon: 'pasta' },
];

const FavoriteDishesForm = ({ navigation }: { navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? DISHES.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    : DISHES;

  const toggle = (name: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <View style={styles.header}>
          <Text style={styles.title}>¿Qué te gusta comer?</Text>
          <Text style={styles.subtitle}>
            Selecciona tus platillos favoritos para personalizar tu experiencia
          </Text>
          <View style={styles.searchRow}>
            <Icon name="search-outline" size={17} color={colors.gray400} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar platillo..."
              placeholderTextColor={colors.textLight}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Icon name="close-circle" size={17} color={colors.gray400} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chipsWrap}
          keyboardShouldPersistTaps="handled"
        >
          {filtered.map(dish => {
            const active = selected.has(dish.name);
            return (
              <TouchableOpacity
                key={dish.name}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => toggle(dish.name)}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcon
                  name={dish.icon}
                  size={15}
                  color={active ? '#FFFFFF' : colors.textSecondary}
                />
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {dish.name}
                </Text>
                {active && <Icon name="checkmark" size={14} color="#FFFFFF" />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.bottomBar}>
          {selected.size > 0 && (
            <Text style={styles.selectedCount}>{selected.size} seleccionados</Text>
          )}
          <TouchableOpacity
            style={[styles.btn, selected.size === 0 && styles.btnDisabled]}
            onPress={() => navigation.navigate('AddPaymentMethod')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>
              {selected.size === 0 ? 'Omitir por ahora' : 'Continuar'}
            </Text>
            <Icon name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  header: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, height: 44,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },

  chipsWrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    padding: spacing.md, gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md, paddingVertical: 9,
    borderWidth: 1.5, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: '500', color: colors.text },
  chipTextActive: { color: '#FFFFFF', fontWeight: '600' },

  bottomBar: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1, borderTopColor: colors.border,
    gap: spacing.sm,
  },
  selectedCount: { fontSize: 13, color: colors.textSecondary, fontWeight: '600', textAlign: 'center' },
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 15, ...shadows.sm,
  },
  btnDisabled: { backgroundColor: colors.gray400 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

export default FavoriteDishesForm;
