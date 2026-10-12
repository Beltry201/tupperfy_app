import React, { useState, useMemo } from 'react';
import {
  Alert, View, StyleSheet, Text, ScrollView, TextInput,
  TouchableOpacity, Switch, SafeAreaView, StatusBar, Image, Modal,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing, radius, shadows, typography, AppColors } from '../theme';
import { useApp } from '../context/AppContext';
import { getDishImage } from '../utils/images';
import { CATEGORIES, ALL_ITEMS, Item } from '../data/catalog';

const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const;
type Weekday = typeof WEEKDAYS[number];

const WEEKDAY_SHORT: Record<Weekday, string> = {
  Lunes: 'LUN', Martes: 'MAR', Miércoles: 'MIÉ', Jueves: 'JUE',
  Viernes: 'VIE', Sábado: 'SÁB', Domingo: 'DOM',
};

interface SelectedDish { item: Item; quantity: number; }
interface DayMenu {
  dishes: SelectedDish[]; address: string; instructions: string;
  deliveryTime: string; needUtensils: boolean;
}

const emptyDayMenu = (): DayMenu => ({ dishes: [], address: '', instructions: '', deliveryTime: '', needUtensils: false });

const createWeekMenu = (): Record<Weekday, DayMenu> =>
  WEEKDAYS.reduce((acc, day) => { acc[day] = emptyDayMenu(); return acc; }, {} as Record<Weekday, DayMenu>);

const parsePrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
const daySubtotal = (dm: DayMenu) => dm.dishes.reduce((sum, d) => sum + parsePrice(d.item.price) * d.quantity, 0);

