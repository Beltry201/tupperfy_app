const LOCAL_IMAGES: Record<string, number> = {
  'Lasaña Congelada': require('../../assets/images/dishes/lasana.png'),
  Tamales:            require('../../assets/images/dishes/tamales.png'),
  Churros:            require('../../assets/images/dishes/churros.png'),
  'Jugo Natural':     require('../../assets/images/dishes/jugo-natural.png'),
  Flan:               require('../../assets/images/dishes/flan.png'),
};

export type DishImageSource = { uri: string } | number;

const DISH_IMAGES: Record<string, string> = {
  // ── Comidas ───────────────────────────────────────────────────────────────
  Arepas:
    'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&q=80',
  Paella:
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80',
  Sushi:
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
  Pizza:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
  Hamburguesa:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
  Pasta:
    'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&q=80',
  Ramen:
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80',
  Ceviche:
    'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=500&q=80',
  Empanadas:
    'https://images.unsplash.com/photo-1604374806571-e3d35bbbdeb5?w=500&q=80',
  Tacos:
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80',

  // ── Veganas ───────────────────────────────────────────────────────────────
  Ensalada:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
  'Ensalada Verde':
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
  'Bowl de Quinoa':
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80',
  'Tacos Veganos':
    'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80',
  'Curry de Garbanzos':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80',
  'Wrap Vegano':
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80',

  // ── Bebidas ───────────────────────────────────────────────────────────────
  'Jugo Natural':
    'https://images.unsplash.com/photo-1621506289937-a8e0df240bf2?w=500&q=80',
  Smoothie:
    'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=500&q=80',
  'Agua de Jamaica':
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80',
  Limonada:
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80',
  'Té Helado':
    'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80',

  // ── Postres ───────────────────────────────────────────────────────────────
  Brownie:
    'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=80',
  'Helado Artesanal':
    'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80',
  Flan:
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
  Churros:
    'https://images.unsplash.com/photo-1624371414361-e670edf4b17b?w=500&q=80',
  'Pastel de Chocolate':
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80',

  // ── Congelados ────────────────────────────────────────────────────────────
  'Lasaña Congelada':
    'https://images.unsplash.com/photo-1574894709920-11b28b5b9c80?w=500&q=80',
  'Pizza Congelada':
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
  Burritos:
    'https://images.unsplash.com/photo-1584208124888-9b29c48d9b2a?w=500&q=80',
  Nuggets:
    'https://images.unsplash.com/photo-1562802378-063ec186a863?w=500&q=80',
  Tamales:
    'https://images.unsplash.com/photo-1620489955668-1d8b8c03eafa?w=500&q=80',
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80';

export const getDishImage = (dishName: string): DishImageSource =>
  LOCAL_IMAGES[dishName] ?? { uri: DISH_IMAGES[dishName] ?? DEFAULT_IMAGE };
