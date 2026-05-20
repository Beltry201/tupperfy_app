-- ─────────────────────────────────────────────────────────────────────────────
-- TUPPERFY — Schema para Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- ENUMS
CREATE TYPE user_role    AS ENUM ('consumer', 'tupperer');
CREATE TYPE order_status AS ENUM ('pending','preparing','on_the_way','delivered','cancelled');
CREATE TYPE payment_method AS ENUM ('cash','card','transfer');

-- PROFILES (extends auth.users)
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role          user_role NOT NULL DEFAULT 'consumer',
  full_name     TEXT NOT NULL,
  phone         TEXT,
  avatar_url    TEXT,
  city          TEXT DEFAULT 'Monterrey',
  is_verified   BOOLEAN DEFAULT FALSE,
  rating        DECIMAL(3,2) DEFAULT 5.0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- TUPPERER PROFILES (chefs)
CREATE TABLE tupperer_profiles (
  id                   UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  kitchen_name         TEXT NOT NULL,
  kitchen_description  TEXT,
  specialties          TEXT[],
  is_open              BOOLEAN DEFAULT TRUE,
  total_orders         INTEGER DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- DISHES
CREATE TABLE dishes (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tupperer_id          UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name                 TEXT NOT NULL,
  description          TEXT,
  price                DECIMAL(10,2) NOT NULL,
  category             TEXT NOT NULL DEFAULT 'comidas', -- comidas, vegano, bebidas, postres, congelados
  main_photo_url       TEXT,
  rating               DECIMAL(3,2) DEFAULT 5.0,
  preparation_minutes  INTEGER DEFAULT 30,
  is_available         BOOLEAN DEFAULT TRUE,
  is_featured          BOOLEAN DEFAULT FALSE,
  total_orders         INTEGER DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- CONSUMER ADDRESSES
CREATE TABLE consumer_addresses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label        TEXT DEFAULT 'Casa',
  full_address TEXT NOT NULL,
  latitude     DECIMAL(10,8) NOT NULL DEFAULT 0,
  longitude    DECIMAL(11,8) NOT NULL DEFAULT 0,
  is_default   BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumer_id         UUID NOT NULL REFERENCES profiles(id),
  tupperer_id         UUID REFERENCES profiles(id),
  status              order_status NOT NULL DEFAULT 'pending',
  delivery_address    TEXT NOT NULL,
  delivery_latitude   DECIMAL(10,8) DEFAULT 0,
  delivery_longitude  DECIMAL(11,8) DEFAULT 0,
  subtotal            DECIMAL(10,2) NOT NULL,
  delivery_fee        DECIMAL(10,2) DEFAULT 10,
  total               DECIMAL(10,2) NOT NULL,
  payment_method      payment_method DEFAULT 'cash',
  consumer_notes      TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE order_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  dish_id      UUID REFERENCES dishes(id),
  dish_name    TEXT NOT NULL,
  dish_photo   TEXT,
  quantity     INTEGER NOT NULL DEFAULT 1,
  unit_price   DECIMAL(10,2) NOT NULL,
  subtotal     DECIMAL(10,2) NOT NULL
);

-- ─── INDEXES ────────────────────────────────────────────────────────────────
CREATE INDEX idx_dishes_tupperer  ON dishes(tupperer_id);
CREATE INDEX idx_dishes_category  ON dishes(category);
CREATE INDEX idx_dishes_available ON dishes(is_available);
CREATE INDEX idx_orders_consumer  ON orders(consumer_id);
CREATE INDEX idx_orders_status    ON orders(status);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────
ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tupperer_profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items        ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles públicos"         ON profiles FOR SELECT USING (true);
CREATE POLICY "Usuario edita su perfil"   ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Usuario inserta su perfil" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Tupperer profiles
CREATE POLICY "Tupperer profiles públicos" ON tupperer_profiles FOR SELECT USING (true);
CREATE POLICY "Tupperer edita su perfil"   ON tupperer_profiles FOR ALL   USING (auth.uid() = id);

-- Dishes
CREATE POLICY "Platillos públicos"            ON dishes FOR SELECT USING (true);
CREATE POLICY "Tupperer gestiona sus platos"  ON dishes FOR ALL    USING (auth.uid() = tupperer_id);

-- Addresses
CREATE POLICY "Direcciones propias" ON consumer_addresses FOR ALL USING (auth.uid() = consumer_id);

-- Orders
CREATE POLICY "Ver pedidos propios"    ON orders FOR SELECT USING (auth.uid() = consumer_id OR auth.uid() = tupperer_id);
CREATE POLICY "Crear pedido"           ON orders FOR INSERT WITH CHECK (auth.uid() = consumer_id);
CREATE POLICY "Actualizar pedido"      ON orders FOR UPDATE USING (auth.uid() = consumer_id OR auth.uid() = tupperer_id);

-- Order items
CREATE POLICY "Ver items de pedido" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.consumer_id = auth.uid() OR orders.tupperer_id = auth.uid()))
);
CREATE POLICY "Insertar items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.consumer_id = auth.uid())
);

-- ─── TRIGGER updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_dishes_updated_at   BEFORE UPDATE ON dishes   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── AUTO-CREATE PROFILE ON SIGNUP ────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'consumer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── REALTIME ─────────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
