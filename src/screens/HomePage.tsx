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
  { id: 'all',       label: 'Todo',       icon: '🍽️' },
  { id: 'comidas',   label: 'Comidas',    icon: '🥘' },
  { id: 'veganas',   label: 'Vegano',     icon: '🥗' },
  { id: 'bebidas',   label: 'Bebidas',    icon: '🥤' },
  { id: 'postres',   label: 'Postres',    icon: '🍰' },
  { id: 'congelados',label: 'Congelados', icon: '❄️' },
];

const PEOPLE = ['José', 'María', 'Pedro', 'Lucía', 'Carlos', 'Ana', 'Miguel', 'Laura'];
const DISHES = ['Arepas', 'Paella', 'Sushi', 'Pizza', 'Hamburguesa', 'Ensalada', 'Pasta', 'Ramen', 'Ceviche', 'Empanadas'];
const RATINGS = ['4.5', '4.7', '4.8', '4.9', '5.0'];
const TIMES = ['15 min', '20 min', '25 min', '30 min', '35 min'];

// Seeded with fixed values so items don't re-shuffle on re-render
const makeItems = (count: number, prefix: string, seed: number) =>
  Array.from({ length: count }, (_, i) => {
    const s = (seed + i * 7) % PEOPLE.length;
    return {
      id: `${prefix}-${i}`,
      person: PEOPLE[(s * 3 + i) % PEOPLE.length],
      dish:   DISHES[(s * 2 + i) % DISHES.length],
      price:  `$${((s * 13 + i * 7 + 20) % 80) + 15}`,
      rating: RATINGS[(s + i) % RATINGS.length],
      time:   TIMES[(s * 2 + i) % TIMES.length],
    };
  });

const popularItems     = makeItems(8, 'pop',  1);
const mostSearchedItems = makeItems(8, 'ms',  3);
const nearestItems     = makeItems(8, 'near', 5);
const newestItems      = makeItems(8, 'new',  7);

type Item = typeof popularItems[0];

