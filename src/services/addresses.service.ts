import { supabase } from '../lib/supabase';
import type { Address } from '../context/AppContext';

function mapRow(row: any): Address {
  return { id: row.id, address: row.full_address, type: row.label };
}

export async function fetchAddresses(userId: string): Promise<Address[]> {
  const { data, error } = await supabase
    .from('consumer_addresses')
    .select('*')
    .eq('consumer_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function createAddress(
  userId: string,
  address: string,
  type: string,
): Promise<Address> {
  const { data, error } = await supabase
    .from('consumer_addresses')
    .insert({ consumer_id: userId, full_address: address, label: type, latitude: 0, longitude: 0 })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function deleteAddress(id: string) {
  const { error } = await supabase.from('consumer_addresses').delete().eq('id', id);
  if (error) throw error;
}

export async function setDefaultAddress(userId: string, addressId: string | null) {
  await supabase
    .from('consumer_addresses')
    .update({ is_default: false })
    .eq('consumer_id', userId);
  if (addressId) {
    await supabase
      .from('consumer_addresses')
      .update({ is_default: true })
      .eq('id', addressId);
  }
}

export async function getDefaultAddressId(userId: string): Promise<string | null> {
  const { data } = await supabase
    .from('consumer_addresses')
    .select('id')
    .eq('consumer_id', userId)
    .eq('is_default', true)
    .maybeSingle();
  return data?.id ?? null;
}
