import React, { useState, useRef, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, Pressable, StyleSheet, ScrollView,
  TextInput, StatusBar, SafeAreaView, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';
import { getDishImage } from '../utils/images';

const CATEGORIES = [
  { id: 'all', label: 'Todo', icon: '🍽️' },
  { id: 'comidas', label: 'Comidas', icon: '🥘' },
  { id: 'veganas', label: 'Vegano', icon: '🥗' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤' },
  { id: 'postres', label: 'Postres', icon: '🍰' },
  { id: 'congelados', label: 'Congelados', icon: '❄️' },
];

const PEOPLE = ['José', 'María', 'Pedro', 'Lucía', 'Carlos', 'Ana', 'Miguel', 'Laura'];
const DISHES = ['Arepas', 'Paella', 'Sushi', 'Pizza', 'Hamburguesa', 'Ensalada', 'Pasta', 'Ramen', 'Ceviche', 'Empanadas'];
const RATINGS = ['4.5', '4.7', '4.8', '4.9', '5.0'];
const TIMES = ['15 min', '20 min', '25 min', '30 min', '35 min'];

const makeItems = (count: number, prefix: string) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    person: PEOPLE[Math.floor(Math.random() * PEOPLE.length)],
    dish: DISHES[Math.floor(Math.random() * DISHES.length)],
    price: `$${(Math.random() * 80 + 10).toFixed(0)}`,
    rating: RATINGS[Math.floor(Math.random() * RATINGS.length)],
    time: TIMES[Math.floor(Math.random() * TIMES.length)],
  }));

const popularItems = makeItems(6, 'pop');
const mostSearchedItems = makeItems(6, 'ms');
const nearestItems = makeItems(6, 'near');
const newestItems = makeItems(6, 'new');
const ALL_ITEMS = [...popularItems, ...mostSearchedItems, ...nearestItems, ...newestItems];

