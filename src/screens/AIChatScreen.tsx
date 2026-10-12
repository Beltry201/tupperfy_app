import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, SafeAreaView,
  StatusBar, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const CLAUDE_API_KEY = 'YOUR_API_KEY_HERE';
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

// Allowed MaterialCommunityIcons names the model may use for `icon` — never emoji.
const MEAL_ICONS = [
  'bowl-mix-outline', 'food-drumstick-outline', 'leaf', 'pasta', 'rice', 'noodles',
  'taco', 'pizza', 'fish', 'hamburger', 'cupcake', 'food-apple', 'bread-slice-outline',
  'coffee', 'egg-fried', 'cheese', 'corn', 'mushroom', 'food-steak', 'cup-outline',
];
const DEFAULT_MEAL_ICON = 'silverware-fork-knife';

type Meal = { time: string; dish: string; calories: number; icon: string };
type PlanDay = { day: string; meals: Meal[] };
type Plan = { type: 'daily' | 'weekly' | 'monthly'; title: string; days: PlanDay[] };
type Message = { id: string; role: 'user' | 'assistant'; text: string; plan?: Plan };

const SYSTEM_PROMPT = `Eres Tupperfy AI, un asistente culinario especializado en planes de comida personalizados y recomendaciones de menú.
Ayudas a los usuarios con planes diarios, semanales y mensuales de alimentación saludable y casera.

SIEMPRE responde con JSON válido en esta estructura exacta:
{
  "message": "Tu respuesta conversacional aquí",
  "plan": null
}

Cuando el usuario pida un plan de comidas, usa:
{
  "message": "Aquí está tu plan:",
  "plan": {
    "type": "daily",
    "title": "Título del plan",
    "days": [
      {
        "day": "Lunes",
        "meals": [
          { "time": "Desayuno", "dish": "Avena con frutas", "calories": 320, "icon": "bowl-mix-outline" },
          { "time": "Almuerzo", "dish": "Pechuga a la plancha", "calories": 450, "icon": "food-drumstick-outline" },
          { "time": "Cena", "dish": "Ensalada mediterránea", "calories": 280, "icon": "leaf" }
        ]
      }
    ]
  }
}

Plan diario: 1 día, 3-4 comidas. Plan semanal: 7 días, 3 comidas. Plan mensual: 4 días representativos.
El campo "icon" de cada comida debe ser EXACTAMENTE uno de estos valores (nombres de iconos, nunca emojis): ${MEAL_ICONS.join(', ')}.
Calorías realistas. Responde siempre en español, amigable y motivador.`;

const QUICK_ACTIONS = [
  { label: 'Plan diario', icon: 'today-outline', prompt: 'Dame un plan de comidas para hoy, saludable y balanceado.' },
  { label: 'Plan semanal', icon: 'calendar-outline', prompt: 'Crea un plan de comidas semanal (7 días) variado y nutritivo.' },
  { label: 'Plan mensual', icon: 'calendar-clear-outline', prompt: 'Diseña un plan de comidas mensual balanceado.' },
  { label: 'Dieta saludable', icon: 'leaf-outline', prompt: '¿Qué platillos me recomiendas para comer más saludable?' },
];

