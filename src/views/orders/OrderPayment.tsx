import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Switch, SafeAreaView, StatusBar,
} from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, typography, AppColors } from '../../theme';
import { useApp, Address } from '../../context/AppContext';

const PAYMENT_METHODS = [
  { id: 'card',        label: 'Tarjeta de crédito/débito', icon: 'card-outline',   sub: '**** **** **** 1234' },
  { id: 'mercadopago', label: 'Mercado Pago',               icon: 'wallet-outline', sub: 'Paga con tu cuenta MP' },
  { id: 'cash',        label: 'Efectivo',                   icon: 'cash-outline',   sub: 'Paga al momento de la entrega' },
];

const TIP_OPTIONS = [0, 5, 10, 15, 20];

const TYPE_ICONS: Record<string, { icon: string; bg: string; color: string }> = {
  Casa:    { icon: 'home',      bg: '#EBF3FF', color: '#3B82F6' },
  Trabajo: { icon: 'briefcase', bg: '#F0FDF4', color: '#22C55E' },
  Otro:    { icon: 'location',  bg: '#FEF3C7', color: '#D97706' },
};

const OrderPayment = ({ navigation, route }: { navigation: any; route: any }) => {
  const { colors, isDark, addresses, defaultAddressId, clearCart } = useApp();
  const { item, quantity = 1, subtotal: cartSubtotal = 0 } = route?.params ?? {};

  // Address for this order — starts from the user's default, falls back to first saved
  const getInitialAddress = () =>
    addresses.find(a => a.id === defaultAddressId) ?? addresses[0] ?? null;

  const [orderAddress, setOrderAddress] = useState<Address | null>(getInitialAddress);
  const [notes, setNotes] = useState('');
  const [changeSheetVisible, setChangeSheetVisible] = useState(false);
  const [sheetSelectedId, setSheetSelectedId] = useState<string | null>(orderAddress?.id ?? null);

  const [needUtensils, setNeedUtensils] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<'normal' | 'prioritaria'>('normal');
  const [selectedTip, setSelectedTip] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const productPrice = cartSubtotal;
  const deliveryCost = deliveryOption === 'prioritaria' ? 20 : 10;
  const tipAmount = productPrice * (TIP_OPTIONS[selectedTip] / 100);
  const total = productPrice + deliveryCost + tipAmount;

  const openChangeSheet = () => {
    setSheetSelectedId(orderAddress?.id ?? null);
    setChangeSheetVisible(true);
  };

  const confirmAddressChange = () => {
    const chosen = addresses.find(a => a.id === sheetSelectedId) ?? null;
    setOrderAddress(chosen);
    setChangeSheetVisible(false);
  };

  const typeConfig = (type: string) => TYPE_ICONS[type] ?? TYPE_ICONS['Otro'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Delivery address */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Dirección de entrega</Text>
            <TouchableOpacity style={styles.changeBtn} onPress={openChangeSheet} activeOpacity={0.75}>
              <Icon name="swap-horizontal-outline" size={14} color={colors.primary} />
              <Text style={styles.changeBtnText}>Cambiar</Text>
            </TouchableOpacity>
          </View>

          {orderAddress ? (
            <View style={styles.addressCard}>
              <View style={[styles.addrIconBox, { backgroundColor: typeConfig(orderAddress.type).bg }]}>
                <Icon name={typeConfig(orderAddress.type).icon} size={20} color={typeConfig(orderAddress.type).color} />
              </View>
              <View style={styles.addrInfo}>
                <Text style={styles.addrType}>{orderAddress.type}</Text>
                <Text style={styles.addrText}>{orderAddress.address}</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.noAddressBtn} onPress={openChangeSheet} activeOpacity={0.8}>
              <Icon name="location-outline" size={18} color={colors.gray400} />
              <Text style={styles.noAddressText}>Sin dirección — toca para agregar</Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputWrapper}>
            <Icon name="document-text-outline" size={18} color={colors.gray400} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Instrucciones (puerta, piso, etc.)"
              placeholderTextColor={colors.textLight}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* Order details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del pedido</Text>
          <View style={styles.orderRow}>
            <View style={styles.orderImageBox}>
              <Text style={styles.orderEmoji}>🍽️</Text>
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderName}>{item?.dish ?? 'Platillo'}</Text>
              <Text style={styles.orderQty}>Por {item?.person ?? 'Chef'} · x{quantity}</Text>
            </View>
            <Text style={styles.orderPrice}>${productPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.utensilsRow}>
            <View style={styles.utensilsLeft}>
              <Icon name="restaurant-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.utensilsText}>¿Necesitas cubiertos?</Text>
            </View>
            <Switch
              value={needUtensils}
              onValueChange={setNeedUtensils}
              trackColor={{ false: colors.gray200, true: colors.primaryLight }}
              thumbColor={needUtensils ? colors.primary : colors.white}
            />
          </View>
        </View>

        {/* Delivery options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiempo de entrega</Text>
          {(['normal', 'prioritaria'] as const).map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.deliveryOption, deliveryOption === opt && styles.deliveryOptionActive]}
              onPress={() => setDeliveryOption(opt)}
            >
              <View style={[styles.radioCircle, deliveryOption === opt && styles.radioCircleActive]}>
                {deliveryOption === opt && <View style={styles.radioDot} />}
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryLabel}>
                  {opt === 'normal' ? 'Entrega estándar' : 'Entrega prioritaria'}
                </Text>
                <Text style={styles.deliverySub}>
                  {opt === 'normal' ? '25-40 min • $10' : '15-25 min • $20'}
                </Text>
              </View>
              {opt === 'prioritaria' && (
                <View style={styles.fastBadge}>
                  <Text style={styles.fastBadgeText}>Rápido</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tip */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propina para tu repartidor</Text>
          <View style={styles.tipRow}>
            {TIP_OPTIONS.map((pct, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.tipBtn, selectedTip === i && styles.tipBtnActive]}
                onPress={() => setSelectedTip(i)}
              >
                <Text style={[styles.tipBtnText, selectedTip === i && styles.tipBtnTextActive]}>
                  {pct}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedTip > 0 && (
            <Text style={styles.tipAmount}>Propina: ${tipAmount.toFixed(2)}</Text>
          )}
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de pago</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.paymentOption, paymentMethod === method.id && styles.paymentOptionActive]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <Icon name={method.icon} size={22} color={paymentMethod === method.id ? colors.primary : colors.gray500} />
              <View style={styles.paymentInfo}>
                <Text style={[styles.paymentLabel, paymentMethod === method.id && styles.paymentLabelActive]}>
                  {method.label}
                </Text>
                <Text style={styles.paymentSub}>{method.sub}</Text>
              </View>
              {paymentMethod === method.id && (
                <Icon name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumen de pago</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Productos</Text>
            <Text style={styles.summaryValue}>${productPrice}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>${deliveryCost}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Propina ({TIP_OPTIONS[selectedTip]}%)</Text>
            <Text style={styles.summaryValue}>${tipAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm CTA */}
      <SafeAreaView style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => { clearCart(); navigation.navigate('OrderStatus', {
            item,
            quantity,
            subtotal: productPrice,
            deliveryCost,
            tipAmount,
            tipPercent: TIP_OPTIONS[selectedTip],
            total,
            paymentMethod: PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label ?? paymentMethod,
            deliveryOption,
            deliveryAddress: orderAddress?.address ?? '',
            deliveryAddressType: orderAddress?.type ?? '',
            deliveryNotes: notes,
          }); }}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Realizar pago</Text>
          <View style={styles.confirmAmount}>
            <Text style={styles.confirmAmountText}>${total.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Change address sheet */}
      {changeSheetVisible && (
        <TouchableOpacity style={styles.backdrop} onPress={() => setChangeSheetVisible(false)} activeOpacity={1} />
      )}
      {changeSheetVisible && (
        <Animated.View
          entering={SlideInDown.duration(320).springify()}
          exiting={SlideOutDown.duration(280)}
          style={styles.sheet}
        >
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Cambiar dirección</Text>
            <TouchableOpacity onPress={() => setChangeSheetVisible(false)}>
              <Icon name="close" size={22} color={colors.gray500} />
            </TouchableOpacity>
          </View>

          {addresses.length === 0 ? (
            <View style={styles.sheetEmpty}>
              <Icon name="location-outline" size={36} color={colors.gray300} />
              <Text style={styles.sheetEmptyText}>No tienes direcciones guardadas.</Text>
              <Text style={styles.sheetEmptyText}>Agrégalas en Mis Direcciones.</Text>
            </View>
          ) : (
            addresses.map((addr) => {
              const cfg = typeConfig(addr.type);
              const selected = addr.id === sheetSelectedId;
              return (
                <TouchableOpacity
                  key={addr.id}
                  style={[styles.sheetAddrRow, selected && styles.sheetAddrRowActive]}
                  onPress={() => setSheetSelectedId(addr.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.sheetAddrIcon, { backgroundColor: cfg.bg }]}>
                    <Icon name={cfg.icon} size={18} color={cfg.color} />
                  </View>
                  <View style={styles.sheetAddrInfo}>
                    <Text style={styles.sheetAddrType}>{addr.type}</Text>
                    <Text style={styles.sheetAddrText} numberOfLines={2}>{addr.address}</Text>
                  </View>
                  <View style={[styles.radioCircle, selected && styles.radioCircleActive]}>
                    {selected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          {addresses.length > 0 && (
            <TouchableOpacity style={styles.confirmAddrBtn} onPress={confirmAddressChange} activeOpacity={0.85}>
              <Text style={styles.confirmAddrBtnText}>Confirmar dirección</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, gap: spacing.md },

  section: {
    backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, gap: spacing.sm, ...shadows.sm,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...typography.h4, marginBottom: spacing.xs },
  changeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.primaryLight, borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: colors.primary,
  },
  changeBtnText: { fontSize: 12, fontWeight: '700', color: colors.primary },

  addressCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  addrIconBox: {
    width: 40, height: 40, borderRadius: radius.sm,
    justifyContent: 'center', alignItems: 'center',
  },
  addrInfo: { flex: 1 },
  addrType: { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 2 },
  addrText: { fontSize: 14, color: colors.text, lineHeight: 20 },

  noAddressBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, borderWidth: 1.5, borderColor: colors.border, borderStyle: 'dashed',
  },
  noAddressText: { fontSize: 14, color: colors.textSecondary },

  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.sm, height: 46,
  },
  inputIcon: { marginRight: spacing.sm },
  input: { flex: 1, fontSize: 14, color: colors.text },

  orderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  orderImageBox: { width: 52, height: 52, borderRadius: radius.sm, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  orderEmoji: { fontSize: 24 },
  orderInfo: { flex: 1 },
  orderName: { ...typography.h4, marginBottom: 2 },
  orderQty: { ...typography.bodySmall },
  orderPrice: { fontSize: 16, fontWeight: '700', color: colors.primary },
  utensilsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.xs },
  utensilsLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  utensilsText: { fontSize: 14, fontWeight: '500', color: colors.text },

  deliveryOption: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.md, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card,
  },
  deliveryOptionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  radioCircle: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: colors.gray300, justifyContent: 'center', alignItems: 'center',
  },
  radioCircleActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  deliveryInfo: { flex: 1 },
  deliveryLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 2 },
  deliverySub: { fontSize: 12, color: colors.textSecondary },
  fastBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.full },
  fastBadgeText: { fontSize: 11, fontWeight: '700', color: '#92400E' },

  tipRow: { flexDirection: 'row', gap: spacing.sm },
  tipBtn: { flex: 1, paddingVertical: 10, borderRadius: radius.sm, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center' },
  tipBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tipBtnText: { fontSize: 13, fontWeight: '700', color: colors.gray500 },
  tipBtnTextActive: { color: colors.white },
  tipAmount: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' },

  paymentOption: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border },
  paymentOptionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  paymentInfo: { flex: 1 },
  paymentLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 2 },
  paymentLabelActive: { color: colors.primary },
  paymentSub: { fontSize: 12, color: colors.textSecondary },

  summaryCard: { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.xs, ...shadows.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.xs },
  totalLabel: { fontSize: 16, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: 18, fontWeight: '700', color: colors.primary },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  confirmButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.success, borderRadius: radius.md,
    paddingVertical: 15, paddingHorizontal: spacing.lg, ...shadows.md,
  },
  confirmButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  confirmAmount: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.sm, paddingHorizontal: 10, paddingVertical: 4 },
  confirmAmountText: { color: colors.white, fontSize: 14, fontWeight: '700' },

  // Change address sheet
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 9 },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    padding: spacing.md, paddingBottom: 36, zIndex: 10, ...shadows.lg,
  },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.gray300, alignSelf: 'center', marginBottom: spacing.md },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  sheetEmpty: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm },
  sheetEmptyText: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  sheetAddrRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface,
  },
  sheetAddrRowActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  sheetAddrIcon: { width: 38, height: 38, borderRadius: radius.sm, justifyContent: 'center', alignItems: 'center' },
  sheetAddrInfo: { flex: 1 },
  sheetAddrType: { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 2 },
  sheetAddrText: { fontSize: 13, color: colors.text, lineHeight: 18 },
  confirmAddrBtn: {
    backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 14,
    alignItems: 'center', marginTop: spacing.sm, ...shadows.md,
  },
  confirmAddrBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});

export default OrderPayment;
