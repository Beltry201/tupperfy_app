import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Image, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';
import { getDishImage } from '../utils/images';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_GAP = spacing.sm;
const CARD_W   = (SCREEN_W - spacing.md * 2 - CARD_GAP) / 2;

type Item = {
  id: string;
  dish: string;
  person: string;
  price: string;
  rating: string;
  time: string;
  category: string;
};

const GridCard = ({
  item,
  onPress,
  styles,
  colors,
}: {
  item: Item;
  onPress: () => void;
  styles: ReturnType<typeof makeStyles>;
  colors: AppColors;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
    <Image
      source={getDishImage(item.dish)}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.cardDish} numberOfLines={1}>{item.dish}</Text>
      <Text style={styles.cardChef} numberOfLines={1}>Por {item.person}</Text>
      <View style={styles.cardMeta}>
        <Icon name="star" size={11} color="#F59E0B" />
        <Text style={styles.cardRating}>{item.rating}</Text>
        <Icon name="time-outline" size={11} color={colors.textLight} />
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

const SectionView = ({ navigation, route }: { navigation: any; route: any }) => {
  const { title = '', items = [] } = route?.params ?? {};
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.headerCount}>{items.length} platillos</Text>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item: Item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Item }) => (
          <GridCard
            item={item}
            styles={styles}
            colors={colors}
            onPress={() => navigation.navigate('DishDetails', { item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyText}>Sin platillos disponibles</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: radius.sm,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  headerRight: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerCount: { fontSize: 12, fontWeight: '600', color: colors.primary },

  list: { padding: spacing.md, gap: CARD_GAP },
  row:  { gap: CARD_GAP },

  card: {
    width: CARD_W,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardImage: { width: '100%', height: 130 },
  cardBody:  { padding: spacing.sm },
  cardDish:  { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  cardChef:  { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  cardMeta:  { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  cardRating:{ fontSize: 11, fontWeight: '600', color: colors.text },
  cardTime:  { fontSize: 11, color: colors.textLight },
  cardPrice: { fontSize: 14, fontWeight: '700', color: colors.primary },

  empty: { alignItems: 'center', paddingTop: 80, gap: spacing.md },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 16, color: colors.textSecondary },
});

export default SectionView;
