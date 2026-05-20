import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

const FAQ_ITEMS = [
  {
    q: '¿Cómo puedo crear una cuenta?',
    a: 'Toca "Crear una cuenta" en la pantalla de bienvenida. Ingresa tu nombre, correo y contraseña. ¡Es gratis y toma menos de un minuto!',
  },
  {
    q: '¿Cómo recupero mi contraseña?',
    a: 'En la pantalla de inicio de sesión, toca "¿Olvidaste tu contraseña?" e ingresa tu correo. Te enviaremos un enlace para restablecerla.',
  },
  {
    q: '¿Cómo realizo un pedido?',
    a: 'Explora los platillos en la pantalla principal, toca "Agregar" en los que te gusten y confirma tu pedido desde el carrito.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjeta de crédito/débito, PayPal y efectivo contra entrega.',
  },
  {
    q: '¿Cómo cancelo o modifico un pedido?',
    a: 'Puedes cancelar dentro de los primeros 5 minutos tras confirmar. Después, contacta soporte y haremos lo posible por ayudarte.',
  },
  {
    q: '¿Cuál es el tiempo de entrega?',
    a: 'Generalmente entre 30 y 60 minutos, dependiendo de la distancia y la demanda. Verás un estimado al confirmar tu pedido.',
  },
  {
    q: '¿Puedo programar una entrega?',
    a: 'Sí. En la sección "Mi Menú" puedes programar pedidos recurrentes para días y horas específicas.',
  },
  {
    q: '¿Qué hago si tengo una alergia alimentaria?',
    a: 'Indica tus alergias en las instrucciones especiales al hacer el pedido. También puedes escribirle al chef directamente por el chat.',
  },
  {
    q: '¿Cómo funciona el sistema de propinas?',
    a: 'Al confirmar el pago puedes elegir el porcentaje de propina (0 %, 5 %, 10 %, 15 % o 20 %). El 100 % va directo al tupperer.',
  },
  {
    q: '¿Puedo calificar a los chefs?',
    a: 'Sí. Tras recibir tu pedido recibirás una notificación para dejar tu calificación y comentario.',
  },
];

const REPORT_CATEGORIES = [
  { icon: 'bag-handle-outline', label: 'Pedido' },
  { icon: 'phone-portrait-outline', label: 'App' },
  { icon: 'person-outline', label: 'Chef' },
  { icon: 'bicycle-outline', label: 'Entrega' },
  { icon: 'card-outline', label: 'Pago' },
  { icon: 'shield-checkmark-outline', label: 'Seguridad' },
];

