-- Nazcake: allow product/order updates from the website admin
-- Run in Supabase Dashboard → SQL Editor
--
-- Why: the site uses the anon key. SELECT works, but UPDATE returns HTTP 200
-- with 0 rows when RLS blocks writes — admin changes then only lived in memory
-- until refresh. The site also saves overrides to localStorage as a fallback.
--
-- Option A (simple, matches password-only admin in the frontend):
-- open UPDATE/DELETE for anon on products & orders. Anyone who knows the
-- project URL + anon key could write; acceptable for a small bakery site
-- if you also keep the admin UI password.

-- PRODUCTS
DROP POLICY IF EXISTS "Allow public read products" ON public.products;
DROP POLICY IF EXISTS "Allow public update products" ON public.products;
DROP POLICY IF EXISTS "nazcake_products_select" ON public.products;
DROP POLICY IF EXISTS "nazcake_products_update" ON public.products;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nazcake_products_select"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "nazcake_products_update"
  ON public.products FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ORDERS (status changes + clear history)
DROP POLICY IF EXISTS "nazcake_orders_select" ON public.orders;
DROP POLICY IF EXISTS "nazcake_orders_update" ON public.orders;
DROP POLICY IF EXISTS "nazcake_orders_delete" ON public.orders;
DROP POLICY IF EXISTS "nazcake_orders_insert" ON public.orders;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nazcake_orders_select"
  ON public.orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "nazcake_orders_insert"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "nazcake_orders_update"
  ON public.orders FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "nazcake_orders_delete"
  ON public.orders FOR DELETE
  TO anon, authenticated
  USING (true);

-- Option B (safer): only authenticated users may write.
-- 1) Create an Auth user (email/password) in Supabase Authentication.
-- 2) Log in from the admin form with that email + password.
-- 3) Replace the UPDATE policies above with:
--
-- CREATE POLICY "nazcake_products_update_auth"
--   ON public.products FOR UPDATE
--   TO authenticated
--   USING (true) WITH CHECK (true);
--
-- (and drop the anon UPDATE policies)
