const SUPABASE_URL = "https://wuqxqxjskviaptxswojz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cXhxeGpza3ZpYXB0eHN3b2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMjM0MTksImV4cCI6MjA5OTU5OTQxOX0.bv24jib8hPJyaL1mV4kJd5d8o92zBIg603RqEMIsc7A";

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