const MenuView = () => {
  const { colors, isDark, deliveryAddress } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [weekMenu, setWeekMenu] = useState<Record<Weekday, DayMenu>>(createWeekMenu);
  const [editingDay, setEditingDay] = useState<Weekday | null>(null);

  // Draft state for the day editor sheet
  const [draftDishes, setDraftDishes] = useState<SelectedDish[]>([]);
  const [draftAddress, setDraftAddress] = useState('');
  const [draftInstructions, setDraftInstructions] = useState('');
  const [draftTime, setDraftTime] = useState('');
  const [draftUtensils, setDraftUtensils] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // Dish picker modal
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerQuery, setPickerQuery] = useState('');
  const [pickerCategory, setPickerCategory] = useState('all');

  const weekStats = useMemo(() => {
    const activeDays = WEEKDAYS.filter(d => weekMenu[d].dishes.length > 0).length;
    const totalDishes = WEEKDAYS.reduce((sum, d) => sum + weekMenu[d].dishes.reduce((s, x) => s + x.quantity, 0), 0);
    return { activeDays, totalDishes };
  }, [weekMenu]);

  const openDayEditor = (day: Weekday) => {
    const dm = weekMenu[day];
    setDraftDishes(dm.dishes.map(d => ({ ...d })));
    setDraftAddress(dm.address || deliveryAddress || '');
    setDraftInstructions(dm.instructions);
    setDraftTime(dm.deliveryTime);
    setDraftUtensils(dm.needUtensils);
    setEditingDay(day);
  };

  const closeDayEditor = () => setEditingDay(null);

  const handlePickDish = (item: Item) => {
    setDraftDishes(prev => {
      const idx = prev.findIndex(d => d.item.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { item, quantity: 1 }];
    });
    setPickerOpen(false);
    setPickerQuery('');
    setPickerCategory('all');
  };

  const handleRemoveDraftDish = (itemId: string) => setDraftDishes(prev => prev.filter(d => d.item.id !== itemId));
  const handleChangeQty = (itemId: string, delta: number) =>
    setDraftDishes(prev => prev.map(d => d.item.id === itemId ? { ...d, quantity: Math.max(1, d.quantity + delta) } : d));

  const handleTimeConfirm = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    setDraftTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`);
    setTimePickerVisible(false);
  };

  const handleSaveDay = () => {
    if (!editingDay) return;
    setWeekMenu(prev => ({
      ...prev,
      [editingDay]: {
        dishes: draftDishes,
        address: draftAddress.trim(),
        instructions: draftInstructions.trim(),
        deliveryTime: draftTime,
        needUtensils: draftUtensils,
      },
    }));
    closeDayEditor();
  };

  const handleClearDay = (day: Weekday) => {
    Alert.alert('Vaciar día', `¿Quitar el pedido programado de ${day}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Vaciar', style: 'destructive', onPress: () => setWeekMenu(prev => ({ ...prev, [day]: emptyDayMenu() })) },
    ]);
  };

  const pickerResults = useMemo(() => {
    let list = ALL_ITEMS;
    if (pickerCategory !== 'all') list = list.filter(i => i.category === pickerCategory);
    const q = pickerQuery.trim().toLowerCase();
    if (q) list = list.filter(i => i.dish.toLowerCase().includes(q) || i.person.toLowerCase().includes(q));
    return list.slice(0, 30);
  }, [pickerCategory, pickerQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Mi Menú</Text>
        <Text style={styles.pageSubtitle}>Programa tus pedidos de la semana</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryStatValue}>{weekStats.activeDays}/7</Text>
            <Text style={styles.summaryStatLabel}>días programados</Text>
          </View>
          <View style={styles.summaryDividerV} />
          <View style={styles.summaryStat}>
            <Text style={styles.summaryStatValue}>{weekStats.totalDishes}</Text>
            <Text style={styles.summaryStatLabel}>platillos pedidos</Text>
          </View>
        </View>

        {WEEKDAYS.map(day => {
          const dm = weekMenu[day];
          const hasMenu = dm.dishes.length > 0;
          return (
            <TouchableOpacity
              key={day}
              style={styles.dayCard}
              activeOpacity={0.85}
              onPress={() => openDayEditor(day)}
            >
              <View style={styles.dayCardHeader}>
                <View style={[styles.dayBadge, hasMenu && styles.dayBadgeActive]}>
                  <Text style={[styles.dayBadgeText, hasMenu && styles.dayBadgeTextActive]}>{WEEKDAY_SHORT[day]}</Text>
                </View>
                <View style={styles.dayCardInfo}>
                  <Text style={styles.dayCardTitle}>{day}</Text>
                  <Text style={styles.dayCardSubtitle}>
                    {hasMenu
                      ? `${weekMenu[day].dishes.reduce((s, x) => s + x.quantity, 0)} platillo${weekMenu[day].dishes.reduce((s, x) => s + x.quantity, 0) === 1 ? '' : 's'} · $${daySubtotal(dm).toFixed(0)}`
                      : 'Sin pedido programado'}
                  </Text>
                </View>
                {hasMenu && (
                  <TouchableOpacity
                    style={styles.dayClearBtn}
                    onPress={() => handleClearDay(day)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Icon name="trash-outline" size={15} color={colors.danger} />
                  </TouchableOpacity>
                )}
                <Icon name="chevron-forward" size={18} color={colors.gray400} />
              </View>

              {hasMenu ? (
                <View style={styles.dishThumbRow}>
                  {dm.dishes.slice(0, 4).map((d, i) => (
                    <Image
                      key={d.item.id}
                      source={getDishImage(d.item.dish)}
                      style={[styles.dishThumb, i > 0 && styles.dishThumbOverlap]}
                    />
                  ))}
                  <Text style={styles.dishThumbLabel} numberOfLines={1}>
                    {dm.dishes.map(d => d.item.dish).join(', ')}
                  </Text>
                </View>
              ) : (
                <View style={styles.addDishesCta}>
                  <Icon name="add-circle-outline" size={16} color={colors.primary} />
                  <Text style={styles.addDishesCtaText}>Elegir platillos</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {editingDay && (
        <>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={closeDayEditor} />
          <KeyboardAvoidingView
            style={styles.editorWrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            pointerEvents="box-none"
          >
            <Animated.View
              entering={SlideInDown.duration(320).springify()}
              exiting={SlideOutDown.duration(280)}
              style={styles.editorSheet}
            >
              <View style={styles.sheetHandle} />
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Pedido de {editingDay}</Text>
                <TouchableOpacity onPress={closeDayEditor}>
                  <Icon name="close" size={22} color={colors.gray500} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Text style={styles.formSectionTitle}>Platillos</Text>

                {draftDishes.length === 0 ? (
                  <View style={styles.emptyPicker}>
                    <Icon name="restaurant-outline" size={28} color={colors.gray300} />
                    <Text style={styles.emptyPickerText}>Aún no eliges platillos para este día</Text>
                  </View>
                ) : (
                  draftDishes.map(d => (
                    <View key={d.item.id} style={styles.selectedDishRow}>
                      <Image source={getDishImage(d.item.dish)} style={styles.selectedDishPhoto} />
                      <View style={styles.selectedDishInfo}>
                        <Text style={styles.selectedDishName} numberOfLines={1}>{d.item.dish}</Text>
                        <Text style={styles.selectedDishChef} numberOfLines={1}>Por {d.item.person} · {d.item.price}</Text>
                      </View>
                      <View style={styles.qtyStepper}>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => handleChangeQty(d.item.id, -1)}>
                          <Icon name="remove" size={14} color={colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{d.quantity}</Text>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => handleChangeQty(d.item.id, 1)}>
                          <Icon name="add" size={14} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveDraftDish(d.item.id)}>
                        <Icon name="trash-outline" size={18} color={colors.danger} />
                      </TouchableOpacity>
                    </View>
                  ))
                )}

                <TouchableOpacity style={styles.addDishBtn} onPress={() => setPickerOpen(true)}>
                  <Icon name="add-circle-outline" size={18} color={colors.primary} />
                  <Text style={styles.addDishText}>Agregar platillo</Text>
                </TouchableOpacity>

                {draftDishes.length > 0 && (
                  <View style={styles.subtotalRow}>
                    <Text style={styles.subtotalLabel}>Subtotal del día</Text>
                    <Text style={styles.subtotalValue}>
                      ${draftDishes.reduce((s, d) => s + parsePrice(d.item.price) * d.quantity, 0).toFixed(0)}
                    </Text>
                  </View>
                )}

                <Text style={[styles.formSectionTitle, { marginTop: spacing.md }]}>Entrega</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="location-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Dirección de entrega"
                    placeholderTextColor={colors.textLight}
                    value={draftAddress}
                    onChangeText={setDraftAddress}
                  />
                </View>
                <View style={[styles.inputWrapper, { marginTop: spacing.sm }]}>
                  <Icon name="document-text-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Instrucciones (opcional)"
                    placeholderTextColor={colors.textLight}
                    value={draftInstructions}
                    onChangeText={setDraftInstructions}
                  />
                </View>
                <TouchableOpacity style={[styles.pickerRow, { marginTop: spacing.sm }]} onPress={() => setTimePickerVisible(true)}>
                  <Icon name="time-outline" size={16} color={colors.gray400} />
                  <Text style={[styles.pickerValue, !draftTime && styles.pickerPlaceholder]}>
                    {draftTime || 'Hora de entrega'}
                  </Text>
                  <Icon name="chevron-forward" size={16} color={colors.gray400} />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={() => setTimePickerVisible(false)}
                />

                <View style={[styles.switchRow, { marginTop: spacing.md }]}>
                  <View style={styles.switchLeft}>
                    <Icon name="restaurant-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.switchLabel}>¿Incluir cubiertos?</Text>
                  </View>
                  <Switch
                    value={draftUtensils}
                    onValueChange={setDraftUtensils}
                    trackColor={{ false: colors.gray200, true: colors.primaryLight }}
                    thumbColor={draftUtensils ? colors.primary : colors.white}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.saveButton, draftDishes.length === 0 && styles.saveButtonDisabled]}
                  onPress={handleSaveDay}
                  activeOpacity={0.85}
                  disabled={draftDishes.length === 0}
                >
                  <Icon name="checkmark-circle-outline" size={20} color={colors.white} />
                  <Text style={styles.saveButtonText}>Guardar {editingDay}</Text>
                </TouchableOpacity>

                <View style={{ height: spacing.lg }} />
              </ScrollView>
            </Animated.View>
          </KeyboardAvoidingView>
        </>
      )}

      {/* Dish picker modal */}
      <Modal
        visible={pickerOpen}
        animationType="slide"
        presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : undefined}
        onRequestClose={() => setPickerOpen(false)}
      >
        <SafeAreaView style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>Elegir platillo</Text>
            <TouchableOpacity onPress={() => setPickerOpen(false)}>
              <Icon name="close" size={24} color={colors.gray500} />
            </TouchableOpacity>
          </View>

          <View style={styles.pickerSearchBar}>
            <Icon name="search-outline" size={16} color={colors.textLight} />
            <TextInput
              style={styles.pickerSearchInput}
              value={pickerQuery}
              onChangeText={setPickerQuery}
              placeholder="Buscar platillo o chef"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={styles.pickerCategorySection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pickerCategoryContent}
            >
              {CATEGORIES.map(cat => {
                const active = pickerCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.categoryChip, active && styles.categoryChipActive]}
                    onPress={() => setPickerCategory(cat.id)}
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcon name={cat.icon} size={15} color={active ? colors.white : colors.textSecondary} />
                    <Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <ScrollView contentContainerStyle={styles.pickerList} showsVerticalScrollIndicator={false}>
            {pickerResults.length === 0 ? (
              <View style={styles.emptyPicker}>
                <Icon name="search-outline" size={28} color={colors.gray300} />
                <Text style={styles.emptyPickerText}>Sin resultados</Text>
              </View>
            ) : (
              pickerResults.map(item => (
                <TouchableOpacity key={item.id} style={styles.pickerItemRow} onPress={() => handlePickDish(item)} activeOpacity={0.8}>
                  <Image source={getDishImage(item.dish)} style={styles.pickerItemPhoto} />
                  <View style={styles.pickerItemInfo}>
                    <Text style={styles.pickerItemName} numberOfLines={1}>{item.dish}</Text>
                    <Text style={styles.pickerItemChef} numberOfLines={1}>Por {item.person}</Text>
                    <View style={styles.pickerItemMeta}>
                      <Icon name="star" size={11} color={colors.star} />
                      <Text style={styles.pickerItemMetaText}>{item.rating}</Text>
                      <Icon name="time-outline" size={11} color={colors.textLight} />
                      <Text style={styles.pickerItemMetaText}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={styles.pickerItemRight}>
                    <Text style={styles.pickerItemPrice}>{item.price}</Text>
                    <Icon name="add-circle" size={24} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              ))
            )}
            <View style={{ height: spacing.xl }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  pageHeader: {
    paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm,
    backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  pageTitle: { ...typography.h2 },
  pageSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  scroll: { padding: spacing.md },

  // Summary
  summaryCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.md, ...shadows.sm,
  },
  summaryStat: { flex: 1, alignItems: 'center' },
  summaryStatValue: { fontSize: 20, fontWeight: '700', color: colors.text },
  summaryStatLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  summaryDividerV: { width: 1, height: 32, backgroundColor: colors.border },

  // Day cards
  dayCard: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.sm, ...shadows.sm,
  },
  dayCardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dayBadge: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  dayBadgeActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  dayBadgeText: { fontSize: 11, fontWeight: '700', color: colors.gray400 },
  dayBadgeTextActive: { color: colors.primary },
  dayCardInfo: { flex: 1 },
  dayCardTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  dayCardSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  dayClearBtn: {
    width: 30, height: 30, borderRadius: radius.sm,
    backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center',
  },

  dishThumbRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, gap: spacing.xs },
  dishThumb: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: colors.card, backgroundColor: colors.surface,
  },
  dishThumbOverlap: { marginLeft: -12 },
  dishThumbLabel: { flex: 1, fontSize: 12, color: colors.textSecondary, marginLeft: spacing.xs },

  addDishesCta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  addDishesCtaText: { fontSize: 13, fontWeight: '600', color: colors.primary },

  // Shared form bits (editor sheet)
  formSectionTitle: { ...typography.h4, marginBottom: spacing.sm },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.sm, height: 44,
  },
  inputIcon: { marginRight: spacing.xs },
  input: { flex: 1, fontSize: 14, color: colors.text },
  pickerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: 12, paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border,
  },
  pickerValue: { flex: 1, fontSize: 14, color: colors.text, fontWeight: '500' },
  pickerPlaceholder: { color: colors.textLight },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  switchLabel: { fontSize: 14, fontWeight: '500', color: colors.text },
  removeBtn: { padding: 4 },
  addDishBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm, marginBottom: spacing.xs },
  addDishText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  saveButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, marginTop: spacing.lg, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 14, ...shadows.md,
  },
  saveButtonDisabled: { backgroundColor: colors.gray300 },
  saveButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  emptyPicker: { alignItems: 'center', paddingVertical: spacing.lg, gap: spacing.xs },
  emptyPickerText: { fontSize: 13, color: colors.textLight },

  // Selected dish row (inside day editor)
  selectedDishRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  selectedDishPhoto: { width: 48, height: 48, borderRadius: radius.sm, backgroundColor: colors.surface },
  selectedDishInfo: { flex: 1 },
  selectedDishName: { fontSize: 14, fontWeight: '700', color: colors.text },
  selectedDishChef: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  qtyStepper: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: 4, paddingVertical: 4,
  },
  qtyBtn: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 13, fontWeight: '700', color: colors.text, minWidth: 14, textAlign: 'center' },

  subtotalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, marginTop: spacing.xs,
  },
  subtotalLabel: { fontSize: 13, color: colors.textSecondary },
  subtotalValue: { fontSize: 15, fontWeight: '700', color: colors.primary },

  // Bottom sheet
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  editorWrapper: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end' },
  editorSheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    padding: spacing.md, paddingBottom: spacing.md,
    maxHeight: '88%', ...shadows.lg,
  },
  sheetHandle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: colors.gray300, alignSelf: 'center', marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.md,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.text },

  // Dish picker modal
  pickerContainer: { flex: 1, backgroundColor: colors.surface },
  pickerHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.md, backgroundColor: colors.card,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  pickerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  pickerSearchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.card, margin: spacing.md, marginBottom: spacing.sm,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.sm, paddingVertical: 10,
  },
  pickerSearchInput: { flex: 1, fontSize: 14, color: colors.text, padding: 0 },
  pickerCategorySection: {
    backgroundColor: colors.card,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
    paddingVertical: spacing.sm, marginBottom: spacing.sm,
  },
  pickerCategoryContent: { gap: spacing.sm, paddingHorizontal: spacing.md, paddingRight: spacing.lg },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, borderRadius: radius.full,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 9,
  },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary, ...shadows.sm },
  categoryChipText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  categoryChipTextActive: { color: colors.white, fontWeight: '700' },
  pickerList: { paddingHorizontal: spacing.md },
  pickerItemRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.sm, marginBottom: spacing.sm, ...shadows.sm,
  },
  pickerItemPhoto: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.surface },
  pickerItemInfo: { flex: 1, gap: 2 },
  pickerItemName: { fontSize: 14, fontWeight: '700', color: colors.text },
  pickerItemChef: { fontSize: 12, color: colors.textSecondary },
  pickerItemMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  pickerItemMetaText: { fontSize: 11, color: colors.textLight },
  pickerItemRight: { alignItems: 'center', gap: 4 },
  pickerItemPrice: { fontSize: 13, fontWeight: '700', color: colors.text },
});

export default MenuView;
