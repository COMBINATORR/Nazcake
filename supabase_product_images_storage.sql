-- =============================================================================
-- Nazcake: Supabase Storage for admin product photos
-- Run ONCE in Supabase Dashboard → SQL Editor (as project owner)
-- =============================================================================
-- After this, admin panel uploads photos to bucket "product-images" and writes
-- the public URL into public.products.image — visible to all site visitors.
--
-- Requires: admin login via Supabase Auth (authenticated role), same as product UPDATE.
-- =============================================================================

-- 1) Public bucket (readable by everyone, writable only by authenticated admin)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB per file
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2) Storage policies (drop old names if re-running)
DROP POLICY IF EXISTS "nazcake_product_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "nazcake_product_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "nazcake_product_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "nazcake_product_images_auth_delete" ON storage.objects;

-- Anyone can view product photos (storefront)
CREATE POLICY "nazcake_product_images_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- Only logged-in admin can upload
CREATE POLICY "nazcake_product_images_auth_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

-- Replace / upsert
CREATE POLICY "nazcake_product_images_auth_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

-- Cleanup old photos when replacing
CREATE POLICY "nazcake_product_images_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- 3) Ensure products.image can hold full Storage URLs (not VARCHAR(255) only)
-- Safe if already text; skip errors if type is already fine.
DO $$
BEGIN
  ALTER TABLE public.products
    ALTER COLUMN image TYPE text;
EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'products.image type left as-is: %', SQLERRM;
END $$;

-- Done. Test: log into site admin → change product photo → Save → open URL in products.image