// ─── FoodCard (horizontal) ──────────────────────────────────────────────────
const FoodCard = ({ item, onPress, styles }: { item: Item; onPress: () => void; styles: any }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
    <Image source={{ uri: getDishImage(item.dish) }} style={styles.cardImage} resizeMode="cover" />
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

// ─── SearchResultCard (vertical, full-width) ─────────────────────────────────
const SearchResultCard = ({ item, onPress, styles, colors }: { item: Item; onPress: () => void; styles: any; colors: AppColors }) => (
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

// ─── ChefCard (search by chef) ───────────────────────────────────────────────
const ChefCard = ({ chef, dishes, styles, onDishPress }: {
  chef: string; dishes: Item[]; styles: any; onDishPress: (item: Item) => void;
}) => (
  <View style={styles.chefCard}>
    <View style={styles.chefCardHeader}>
      <View style={styles.chefAvatar}>
        <Text style={styles.chefAvatarText}>{chef[0]}</Text>
      </View>
      <View>
        <Text style={styles.chefName}>{chef}</Text>
        <Text style={styles.chefSubtitle}>{dishes.length} platillo{dishes.length !== 1 ? 's' : ''}</Text>
      </View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
      {dishes.map(item => (
        <TouchableOpacity key={item.id} style={styles.chefDishCard} onPress={() => onDishPress(item)} activeOpacity={0.85}>
          <Image source={{ uri: getDishImage(item.dish) }} style={styles.chefDishImage} resizeMode="cover" />
          <Text style={styles.chefDishName} numberOfLines={1}>{item.dish}</Text>
          <Text style={styles.chefDishPrice}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// ─── HomePage ────────────────────────────────────────────────────────────────
const ALL_ITEMS = [...popularItems, ...mostSearchedItems, ...nearestItems, ...newestItems];

const HomePage = ({ navigation }: { navigation: any }) => {
  const { colors, isDark, t, cartItems, deliveryAddress } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiHovered, setAiHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<TextInput>(null);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const totalCartItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const isSearching = searchQuery.trim().length > 0;

  // ── Filtering logic ──────────────────────────────────────────────────────
  const { dishResults, chefGroups, totalResults } = useMemo(() => {
    if (!isSearching) return { dishResults: [], chefGroups: [], totalResults: 0 };

    const q = searchQuery.trim().toLowerCase();

    // Results where the dish name matches
    const byDish = ALL_ITEMS.filter(item => item.dish.toLowerCase().includes(q));

    // Results where the chef name matches (grouped by chef)
    const chefMatches = ALL_ITEMS.filter(item => item.person.toLowerCase().includes(q));
    const chefMap: Record<string, Item[]> = {};
    chefMatches.forEach(item => {
      if (!chefMap[item.person]) chefMap[item.person] = [];
      chefMap[item.person].push(item);
    });
    const groups = Object.entries(chefMap).map(([chef, dishes]) => ({ chef, dishes }));

    // Dish results that aren't already covered by a matched chef
    const chefNames = new Set(groups.map(g => g.chef));
    const pureDishResults = byDish.filter(item => !chefNames.has(item.person));

    const total = pureDishResults.length + chefMatches.length;
    return { dishResults: pureDishResults, chefGroups: groups, totalResults: total };
  }, [searchQuery, isSearching]);

  const navigate = (item: Item) => navigation.navigate('DishDetails', { item });

  const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {count !== undefined && isSearching && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{count}</Text>
          </View>
        )}
      </View>
      {!isSearching && (
        <TouchableOpacity>
          <Text style={styles.seeMore}>{t('seeAll')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ProfileInfo')}>
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

        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('CartView')}>
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
        {/* Greeting — hidden while searching */}
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
        <View style={[styles.searchBar, isSearching && styles.searchBarActive]}>
          <Icon name="search-outline" size={20} color={isSearching ? colors.primary : colors.gray400} />
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

        {/* Search results summary */}
        {isSearching && (
          <View style={styles.searchMeta}>
            <Icon name="search" size={13} color={colors.textSecondary} />
            <Text style={styles.searchMetaText}>
              {totalResults > 0
                ? `${totalResults} resultado${totalResults !== 1 ? 's' : ''} para `
                : 'Sin resultados para '}
              <Text style={styles.searchMetaQuery}>"{searchQuery}"</Text>
            </Text>
          </View>
        )}

        {/* ── SEARCH STATE ─────────────────────────────────────────────── */}
        {isSearching ? (
          totalResults === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsEmoji}>🔍</Text>
              <Text style={styles.noResultsTitle}>Sin resultados</Text>
              <Text style={styles.noResultsSub}>
                No encontramos platillos ni chefs para "{searchQuery}"
              </Text>
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                <Text style={styles.clearSearchText}>Limpiar búsqueda</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.searchResultsContainer}>
              {/* Chef groups */}
              {chefGroups.map(({ chef, dishes }) => (
                <ChefCard
                  key={chef}
                  chef={chef}
                  dishes={dishes}
                  styles={styles}
                  onDishPress={navigate}
                />
              ))}

              {/* Dish-only results */}
              {dishResults.length > 0 && (
                <>
                  {chefGroups.length > 0 && (
                    <Text style={styles.dishResultsLabel}>Platillos</Text>
                  )}
                  {dishResults.map(item => (
                    <SearchResultCard
                      key={item.id}
                      item={item}
                      styles={styles}
                      colors={colors}
                      onPress={() => navigate(item)}
                    />
                  ))}
                </>
              )}
            </View>
          )
        ) : (
          /* ── NORMAL HOME STATE ──────────────────────────────────────── */
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

            <SectionHeader title={t('popular')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {popularItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles} onPress={() => navigate(item)} />
              ))}
            </ScrollView>

            <SectionHeader title={t('mostSearched')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {mostSearchedItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles} onPress={() => navigate(item)} />
              ))}
            </ScrollView>

            <SectionHeader title={t('nearest')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {nearestItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles} onPress={() => navigate(item)} />
              ))}
            </ScrollView>

            <SectionHeader title={t('newest')} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {newestItems.map((item) => (
                <FoodCard key={item.id} item={item} styles={styles} onPress={() => navigate(item)} />
              ))}
            </ScrollView>
          </>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
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
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3,
  },
  cartBadgeText: { color: colors.white, fontSize: 9, fontWeight: '700' },
  scrollContent: { paddingBottom: spacing.lg },

  greetingSection: { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  greetingTexts: { flex: 1 },
  greeting: { fontSize: 24, fontWeight: '700', color: colors.text, letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 2 },
  aiBtnWrap: { position: 'relative' },
  aiBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  tooltip: {
    position: 'absolute', bottom: 52, right: 0, width: 200,
    backgroundColor: colors.text, borderRadius: radius.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, zIndex: 999, ...shadows.sm,
  },
  tooltipText: { fontSize: 12, color: colors.card, lineHeight: 17 },
  tooltipArrow: {
    position: 'absolute', bottom: -5, right: 17,
    width: 10, height: 10, backgroundColor: colors.text, transform: [{ rotate: '45deg' }],
  },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: spacing.md, marginVertical: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.lg,
    paddingHorizontal: spacing.md, paddingVertical: 13,
    borderWidth: 1.5, borderColor: colors.border, gap: spacing.sm, ...shadows.sm,
  },
  searchBarActive: { borderColor: colors.primary },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },

  searchMeta: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  searchMetaText: { fontSize: 13, color: colors.textSecondary },
  searchMetaQuery: { fontWeight: '700', color: colors.text },

  // Search results
  searchResultsContainer: { paddingHorizontal: spacing.md },
  dishResultsLabel: { fontSize: 14, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.xs },
  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: radius.lg,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', ...shadows.sm,
  },
  resultImage: { width: 80, height: 80 },
  resultBody: { flex: 1, padding: spacing.sm },
  resultDish: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  resultChef: { fontSize: 12, color: colors.textSecondary, marginBottom: 5 },
  resultMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  resultRating: { fontSize: 12, fontWeight: '600', color: colors.text, marginRight: 4 },
  resultTime: { fontSize: 12, color: colors.textLight },
  resultPrice: { fontSize: 15, fontWeight: '700', color: colors.primary, paddingRight: spacing.md },

  // Chef card
  chefCard: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.sm, ...shadows.sm,
  },
  chefCardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  chefAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
  },
  chefAvatarText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  chefName: { fontSize: 16, fontWeight: '700', color: colors.text },
  chefSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  chefDishCard: {
    width: 120, backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
  },
  chefDishImage: { width: 120, height: 80 },
  chefDishName: { fontSize: 12, fontWeight: '700', color: colors.text, padding: 6, paddingBottom: 2 },
  chefDishPrice: { fontSize: 12, fontWeight: '700', color: colors.primary, paddingHorizontal: 6, paddingBottom: 6 },

  // No results
  noResults: { alignItems: 'center', paddingVertical: spacing.xl * 2, paddingHorizontal: spacing.xl },
  noResultsEmoji: { fontSize: 48, marginBottom: spacing.md },
  noResultsTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  noResultsSub: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 21, marginBottom: spacing.lg },
  clearSearchBtn: {
    backgroundColor: colors.primaryLight, borderRadius: radius.full,
    paddingHorizontal: spacing.lg, paddingVertical: 10,
    borderWidth: 1, borderColor: colors.primary,
  },
  clearSearchText: { fontSize: 14, fontWeight: '700', color: colors.primary },

  // Section
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  countBadge: {
    backgroundColor: colors.primary, borderRadius: radius.full,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  countBadgeText: { fontSize: 11, fontWeight: '700', color: colors.white },
  seeMore: { fontSize: 13, fontWeight: '600', color: colors.primary },
  cardsRow: { paddingLeft: spacing.md, paddingRight: spacing.sm, gap: spacing.sm },

  // Food card
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

  // Categories
  categoriesContainer: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm },
  categoryPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.full,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card,
  },
  categoryPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryEmoji: { fontSize: 14 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: colors.gray600 },
  categoryLabelActive: { color: colors.white },

  // Promo
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
});

export default HomePage;
