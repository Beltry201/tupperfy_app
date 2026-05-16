import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, Keyboard, StatusBar, Platform,
} from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { spacing, radius, shadows, AppColors } from '../theme';

const GOOGLE_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';

const DEFAULT_REGION: Region = {
  latitude: 10.4806,
  longitude: -66.9036,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const AddressPickerScreen = ({ navigation }: { navigation: any }) => {
  const { colors, setDeliveryAddress } = useApp();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const mapRef = useRef<MapView>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region>(DEFAULT_REGION);
  const [address, setAddress] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}&language=es`
      );
      const json = await res.json();
      if (json.results?.[0]) {
        setAddress(json.results[0].formatted_address);
      } else {
        setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
    } catch {
      setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  const handleRegionChange = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleRegionChangeComplete = useCallback((region: Region) => {
    setCurrentRegion(region);
    setIsDragging(false);
    reverseGeocode(region.latitude, region.longitude);
  }, [reverseGeocode]);

  const handlePlaceSelect = useCallback((data: any, details: any) => {
    const loc = details?.geometry?.location;
    if (loc) {
      const newRegion: Region = {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      mapRef.current?.animateToRegion(newRegion, 700);
      setAddress(data.description);
    }
    Keyboard.dismiss();
  }, []);

  const handleConfirm = useCallback(() => {
    if (address) {
      setDeliveryAddress(address);
      navigation.goBack();
    }
  }, [address, setDeliveryAddress, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Mapa de fondo */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={DEFAULT_REGION}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
      />

      {/* Pin fijo en el centro */}
      <View
        style={[styles.pinContainer, isDragging && styles.pinContainerLifted]}
        pointerEvents="none"
      >
        <FontAwesome6Icon
          name="location-dot"
          size={46}
          color={isDragging ? colors.primary : colors.orange}
        />
        <View style={[styles.pinShadow, isDragging && styles.pinShadowSmall]} />
      </View>

      {/* Barra superior con back + buscador */}
      <View style={[styles.topBar, { paddingTop: insets.top + (Platform.OS === 'android' ? 28 : 8) }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <GooglePlacesAutocomplete
            placeholder="Busca tu dirección..."
            onPress={handlePlaceSelect}
            query={{ key: GOOGLE_API_KEY, language: 'es' }}
            fetchDetails
            enablePoweredByContainer={false}
            debounce={350}
            minLength={2}
            keyboardShouldPersistTaps="handled"
            styles={{
              container: { flex: 1 },
              textInputContainer: { backgroundColor: 'transparent' },
              textInput: {
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: 15,
                borderRadius: radius.lg,
                borderWidth: 1.5,
                borderColor: colors.border,
                paddingHorizontal: spacing.md,
                paddingLeft: 40,
                height: 48,
                margin: 0,
                ...shadows.sm,
              },
              listView: {
                backgroundColor: colors.card,
                borderRadius: radius.md,
                marginTop: 6,
                ...shadows.sm,
                overflow: 'hidden',
              },
              row: {
                backgroundColor: colors.card,
                paddingVertical: 14,
                paddingHorizontal: spacing.md,
              },
              separator: { height: 1, backgroundColor: colors.borderLight },
              description: { color: colors.text, fontSize: 14 },
              poweredContainer: { display: 'none' },
            }}
          />
          <Icon
            name="search-outline"
            size={18}
            color={colors.gray400}
            style={styles.searchIcon}
          />
        </View>
      </View>

      {/* Botón de mi ubicación */}
      <TouchableOpacity
        style={[styles.myLocationBtn, { bottom: 180 + insets.bottom }]}
        onPress={() => {
          mapRef.current?.animateToRegion(currentRegion, 400);
        }}
      >
        <Icon name="locate-outline" size={22} color={colors.primary} />
      </TouchableOpacity>

      {/* Bottom sheet con dirección + confirmar */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.dragHandle} />

        <View style={styles.addressRow}>
          <View style={styles.addressIconWrap}>
            <FontAwesome6Icon name="location-dot" size={18} color={colors.orange} />
          </View>
          <View style={styles.addressTextWrap}>
            {isGeocoding || isDragging ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <>
                <Text style={styles.addressLabel}>Tu ubicación</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  {address || 'Mueve el mapa para seleccionar tu ubicación'}
                </Text>
              </>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, !address && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={!address || isDragging || isGeocoding}
          activeOpacity={0.85}
        >
          <Icon name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.confirmText}>Confirmar ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Pin
  pinContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -46,
    alignItems: 'center',
    zIndex: 10,
  },
  pinContainerLifted: {
    marginTop: -56,
  },
  pinShadow: {
    width: 10,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.28)',
    marginTop: 3,
  },
  pinShadowSmall: {
    width: 6,
    height: 3,
    borderRadius: 3,
    opacity: 0.15,
  },

  // Top bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    zIndex: 20,
  },
  backBtn: {
    width: 44,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.sm,
  },
  searchWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.md,
    top: 15,
    zIndex: 1,
    pointerEvents: 'none',
  },

  // My location
  myLocationBtn: {
    position: 'absolute',
    right: spacing.md,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
    zIndex: 15,
  },

  // Bottom sheet
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    ...shadows.sm,
    zIndex: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
    minHeight: 52,
  },
  addressIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressTextWrap: { flex: 1 },
  addressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 20,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 15,
    ...shadows.sm,
  },
  confirmBtnDisabled: {
    backgroundColor: colors.border,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddressPickerScreen;
