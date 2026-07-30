require('dotenv').config();
const SUPABASE_URL = "https://wuqxqxjskviaptxswojz.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

async function deleteProduct() {
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  let res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.cake_custom_celebration`, {
    method: 'DELETE',
    headers
  });
  console.log("Delete status:", res.status);
}

deleteProduct();
