import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert, SafeAreaView, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing, radius, shadows, AppColors } from '../theme';
import { useApp } from '../context/AppContext';

type Role = 'tupperer' | 'repartidor' | null;

const ROLES = [
  {
    id: 'tupperer' as Role,
    icon: 'restaurant',
    label: 'Tupperer',
    tagline: 'Cocina desde casa y gana dinero',
    color: '#7C3AED',
    bg: '#F5F3FF',
    perks: [
      { icon: 'home-outline',   text: 'Trabaja desde tu hogar' },
      { icon: 'time-outline',   text: 'Tú decides tu horario' },
      { icon: 'cash-outline',   text: 'Gana hasta $15,000 al mes' },
      { icon: 'star-outline',   text: 'Sin inversión inicial' },
      { icon: 'school-outline', text: 'Capacitación gratuita' },
      { icon: 'card-outline',   text: 'Pago semanal garantizado' },
    ],
  },
  {
    id: 'repartidor' as Role,
    icon: 'bicycle',
    label: 'Repartidor',
    tagline: 'Entrega en tu zona a tu ritmo',
    color: '#059669',
    bg: '#F0FDF4',
    perks: [
      { icon: 'calendar-outline', text: 'Horarios 100 % flexibles' },
      { icon: 'navigate-outline', text: 'Rutas cerca de ti' },
      { icon: 'cash-outline',     text: 'Gana por cada entrega' },
      { icon: 'trophy-outline',   text: 'Bonos por productividad' },
      { icon: 'bicycle-outline',  text: 'Usa tu propio vehículo' },
      { icon: 'card-outline',     text: 'Cobro semanal automático' },
    ],
  },
];

const STATS = [
  { value: '500+', label: 'Tupperers\nactivos' },
  { value: '$9k',  label: 'Ingreso\npromedio/mes' },
  { value: '15+',  label: 'Ciudades\ncubiertas' },
];

const STEPS = [
  { icon: 'clipboard-outline',       title: 'Aplica',          desc: 'Llena el formulario en minutos' },
  { icon: 'checkmark-circle-outline', title: 'Te contactamos', desc: 'En menos de 24 horas' },
  { icon: 'rocket-outline',           title: '¡Empieza!',      desc: 'Comienza a ganar de inmediato' },
];

const DAYS = [1, 2, 3, 4, 5, 6, 7];

interface StepperProps {
  value: number;
  onDec: () => void;
  onInc: () => void;
  label: string;
  suffix?: string;
  unit?: string;
  hint?: string;
  colors: AppColors;
}

