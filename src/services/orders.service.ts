import { supabase } from '../lib/supabase';
import type { CartItem } from '../context/AppContext';

const PAYMENT_MAP: Record<string, string> = {
  card: 'card',
  mercadopago: 'transfer',
  cash: 'cash',
};

export async function createOrder(params: {
  userId: string;
  cartItems: CartItem[];
  deliveryAddress: string;
  deliveryNotes: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  tipAmount: number;
  total: number;
}) {
  const tuppererId = params.cartItems[0]?.item?.chefId ?? null;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      consumer_id: params.userId,
      tupperer_id: tuppererId,
      status: 'pending',
      delivery_address: params.deliveryAddress || 'Sin dirección',
      delivery_latitude: 0,
      delivery_longitude: 0,
      subtotal: params.subtotal,
      delivery_fee: params.deliveryFee,
      total: params.total,
      payment_method: PAYMENT_MAP[params.paymentMethod] ?? 'cash',
      consumer_notes: params.deliveryNotes || null,
    })
    .select()
    .single();
  if (orderError) throw orderError;

  const items = params.cartItems.map(ci => ({
    order_id: order.id,
    dish_id: ci.item.id,
    dish_name: ci.item.dish,
    dish_photo: null,
    quantity: ci.quantity,
    unit_price: parseFloat(ci.item.price?.replace(/[^0-9.]/g, '') || '0'),
    subtotal: parseFloat(ci.item.price?.replace(/[^0-9.]/g, '') || '0') * ci.quantity,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(items);
  if (itemsError) throw itemsError;

  return order;
}
