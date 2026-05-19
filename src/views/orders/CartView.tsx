import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, typography, AppColors } from '../../theme';
import { useApp, CartItem } from '../../context/AppContext';
import { getDishImage } from '../../utils/images';

const SIDES = [
  { id: 1, title: 'Ensalada', emoji: '🥗' },
  { id: 2, title: 'Refresco', emoji: '🥤' },
  { id: 3, title: 'Pan', emoji: '🍞' },
  { id: 4, title: 'Jugo', emoji: '🍊' },
  { id: 5, title: 'Postre', emoji: '🍰' },
  { id: 6, title: 'Sopa', emoji: '🍜' },
  { id: 7, title: 'Fruta', emoji: '🍓' },
  { id: 8, title: 'Café', emoji: '☕' },
];

const CartItemRow = ({
  cartItem,
  onUpdateQty,
  onRemove,
  styles,
  colors,
}: {
  cartItem: CartItem;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  styles: any;
  colors: AppColors;
}) => {
  const { item, quantity } = cartItem;
  const unitPrice = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');

  return (
    <View style={styles.card}>
      <Image source={{ uri: getDishImage(item.dish) }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>{item.dish}</Text>
        <Text style={styles.itemChef}>Por {item.person}</Text>
        <Text style={styles.itemUnitPrice}>${(unitPrice * quantity).toFixed(0)} total</Text>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeBtn}>
          <Icon name="trash-outline" size={15} color="#EF4444" />
        </TouchableOpacity>
        <View style={styles.qtyControl}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => quantity > 1 ? onUpdateQty(item.id, quantity - 1) : onRemove(item.id)}
          >
            <Icon name="remove" size={14} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onUpdateQty(item.id, quantity + 1)}>
            <Icon name="add" size={14} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CartView = () => {
  const { colors, isDark, cartItems, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const navigation = useNavigation<any>();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const subtotal = cartItems.reduce((sum, ci) => {
    const price = parseFloat(ci.item.price?.replace(/[^0-9.]/g, '') || '0');
    return sum + price * ci.quantity;
  }, 0);
  const deliveryFee = cartItems.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;
  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
        <View style={styles.customHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
            <Icon name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconWrap}>
            <Icon name="cart-outline" size={64} color={colors.gray300} />
          </View>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubtitle}>
            Explora los platillos disponibles y añade algo delicioso a tu carrito.
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => navigation.navigate('HomePage')}
            activeOpacity={0.85}
          >
            <Icon name="restaurant-outline" size={18} color="#FFFFFF" />
            <Text style={styles.exploreBtnText}>Explorar platillos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <SafeAreaView>
        <View style={styles.customHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
            <Icon name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Items header */}
        <View style={styles.itemsHeader}>
          <Text style={styles.itemsTitle}>{totalItems} {totalItems === 1 ? 'platillo' : 'platillos'}</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearAll}>Vaciar todo</Text>
          </TouchableOpacity>
        </View>

        {/* Cart items */}
        {cartItems.map((ci) => (
          <CartItemRow
            key={ci.item.id}
            cartItem={ci}
            onUpdateQty={updateCartQuantity}
            onRemove={removeFromCart}
            styles={styles}
            colors={colors}
          />
        ))}

        {/* Sides */}
        <View style={styles.sidesSection}>
          <Text style={styles.sidesTitle}>Acompaña tu orden</Text>
          <Text style={styles.sidesSubtitle}>Agrega algo más a tu pedido</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sidesRow}>
            {SIDES.map((side) => (
              <TouchableOpacity key={side.id} style={styles.sideCard} activeOpacity={0.8}>
                <View style={styles.sideImageBox}>
                  <Text style={styles.sideEmoji}>{side.emoji}</Text>
                </View>
                <Text style={styles.sideLabel}>{side.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Order summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen del pedido</Text>
          {cartItems.map((ci) => {
            const price = parseFloat(ci.item.price?.replace(/[^0-9.]/g, '') || '0');
            return (
              <View key={ci.item.id} style={styles.summaryRow}>
                <Text style={styles.summaryLabel} numberOfLines={1}>
                  {ci.item.dish} × {ci.quantity}
                </Text>
                <Text style={styles.summaryValue}>${(price * ci.quantity).toFixed(0)}</Text>
              </View>
            );
          })}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* CTA */}
      <SafeAreaView style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate('OrderPayment', { cartItems, subtotal })}
          activeOpacity={0.85}
        >
          <Text style={styles.proceedButtonText}>Proceder al pago</Text>
          <View style={styles.proceedAmount}>
            <Text style={styles.proceedAmountText}>${total.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md },
  customHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerBack: { padding: 4 },

  emptyContainer: { flex: 1, backgroundColor: colors.card },
  emptyContent: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: spacing.xl, gap: spacing.md,
  },
  emptyIconWrap: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  exploreBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 15, paddingHorizontal: spacing.xl,
    marginTop: spacing.sm, ...shadows.md,
  },
  exploreBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  itemsHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemsTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  clearAll: { fontSize: 13, fontWeight: '600', color: '#EF4444' },

  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: radius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
    overflow: 'hidden',
  },
  itemImage: { width: 80, height: 80 },
  itemDetails: { flex: 1, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  itemName: { ...typography.h4, color: colors.text, marginBottom: 2 },
  itemChef: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 3 },
  itemUnitPrice: { fontSize: 13, fontWeight: '700', color: colors.primary },
  itemRight: { paddingRight: spacing.sm, alignItems: 'flex-end', gap: spacing.xs },
  removeBtn: { padding: 4 },
  qtyControl: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.sm, overflow: 'hidden',
  },
  qtyBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surface },
  qtyValue: { width: 24, textAlign: 'center', fontSize: 13, fontWeight: '700', color: colors.text },

  sidesSection: {
    backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
    marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  sidesTitle: { ...typography.h4, color: colors.text, marginBottom: 2 },
  sidesSubtitle: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.md },
  sidesRow: { gap: spacing.sm },
  sideCard: { alignItems: 'center', width: 72 },
  sideImageBox: {
    width: 60, height: 60, borderRadius: radius.md,
    backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center',
    marginBottom: 6, borderWidth: 1, borderColor: colors.border,
  },
  sideEmoji: { fontSize: 28 },
  sideLabel: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textAlign: 'center' },

  summaryCard: {
    backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  summaryTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  summaryLabel: { fontSize: 14, color: colors.textSecondary, flex: 1, marginRight: spacing.sm },
  summaryValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.sm },
  totalLabel: { fontSize: 16, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: 18, fontWeight: '700', color: colors.primary },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  proceedButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingVertical: 15, paddingHorizontal: spacing.lg, ...shadows.md,
  },
  proceedButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  proceedAmount: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.sm, paddingHorizontal: 10, paddingVertical: 4,
  },
  proceedAmountText: { color: colors.white, fontSize: 14, fontWeight: '700' },
});

export default CartView;
