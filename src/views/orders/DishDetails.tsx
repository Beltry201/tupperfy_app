import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, typography, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';
import { getDishImage } from '../../utils/images';

const DishDetails = ({ navigation, route }: { navigation: any; route: any }) => {
  const { colors, addToCart } = useApp();
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const dishName = item?.dish || 'Nombre del Platillo';
  const dishDescription = item?.description || 'Delicioso platillo preparado con ingredientes frescos y naturales, siguiendo la receta tradicional de casa.';
  const chefName = item?.person || 'Chef';
  const chefDescription = item?.chefDesc || 'Chef con más de 5 años de experiencia preparando comida casera con ingredientes de primera calidad.';
  const dishPrice = item?.price || '$0';
  const dishRating = item?.rating || '4.8';
  const dishTime = item?.time || '25 min';

  const unitPrice = parseFloat(dishPrice.replace(/[^0-9.]/g, '')) || 0;
  const totalPrice = `$${(unitPrice * quantity).toFixed(0)}`;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    navigation.navigate('CartView');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero con imagen real */}
      <View style={styles.heroArea}>
        <Image
          source={getDishImage(dishName)}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
          {/* Title row */}
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.dishName}>{dishName}</Text>
              <View style={styles.badges}>
                <View style={styles.ratingBadge}>
                  <Icon name="star" size={13} color="#F59E0B" />
                  <Text style={styles.ratingText}>{dishRating}</Text>
                </View>
                <View style={styles.timeBadge}>
                  <Icon name="time-outline" size={13} color={colors.textSecondary} />
                  <Text style={styles.timeText}>{dishTime}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.priceTag}>{totalPrice}</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>{dishDescription}</Text>
          </View>

          {/* Chef */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre el chef</Text>
            <View style={styles.chefCard}>
              <View style={styles.chefAvatar}>
                <Text style={styles.chefAvatarText}>{chefName[0]}</Text>
              </View>
              <View style={styles.chefInfo}>
                <Text style={styles.chefName}>{chefName}</Text>
                <Text style={styles.chefDesc}>{chefDescription}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      {/* Bottom bar */}
      <SafeAreaView style={styles.bottomBar}>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.qtyButton} onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
            <Icon name="remove" size={20} color={quantity > 1 ? colors.text : colors.gray300} />
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyButton} onPress={() => setQuantity(quantity + 1)}>
            <Icon name="add" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart} activeOpacity={0.85}>
          <Icon name="cart-outline" size={20} color={colors.white} />
          <Text style={styles.addButtonText}>Añadir al carrito · {totalPrice}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  heroArea: { height: 280, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  backButton: {
    position: 'absolute', top: 56, left: spacing.md,
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center',
    zIndex: 10,
  },
  sheet: {
    flex: 1, backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    marginTop: -20, ...shadows.md,
  },
  sheetContent: { padding: spacing.lg },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  titleLeft: { flex: 1, marginRight: spacing.md },
  dishName: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  badges: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.full,
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#92400E' },
  timeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.full,
  },
  timeText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  priceTag: { fontSize: 24, fontWeight: '700', color: colors.primary },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.md },
  section: { marginBottom: spacing.lg },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  descriptionText: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },
  chefCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, gap: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  chefAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  chefAvatarText: { color: colors.white, fontSize: 20, fontWeight: '700' },
  chefInfo: { flex: 1 },
  chefName: { ...typography.h4, color: colors.text, marginBottom: 3 },
  chefDesc: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 18 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.md,
  },
  quantityControl: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden',
  },
  qtyButton: { width: 40, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surface },
  qtyValue: { width: 36, textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.text },
  addButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 14, ...shadows.md,
  },
  addButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});

export default DishDetails;
