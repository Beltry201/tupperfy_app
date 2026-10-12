import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { spacing, radius, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

type Conversation = {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

const CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'Chef María García',   role: 'Cocina Mexicana',  lastMessage: '¡Tu pedido está listo! 🍽️',             time: '10:00', unread: 2, online: true  },
  { id: '2', name: 'Chef Juan Martínez',  role: 'Comida Italiana',  lastMessage: 'Puedo ajustar el picante si gustas',     time: '09:30', unread: 0, online: false },
  { id: '3', name: 'Chef Ana López',      role: 'Cocina Asiática',  lastMessage: 'Llegará en 20 minutos aproximadamente',  time: '09:00', unread: 1, online: true  },
  { id: '4', name: 'Chef Pedro Sánchez',  role: 'BBQ & Parrilla',   lastMessage: '¿Tienes alguna restricción alimentaria?', time: 'Ayer',  unread: 0, online: false },
  { id: '5', name: 'Chef Laura Ramírez',  role: 'Repostería',       lastMessage: 'Perfecto, confirmo tu pedido 👌',        time: 'Ayer',  unread: 0, online: true  },
  { id: '6', name: 'Chef Carlos Díaz',    role: 'Cocina Española',  lastMessage: 'Gracias por tu reseña ⭐',               time: 'Lun',   unread: 0, online: false },
  { id: '7', name: 'Soporte Tupperfy',    role: 'Atención al cliente', lastMessage: 'Tu consulta ha sido resuelta',       time: 'Dom',   unread: 0, online: true  },
];

const MessagesScreen = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation<any>();

  const filtered = query.trim()
    ? CONVERSATIONS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : CONVERSATIONS;

  const getInitials = (name: string) =>
    name.replace('Chef ', '').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('ChatScreen', { conversation: item })}
      activeOpacity={0.7}
    >
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        {item.online && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.rowContent}>
        <View style={styles.rowTop}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.time, item.unread > 0 && styles.timeUnread]}>{item.time}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text
            style={[styles.lastMessage, item.unread > 0 && styles.lastMessageBold]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={18} color={colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar conversación..."
            placeholderTextColor={colors.textLight}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="close-circle" size={18} color={colors.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="chatbubbles-outline" size={52} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptySub}>No hay conversaciones que coincidan</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  searchWrap: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  list: { flexGrow: 1, backgroundColor: colors.card },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    gap: spacing.md,
    backgroundColor: colors.card,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.card,
  },
  rowContent: { flex: 1, gap: 4 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 15, fontWeight: '600', color: colors.text, flex: 1, marginRight: spacing.sm },
  time: { fontSize: 12, color: colors.textLight },
  timeUnread: { color: colors.primary, fontWeight: '600' },
  lastMessage: { flex: 1, fontSize: 13, color: colors.textSecondary, marginRight: spacing.sm },
  lastMessageBold: { color: colors.text, fontWeight: '500' },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  separator: { height: 1, backgroundColor: colors.borderLight, marginLeft: 78 },
  emptyState: { flex: 1, alignItems: 'center', paddingTop: 80, gap: spacing.sm },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.gray400 },
  emptySub: { fontSize: 13, color: colors.textLight },
});

export default MessagesScreen;