const HelpScreen = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const navigation = useNavigation<any>();

  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [reportCategory, setReportCategory] = useState<string | null>(null);
  const [reportText, setReportText] = useState('');
  const [feedbackStars, setFeedbackStars] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSendReport = () => {
    if (!reportCategory) {
      Alert.alert('Selecciona una categoría', 'Por favor elige el tipo de problema.');
      return;
    }
    if (!reportText.trim()) {
      Alert.alert('Describe el problema', 'Cuéntanos qué pasó para poder ayudarte mejor.');
      return;
    }
    Alert.alert('Reporte enviado', 'Nuestro equipo lo revisará y te contactará pronto. ¡Gracias!');
    setReportCategory(null);
    setReportText('');
  };

  const handleSendFeedback = () => {
    if (feedbackStars === 0) {
      Alert.alert('Califica tu experiencia', 'Selecciona al menos una estrella.');
      return;
    }
    Alert.alert('¡Gracias por tu feedback!', 'Tu opinión nos ayuda a mejorar Tupperfy.');
    setFeedbackStars(0);
    setFeedbackText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Icon name="help-buoy-outline" size={36} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>¿En qué podemos ayudarte?</Text>
          <Text style={styles.heroSub}>Encuentra respuestas rápidas o contáctanos directamente</Text>
        </View>

        {/* Quick actions */}
        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('SupportChat')} activeOpacity={0.8}>
            <View style={[styles.quickIcon, { backgroundColor: '#EBF3FF' }]}>
              <Icon name="chatbubbles-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Chat con{'\n'}soporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} activeOpacity={0.8} onPress={() => setOpenFaqId(openFaqId === null ? 0 : null)}>
            <View style={[styles.quickIcon, { backgroundColor: '#F0FDF4' }]}>
              <Icon name="book-outline" size={22} color={colors.success} />
            </View>
            <Text style={styles.quickLabel}>Preguntas{'\n'}frecuentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
            <View style={[styles.quickIcon, { backgroundColor: '#FEF3C7' }]}>
              <Icon name="mail-outline" size={22} color="#D97706" />
            </View>
            <Text style={styles.quickLabel}>Enviar{'\n'}email</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="help-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
          </View>

          <View style={styles.card}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqId === idx;
              return (
                <View key={idx}>
                  <TouchableOpacity
                    style={[styles.faqRow, idx < FAQ_ITEMS.length - 1 && !isOpen && styles.faqBorder]}
                    onPress={() => setOpenFaqId(isOpen ? null : idx)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.faqQuestion}>{item.q}</Text>
                    <Icon
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={colors.gray400}
                    />
                  </TouchableOpacity>
                  {isOpen && (
                    <View style={[styles.faqAnswer, idx < FAQ_ITEMS.length - 1 && styles.faqBorder]}>
                      <Text style={styles.faqAnswerText}>{item.a}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Contact support */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="headset-outline" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Contacto directo</Text>
          </View>

          <TouchableOpacity style={styles.contactCard} onPress={() => navigation.navigate('SupportChat')} activeOpacity={0.85}>
            <View style={styles.contactLeft}>
              <View style={[styles.contactIcon, { backgroundColor: '#EBF3FF' }]}>
                <Icon name="chatbubbles" size={22} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.contactTitle}>Chat en vivo</Text>
                <Text style={styles.contactSub}>Respuesta en menos de 5 minutos</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} activeOpacity={0.85}>
            <View style={styles.contactLeft}>
              <View style={[styles.contactIcon, { backgroundColor: '#F0FDF4' }]}>
                <Icon name="mail" size={22} color={colors.success} />
              </View>
              <View>
                <Text style={styles.contactTitle}>Correo electrónico</Text>
                <Text style={styles.contactSub}>soporte@tupperfy.com</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Report a problem */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="warning-outline" size={20} color={colors.danger} />
            <Text style={styles.sectionTitle}>Reportar un problema</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Categoría</Text>
            <View style={styles.chipsRow}>
              {REPORT_CATEGORIES.map(cat => {
                const active = reportCategory === cat.label;
                return (
                  <TouchableOpacity
                    key={cat.label}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setReportCategory(active ? null : cat.label)}
                    activeOpacity={0.8}
                  >
                    <Icon name={cat.icon} size={15} color={active ? colors.white : colors.gray500} />
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.cardLabel, { marginTop: spacing.md }]}>Descripción</Text>
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                placeholder="Cuéntanos qué ocurrió con detalle..."
                placeholderTextColor={colors.textLight}
                value={reportText}
                onChangeText={setReportText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.reportBtn} onPress={handleSendReport} activeOpacity={0.85}>
              <Icon name="send-outline" size={16} color={colors.white} />
              <Text style={styles.reportBtnText}>Enviar reporte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="star-outline" size={20} color="#D97706" />
            <Text style={styles.sectionTitle}>Comparte tu experiencia</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>¿Cómo calificarías Tupperfy?</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setFeedbackStars(star)} activeOpacity={0.7}>
                  <Icon
                    name={star <= feedbackStars ? 'star' : 'star-outline'}
                    size={36}
                    color={star <= feedbackStars ? '#F59E0B' : colors.gray300}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {feedbackStars > 0 && (
              <Text style={styles.starLabel}>
                {['', 'Muy malo 😟', 'Malo 😕', 'Regular 😐', 'Bueno 😊', '¡Excelente! 🤩'][feedbackStars]}
              </Text>
            )}

            <Text style={[styles.cardLabel, { marginTop: spacing.md }]}>Comentario (opcional)</Text>
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                placeholder="¿Qué podríamos mejorar?"
                placeholderTextColor={colors.textLight}
                value={feedbackText}
                onChangeText={setFeedbackText}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.feedbackBtn} onPress={handleSendFeedback} activeOpacity={0.85}>
              <Icon name="heart-outline" size={16} color={colors.white} />
              <Text style={styles.feedbackBtnText}>Enviar feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Tupperfy v1.0.0  •  Hecho con ❤️ en México</Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md },

  // Hero
  hero: {
    alignItems: 'center', paddingVertical: spacing.xl,
    backgroundColor: colors.primaryLight, borderRadius: radius.xl,
    marginBottom: spacing.lg, ...shadows.sm,
  },
  heroIconWrap: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.md, ...shadows.md,
  },
  heroTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 6 },
  heroSub: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: spacing.lg },

  // Quick actions
  quickRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  quickCard: {
    flex: 1, backgroundColor: colors.card, borderRadius: radius.lg,
    padding: spacing.md, alignItems: 'center', gap: spacing.sm,
    borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  quickIcon: { width: 46, height: 46, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { fontSize: 12, fontWeight: '600', color: colors.text, textAlign: 'center', lineHeight: 17 },

  // Sections
  section: { marginBottom: spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  card: {
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, ...shadows.sm,
  },
  cardLabel: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm },

  // FAQ
  faqRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: spacing.sm,
  },
  faqBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text, lineHeight: 20 },
  faqAnswer: { paddingBottom: 14 },
  faqAnswerText: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },

  // Contact
  contactCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm, ...shadows.sm,
  },
  contactLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  contactIcon: { width: 44, height: 44, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center' },
  contactTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  contactSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  // Report
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.full,
    paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.gray500 },
  chipTextActive: { color: colors.white },
  textAreaWrapper: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.sm, marginBottom: spacing.md,
  },
  textArea: { fontSize: 14, color: colors.text, minHeight: 90, lineHeight: 20 },
  reportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.danger,
    borderRadius: radius.md, paddingVertical: 13, ...shadows.sm,
  },
  reportBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  // Feedback
  starsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  starLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  feedbackBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: '#F59E0B',
    borderRadius: radius.md, paddingVertical: 13, ...shadows.sm,
  },
  feedbackBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  // Footer
  footer: { alignItems: 'center', paddingTop: spacing.md },
  footerText: { fontSize: 12, color: colors.textLight },
});

export default HelpScreen;
