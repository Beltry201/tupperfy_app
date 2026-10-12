import React, { useState, useMemo } from 'react';
import {
  View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput,
  Animated, ScrollView, RefreshControl, Share, Dimensions, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const { height, width } = Dimensions.get('window');

const CARD_COLORS = ['#C5DBFF', '#BDDAFF', '#A8CFFF'];
const CHEF_NAMES = ['José M.', 'María G.', 'Pedro A.'];
const DISH_NAMES = ['Arepas rellenas', 'Paella valenciana', 'Pasta carbonara'];
const DESCRIPTIONS = [
  'Una receta casera con los mejores ingredientes frescos del mercado local.',
  'Preparada con amor y dedicación, siguiendo la receta de mi abuela.',
  'Un clásico reinventado con toque moderno y sabores auténticos.',
];

const data = [
  { id: '1', color: CARD_COLORS[0], chef: CHEF_NAMES[0], dish: DISH_NAMES[0], desc: DESCRIPTIONS[0], likes: 128, icon: 'bread-slice-outline' },
  { id: '2', color: CARD_COLORS[1], chef: CHEF_NAMES[1], dish: DISH_NAMES[1], desc: DESCRIPTIONS[1], likes: 256, icon: 'rice' },
  { id: '3', color: CARD_COLORS[2], chef: CHEF_NAMES[2], dish: DISH_NAMES[2], desc: DESCRIPTIONS[2], likes: 89, icon: 'pasta' },
];

const MediaView = () => {
  const { colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    Object.fromEntries(data.map(d => [d.id, d.likes]))
  );
  const [commentVisible, setCommentVisible] = useState('');
  const [slideAnim] = useState(new Animated.Value(600));
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: 'c1', text: '¡Se ve delicioso! 😍', replies: [] as string[] },
    { id: 'c2', text: 'Me encanta esta receta', replies: [] as string[] },
    { id: 'c3', text: '¿Dónde puedo pedirlo?', replies: [] as string[] },
  ]);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleLike = (itemId: string) => {
    const wasLiked = likedItems[itemId];
    setLikedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    setLikeCounts(prev => ({ ...prev, [itemId]: prev[itemId] + (wasLiked ? -1 : 1) }));
  };

  const openComments = (itemId: string) => {
    setCommentVisible(itemId);
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
  };

  const closeComments = () => {
    Animated.timing(slideAnim, { toValue: 600, duration: 280, useNativeDriver: true }).start(() => {
      setCommentVisible('');
    });
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => [...prev, { id: `c${prev.length + 1}`, text: commentText.trim(), replies: [] }]);
    setCommentText('');
  };

  const handleSendReply = (commentId: string) => {
    if (!replyText.trim()) return;
    setComments(prev => prev.map(c =>
      c.id === commentId ? { ...c, replies: [...c.replies, replyText.trim()] } : c
    ));
    setReplyText(''); setReplyingTo(null);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: '¡Mira este contenido en Tupperfy!' });
    } catch {}
  };

  const renderItem = ({ item }: { item: typeof data[0] }) => (
    <View style={[styles.postContainer, { height: height - 130 }]}>
      {/* Media area */}
      <View style={[styles.mediaArea, { backgroundColor: item.color }]}>
        <MaterialCommunityIcon name={item.icon} size={100} color="rgba(255,255,255,0.85)" />
      </View>

      {/* Overlay gradient info */}
      <View style={styles.postOverlay}>
        {/* Chef info - bottom left */}
        <View style={styles.chefInfo}>
          <View style={styles.chefAvatar}>
            <Text style={styles.chefAvatarText}>{item.chef[0]}</Text>
          </View>
          <View>
            <Text style={styles.chefName}>{item.chef}</Text>
            <Text style={styles.dishName}>{item.dish}</Text>
          </View>
        </View>
        <Text style={styles.dishDesc} numberOfLines={2}>{item.desc}</Text>

        {/* Action buttons - right side */}
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(item.id)}>
            <Icon
              name={likedItems[item.id] ? 'heart' : 'heart-outline'}
              size={28}
              color={likedItems[item.id] ? '#FF3B5C' : colors.white}
            />
            <Text style={styles.actionCount}>{likeCounts[item.id]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={() => openComments(item.id)}>
            <Icon name="chatbubble-outline" size={26} color={colors.white} />
            <Text style={styles.actionCount}>{comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Icon name="arrow-redo-outline" size={26} color={colors.white} />
            <Text style={styles.actionCount}>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="cart-outline" size={26} color={colors.white} />
            <Text style={styles.actionCount}>Pedir</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments sheet */}
      {commentVisible === item.id && (
        <Animated.View style={[styles.commentsSheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.commentsHandle} />
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Comentarios</Text>
            <TouchableOpacity onPress={closeComments}>
              <Icon name="close" size={22} color={colors.gray500} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>U</Text>
                </View>
                <View style={styles.commentContent}>
                  <Text style={styles.commentAuthor}>Usuario</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  {comment.replies.map((reply, i) => (
                    <View key={i} style={styles.replyBubble}>
                      <Text style={styles.replyText}>{reply}</Text>
                    </View>
                  ))}
                  <TouchableOpacity onPress={() => setReplyingTo(comment.id)}>
                    <Text style={styles.replyBtn}>Responder</Text>
                  </TouchableOpacity>
                  {replyingTo === comment.id && (
                    <View style={styles.replyInputRow}>
                      <TextInput
                        style={styles.replyInput}
                        placeholder="Escribe tu respuesta..."
                        placeholderTextColor={colors.textLight}
                        value={replyText}
                        onChangeText={setReplyText}
                      />
                      <TouchableOpacity onPress={() => handleSendReply(comment.id)}>
                        <Icon name="send" size={18} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.commentInputBar}>
            <View style={styles.commentInputWrapper}>
              <TextInput
                style={styles.commentInput}
                placeholder="Añadir comentario..."
                placeholderTextColor={colors.textLight}
                value={commentText}
                onChangeText={setCommentText}
                onSubmitEditing={handleSendComment}
              />
              <TouchableOpacity onPress={handleSendComment}>
                <Icon name="send" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.text} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tupperfy</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="camera-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', gap: spacing.sm },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    width,
    position: 'relative',
    backgroundColor: colors.text,
  },
  mediaArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xxl,
    backgroundColor: 'transparent',
  },
  chefInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  chefAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefAvatarText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  chefName: { color: colors.white, fontSize: 14, fontWeight: '700' },
  dishName: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '500' },
  dishDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.sm,
    maxWidth: '75%',
  },
  actionBar: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  actionBtn: { alignItems: 'center', gap: 3 },
  actionCount: { color: colors.white, fontSize: 11, fontWeight: '600' },
  commentsSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    ...shadows.lg,
  },
  commentsHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray300,
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  commentsTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  commentsList: { flex: 1, paddingHorizontal: spacing.md },
  commentItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  commentContent: { flex: 1 },
  commentAuthor: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 2 },
  commentText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  replyBubble: {
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: spacing.xs,
  },
  replyText: { fontSize: 13, color: colors.textSecondary },
  replyBtn: { color: colors.primary, fontSize: 12, fontWeight: '600', marginTop: spacing.xs },
  replyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  replyInput: { flex: 1, fontSize: 13, color: colors.text },
  commentInputBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  commentInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commentInput: { flex: 1, fontSize: 14, color: colors.text },
});

export default MediaView;
