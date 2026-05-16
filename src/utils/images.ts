const DISH_IMAGES: Record<string, string> = {
  Arepas: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&q=80',
  Paella: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80',
  Sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
  Pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
  Hamburguesa: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
  Ensalada: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
  Pasta: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&q=80',
  Ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80',
  Ceviche: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=500&q=80',
  Empanadas: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80';

export const getDishImage = (dishName: string): string =>
  DISH_IMAGES[dishName] ?? DEFAULT_IMAGE;