const AIChatScreen = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: '¡Hola! Soy tu asistente Tupperfy 🍽️\nPuedo ayudarte a crear planes de comidas personalizados. ¿Por dónde empezamos?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useRef<{ role: string; content: string }[]>([]);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 120);
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    history.current.push({ role: 'user', content: trimmed });

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: CLAUDE_MODEL,
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: history.current,
        }),
      });

      const data = await res.json();
      const rawText: string = data?.content?.[0]?.text ?? '';
      history.current.push({ role: 'assistant', content: rawText });

      let parsed: { message: string; plan?: Plan | null } = { message: rawText };
      try {
        const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/(\{[\s\S]*\})/);
        parsed = JSON.parse(jsonMatch ? (jsonMatch[1] ?? jsonMatch[0]) : rawText);
      } catch {}

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: parsed.message || rawText,
        plan: parsed.plan ?? undefined,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Lo siento, tuve un problema al conectarme. Por favor intenta de nuevo.',
      }]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const renderPlanCard = (plan: Plan) => (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <Icon name="restaurant-outline" size={16} color={colors.primary} />
        <Text style={styles.planTitle}>{plan.title}</Text>
      </View>
      {plan.days.map((day, di) => (
        <View key={di} style={styles.planDay}>
          <Text style={styles.planDayLabel}>{day.day}</Text>
          {day.meals.map((meal, mi) => (
            <View key={mi} style={styles.mealRow}>
              <View style={styles.mealIconBox}>
                <MaterialCommunityIcon
                  name={MEAL_ICONS.includes(meal.icon) ? meal.icon : DEFAULT_MEAL_ICON}
                  size={18}
                  color={colors.primary}
                />
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealDish}>{meal.dish}</Text>
              </View>
              <Text style={styles.mealCals}>{meal.calories} kcal</Text>
            </View>
          ))}
          {di < plan.days.length - 1 && <View style={styles.dayDivider} />}
        </View>
      ))}
    </View>
  );

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.msgRow, isUser && styles.msgRowUser]}>
        {!isUser && (
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>AI</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>{item.text}</Text>
          {item.plan && renderPlanCard(item.plan)}
        </View>
      </View>
    );
  };

  const showQuickActions = messages.length <= 1 && !loading;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading ? (
              <View style={styles.msgRow}>
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarText}>AI</Text>
                </View>
                <View style={[styles.bubble, styles.bubbleBot, styles.typingBubble]}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={styles.typingText}>Escribiendo...</Text>
                </View>
              </View>
            ) : null
          }
        />

        {showQuickActions && (
          <View style={styles.quickActions}>
            <Text style={styles.quickLabel}>Sugerencias rápidas</Text>
            <View style={styles.chipsRow}>
              {QUICK_ACTIONS.map(a => (
                <TouchableOpacity
                  key={a.label}
                  style={styles.chip}
                  onPress={() => sendMessage(a.prompt)}
                  activeOpacity={0.75}
                >
                  <Icon name={a.icon as any} size={14} color={colors.primary} />
                  <Text style={styles.chipText}>{a.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor={colors.textLight}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            activeOpacity={0.85}
          >
            <Icon name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.surface },
  messageList: { padding: spacing.md, paddingBottom: spacing.md },

  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, marginBottom: spacing.sm },
  msgRowUser: { flexDirection: 'row-reverse' },

  botAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  botAvatarText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },

  bubble: { maxWidth: '80%', borderRadius: radius.lg, padding: spacing.md, gap: spacing.sm },
  bubbleBot: {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
    borderBottomLeftRadius: 4, ...shadows.sm,
  },
  bubbleUser: { backgroundColor: colors.primary, borderBottomRightRadius: 4, ...shadows.sm },
  bubbleText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  bubbleTextUser: { color: '#FFFFFF' },

  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  typingText: { fontSize: 13, color: colors.textSecondary },

  planCard: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginTop: spacing.xs,
  },
  planHeader: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  planTitle: { fontSize: 13, fontWeight: '700', color: colors.primary, flex: 1 },
  planDay: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 6 },
  planDayLabel: {
    fontSize: 11, fontWeight: '700', color: colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4,
  },
  mealRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  mealIconBox: {
    width: 28, height: 28, borderRadius: radius.sm,
    backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center',
  },
  mealInfo: { flex: 1 },
  mealTime: { fontSize: 10, color: colors.textLight, fontWeight: '600' },
  mealDish: { fontSize: 13, color: colors.text, fontWeight: '500' },
  mealCals: { fontSize: 11, color: colors.textSecondary, fontWeight: '600' },
  dayDivider: { height: 1, backgroundColor: colors.borderLight, marginTop: spacing.sm },

  quickActions: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm,
    borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.card,
  },
  quickLabel: {
    fontSize: 11, color: colors.textLight, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.primaryLight, borderRadius: radius.full,
    paddingHorizontal: spacing.md, paddingVertical: 7,
    borderWidth: 1, borderColor: colors.border,
  },
  chipText: { fontSize: 13, color: colors.primary, fontWeight: '600' },

  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border,
  },
  input: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    fontSize: 15, color: colors.text, maxHeight: 120,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', ...shadows.sm,
  },
  sendBtnDisabled: { backgroundColor: colors.gray300 },
});

export default AIChatScreen;
