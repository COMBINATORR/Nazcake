const { Client } = require('pg');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (match) {
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

const anonKey = env.SUPABASE_ANON_KEY;
const dbPassword = env.SUPABASE_DB_PASSWORD;

const payloadBase64 = anonKey.split('.')[1];
const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
const projectRef = payload.ref;

async function checkProducts() {
  const connectionString = `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`;
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected to Supabase.");
    
    const ids = [
      'cake_mishka_na_severe', 
      'dessert_cream_horns', 
      'dessert_meringue_caramel', 
      'dessert_choux', 
      'pastry_samsa_chicken_mushroom', 
      'pastry_pirozhki_potato', 
      'pastry_pirozhki_meat_cabbage'
    ];
    
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');
    const query = `SELECT id, name, category, badge, in_stock FROM products WHERE id IN (${placeholders})`;
    
    const res = await client.query(query, ids);
    console.table(res.rows);
    console.log(`Found ${res.rows.length} products out of ${ids.length}`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

checkProducts();