const Stepper = ({ value, onDec, onInc, label, suffix = '', unit = '', hint, colors }: StepperProps) => (
  <View style={{ borderBottomWidth: 1, borderBottomColor: colors.borderLight }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
      <Text style={{ fontSize: 14, color: colors.text, fontWeight: '500', flex: 1 }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity
          style={{
            width: 36, height: 36, borderRadius: 18, borderWidth: 1.5,
            borderColor: colors.primary, justifyContent: 'center', alignItems: 'center',
            backgroundColor: colors.primaryLight,
          }}
          onPress={onDec} activeOpacity={0.7}
        >
          <Icon name="remove" size={18} color={colors.primary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text, minWidth: 56, textAlign: 'center' }}>
          {suffix}{value}{unit}
        </Text>
        <TouchableOpacity
          style={{
            width: 36, height: 36, borderRadius: 18, borderWidth: 1.5,
            borderColor: colors.primary, justifyContent: 'center', alignItems: 'center',
            backgroundColor: colors.primaryLight,
          }}
          onPress={onInc} activeOpacity={0.7}
        >
          <Icon name="add" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
    {hint ? (
      <Text style={{ fontSize: 11, color: colors.textLight, paddingBottom: 8, lineHeight: 15 }}>
        💡 {hint}
      </Text>
    ) : null}
  </View>
);

const WorkWithUs = () => {
  const { colors, isDark } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  // Form
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [email,   setEmail]   = useState('');
  const [city,    setCity]    = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calculator
  const [calcTab,         setCalcTab]         = useState<'tupperer' | 'repartidor'>('tupperer');
  const [chefDays,        setChefDays]        = useState(5);
  const [chefDishes,      setChefDishes]      = useState(10);
  const [chefPrice,       setChefPrice]       = useState(80);
  const [chefIngredPct,   setChefIngredPct]   = useState(30);
  const [delDays,         setDelDays]         = useState(5);
  const [delPerDay,       setDelPerDay]       = useState(8);
  const [delEarning,      setDelEarning]      = useState(35);
  const [delGasCost,      setDelGasCost]      = useState(800);

  const WEEKS = 4.3;
  const chefGross       = Math.round(chefDays * chefDishes * chefPrice * WEEKS);
  const chefIngredCost  = Math.round(chefGross * chefIngredPct / 100);
  const chefCommission  = Math.round(chefGross * 0.15);
  const chefNet         = chefGross - chefIngredCost - chefCommission;
  const delDeliveries   = Math.round(delDays * delPerDay * WEEKS);
  const delGross        = delDeliveries * delEarning;
  const delExpenses     = Math.round(delGross * 0.05);
  const delNet          = delGross - delExpenses - delGasCost;

  const fmt = (n: number) => `$${n.toLocaleString('es-MX')}`;

  const handleApply = () => {
    if (!selectedRole) { Alert.alert('Elige un rol', 'Selecciona si quieres ser Tupperer o Repartidor.'); return; }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa nombre, teléfono y correo.');
      return;
    }
    setSubmitted(true);
  };

  const activeRole = ROLES.find(r => r.id === selectedRole);

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />
        <View style={styles.successWrap}>
          <View style={[styles.successIcon, { backgroundColor: '#F0FDF4' }]}>
            <Icon name="checkmark-circle" size={64} color="#22C55E" />
          </View>
          <Text style={styles.successTitle}>¡Solicitud enviada!</Text>
          <Text style={styles.successSub}>
            Gracias {name.split(' ')[0]}, nos pondremos en contacto contigo en menos de 24 horas al {phone}.
          </Text>
          <TouchableOpacity style={styles.successBtn} onPress={() => {
            setSubmitted(false); setSelectedRole(null);
            setName(''); setPhone(''); setEmail(''); setCity(''); setMessage('');
          }}>
            <Text style={styles.successBtnText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Icon name="briefcase" size={34} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Trabaja con nosotros</Text>
          <Text style={styles.heroSub}>Sé tu propio jefe y gana dinero haciendo lo que amas</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Role cards */}
        <Text style={styles.sectionTitle}>Elige tu rol</Text>
        {ROLES.map(role => {
          const isSelected = selectedRole === role.id;
          return (
            <TouchableOpacity
              key={String(role.id)}
              style={[styles.roleCard, isSelected && { borderColor: role.color, borderWidth: 2 }]}
              onPress={() => setSelectedRole(isSelected ? null : role.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.roleHeader, { backgroundColor: role.bg }]}>
                <View style={[styles.roleIconWrap, { backgroundColor: role.color }]}>
                  <Icon name={role.icon} size={28} color="#fff" />
                </View>
                <View style={styles.roleHeaderText}>
                  <Text style={[styles.roleLabel, { color: role.color }]}>{role.label}</Text>
                  <Text style={styles.roleTagline}>{role.tagline}</Text>
                </View>
                <View style={[styles.radioOuter, isSelected && { borderColor: role.color }]}>
                  {isSelected && <View style={[styles.radioInner, { backgroundColor: role.color }]} />}
                </View>
              </View>
              <View style={styles.perksGrid}>
                {role.perks.map((perk, i) => (
                  <View key={i} style={styles.perkItem}>
                    <Icon name={perk.icon} size={16} color={role.color} />
                    <Text style={styles.perkText}>{perk.text}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* ── Earnings calculator ── */}
        <Text style={styles.sectionTitle}>Calculadora de ganancias</Text>
        <View style={styles.calcCard}>

          {/* Tab switcher */}
          <View style={styles.calcTabs}>
            {(['tupperer', 'repartidor'] as const).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.calcTab, calcTab === tab && styles.calcTabActive]}
                onPress={() => setCalcTab(tab)}
                activeOpacity={0.8}
              >
                <Icon
                  name={tab === 'tupperer' ? 'restaurant-outline' : 'bicycle-outline'}
                  size={15}
                  color={calcTab === tab ? colors.white : colors.gray500}
                />
                <Text style={[styles.calcTabText, calcTab === tab && styles.calcTabTextActive]}>
                  {tab === 'tupperer' ? 'Tupperer' : 'Repartidor'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {calcTab === 'tupperer' ? (
            <>
              {/* Days pill selector */}
              <Text style={styles.calcFieldLabel}>Días que cocinas a la semana</Text>
              <View style={styles.daysRow}>
                {DAYS.map(d => (
                  <TouchableOpacity
                    key={d}
                    style={[styles.dayPill, chefDays === d && styles.dayPillActive]}
                    onPress={() => setChefDays(d)}
                  >
                    <Text style={[styles.dayPillText, chefDays === d && styles.dayPillTextActive]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Stepper
                label="Platillos por día"
                value={chefDishes}
                onDec={() => setChefDishes(v => Math.max(1, v - 1))}
                onInc={() => setChefDishes(v => Math.min(50, v + 1))}
                hint="Un tupperer promedio vende 8–15 platillos al día"
                colors={colors}
              />
              <Stepper
                label="Precio promedio por platillo"
                value={chefPrice}
                suffix="$"
                onDec={() => setChefPrice(v => Math.max(50, v - 10))}
                onInc={() => setChefPrice(v => Math.min(500, v + 10))}
                hint="El precio promedio de un platillo casero es $70–$120"
                colors={colors}
              />
              <Stepper
                label="Costo de ingredientes"
                value={chefIngredPct}
                unit="%"
                onDec={() => setChefIngredPct(v => Math.max(5, v - 5))}
                onInc={() => setChefIngredPct(v => Math.min(70, v + 5))}
                hint="El costo típico de ingredientes es 25–40 % del precio de venta"
                colors={colors}
              />

              {/* Result */}
              <View style={styles.resultBox}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Platillos al mes</Text>
                  <Text style={styles.resultValue}>{Math.round(chefDays * chefDishes * WEEKS)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Ingresos brutos</Text>
                  <Text style={styles.resultValue}>{fmt(chefGross)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Ingredientes ({chefIngredPct} %)</Text>
                  <Text style={[styles.resultValue, { color: colors.danger }]}>−{fmt(chefIngredCost)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Comisión Tupperfy (15 %)</Text>
                  <Text style={[styles.resultValue, { color: colors.danger }]}>−{fmt(chefCommission)}</Text>
                </View>
                <View style={styles.resultDivider} />
                <View style={styles.resultRow}>
                  <Text style={styles.resultNetLabel}>✨ Tus ganancias netas</Text>
                  <Text style={[styles.resultNetValue, { color: '#7C3AED' }]}>{fmt(chefNet)}</Text>
                </View>
                <Text style={styles.resultNote}>Estimado mensual · Los resultados pueden variar</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.calcFieldLabel}>Días que trabajas a la semana</Text>
              <View style={styles.daysRow}>
                {DAYS.map(d => (
                  <TouchableOpacity
                    key={d}
                    style={[styles.dayPill, delDays === d && styles.dayPillActive]}
                    onPress={() => setDelDays(d)}
                  >
                    <Text style={[styles.dayPillText, delDays === d && styles.dayPillTextActive]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Stepper
                label="Entregas por día"
                value={delPerDay}
                onDec={() => setDelPerDay(v => Math.max(1, v - 1))}
                onInc={() => setDelPerDay(v => Math.min(30, v + 1))}
                hint="Un repartidor promedio completa 6–10 entregas al día"
                colors={colors}
              />
              <Stepper
                label="Ganancia por entrega"
                value={delEarning}
                suffix="$"
                onDec={() => setDelEarning(v => Math.max(20, v - 5))}
                onInc={() => setDelEarning(v => Math.min(200, v + 5))}
                hint="La ganancia promedio por entrega es de $30–$50"
                colors={colors}
              />
              <Stepper
                label="Gasolina al mes"
                value={delGasCost}
                suffix="$"
                onDec={() => setDelGasCost(v => Math.max(0, v - 100))}
                onInc={() => setDelGasCost(v => Math.min(5000, v + 100))}
                hint="El gasto promedio en gasolina es de $600–$1,200 al mes"
                colors={colors}
              />

              {/* Result */}
              <View style={styles.resultBox}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Entregas al mes</Text>
                  <Text style={styles.resultValue}>{delDeliveries}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Ingresos brutos</Text>
                  <Text style={styles.resultValue}>{fmt(delGross)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Otros gastos (5 %)</Text>
                  <Text style={[styles.resultValue, { color: colors.danger }]}>−{fmt(delExpenses)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Gasolina</Text>
                  <Text style={[styles.resultValue, { color: colors.danger }]}>−{fmt(delGasCost)}</Text>
                </View>
                <View style={styles.resultDivider} />
                <View style={styles.resultRow}>
                  <Text style={styles.resultNetLabel}>✨ Tus ganancias netas</Text>
                  <Text style={[styles.resultNetValue, { color: '#059669' }]}>{fmt(delNet)}</Text>
                </View>
                <Text style={styles.resultNote}>Estimado mensual · Los resultados pueden variar</Text>
              </View>
            </>
          )}
        </View>

        {/* How it works */}
        <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
        <View style={styles.stepsCard}>
          {STEPS.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepNumber}>{i + 1}</Text>
                </View>
                {i < STEPS.length - 1 && <View style={styles.stepLine} />}
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepIconWrap}>
                  <Icon name={step.icon} size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Application form */}
        <Text style={styles.sectionTitle}>Aplica ahora</Text>
        <View style={styles.formCard}>
          {activeRole && (
            <View style={[styles.selectedRoleBanner, { backgroundColor: activeRole.bg }]}>
              <Icon name={activeRole.icon} size={18} color={activeRole.color} />
              <Text style={[styles.selectedRoleText, { color: activeRole.color }]}>
                Aplicando como {activeRole.label}
              </Text>
              <TouchableOpacity onPress={() => setSelectedRole(null)}>
                <Icon name="close-circle" size={18} color={activeRole.color} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Nombre completo *</Text>
            <View style={styles.inputWrap}>
              <Icon name="person-outline" size={16} color={colors.gray400} />
              <TextInput style={styles.input} placeholder="Tu nombre" placeholderTextColor={colors.textLight} value={name} onChangeText={setName} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Teléfono *</Text>
            <View style={styles.inputWrap}>
              <Icon name="call-outline" size={16} color={colors.gray400} />
              <TextInput style={styles.input} placeholder="81 0000 0000" placeholderTextColor={colors.textLight} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Correo electrónico *</Text>
            <View style={styles.inputWrap}>
              <Icon name="mail-outline" size={16} color={colors.gray400} />
              <TextInput style={styles.input} placeholder="tu@correo.com" placeholderTextColor={colors.textLight} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Ciudad</Text>
            <View style={styles.inputWrap}>
              <Icon name="location-outline" size={16} color={colors.gray400} />
              <TextInput style={styles.input} placeholder="Monterrey, CDMX…" placeholderTextColor={colors.textLight} value={city} onChangeText={setCity} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Cuéntanos sobre ti (opcional)</Text>
            <View style={[styles.inputWrap, styles.textAreaWrap]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="¿Tienes experiencia cocinando? ¿Qué te motiva?"
                placeholderTextColor={colors.textLight}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
            <Icon name="rocket-outline" size={18} color="#fff" />
            <Text style={styles.applyBtnText}>Enviar solicitud</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Al enviar aceptas nuestros Términos de uso y Política de privacidad.
          </Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: spacing.md },

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
  heroTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 6 },
  heroSub: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: spacing.lg, lineHeight: 20 },

  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  statCard: {
    flex: 1, backgroundColor: colors.card, borderRadius: radius.lg,
    padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.primary, marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textAlign: 'center', lineHeight: 15 },

  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },

  roleCard: {
    backgroundColor: colors.card, borderRadius: radius.xl,
    borderWidth: 1.5, borderColor: colors.border,
    marginBottom: spacing.md, overflow: 'hidden', ...shadows.sm,
  },
  roleHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  roleIconWrap: { width: 52, height: 52, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  roleHeaderText: { flex: 1 },
  roleLabel: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
  roleTagline: { fontSize: 13, color: colors.textSecondary },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6 },
  perksGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: spacing.md, paddingTop: 0, gap: 10 },
  perkItem: { flexDirection: 'row', alignItems: 'center', gap: 6, width: '46%' },
  perkText: { fontSize: 12, color: colors.textSecondary, flex: 1, lineHeight: 16 },

  // Calculator
  calcCard: {
    backgroundColor: colors.card, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.lg, ...shadows.sm,
  },
  calcTabs: {
    flexDirection: 'row', backgroundColor: colors.surface,
    borderRadius: radius.md, padding: 3, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  calcTab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 5, paddingVertical: 9, borderRadius: radius.sm,
  },
  calcTabActive: { backgroundColor: colors.primary, ...shadows.sm },
  calcTabText: { fontSize: 13, fontWeight: '700', color: colors.gray500 },
  calcTabTextActive: { color: colors.white },

  calcFieldLabel: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, marginBottom: 8 },
  daysRow: { flexDirection: 'row', gap: 6, marginBottom: spacing.md },
  dayPill: {
    flex: 1, paddingVertical: 10, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.border, alignItems: 'center',
    backgroundColor: colors.surface,
  },
  dayPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayPillText: { fontSize: 13, fontWeight: '700', color: colors.gray500 },
  dayPillTextActive: { color: colors.white },

  stepperRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  stepperLabel: { fontSize: 14, color: colors.text, fontWeight: '500', flex: 1 },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepperBtn: {
    width: 36, height: 36, borderRadius: 18, borderWidth: 1.5,
    borderColor: colors.primary, justifyContent: 'center', alignItems: 'center',
    backgroundColor: colors.primaryLight,
  },
  stepperValue: { fontSize: 17, fontWeight: '800', color: colors.text, minWidth: 56, textAlign: 'center' },

  resultBox: {
    marginTop: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.lg, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  resultLabel: { fontSize: 13, color: colors.textSecondary },
  resultValue: { fontSize: 14, fontWeight: '700', color: colors.text },
  resultDivider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  resultNetLabel: { fontSize: 15, fontWeight: '800', color: colors.text },
  resultNetValue: { fontSize: 20, fontWeight: '900' },
  resultNote: { fontSize: 11, color: colors.textLight, marginTop: 8, textAlign: 'center' },

  stepsCard: {
    backgroundColor: colors.card, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.lg, ...shadows.sm,
  },
  stepRow: { flexDirection: 'row', gap: spacing.md, minHeight: 64 },
  stepLeft: { alignItems: 'center', width: 28 },
  stepBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  stepNumber: { color: '#fff', fontWeight: '800', fontSize: 13 },
  stepLine: { flex: 1, width: 2, backgroundColor: colors.borderLight, marginVertical: 4 },
  stepContent: { flex: 1, flexDirection: 'row', gap: spacing.sm, paddingBottom: spacing.md },
  stepIconWrap: { width: 38, height: 38, borderRadius: radius.md, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  stepTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  stepDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },

  formCard: {
    backgroundColor: colors.card, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.md, ...shadows.sm,
  },
  selectedRoleBanner: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.md,
  },
  selectedRoleText: { flex: 1, fontSize: 14, fontWeight: '700' },
  field: { marginBottom: spacing.md },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, height: 46,
  },
  textAreaWrap: { height: undefined, alignItems: 'flex-start', paddingVertical: spacing.sm },
  input: { flex: 1, fontSize: 14, color: colors.text },
  textArea: { minHeight: 90, lineHeight: 20 },
  applyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, backgroundColor: colors.primary,
    borderRadius: radius.md, paddingVertical: 15, marginTop: spacing.sm, ...shadows.md,
  },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  disclaimer: { fontSize: 11, color: colors.textLight, textAlign: 'center', marginTop: spacing.sm, lineHeight: 16 },

  successWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl, gap: spacing.md },
  successIcon: { width: 110, height: 110, borderRadius: 55, justifyContent: 'center', alignItems: 'center', ...shadows.md },
  successTitle: { fontSize: 24, fontWeight: '800', color: colors.text },
  successSub: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  successBtn: { marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 14, paddingHorizontal: spacing.xxl, ...shadows.md },
  successBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default WorkWithUs;
