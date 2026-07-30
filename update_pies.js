require("dotenv").config();
const SUPABASE_URL = process.env.SUPABASE_URL || "https://wuqxqxjskviaptxswojz.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE_ANON_KEY environment variable");
  process.exit(1);
}

async function updatePies() {
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  // 1. Update pie_fruits_large
  let res1 = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.pie_fruits_large`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ image: 'images/pie_dryfruit.webp', category: 'pies' })
  });
  console.log("pie_fruits_large update status:", res1.status);

  // 2. Update pie_curd_large
  let res2 = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.pie_curd_large`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ image: 'images/pie_curd.webp', category: 'pies' })
  });
  console.log("pie_curd_large update status:", res2.status);
}

updatePies();
