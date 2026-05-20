import React, { useState, useMemo } from 'react';
import {
  Alert, View, StyleSheet, Text, ScrollView, TextInput,
  TouchableOpacity, Switch, SafeAreaView, StatusBar,
} from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, typography, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const WEEKDAY_MAP: Record<string, number> = {
  Domingo: 0, Lunes: 1, Martes: 2, Miércoles: 3, Jueves: 4, Viernes: 5, Sábado: 6,
};

const FOLDER_EMOJIS = ['📁', '🍽️', '🥗', '🥩', '🌮', '🍕', '🍜', '🥘', '🍱', '🎂', '🥤', '⭐', '❤️', '🌟', '🔥'];

interface Folder { id: string; name: string; emoji: string; }

const MenuView = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const calendarTheme = useMemo(() => ({
    calendarBackground: colors.card,
    backgroundColor: colors.card,
    textSectionTitleColor: colors.textSecondary,
    selectedDayBackgroundColor: colors.primary,
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: colors.primary,
    todayBackgroundColor: colors.primaryLight,
    dayTextColor: colors.text,
    textDisabledColor: colors.gray400,
    dotColor: colors.primary,
    selectedDotColor: '#FFFFFF',
    arrowColor: colors.primary,
    monthTextColor: colors.text,
    textMonthFontWeight: '700' as const,
    textMonthFontSize: 16,
    textDayFontSize: 14,
    textDayHeaderFontSize: 12,
    textDayHeaderFontWeight: '600' as const,
  }), [colors]);

  // Form state
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventInstructions, setEventInstructions] = useState('');
  const [needUtensils, setNeedUtensils] = useState(false);
  const [repeatEvent, setRepeatEvent] = useState('Nunca');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notificationAlert, setNotificationAlert] = useState('2 horas antes');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta crédito/débito');
  const [tipPercentage, setTipPercentage] = useState(10);
  const [dishes, setDishes] = useState([{ name: '' }]);
  const [events, setEvents] = useState<any[]>([]);
  const [visibleMonth, setVisibleMonth] = useState(moment().format('YYYY-MM'));

  // Picker visibility
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isNotificationPickerVisible, setNotificationPickerVisible] = useState(false);
  const [isPaymentMethodPickerVisible, setPaymentMethodPickerVisible] = useState(false);
  const [showRepeatEventPicker, setShowRepeatEventPicker] = useState(false);
  const [isTipPickerVisible, setTipPickerVisible] = useState(false);

  // Folder state
  const [folders, setFolders] = useState<Folder[]>([]);
  const [expandedFolderIds, setExpandedFolderIds] = useState<Set<string>>(new Set());
  const [showFolderSheet, setShowFolderSheet] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderEmoji, setNewFolderEmoji] = useState('📁');
  const [eventFolderId, setEventFolderId] = useState<string | null>(null);
  const [showFolderPicker, setShowFolderPicker] = useState(false);

  const handleSaveEvent = () => {
    setEvents([...events, {
      selectedDate, eventName, eventLocation, needUtensils,
      repeatEvent, deliveryTime, notificationAlert,
      paymentMethod, tipPercentage, dishes,
      folderId: eventFolderId,
    }]);
    clearForm();
  };

  const clearForm = () => {
    setSelectedDate(''); setEventName(''); setEventLocation('');
    setNeedUtensils(false); setRepeatEvent('Nunca'); setDeliveryTime('');
    setNotificationAlert('2 horas antes'); setPaymentMethod('Tarjeta crédito/débito');
    setTipPercentage(10); setDishes([{ name: '' }]); setShowCreateEvent(false);
    setEventFolderId(null); setShowFolderPicker(false);
  };

  const handleTimeConfirm = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    setDeliveryTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`);
    setTimePickerVisible(false);
  };

  const handleAddDish = () => setDishes([...dishes, { name: '' }]);

  const handleRemoveDish = (index: number) => {
    const updated = [...dishes]; updated.splice(index, 1); setDishes(updated);
  };

  const handleDishNameChange = (text: string, index: number) => {
    const updated = [...dishes]; updated[index].name = text; setDishes(updated);
  };

  const handleDeleteEvent = (index: number) => {
    Alert.alert('Eliminar Evento', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        const updated = [...events]; updated.splice(index, 1); setEvents(updated);
      }},
    ]);
  };

  const handleEditEvent = (index: number) => {
    const e = events[index];
    setSelectedDate(e.selectedDate); setEventName(e.eventName);
    setEventLocation(e.eventLocation); setNeedUtensils(e.needUtensils);
    setRepeatEvent(e.repeatEvent); setDeliveryTime(e.deliveryTime);
    setNotificationAlert(e.notificationAlert); setPaymentMethod(e.paymentMethod);
    setTipPercentage(e.tipPercentage); setDishes(e.dishes);
    setEventFolderId(e.folderId ?? null);
    setShowCreateEvent(true);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    setFolders([...folders, { id: Date.now().toString(), name: newFolderName.trim(), emoji: newFolderEmoji }]);
    setNewFolderName('');
    setNewFolderEmoji('📁');
    setShowFolderSheet(false);
  };

  const handleDeleteFolder = (id: string) => {
    Alert.alert('Eliminar carpeta', 'Los menús dentro quedarán sin carpeta. ¿Continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        setFolders(folders.filter(f => f.id !== id));
        setEvents(events.map(e => e.folderId === id ? { ...e, folderId: null } : e));
      }},
    ]);
  };

  const toggleFolder = (id: string) => {
    setExpandedFolderIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const calculateTip = () => ((dishes.length * 10 + 5) * (tipPercentage / 100)).toFixed(2);
  const calculateTotal = () => (dishes.length * 10 + 5 + parseFloat(calculateTip())).toFixed(2);

  const markedDates = useMemo(() => {
    const acc: Record<string, { marked: boolean; dotColor: string }> = {};
    const monthStart = moment(visibleMonth + '-01');
    const monthEnd = monthStart.clone().endOf('month');

    events.forEach((e: any) => {
      const eventStart = moment(e.selectedDate);
      if (!e.repeatEvent || e.repeatEvent === 'Nunca') {
        acc[e.selectedDate] = { marked: true, dotColor: colors.primary };
      } else if (e.repeatEvent === 'Siempre') {
        const cur = moment.max(eventStart, monthStart).clone();
        while (cur.isSameOrBefore(monthEnd)) {
          acc[cur.format('YYYY-MM-DD')] = { marked: true, dotColor: colors.primary };
          cur.add(1, 'day');
        }
      } else if (WEEKDAY_MAP[e.repeatEvent] !== undefined) {
        const targetDay = WEEKDAY_MAP[e.repeatEvent];
        const cur = moment.max(eventStart, monthStart).clone();
        const daysUntilTarget = (targetDay - cur.day() + 7) % 7;
        cur.add(daysUntilTarget, 'days');
        while (cur.isSameOrBefore(monthEnd)) {
          acc[cur.format('YYYY-MM-DD')] = { marked: true, dotColor: colors.primary };
          cur.add(7, 'days');
        }
      }
    });

    return acc;
  }, [events, visibleMonth, colors.primary]);

  const selectedFolderLabel = eventFolderId
    ? (() => { const f = folders.find(x => x.id === eventFolderId); return f ? `${f.emoji} ${f.name}` : 'Sin carpeta'; })()
    : 'Sin carpeta';

  const renderEventCard = (event: any, globalIdx: number) => (
    <View key={globalIdx} style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.eventDateBadge}>
          <Icon name="calendar-outline" size={14} color={colors.primary} />
          <Text style={styles.eventDate}>{moment(event.selectedDate).format('DD MMM, YYYY')}</Text>
        </View>
        <View style={styles.eventActions}>
          <TouchableOpacity style={styles.eventActionBtn} onPress={() => handleEditEvent(globalIdx)}>
            <Icon name="create-outline" size={16} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.eventActionBtn, styles.eventDeleteBtn]} onPress={() => handleDeleteEvent(globalIdx)}>
            <Icon name="trash-outline" size={16} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.eventName}>{event.eventName || 'Sin nombre'}</Text>
      <Text style={styles.eventDetail}>🍽️ {event.dishes.map((d: any) => d.name || 'Producto').join(', ')}</Text>
      {event.deliveryTime ? <Text style={styles.eventDetail}>🕐 {event.deliveryTime}</Text> : null}
      <View style={styles.eventFooter}>
        <Text style={styles.eventTotal}>Total: ${calculateTotal()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <View style={styles.pageHeader}>
        <View>
          <Text style={styles.pageTitle}>Mi Menú</Text>
          <Text style={styles.pageSubtitle}>Programa tus pedidos</Text>
        </View>
        {selectedDate && !showCreateEvent && (
          <TouchableOpacity style={styles.newEventBtn} onPress={() => setShowCreateEvent(true)}>
            <Icon name="add" size={18} color={colors.white} />
            <Text style={styles.newEventBtnText}>Nuevo</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <Calendar
            key={isDark ? 'dark' : 'light'}
            current={selectedDate}
            style={{ borderRadius: radius.lg }}
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
              setShowCreateEvent(true);
            }}
            onMonthChange={(month: any) => setVisibleMonth(month.dateString.slice(0, 7))}
            markedDates={{
              ...markedDates,
              ...(selectedDate ? { [selectedDate]: { selected: true, selectedColor: colors.primary, marked: !!markedDates[selectedDate] } } : {}),
            }}
            theme={calendarTheme}
          />
        </View>

        {/* Folders section */}
        <View style={styles.foldersSection}>
          <View style={styles.foldersSectionHeader}>
            <Text style={styles.foldersSectionTitle}>Carpetas</Text>
            <TouchableOpacity style={styles.addFolderBtn} onPress={() => setShowFolderSheet(true)} activeOpacity={0.8}>
              <Icon name="add" size={16} color={colors.primary} />
              <Text style={styles.addFolderBtnText}>Nueva</Text>
            </TouchableOpacity>
          </View>

          {folders.length === 0 ? (
            <TouchableOpacity style={styles.createFolderCta} onPress={() => setShowFolderSheet(true)} activeOpacity={0.8}>
              <Icon name="folder-open-outline" size={22} color={colors.primary} />
              <Text style={styles.createFolderCtaText}>Organiza tus menús en carpetas</Text>
              <Icon name="chevron-forward" size={16} color={colors.gray400} />
            </TouchableOpacity>
          ) : (
            folders.map(folder => {
              const folderEvents = events.filter(e => e.folderId === folder.id);
              const isExpanded = expandedFolderIds.has(folder.id);
              return (
                <View key={folder.id} style={styles.folderCard}>
                  <TouchableOpacity style={styles.folderHeader} onPress={() => toggleFolder(folder.id)} activeOpacity={0.8}>
                    <Text style={styles.folderEmoji}>{folder.emoji}</Text>
                    <View style={styles.folderInfo}>
                      <Text style={styles.folderName}>{folder.name}</Text>
                      <Text style={styles.folderCount}>
                        {folderEvents.length} {folderEvents.length === 1 ? 'menú' : 'menús'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.folderDeleteBtn}
                      onPress={() => handleDeleteFolder(folder.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Icon name="trash-outline" size={16} color={colors.danger} />
                    </TouchableOpacity>
                    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.gray400} />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.folderContent}>
                      {folderEvents.length === 0 ? (
                        <Text style={styles.folderEmptyText}>Esta carpeta está vacía</Text>
                      ) : (
                        folderEvents.map(event => renderEventCard(event, events.indexOf(event)))
                      )}
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>

        {/* Standalone events (not in any folder) */}
        {events.filter(e => !e.folderId).map(event => renderEventCard(event, events.indexOf(event)))}

        {/* Create event form */}
        {showCreateEvent && (
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                {selectedDate ? moment(selectedDate).format('DD [de] MMMM') : 'Nuevo evento'}
              </Text>
              <TouchableOpacity onPress={() => setShowCreateEvent(false)}>
                <Icon name="close-circle-outline" size={24} color={colors.gray400} />
              </TouchableOpacity>
            </View>

            {/* Menu name */}
            <View style={styles.formSection}>
              <Text style={styles.formSectionTitle}>Nombre del menú</Text>
              <View style={styles.inputWrapper}>
                <Icon name="pencil-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Comida del martes, Menú semanal..."
                  placeholderTextColor={colors.textLight}
                  value={eventName}
                  onChangeText={setEventName}
                />
              </View>
            </View>

            {/* Dishes */}
            <View style={styles.formSection}>
              <Text style={styles.formSectionTitle}>Productos</Text>
              {dishes.map((dish, i) => (
                <View key={i} style={styles.dishRow}>
                  <View style={styles.dishInputWrapper}>
                    <Icon name="restaurant-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
                    <TextInput
                      style={styles.dishInput}
                      placeholder={`Producto ${i + 1}`}
                      placeholderTextColor={colors.textLight}
                      value={dish.name}
                      onChangeText={(t) => handleDishNameChange(t, i)}
                    />
                  </View>
                  {dishes.length > 1 && (
                    <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveDish(i)}>
                      <Icon name="remove-circle-outline" size={22} color={colors.danger} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.addDishBtn} onPress={handleAddDish}>
                <Icon name="add-circle-outline" size={18} color={colors.primary} />
                <Text style={styles.addDishText}>Agregar producto</Text>
              </TouchableOpacity>
            </View>

            {/* Address */}
            <View style={styles.formSection}>
              <Text style={styles.formSectionTitle}>Dirección de entrega</Text>
              <View style={styles.inputWrapper}>
                <Icon name="location-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Dirección"
                  placeholderTextColor={colors.textLight}
                  value={eventLocation}
                  onChangeText={setEventLocation}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="document-text-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Instrucciones (opcional)"
                  placeholderTextColor={colors.textLight}
                  value={eventInstructions}
                  onChangeText={setEventInstructions}
                />
              </View>
            </View>

            {/* Delivery time */}
            <View style={styles.formSection}>
              <Text style={styles.formSectionTitle}>Hora de entrega</Text>
              <TouchableOpacity style={styles.pickerRow} onPress={() => setTimePickerVisible(true)}>
                <Icon name="time-outline" size={16} color={colors.gray400} />
                <Text style={[styles.pickerValue, !deliveryTime && styles.pickerPlaceholder]}>
                  {deliveryTime || 'Seleccionar hora'}
                </Text>
                <Icon name="chevron-forward" size={16} color={colors.gray400} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={() => setTimePickerVisible(false)}
              />
            </View>

            {/* Options */}
            <View style={styles.formSection}>
              <View style={styles.switchRow}>
                <View style={styles.switchLeft}>
                  <Icon name="restaurant-outline" size={16} color={colors.textSecondary} />
                  <Text style={styles.switchLabel}>¿Necesitas cubiertos?</Text>
                </View>
                <Switch
                  value={needUtensils}
                  onValueChange={setNeedUtensils}
                  trackColor={{ false: colors.gray200, true: colors.primaryLight }}
                  thumbColor={needUtensils ? colors.primary : colors.white}
                />
              </View>
            </View>

            {/* Configuration pickers */}
            <View style={styles.formSection}>
              <Text style={styles.formSectionTitle}>Configuración</Text>

              <TouchableOpacity style={styles.pickerRow} onPress={() => setNotificationPickerVisible(true)}>
                <Icon name="notifications-outline" size={16} color={colors.gray400} />
                <Text style={styles.pickerValue}>Recordatorio: {notificationAlert}</Text>
                <Icon name="chevron-forward" size={16} color={colors.gray400} />
              </TouchableOpacity>
              {isNotificationPickerVisible && (
                <Picker selectedValue={notificationAlert} onValueChange={(v) => { setNotificationAlert(v); setNotificationPickerVisible(false); }}>
                  {['1 día antes', '12 horas antes', '5 horas antes', '3 horas antes', '2 horas antes', '1 hora antes'].map(v => (
                    <Picker.Item key={v} label={v} value={v} />
                  ))}
                </Picker>
              )}

              <TouchableOpacity style={styles.pickerRow} onPress={() => setPaymentMethodPickerVisible(true)}>
                <Icon name="card-outline" size={16} color={colors.gray400} />
                <Text style={styles.pickerValue}>Pago: {paymentMethod}</Text>
                <Icon name="chevron-forward" size={16} color={colors.gray400} />
              </TouchableOpacity>
              {isPaymentMethodPickerVisible && (
                <Picker selectedValue={paymentMethod} onValueChange={(v) => { setPaymentMethod(v); setPaymentMethodPickerVisible(false); }}>
                  {['Tarjeta crédito/débito', 'PayPal', 'Efectivo'].map(v => (
                    <Picker.Item key={v} label={v} value={v} />
                  ))}
                </Picker>
              )}

              <TouchableOpacity style={styles.pickerRow} onPress={() => setShowRepeatEventPicker(true)}>
                <Icon name="repeat-outline" size={16} color={colors.gray400} />
                <Text style={styles.pickerValue}>Repetir: {repeatEvent}</Text>
                <Icon name="chevron-forward" size={16} color={colors.gray400} />
              </TouchableOpacity>
              {showRepeatEventPicker && (
                <Picker selectedValue={repeatEvent} onValueChange={(v) => { setRepeatEvent(v); setShowRepeatEventPicker(false); }}>
                  {['Nunca', 'Siempre', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(v => (
                    <Picker.Item key={v} label={v} value={v} />
                  ))}
                </Picker>
              )}

              <TouchableOpacity style={styles.pickerRow} onPress={() => setTipPickerVisible(true)}>
                <Icon name="gift-outline" size={16} color={colors.gray400} />
                <Text style={styles.pickerValue}>Propina: {tipPercentage}%</Text>
                <Icon name="chevron-forward" size={16} color={colors.gray400} />
              </TouchableOpacity>
              {isTipPickerVisible && (
                <Picker selectedValue={tipPercentage} onValueChange={(v) => { setTipPercentage(v); setTipPickerVisible(false); }}>
                  {[0, 5, 10, 15, 20].map(v => <Picker.Item key={v} label={`${v}%`} value={v} />)}
                </Picker>
              )}

              {/* Folder picker */}
              <TouchableOpacity style={styles.pickerRow} onPress={() => setShowFolderPicker(!showFolderPicker)}>
                <Icon name="folder-open-outline" size={16} color={colors.gray400} />
                <Text style={styles.pickerValue}>Carpeta: {selectedFolderLabel}</Text>
                <Icon name={showFolderPicker ? 'chevron-up' : 'chevron-down'} size={16} color={colors.gray400} />
              </TouchableOpacity>
              {showFolderPicker && (
                <View style={styles.folderDropdown}>
                  <TouchableOpacity
                    style={styles.folderDropdownItem}
                    onPress={() => { setEventFolderId(null); setShowFolderPicker(false); }}
                  >
                    <Icon name="close-circle-outline" size={16} color={colors.gray400} />
                    <Text style={styles.folderDropdownItemText}>Sin carpeta</Text>
                    {!eventFolderId && <Icon name="checkmark" size={16} color={colors.primary} />}
                  </TouchableOpacity>
                  {folders.map(f => (
                    <TouchableOpacity
                      key={f.id}
                      style={styles.folderDropdownItem}
                      onPress={() => { setEventFolderId(f.id); setShowFolderPicker(false); }}
                    >
                      <Text style={styles.folderDropdownEmoji}>{f.emoji}</Text>
                      <Text style={styles.folderDropdownItemText}>{f.name}</Text>
                      {eventFolderId === f.id && <Icon name="checkmark" size={16} color={colors.primary} />}
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={[styles.folderDropdownItem, styles.folderDropdownNew]}
                    onPress={() => { setShowFolderPicker(false); setShowFolderSheet(true); }}
                  >
                    <Icon name="add-circle-outline" size={16} color={colors.primary} />
                    <Text style={[styles.folderDropdownItemText, { color: colors.primary }]}>Nueva carpeta</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Summary */}
            <View style={styles.summaryBox}>
              <Text style={styles.formSectionTitle}>Resumen de pago</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Productos</Text>
                <Text style={styles.summaryValue}>${(dishes.length * 10).toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío</Text>
                <Text style={styles.summaryValue}>$5.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Propina ({tipPercentage}%)</Text>
                <Text style={styles.summaryValue}>${calculateTip()}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryTotalValue}>${calculateTotal()}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
              <Icon name="checkmark-circle-outline" size={20} color={colors.white} />
              <Text style={styles.saveButtonText}>Guardar evento</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showCreateEvent && events.length === 0 && folders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>Sin eventos programados</Text>
            <Text style={styles.emptySubtitle}>Selecciona un día en el calendario para crear tu menú personalizado</Text>
          </View>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Folder creation sheet */}
      {showFolderSheet && (
        <>
          <Animated.View
            entering={SlideInDown.duration(320).springify()}
            exiting={SlideOutDown.duration(280)}
            style={styles.sheet}
          >
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Nueva carpeta</Text>
              <TouchableOpacity onPress={() => setShowFolderSheet(false)}>
                <Icon name="close" size={22} color={colors.gray500} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.formSectionTitle, { marginBottom: spacing.sm }]}>Icono</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.emojiRow}
              contentContainerStyle={{ paddingHorizontal: 2, gap: spacing.sm }}
            >
              {FOLDER_EMOJIS.map(emoji => (
                <TouchableOpacity
                  key={emoji}
                  style={[styles.emojiBtn, newFolderEmoji === emoji && styles.emojiBtnActive]}
                  onPress={() => setNewFolderEmoji(emoji)}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={[styles.inputWrapper, { marginTop: spacing.md }]}>
              <Icon name="folder-open-outline" size={16} color={colors.gray400} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre de la carpeta"
                placeholderTextColor={colors.textLight}
                value={newFolderName}
                onChangeText={setNewFolderName}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleCreateFolder}
              />
            </View>

            <TouchableOpacity style={[styles.saveButton, { marginTop: spacing.md }]} onPress={handleCreateFolder} activeOpacity={0.85}>
              <Icon name="folder-open-outline" size={18} color={colors.white} />
              <Text style={styles.saveButtonText}>Crear carpeta</Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.backdrop} onPress={() => setShowFolderSheet(false)} activeOpacity={1} />
        </>
      )}
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  pageHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm,
    backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  pageTitle: { ...typography.h2 },
  pageSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  newEventBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.primary, borderRadius: radius.full,
    paddingHorizontal: spacing.md, paddingVertical: 8,
  },
  newEventBtnText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  scroll: { padding: spacing.md },
  calendarCard: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md,
  },

  // Folders
  foldersSection: { marginBottom: spacing.md },
  foldersSectionHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  foldersSectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  addFolderBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    borderWidth: 1.5, borderColor: colors.primary,
    borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 5,
  },
  addFolderBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  createFolderCta: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.primaryLight, borderRadius: radius.lg,
    borderWidth: 1.5, borderColor: colors.primary, borderStyle: 'dashed',
    padding: spacing.md,
  },
  createFolderCtaText: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.primary },
  folderCard: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm,
    overflow: 'hidden', ...shadows.sm,
  },
  folderHeader: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    padding: spacing.md,
  },
  folderEmoji: { fontSize: 26, lineHeight: 32 },
  folderInfo: { flex: 1 },
  folderName: { fontSize: 15, fontWeight: '700', color: colors.text },
  folderCount: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  folderDeleteBtn: {
    width: 32, height: 32, borderRadius: radius.sm,
    backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center',
  },
  folderContent: {
    borderTopWidth: 1, borderTopColor: colors.borderLight,
    padding: spacing.sm,
  },
  folderEmptyText: {
    textAlign: 'center', fontSize: 13, color: colors.textLight,
    paddingVertical: spacing.md,
  },

  // Folder dropdown (inside form)
  folderDropdown: {
    backgroundColor: colors.card, borderWidth: 1, borderTopWidth: 0,
    borderColor: colors.border,
    borderBottomLeftRadius: radius.sm, borderBottomRightRadius: radius.sm,
  },
  folderDropdownItem: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  folderDropdownEmoji: { fontSize: 16 },
  folderDropdownItemText: { flex: 1, fontSize: 14, color: colors.text },
  folderDropdownNew: { borderBottomWidth: 0 },

  // Event cards
  eventCard: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    padding: spacing.md, marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  eventHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  eventDateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.primaryLight, borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  eventDate: { fontSize: 12, fontWeight: '600', color: colors.primary },
  eventActions: { flexDirection: 'row', gap: spacing.sm },
  eventActionBtn: {
    width: 32, height: 32, borderRadius: radius.sm,
    backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  eventDeleteBtn: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  eventName: { ...typography.h4, marginBottom: spacing.xs },
  eventDetail: { fontSize: 13, color: colors.textSecondary, marginBottom: 3 },
  eventFooter: {
    marginTop: spacing.sm, paddingTop: spacing.sm,
    borderTopWidth: 1, borderTopColor: colors.borderLight,
  },
  eventTotal: { fontSize: 14, fontWeight: '700', color: colors.primary },

  // Form
  formCard: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.md, overflow: 'hidden', ...shadows.sm,
  },
  formHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  formTitle: { ...typography.h3 },
  formSection: {
    padding: spacing.md, borderBottomWidth: 1,
    borderBottomColor: colors.borderLight, gap: spacing.sm,
  },
  formSectionTitle: { ...typography.h4, marginBottom: spacing.xs },
  dishRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dishInputWrapper: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.sm, height: 44,
  },
  inputIcon: { marginRight: spacing.xs },
  dishInput: { flex: 1, fontSize: 14, color: colors.text },
  removeBtn: { padding: 4 },
  addDishBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  addDishText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.sm, height: 44,
  },
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
  summaryBox: {
    padding: spacing.md, backgroundColor: colors.surface,
    margin: spacing.md, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, gap: 4,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  summaryLabel: { fontSize: 13, color: colors.textSecondary },
  summaryValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  summaryTotal: { fontSize: 15, fontWeight: '700', color: colors.text },
  summaryTotalValue: { fontSize: 16, fontWeight: '700', color: colors.primary },
  saveButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, margin: spacing.md, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 14, ...shadows.md,
  },
  saveButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm },
  emptyEmoji: { fontSize: 52 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.gray500 },
  emptySubtitle: {
    fontSize: 14, color: colors.textLight, textAlign: 'center',
    paddingHorizontal: spacing.xl, lineHeight: 20,
  },

  // Folder creation sheet
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    padding: spacing.md, paddingBottom: 36,
    zIndex: 10, ...shadows.lg,
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
  emojiRow: { flexDirection: 'row', marginBottom: spacing.xs },
  emojiBtn: {
    width: 44, height: 44, borderRadius: radius.md,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  emojiBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  emojiText: { fontSize: 22 },
});

export default MenuView;
