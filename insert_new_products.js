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

const newProducts = [
  {
    id: 'cake_mishka_na_severe',
    name: 'Торт Мишка на севере',
    category: 'cakes',
    price: 6500,
    unit: 'шт.',
    image: 'images/Торт Мишка на севере.webp',
    desc: 'Торт Мишка на севере',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: JSON.stringify([{"size":"20 см","price":6500},{"size":"24 см","price":8500}]),
    is_custom_name: false
  },
  {
    id: 'dessert_cream_horns',
    name: 'Трубочки с кремом',
    category: 'desserts',
    price: 1600,
    unit: 'уп',
    image: 'images/Трубочки с кремом.webp',
    desc: 'Трубочки с кремом (250гр)',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: null,
    is_custom_name: false
  },
  {
    id: 'dessert_meringue_caramel',
    name: 'Безе с карамелью',
    category: 'desserts',
    price: 2100,
    unit: 'уп',
    image: 'images/Безе с карамелью.webp',
    desc: 'Безе с карамелью',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: null,
    is_custom_name: false
  },
  {
    id: 'dessert_choux',
    name: 'Пирожное Шу',
    category: 'desserts',
    price: 400,
    unit: 'шт.',
    image: 'images/Пирожное Шу.webp',
    desc: 'Пирожное Шу',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: null,
    is_custom_name: false
  },
  {
    id: 'pastry_samsa_chicken_mushroom',
    name: 'Самса с курицей и грибами',
    category: 'pastries',
    price: 350,
    unit: 'шт.',
    image: 'images/Самса с курицей и грибами.webp',
    desc: 'Самса с курицей и грибами',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: null,
    is_custom_name: false
  },
  {
    id: 'pastry_pirozhki_potato',
    name: 'Пирожки с картошкой',
    category: 'pastries',
    price: 140,
    unit: 'шт.',
    image: 'images/Пирожки с картошкой.webp',
    desc: 'Пирожки с картошкой',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: null,
    is_custom_name: false
  },
  {
    id: 'pastry_pirozhki_meat_cabbage',
    name: 'Пирожки с мясом и капустой',
    category: 'pastries',
    price: 210,
    unit: 'шт.',
    image: 'images/Пирожки с мясом и капустой.webp',
    desc: 'Пирожки с мясом и капустой',
    ingredients: '',
    badge: 'новинка',
    in_stock: true,
    stock: null,
    size_options: null,
    is_custom_name: false
  }
];

async function run() {
  const dbHost = await findDatabaseHost();
  const connectionString = `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@${dbHost}:5432/postgres`;
  const client = new Client({ connectionString });
  await client.connect();
  
  for (const p of newProducts) {
    const query = `
      INSERT INTO public.products 
      (id, name, category, price, unit, image, "desc", ingredients, badge, in_stock, stock, size_options, is_custom_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        price = EXCLUDED.price,
        unit = EXCLUDED.unit,
        image = EXCLUDED.image,
        badge = EXCLUDED.badge,
        size_options = EXCLUDED.size_options;
    `;
    const values = [
      p.id, p.name, p.category, p.price, p.unit, p.image, p.desc, p.ingredients,
      p.badge, p.in_stock, p.stock, p.size_options, p.is_custom_name
    ];
    await client.query(query, values);
    console.log("Upserted:", p.id);
  }
  
  await client.end();
}

run().catch(console.error);
