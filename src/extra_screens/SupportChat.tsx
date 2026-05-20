import React, { useState, useRef, useMemo } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  text: string;
  fromUser: boolean;
  time: Date;
}

const QUICK_REPLIES = [
  'Problema con mi pedido',
  'Quiero cancelar un pedido',
  'Problema con el pago',
  'Retraso en la entrega',
  'Otro',
];

const getAutoResponse = (msg: string): string => {
  const t = msg.toLowerCase();
  if (t.includes('pedido') || t.includes('orden'))
    return 'Entiendo. ¿Puedes compartirme el número de pedido para revisarlo de inmediato?';
  if (t.includes('cancelar') || t.includes('cancelación'))
    return 'Podemos cancelarlo si fue hace menos de 5 minutos. ¿El pedido es muy reciente?';
  if (t.includes('pago') || t.includes('cobro') || t.includes('tarjeta'))
    return 'Voy a revisar eso ahora mismo. ¿Tienes el número de transacción o la fecha del cargo?';
  if (t.includes('entrega') || t.includes('retraso') || t.includes('tarde'))
    return 'Lamentamos el inconveniente. Voy a verificar el estado de tu entrega. ¿Hace cuánto realizaste el pedido?';
  if (t.includes('chef') || t.includes('cocinero') || t.includes('tupperer'))
    return '¿Tienes algún comentario sobre el chef? Puedo escalar el caso a nuestro equipo de calidad.';
  if (t.includes('gracias') || t.includes('perfecto') || t.includes('listo') || t.includes('ok'))
    return '¡Con gusto! Si necesitas algo más, aquí estaré. 😊';
  return 'Gracias por tu mensaje. Un agente especializado está revisando tu caso y te responderá en menos de 5 minutos. 🙏';
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });

const SupportChat = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const navigation = useNavigation<any>();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: '¡Hola! Soy el soporte de Tupperfy 👋\n¿En qué puedo ayudarte hoy?',
      fromUser: false,
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<FlatList>(null);

  const showQuickReplies = messages.length === 1;

  const scrollToBottom = () =>
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);

  const addMessage = (text: string, fromUser: boolean) => {
    const msg: Message = { id: Date.now().toString() + Math.random(), text, fromUser, time: new Date() };
    setMessages(prev => [...prev, msg]);
    scrollToBottom();
  };

  const handleSend = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    setInput('');
    addMessage(value, true);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(getAutoResponse(value), false);
    }, 1400);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.row, item.fromUser && styles.rowReverse]}>
      {!item.fromUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>T</Text>
        </View>
      )}
      <View style={[styles.bubble, item.fromUser ? styles.userBubble : styles.supportBubble]}>
        <Text style={[styles.bubbleText, item.fromUser && styles.userBubbleText]}>
          {item.text}
        </Text>
        <Text style={[styles.timeText, item.fromUser && styles.timeTextUser]}>
          {formatTime(item.time)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.agentAvatar}>
          <Text style={styles.agentAvatarText}>T</Text>
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>Soporte Tupperfy</Text>
          <Text style={styles.agentStatus}>
            {isTyping ? 'Escribiendo...' : 'En línea · Responde en &lt;5 min'}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Icon name="call-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          onLayout={scrollToBottom}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.row}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>T</Text>
                </View>
                <View style={[styles.bubble, styles.supportBubble, styles.typingBubble]}>
                  <Text style={styles.typingDots}>●  ●  ●</Text>
                </View>
              </View>
            ) : null
          }
        />

        {/* Quick replies */}
        {showQuickReplies && (
          <View style={styles.quickRepliesWrap}>
            <Text style={styles.quickRepliesLabel}>Consultas frecuentes</Text>
            <View style={styles.quickRepliesRow}>
              {QUICK_REPLIES.map(q => (
                <TouchableOpacity key={q} style={styles.quickChip} onPress={() => handleSend(q)} activeOpacity={0.8}>
                  <Text style={styles.quickChipText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Icon name="attach-outline" size={22} color={colors.gray400} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              placeholderTextColor={colors.textLight}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={() => handleSend()}
            />
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, input.trim() ? styles.sendBtnActive : null]}
            onPress={() => handleSend()}
            activeOpacity={0.8}
          >
            <Icon name="send" size={18} color={input.trim() ? colors.white : colors.gray400} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border, ...shadows.sm,
  },
  backBtn: { padding: 4 },
  agentAvatar: { position: 'relative' },
  agentAvatarText: { color: colors.white, fontWeight: '800', fontSize: 16 },
  onlineDot: {
    width: 11, height: 11, borderRadius: 6, backgroundColor: '#22C55E',
    position: 'absolute', bottom: 0, right: 0,
    borderWidth: 2, borderColor: colors.card,
  },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 15, fontWeight: '700', color: colors.text },
  agentStatus: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  headerAction: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center',
  },

  // Messages
  listContent: { padding: spacing.md, gap: 10, paddingBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  rowReverse: { flexDirection: 'row-reverse' },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },
  avatarText: { color: colors.white, fontWeight: '800', fontSize: 14 },
  bubble: {
    maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: radius.lg,
  },
  supportBubble: {
    backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.border,
    borderBottomLeftRadius: 4, ...shadows.sm,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4, ...shadows.sm,
  },
  bubbleText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  userBubbleText: { color: colors.white },
  timeText: { fontSize: 10, color: colors.textLight, marginTop: 4, textAlign: 'right' },
  timeTextUser: { color: 'rgba(255,255,255,0.7)' },

  // Typing indicator
  typingBubble: { paddingVertical: 14, paddingHorizontal: 16 },
  typingDots: { fontSize: 10, color: colors.gray400, letterSpacing: 3 },

  // Quick replies
  quickRepliesWrap: {
    paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: 4,
  },
  quickRepliesLabel: { fontSize: 11, fontWeight: '600', color: colors.textLight, marginBottom: 8 },
  quickRepliesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  quickChip: {
    borderWidth: 1.5, borderColor: colors.primary, borderRadius: radius.full,
    paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.primaryLight,
  },
  quickChipText: { fontSize: 13, fontWeight: '600', color: colors.primary },

  // Input bar
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border,
  },
  attachBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  inputWrapper: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    minHeight: 42, maxHeight: 120,
  },
  input: { fontSize: 14, color: colors.text, padding: 0 },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtnActive: {
    backgroundColor: colors.primary, borderColor: colors.primary, ...shadows.sm,
  },
});

export default SupportChat;
