const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const workspaceDir = 'c:/Users/ASUS/Desktop/Nazcake';
const envPath = path.join(workspaceDir, '.env');

const envContent = fs.readFileSync(envPath, 'utf8');
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

const regions = [
  'ap-southeast-1', 'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-north-1',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'sa-east-1', 'ca-central-1'
];

async function findDatabaseHost() {
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    const connectionString = `postgresql://postgres.${projectRef}:test_pwd@${host}:5432/postgres`;
    const client = new Client({ connectionString, connectionTimeoutMillis: 3000 });
    try {
      await client.connect();
      await client.end();
      return host;
    } catch (e) {
      if (e.message.includes('password authentication failed')) {
        return host;
      }
    }
  }
  throw new Error("Could not discover host");
}

async function run() {
  const dbHost = await findDatabaseHost();
  const connectionString = `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@${dbHost}:5432/postgres`;
  const client = new Client({ connectionString });
  await client.connect();
  
  const query = `
    SELECT id, name, category, badge, in_stock 
    FROM products 
    WHERE id IN ('cake_mishka_na_severe', 'dessert_cream_horns', 'dessert_meringue_caramel', 'dessert_choux', 'pastry_samsa_chicken_mushroom', 'pastry_pirozhki_potato', 'pastry_pirozhki_meat_cabbage');
  `;
  const res = await client.query(query);
  console.table(res.rows);
  
  await client.end();
}

run().catch(console.error);
