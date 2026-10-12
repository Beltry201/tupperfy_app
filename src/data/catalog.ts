// `icon` names a MaterialCommunityIcons glyph (not an emoji) — render with
// <MaterialCommunityIcon name={cat.icon} />.
export const CATEGORIES = [
  { id: 'all',       label: 'Todo',       icon: 'silverware-fork-knife' },
  { id: 'comidas',   label: 'Comidas',    icon: 'pot-steam-outline' },
  { id: 'veganas',   label: 'Vegano',     icon: 'leaf' },
  { id: 'bebidas',   label: 'Bebidas',    icon: 'cup-outline' },
  { id: 'postres',   label: 'Postres',    icon: 'cupcake' },
  { id: 'congelados',label: 'Congelados', icon: 'snowflake' },
];

const PEOPLE  = ['José', 'María', 'Pedro', 'Lucía', 'Carlos', 'Ana', 'Miguel', 'Laura'];
const RATINGS = ['4.5', '4.7', '4.8', '4.9', '5.0'];
const TIMES   = ['15 min', '20 min', '25 min', '30 min', '35 min'];

// Each dish is linked to a category so filtering works out of the box
const DISH_CATALOG = [
  // comidas
  { dish: 'Arepas',       category: 'comidas' },
  { dish: 'Paella',       category: 'comidas' },
  { dish: 'Sushi',        category: 'comidas' },
  { dish: 'Pizza',        category: 'comidas' },
  { dish: 'Hamburguesa',  category: 'comidas' },
  { dish: 'Pasta',        category: 'comidas' },
  { dish: 'Ramen',        category: 'comidas' },
  { dish: 'Ceviche',      category: 'comidas' },
  { dish: 'Empanadas',    category: 'comidas' },
  { dish: 'Tacos',        category: 'comidas' },
  // veganas
  { dish: 'Ensalada Verde',     category: 'veganas' },
  { dish: 'Bowl de Quinoa',     category: 'veganas' },
  { dish: 'Tacos Veganos',      category: 'veganas' },
  { dish: 'Curry de Garbanzos', category: 'veganas' },
  { dish: 'Wrap Vegano',        category: 'veganas' },
  // bebidas
  { dish: 'Jugo Natural',   category: 'bebidas' },
  { dish: 'Smoothie',       category: 'bebidas' },
  { dish: 'Agua de Jamaica', category: 'bebidas' },
  { dish: 'Limonada',       category: 'bebidas' },
  { dish: 'Té Helado',      category: 'bebidas' },
  // postres
  { dish: 'Brownie',             category: 'postres' },
  { dish: 'Helado Artesanal',    category: 'postres' },
  { dish: 'Flan',                category: 'postres' },
  { dish: 'Churros',             category: 'postres' },
  { dish: 'Pastel de Chocolate', category: 'postres' },
  // congelados
  { dish: 'Lasaña Congelada', category: 'congelados' },
  { dish: 'Pizza Congelada',  category: 'congelados' },
  { dish: 'Burritos',         category: 'congelados' },
  { dish: 'Nuggets',          category: 'congelados' },
  { dish: 'Tamales',          category: 'congelados' },
];

const makeItems = (count: number, prefix: string, seed: number) =>
  Array.from({ length: count }, (_, i) => {
    const entry = DISH_CATALOG[(seed + i * 3) % DISH_CATALOG.length];
    return {
      id:       `${prefix}-${i}`,
      person:   PEOPLE[(seed * 2 + i * 5) % PEOPLE.length],
      dish:     entry.dish,
      category: entry.category,
      price:    `$${((seed * 13 + i * 7 + 20) % 80) + 15}`,
      rating:   RATINGS[(seed + i) % RATINGS.length],
      time:     TIMES[(seed * 2 + i) % TIMES.length],
    };
  });

export const popularItems      = makeItems(10, 'pop',  1);
export const mostSearchedItems = makeItems(10, 'ms',   3);
export const nearestItems      = makeItems(10, 'near', 5);
export const newestItems       = makeItems(10, 'new',  7);

export type Item = typeof popularItems[0];

export const ALL_ITEMS: Item[] = [...popularItems, ...mostSearchedItems, ...nearestItems, ...newestItems];
