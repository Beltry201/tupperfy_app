import { supabase } from '../lib/supabase';

export interface AppItem {
  id: string;
  dish: string;
  person: string;
  price: string;
  rating: string;
  time: string;
  category: string;
  description?: string;
  chefId?: string;
}

const CATEGORY_MAP: Record<string, string> = {
  comidas:    'comidas',
  vegano:     'ensaladas',
  bebidas:    'bebidas',
  postres:    'postres',
  congelados: 'otros',
};

function mapDish(dish: any): AppItem {
  return {
    id: dish.id,
    dish: dish.name,
    person: dish.tupperer?.tupperer_profiles?.kitchen_name ?? dish.tupperer?.full_name ?? 'Chef',
    price: `$${Number(dish.price).toFixed(0)}`,
    rating: Number(dish.rating).toFixed(1),
    time: `${dish.preparation_minutes} min`,
    category: dish.category,
    description: dish.description ?? undefined,
    chefId: dish.tupperer?.id,
  };
}

export async function fetchDishes(appCategory?: string, search?: string): Promise<AppItem[]> {
  let query = supabase
    .from('dishes')
    .select(`
      *,
      tupperer:profiles!dishes_tupperer_id_fkey(
        id, full_name, avatar_url,
        tupperer_profiles(kitchen_name)
      )
    `)
    .eq('is_available', true);

  if (appCategory && appCategory !== 'all') {
    const dbCat = CATEGORY_MAP[appCategory] ?? appCategory;
    query = query.eq('category', dbCat);
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,tupperer.full_name.ilike.%${search}%`);
  }

  query = query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapDish);
}