const FoodCard = ({ item, onPress, styles }: { item: any; onPress: () => void; styles: any }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
    <Image
      source={{ uri: getDishImage(item.dish) }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.cardDish} numberOfLines={1}>{item.dish}</Text>
      <Text style={styles.cardChef} numberOfLines={1}>Por {item.person}</Text>
      <View style={styles.cardMeta}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <View style={styles.cardRating}>
          <Icon name="star" size={11} color="#F59E0B" />
          <Text style={styles.cardRatingText}>{item.rating}</Text>
        </View>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SearchResultCard = ({ item, onPress, styles, colors }: { item: any; onPress: () => void; styles: any; colors: AppColors }) => (
  <TouchableOpacity style={styles.resultCard} onPress={onPress} activeOpacity={0.85}>
    <Image source={{ uri: getDishImage(item.dish) }} style={styles.resultImage} resizeMode="cover" />
    <View style={styles.resultBody}>
      <Text style={styles.resultDish}>{item.dish}</Text>
      <Text style={styles.resultChef}>Por {item.person}</Text>
      <View style={styles.resultMeta}>
        <Icon name="star" size={12} color="#F59E0B" />
        <Text style={styles.resultRating}>{item.rating}</Text>
        <Icon name="time-outline" size={12} color={colors.textLight} />
        <Text style={styles.resultTime}>{item.time}</Text>
      </View>
    </View>
    <Text style={styles.resultPrice}>{item.price}</Text>
  </TouchableOpacity>
);

const HomePage = ({ navigation }: { navigation: any }) => {
  const { colors, isDark, t, cartItems, deliveryAddress } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiHovered, setAiHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<TextInput>(null);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const totalCartItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_ITEMS.filter(
      item =>
        item.dish.toLowerCase().includes(q) ||
        item.person.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeMore}>{t('seeAll')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('ProfileInfo')}
        >
          <Icon name="menu" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addressPill}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AddressPickerScreen')}
        >
          <FontAwesome6Icon name="location-dot" size={14} color={colors.orange} />
          <Text style={styles.addressText} numberOfLines={1}>
            {deliveryAddress || t('addAddress')}
          </Text>
          <Icon name="chevron-down" size={14} color={colors.gray500} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartView')}
        >
          <AntDesignIcon name="shoppingcart" size={22} color={colors.text} />
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Greeting */}
        {!isSearching && (
          <View style={styles.greetingSection}>
            <View style={styles.greetingRow}>
              <View style={styles.greetingTexts}>
                <Text style={styles.greeting}>{t('greeting')}</Text>
                <Text style={styles.greetingSubtitle}>{t('greetingSub')}</Text>
              </View>
              <View style={styles.aiBtnWrap}>
                {aiHovered && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      Consulta a Tupperfy AI para armarte un menú 100% personalizado
                    </Text>
                    <View style={styles.tooltipArrow} />
                  </View>
                )}
                <Pressable
                  style={styles.aiBtn}
                  onPress={() => navigation.navigate('AIChatScreen')}
                  onHoverIn={() => setAiHovered(true)}
                  onHoverOut={() => setAiHovered(false)}
                >
                  <Icon name="sparkles" size={22} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color={colors.gray400} />
          <TextInput
            ref={searchRef}
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {isSearching && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={18} color={colors.gray400} />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Results */}
        {isSearching ? (
          <View style={styles.searchResultsContainer}>
            {searchResults.length === 0 ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsEmoji}>🔍</Text>
                <Text style={styles.noResultsTitle}>Sin resultados</Text>
                <Text style={styles.noResultsSub}>
                  No encontramos platillos para "{searchQuery}"
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.resultCount}>
                  {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                </Text>
                {searchResults.map(item => (
                  <SearchResultCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    styles={styles}
                    onPress={() => navigation.navigate('DishDetails', { item })}
                  />
                ))}
              </>
            )}
          </View>
        ) : (
          <>
            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryPill, selectedCategory === cat.id && styles.categoryPillActive]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                  <Text style={[styles.categoryLabel, selectedCategory === cat.id && styles.categoryLabelActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Promo Banner */}
            <View style={styles.promoBanner}>
              <View style={styles.promoContent}>
                <Text style={styles.promoTag}>OFERTA DEL DÍA</Text>
                <Text style={styles.promoTitle}>20% OFF en tu primer pedido</Text>
                <Text style={styles.promoSubtitle}>Usa el código TUPPERFY20</Text>
              </View>
              <Text style={styles.promoEmoji}>🎉</Text>
            </View>

            {/* Sections */}
            <SectionHeader title={t('popular')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {popularItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles}
                  onPress={() => navigation.navigate('DishDetails', { item })} />
              ))}
            </ScrollView>

            <SectionHeader title={t('mostSearched')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {mostSearchedItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles}
                  onPress={() => navigation.navigate('DishDetails', { item })} />
              ))}
            </ScrollView>

            <SectionHeader title={t('nearest')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {nearestItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles}
                  onPress={() => navigation.navigate('DishDetails', { item })} />
              ))}
            </ScrollView>

            <SectionHeader title={t('newest')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {newestItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles}
                  onPress={() => navigation.navigate('DishDetails', { item })} />
              ))}
            </ScrollView>
          </>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.card,
  },
  menuButton: {
    width: 40, height: 40, borderRadius: radius.sm,
    backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
  },
  addressPill: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, borderRadius: radius.md,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    borderWidth: 1, borderColor: colors.border,
  },
  addressText: { flex: 1, fontSize: 13, fontWeight: '500', color: colors.gray600 },
  cartButton: {
    width: 40, height: 40, borderRadius: radius.sm,
    backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute', top: 4, right: 4,
    minWidth: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: { color: colors.white, fontSize: 9, fontWeight: '700' },
  scrollContent: { paddingBottom: spacing.lg },

  greetingSection: {
    paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm,
  },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  greetingTexts: { flex: 1 },
  greeting: { fontSize: 24, fontWeight: '700', color: colors.text, letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 2 },
  aiBtnWrap: { position: 'relative' },
  aiBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', ...shadows.sm,
  },
  tooltip: {
    position: 'absolute', bottom: 52, right: 0, width: 200,
    backgroundColor: colors.text, borderRadius: radius.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    zIndex: 999, ...shadows.sm,
  },
  tooltipText: { fontSize: 12, color: colors.card, lineHeight: 17 },
  tooltipArrow: {
    position: 'absolute', bottom: -5, right: 17,
    width: 10, height: 10, backgroundColor: colors.text,
    transform: [{ rotate: '45deg' }],
  },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: spacing.md, marginVertical: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.lg,
    paddingHorizontal: spacing.md, paddingVertical: 13,
    borderWidth: 1, borderColor: colors.border, gap: spacing.sm, ...shadows.sm,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },

  // Search results
  searchResultsContainer: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  resultCount: {
    fontSize: 13, fontWeight: '600', color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: radius.lg,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden', ...shadows.sm,
  },
  resultImage: { width: 80, height: 80 },
  resultBody: { flex: 1, padding: spacing.sm },
  resultDish: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  resultChef: { fontSize: 12, color: colors.textSecondary, marginBottom: 5 },
  resultMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  resultRating: { fontSize: 12, fontWeight: '600', color: colors.text, marginRight: 4 },
  resultTime: { fontSize: 12, color: colors.textLight },
  resultPrice: {
    fontSize: 15, fontWeight: '700', color: colors.primary,
    paddingRight: spacing.md,
  },
  noResults: { alignItems: 'center', paddingVertical: spacing.xl * 2 },
  noResultsEmoji: { fontSize: 48, marginBottom: spacing.md },
  noResultsTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  noResultsSub: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },

  categoriesContainer: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm,
  },
  categoryPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.full,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card,
  },
  categoryPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryEmoji: { fontSize: 14 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: colors.gray600 },
  categoryLabelActive: { color: colors.white },

  promoBanner: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: spacing.md, marginBottom: spacing.sm,
    backgroundColor: colors.primaryLight, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  promoContent: { flex: 1 },
  promoTag: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 0.8, marginBottom: 2 },
  promoTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  promoSubtitle: { fontSize: 12, color: colors.textSecondary },
  promoEmoji: { fontSize: 36, marginLeft: spacing.sm },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  seeMore: { fontSize: 13, fontWeight: '600', color: colors.primary },
  cardsRow: { paddingLeft: spacing.md, paddingRight: spacing.sm, gap: spacing.sm },

  card: {
    width: 158, backgroundColor: colors.card, borderRadius: radius.lg,
    overflow: 'hidden', borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  cardImage: { width: '100%', height: 110 },
  cardBody: { padding: 10 },
  cardDish: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  cardChef: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cardPrice: { fontSize: 13, fontWeight: '700', color: colors.primary },
  cardRating: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  cardRatingText: { fontSize: 11, fontWeight: '600', color: colors.gray500 },
  cardTime: { fontSize: 11, color: colors.textLight, marginLeft: 'auto' },
});

export default HomePage;
