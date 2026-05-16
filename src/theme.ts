export const lightColors = {
  primary: '#006BFF',
  primaryDark: '#0052CC',
  primaryLight: '#EBF3FF',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceAlt: '#F0F4FF',
  card: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  danger: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  star: '#FBBF24',
  orange: '#FF5C35',
  divider: '#F3F4F6',
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray900: '#111827',
};

export const darkColors = {
  primary: '#4D9FFF',
  primaryDark: '#2B80FF',
  primaryLight: '#0D2B4E',
  background: '#0F172A',
  surface: '#0F172A',
  surfaceAlt: '#1A2436',
  card: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textLight: '#64748B',
  border: '#334155',
  borderLight: '#1E293B',
  danger: '#F87171',
  success: '#4ADE80',
  warning: '#FCD34D',
  star: '#FBBF24',
  orange: '#FF7B5C',
  divider: '#1E293B',
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#1E293B',
  gray200: '#334155',
  gray300: '#475569',
  gray400: '#64748B',
  gray500: '#94A3B8',
  gray600: '#CBD5E1',
  gray900: '#F1F5F9',
};

// Default export for backward-compat (light colors)
export const colors = lightColors;

export type AppColors = typeof lightColors;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '700' as const },
  h4: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodySmall: { fontSize: 13, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  price: { fontSize: 15, fontWeight: '700' as const },
  label: { fontSize: 13, fontWeight: '600' as const },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
