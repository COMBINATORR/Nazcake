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

const updates = [
  {
    id: 'cake_mishka_na_severe',
    desc: 'Домашний торт по классическому рецепту. Сметанные коржи прослоены нежным сметанным кремом и покрыты шоколадной глазурью.',
    ingredients: 'Мука, сахар, яйцо, сметана, какао, сливочное масло, разрыхлитель, шоколад (для глазури). Аллергены: глютен, молоко, яйца.'
  },
  {
    id: 'dessert_cream_horns',
    desc: 'Хрустящие слоеные трубочки, щедро наполненные воздушным белковым кремом. Вкус из детства (250гр).',
    ingredients: 'Слоеное тесто (мука, сливочное масло, вода, соль), яичный белок, сахар, лимонная кислота, ванилин. Аллергены: глютен, молоко, яйца.'
  },
  {
    id: 'dessert_meringue_caramel',
    desc: 'Воздушное хрустящее безе, скрепленное между собой нежной домашней карамелью и сливочным кремом.',
    ingredients: 'Яичный белок, сахар, вареное сгущенное молоко, сливочное масло. Аллергены: яйца, молоко.'
  },
  {
    id: 'dessert_choux',
    desc: 'Нежное заварное пирожное с хрустящей корочкой (кракелин) и тающим во рту сливочным кремом.',
    ingredients: 'Мука, сливочное масло, яйцо, вода, соль, заварной крем со сливками, сахар. Аллергены: глютен, молоко, яйца.'
  },
  {
    id: 'pastry_samsa_chicken_mushroom',
    desc: 'Сытная хрустящая самса из слоеного теста с сочной начинкой из куриного филе и шампиньонов.',
    ingredients: 'Мука, сливочное масло, соль, вода, куриное филе, грибы шампиньоны, лук, специи, яйцо (для смазывания), кунжут. Аллергены: глютен, молоко, яйца, кунжут.'
  },
  {
    id: 'pastry_pirozhki_potato',
    desc: 'Мягкие, воздушные домашние пирожки из дрожжевого теста с нежным картофельным пюре и жареным луком.',
    ingredients: 'Мука, дрожжи, вода, молоко, сахар, соль, растительное масло, картофель, лук репчатый, сливочное масло, яйцо. Аллергены: глютен, молоко, яйца.'
  },
  {
    id: 'pastry_pirozhki_meat_cabbage',
    desc: 'Сытные домашние пирожки из воздушного дрожжевого теста с начинкой из говяжьего фарша и тушеной капусты.',
    ingredients: 'Мука, дрожжи, молоко, сахар, соль, масло растительное, говяжий фарш, капуста белокочанная, лук, специи, яйцо. Аллергены: глютен, молоко, яйца.'
  }
];

async function run() {
  const dbHost = await findDatabaseHost();
  const connectionString = `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@${dbHost}:5432/postgres`;
  const client = new Client({ connectionString });
  await client.connect();
  
  const query = `
    UPDATE public.products
    SET "desc" = data."desc",
        ingredients = data.ingredients
    FROM json_to_recordset($1::json) AS data(id text, "desc" text, ingredients text)
    WHERE public.products.id = data.id;
  `;
  await client.query(query, [JSON.stringify(updates)]);
  updates.forEach(p => console.log("Updated in DB:", p.id));
  
  await client.end();
}

run().catch(console.error);
