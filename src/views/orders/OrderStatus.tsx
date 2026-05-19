import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  StatusBar, TouchableOpacity, Animated,
} from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../../theme';
import { useApp } from '../../context/AppContext';

const STEPS = [
  { key: 'confirmed', label: 'Pedido confirmado',   icon: 'checkmark-circle-outline', time: '10:32' },
  { key: 'preparing', label: 'Preparando tu orden', icon: 'restaurant-outline',       time: '10:35' },
  { key: 'onTheWay',  label: 'En camino',            icon: 'bicycle-outline',           time: '10:58' },
  { key: 'delivered', label: 'Entregado',             icon: 'home-outline',              time: ''      },
];
const CURRENT_STEP = 2;

// Simulated coordinates (Mexico City)
const DESTINATION  = { latitude: 19.4276, longitude: -99.1332 };
const DRIVER_START = { latitude: 19.4426, longitude: -99.1182 };

const MAP_REGION = {
  latitude:      (DRIVER_START.latitude  + DESTINATION.latitude)  / 2,
  longitude:     (DRIVER_START.longitude + DESTINATION.longitude) / 2,
  latitudeDelta:  0.045,
  longitudeDelta: 0.045,
};

const OrderStatus = ({ route, navigation }: { route: any; navigation: any }) => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const {
    item,
    quantity            = 1,
    subtotal            = 0,
    deliveryCost        = 10,
    tipAmount           = 0,
    tipPercent          = 0,
    total               = 0,
    paymentMethod       = 'Tarjeta de crédito/débito',
    deliveryOption      = 'normal',
    deliveryAddress     = '',
    deliveryAddressType = '',
    deliveryNotes       = '',
  } = route?.params ?? {};

  // Simulated driver position — advances 4% toward destination every 3 s
  const progressRef = useRef(0.15);
  const [driverPos, setDriverPos] = useState({
    latitude:  DRIVER_START.latitude  + (DESTINATION.latitude  - DRIVER_START.latitude)  * progressRef.current,
    longitude: DRIVER_START.longitude + (DESTINATION.longitude - DRIVER_START.longitude) * progressRef.current,
  });

  useEffect(() => {
    const id = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + 0.04, 1);
      const p = progressRef.current;
      setDriverPos({
        latitude:  DRIVER_START.latitude  + (DESTINATION.latitude  - DRIVER_START.latitude)  * p,
        longitude: DRIVER_START.longitude + (DESTINATION.longitude - DRIVER_START.longitude) * p,
      });
      if (progressRef.current >= 1) clearInterval(id);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Map zoom
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(MAP_REGION);

  const zoomIn = () => {
    const next = { ...region, latitudeDelta: region.latitudeDelta / 2, longitudeDelta: region.longitudeDelta / 2 };
    setRegion(next);
    mapRef.current?.animateToRegion(next, 300);
  };

  const zoomOut = () => {
    const next = { ...region, latitudeDelta: region.latitudeDelta * 2, longitudeDelta: region.longitudeDelta * 2 };
    setRegion(next);
    mapRef.current?.animateToRegion(next, 300);
  };

  // Pulse animation for driver marker
  const pulseAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 200,  useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const pulseScale   = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.4] });
  const pulseOpacity = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Status banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconWrap}>
            <Icon name="bicycle" size={34} color="#FFFFFF" />
          </View>
          <Text style={styles.bannerStatus}>En camino</Text>
          <Text style={styles.bannerSub}>Tu pedido está siendo entregado</Text>
          <View style={styles.etaRow}>
            <Icon name="time-outline" size={15} color={colors.primary} />
            <Text style={styles.etaText}>
              Tiempo estimado:{' '}
              <Text style={styles.etaBold}>
                {deliveryOption === 'prioritaria' ? '15-25 min' : '25-40 min'}
              </Text>
            </Text>
          </View>
        </View>

        {/* Live map */}
        <View style={styles.mapCard}>
          {/* Header row */}
          <View style={styles.mapHeader}>
            <Text style={styles.cardTitle}>Ubicación en tiempo real</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={MAP_REGION}
            onRegionChangeComplete={setRegion}
            scrollEnabled={false}
            zoomEnabled={true}
            rotateEnabled={false}
            pitchEnabled={false}
            // @ts-ignore — userInterfaceStyle is valid on react-native-maps iOS
            userInterfaceStyle={isDark ? 'dark' : 'light'}
          >
            {/* Route line */}
            <Polyline
              coordinates={[driverPos, DESTINATION]}
              strokeColor={colors.primary}
              strokeWidth={3}
              lineDashPattern={[10, 5]}
            />

            {/* Driver marker */}
            <Marker coordinate={driverPos} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges>
              <View style={styles.driverMarkerWrap}>
                <Animated.View
                  style={[
                    styles.driverPulse,
                    { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
                  ]}
                />
                <View style={styles.driverMarker}>
                  <Text style={styles.markerEmoji}>🚴</Text>
                </View>
              </View>
            </Marker>

            {/* Destination marker */}
            <Marker coordinate={DESTINATION} anchor={{ x: 0.5, y: 1 }} tracksViewChanges={false}>
              <View style={styles.destMarker}>
                <Text style={styles.markerEmoji}>🏠</Text>
              </View>
            </Marker>
          </MapView>

          {/* Zoom controls */}
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomBtn} onPress={zoomIn} activeOpacity={0.8}>
              <Icon name="add" size={20} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.zoomSep} />
            <TouchableOpacity style={styles.zoomBtn} onPress={zoomOut} activeOpacity={0.8}>
              <Icon name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
          </View>

          {/* Legend */}
          <View style={styles.mapLegend}>
            <View style={styles.legendItem}>
              <Text style={styles.legendEmoji}>🚴</Text>
              <Text style={styles.legendLabel}>Juan Pérez</Text>
            </View>
            <View style={styles.legendDivider} />
            <View style={styles.legendItem}>
              <Text style={styles.legendEmoji}>🏠</Text>
              <Text style={styles.legendLabel}>Tu dirección</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seguimiento del pedido</Text>
          {STEPS.map((step, i) => {
            const done   = i <= CURRENT_STEP;
            const active = i === CURRENT_STEP;
            return (
              <View key={step.key} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View style={[styles.stepDot, done && styles.stepDotDone, active && styles.stepDotActive]}>
                    <Icon
                      name={done && !active ? 'checkmark' : step.icon}
                      size={active ? 17 : 14}
                      color={done ? '#FFFFFF' : colors.gray300}
                    />
                  </View>
                  {i < STEPS.length - 1 && (
                    <View style={[styles.stepLine, i < CURRENT_STEP && styles.stepLineDone]} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepLabel,
                    done && styles.stepLabelDone,
                    active && styles.stepLabelActive,
                  ]}>
                    {step.label}
                  </Text>
                  {step.time
                    ? <Text style={styles.stepTime}>{step.time}</Text>
                    : <Text style={styles.stepTimePending}>Pendiente</Text>
                  }
                </View>
              </View>
            );
          })}
        </View>

        {/* Delivery person */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu repartidor</Text>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>JP</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Juan Pérez</Text>
              <View style={styles.ratingRow}>
                <Icon name="star" size={13} color={colors.star} />
                <Text style={styles.ratingText}>4.8 · 312 entregas</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75}>
              <Icon name="call-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.75}>
              <Icon name="chatbubble-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery address */}
        {deliveryAddress ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dirección de entrega</Text>
            <View style={styles.addrRow}>
              <View style={styles.addrIconBox}>
                <Icon name="location" size={18} color={colors.primary} />
              </View>
              <View style={styles.addrInfo}>
                {deliveryAddressType ? (
                  <Text style={styles.addrType}>{deliveryAddressType}</Text>
                ) : null}
                <Text style={styles.addrText}>{deliveryAddress}</Text>
                {deliveryNotes ? (
                  <Text style={styles.addrNotes}>{deliveryNotes}</Text>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}

        {/* Order summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen del pedido</Text>
          <View style={styles.orderRow}>
            <View style={styles.orderImageBox}>
              <Text style={styles.orderEmoji}>🍽️</Text>
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderDish}>{item?.dish ?? 'Platillo'}</Text>
              <Text style={styles.orderChef}>Por {item?.person ?? 'Chef'} · x{quantity}</Text>
            </View>
            <Text style={styles.orderPrice}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>${deliveryCost.toFixed(2)}</Text>
          </View>
          {tipPercent > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Propina ({tipPercent}%)</Text>
              <Text style={styles.summaryValue}>${tipAmount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Método de pago</Text>
            <Text style={styles.summaryValue}>{paymentMethod}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <SafeAreaView style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.receivedBtn}
          onPress={() => navigation.navigate('HomePage')}
          activeOpacity={0.85}
        >
          <Icon name="checkmark-circle" size={22} color="#FFFFFF" />
          <Text style={styles.receivedBtnText}>Pedido Recibido</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md, gap: spacing.md },

  // Banner
  banner: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    padding: spacing.lg, alignItems: 'center', gap: spacing.sm,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  bannerIconWrap: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.xs, ...shadows.sm,
  },
  bannerStatus: { fontSize: 20, fontWeight: '700', color: colors.text },
  bannerSub:    { fontSize: 14, color: colors.textSecondary },
  etaRow:       { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.xs },
  etaText:      { fontSize: 13, color: colors.textSecondary },
  etaBold:      { fontWeight: '700', color: colors.primary },

  // Map card
  mapCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  mapHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm,
  },
  mapContainer: { position: 'relative' },
  map: { height: 240, width: '100%' },
  zoomControls: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  zoomBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  zoomSep: { height: 1, backgroundColor: colors.border },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#FEF2F2', borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: '#FECACA',
  },
  liveDot: {
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  liveText: { fontSize: 10, fontWeight: '800', color: '#EF4444', letterSpacing: 0.8 },
  mapLegend: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: spacing.sm, gap: spacing.lg,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  legendItem:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendEmoji:  { fontSize: 16 },
  legendLabel:  { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  legendDivider: { width: 1, height: 16, backgroundColor: colors.border },

  // Driver marker
  driverMarkerWrap: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  driverPulse: {
    position: 'absolute',
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primary,
  },
  driverMarker: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  destMarker: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.success,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  markerEmoji: { fontSize: 18 },

  // Generic card
  card: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md },

  // Timeline
  stepRow:    { flexDirection: 'row', gap: spacing.md, minHeight: 56 },
  stepLeft:   { alignItems: 'center', width: 32 },
  stepDot: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  stepDotDone:   { backgroundColor: colors.gray400, borderColor: colors.gray400 },
  stepDotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepLine:     { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 2 },
  stepLineDone: { backgroundColor: colors.primary },
  stepContent:  { flex: 1, paddingTop: 5, paddingBottom: spacing.md, gap: 3 },
  stepLabel:       { fontSize: 14, fontWeight: '500', color: colors.gray400 },
  stepLabelDone:   { color: colors.text },
  stepLabelActive: { fontWeight: '700', color: colors.primary },
  stepTime:        { fontSize: 12, color: colors.textSecondary },
  stepTimePending: { fontSize: 12, color: colors.gray300 },

  // Driver
  driverRow:      { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  driverAvatar:   { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  driverAvatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  driverInfo:     { flex: 1 },
  driverName:     { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 3 },
  ratingRow:      { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText:     { fontSize: 13, color: colors.textSecondary },
  actionBtn: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },

  // Order summary
  orderRow:      { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.sm },
  orderImageBox: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  orderEmoji:    { fontSize: 26 },
  orderInfo:     { flex: 1 },
  orderDish:     { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  orderChef:     { fontSize: 12, color: colors.textSecondary },
  orderPrice:    { fontSize: 15, fontWeight: '700', color: colors.primary },
  divider:       { height: 1, backgroundColor: colors.borderLight, marginVertical: spacing.sm },
  summaryRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  summaryLabel:  { fontSize: 14, color: colors.textSecondary },
  summaryValue:  { fontSize: 14, fontWeight: '600', color: colors.text },
  totalLabel:    { fontSize: 15, fontWeight: '700', color: colors.text },
  totalValue:    { fontSize: 17, fontWeight: '700', color: colors.primary },

  addrRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  addrIconBox: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2,
  },
  addrInfo:  { flex: 1 },
  addrType:  { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 3, textTransform: 'uppercase' },
  addrText:  { fontSize: 14, color: colors.text, lineHeight: 20 },
  addrNotes: { fontSize: 12, color: colors.textSecondary, marginTop: 3, fontStyle: 'italic' },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.card,
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  receivedBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.success,
    borderRadius: radius.md, paddingVertical: 15, ...shadows.md,
  },
  receivedBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

export default OrderStatus;
