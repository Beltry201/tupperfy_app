import { supabase } from '../lib/supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  phone?: string,
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (authError) throw authError;
  if (!authData.user) throw new Error('No se pudo crear el usuario');

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: authData.user.id,
    full_name: fullName,
    phone: phone ?? null,
    role: 'consumer',
  });
  if (profileError) throw profileError;

  return authData;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}
