-- ─────────────────────────────────────────────────────────────────────────────
-- TUPPERFY — Seed data
-- Ejecutar DESPUÉS de schema.sql en: Supabase Dashboard → SQL Editor
-- Crea 3 chefs demo y 30 platillos
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  chef1 uuid := '11111111-1111-1111-1111-111111111111';
  chef2 uuid := '22222222-2222-2222-2222-222222222222';
  chef3 uuid := '33333333-3333-3333-3333-333333333333';
BEGIN

-- ─── Auth users (requiere acceso al schema auth, disponible en SQL Editor) ──
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, role, aud)
VALUES
  (chef1, 'maria.garcia@tupperfy.com',    crypt('Tupperfy2024!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"full_name":"María García"}',    'authenticated', 'authenticated'),
  (chef2, 'carlos.rodriguez@tupperfy.com', crypt('Tupperfy2024!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"full_name":"Carlos Rodríguez"}', 'authenticated', 'authenticated'),
  (chef3, 'ana.martinez@tupperfy.com',    crypt('Tupperfy2024!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"full_name":"Ana Martínez"}',    'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- ─── Profiles ────────────────────────────────────────────────────────────────
INSERT INTO profiles (id, role, full_name, city, is_verified, rating)
VALUES
  (chef1, 'tupperer', 'María García',    'Monterrey', true, 4.9),
  (chef2, 'tupperer', 'Carlos Rodríguez','Monterrey', true, 4.8),
  (chef3, 'tupperer', 'Ana Martínez',    'Monterrey', true, 4.9)
ON CONFLICT (id) DO NOTHING;

-- ─── Tupperer profiles ────────────────────────────────────────────────────────
INSERT INTO tupperer_profiles (id, kitchen_name, kitchen_description, specialties, is_open)
VALUES
  (chef1, 'Cocina de María',    'Comida casera mexicana con recetas tradicionales de familia', ARRAY['comidas','antojitos'], true),
  (chef2, 'El Rincón de Carlos','Especialista en paellas, pastas y cocina mediterránea',       ARRAY['comidas','congelados'], true),
  (chef3, 'Dulces de Ana',      'Repostería artesanal, bebidas naturales y postres gourmet',   ARRAY['postres','bebidas'], true)
ON CONFLICT (id) DO NOTHING;

-- ─── Dishes ───────────────────────────────────────────────────────────────────
INSERT INTO dishes (tupperer_id, name, description, price, category, rating, preparation_minutes, is_available, is_featured)
VALUES
  -- María García — comidas
  (chef1, 'Arepas',         'Arepas venezolanas rellenas de queso blanco y pollo desmechado',         65,  'comidas',    4.8, 25, true,  true),
  (chef1, 'Tacos',          'Tacos de carne asada con guacamole, cebolla y cilantro frescos',         75,  'comidas',    4.9, 20, true,  true),
  (chef1, 'Empanadas',      'Empanadas horneadas de carne picada y queso manchego',                   55,  'comidas',    4.7, 30, true,  false),
  (chef1, 'Ceviche',        'Ceviche fresco de camarón con jitomate, pepino y tostadas',              95,  'comidas',    4.8, 15, true,  true),
  (chef1, 'Ramen',          'Ramen tradicional con caldo de hueso de cerdo, huevo y chashu',          110, 'comidas',    4.6, 45, true,  false),
  -- María García — vegano
  (chef1, 'Ensalada Verde', 'Ensalada mixta de espinaca, arúgula, pepino y aderezo de limón',        60,  'vegano',     4.5, 10, true,  false),
  (chef1, 'Bowl de Quinoa', 'Bowl de quinoa con verduras asadas, aguacate y tahini',                  90,  'vegano',     4.8, 20, true,  false),
  (chef1, 'Tacos Veganos',  'Tacos de frijoles negros, maíz y aguacate en tortilla de maíz',         70,  'vegano',     4.6, 20, true,  false),
  (chef1, 'Curry de Garbanzos','Curry vegano de garbanzos con leche de coco y arroz basmati',         85,  'vegano',     4.7, 35, true,  false),
  (chef1, 'Wrap Vegano',    'Wrap de espinaca con hummus, pimientos asados y aguacate',               75,  'vegano',     4.5, 15, true,  false),
  -- Carlos Rodríguez — comidas
  (chef2, 'Paella',         'Paella valenciana con mariscos frescos, azafrán y limón',                145, 'comidas',    4.9, 60, true,  true),
  (chef2, 'Pizza',          'Pizza artesanal de masa madre con mozzarella y albahaca fresca',         125, 'comidas',    4.8, 40, true,  true),
  (chef2, 'Hamburguesa',    'Hamburguesa gourmet 200g con queso cheddar, tocino y papas fritas',      115, 'comidas',    4.7, 25, true,  true),
  (chef2, 'Pasta',          'Pasta fresca casera con salsa bolognesa de res y cerdo',                 95,  'comidas',    4.8, 35, true,  false),
  (chef2, 'Sushi',          'Rolls de salmón, atún y aguacate con salsa ponzu y jengibre',            155, 'comidas',    4.9, 45, true,  false),
  -- Carlos Rodríguez — congelados
  (chef2, 'Lasaña Congelada','Lasaña tradicional italiana lista para calentar, porción familiar',    85,  'congelados', 4.7, 5,  true,  false),
  (chef2, 'Pizza Congelada', 'Pizza de pepperoni lista para hornear a 180°C por 15 min',              75,  'congelados', 4.5, 5,  true,  false),
  (chef2, 'Burritos',       'Burritos de pollo, arroz y frijoles congelados, pack de 4',              65,  'congelados', 4.6, 5,  true,  false),
  (chef2, 'Nuggets',        'Nuggets caseros de pollo empanizado, pack de 20 piezas',                 70,  'congelados', 4.5, 5,  true,  false),
  (chef2, 'Tamales',        'Tamales de rajas con queso listos para recalentar al vapor, pack de 6', 80,  'congelados', 4.8, 5,  true,  false),
  -- Ana Martínez — bebidas
  (chef3, 'Jugo Natural',   'Jugo de naranja recién exprimido, 500ml sin azúcar añadida',            45,  'bebidas',    4.9, 5,  true,  true),
  (chef3, 'Smoothie',       'Smoothie de fresa, plátano y leche de almendras, 500ml',                55,  'bebidas',    4.8, 5,  true,  true),
  (chef3, 'Agua de Jamaica', 'Agua fresca de jamaica artesanal sin conservadores, 1L',                35,  'bebidas',    4.7, 5,  true,  false),
  (chef3, 'Limonada',       'Limonada natural con menta y jengibre, 500ml',                          40,  'bebidas',    4.8, 5,  true,  false),
  (chef3, 'Té Helado',      'Té helado de durazno artesanal, sin azúcar, 500ml',                     45,  'bebidas',    4.6, 5,  true,  false),
  -- Ana Martínez — postres
  (chef3, 'Brownie',        'Brownie de chocolate belga con nueces y caramelo salado',               55,  'postres',    4.9, 30, true,  true),
  (chef3, 'Helado Artesanal','Helado artesanal de vainilla con canela y trozos de nuez, 250ml',      65,  'postres',    4.8, 0,  true,  false),
  (chef3, 'Flan',           'Flan de queso cremoso con cajeta y nuez, porción individual',           50,  'postres',    4.9, 40, true,  true),
  (chef3, 'Churros',        'Churros crujientes con azúcar, canela y chocolate caliente para dip',   55,  'postres',    4.8, 20, true,  false),
  (chef3, 'Pastel de Chocolate','Rebanada de pastel de chocolate húmedo con ganache y fresas',       75,  'postres',    4.9, 45, true,  true);

END $$;
