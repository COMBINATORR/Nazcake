const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const levenImport = require('leven');
const leven = typeof levenImport === 'function' ? levenImport : (levenImport.default || (() => 10));

const READY_DIR = path.join(__dirname, 'Фото', 'Готовые фото');
const IMAGES_DIR = path.join(__dirname, 'images');

// Explicit mapping dictionary for Russian names & aliases to images/ files
const MAP_OVERRIDE = {
  'булочка с сухофруктами': ['pastry_bun_dryfruit.webp'],
  'булочка с творогом': ['pastry_bun_cottage.webp'],
  'карамель': ['dessert_caramel.webp', 'pie_caramel.webp'],
  'карамельный с оформлением': ['dessert_caramel_design.webp'],
  'котлеты': ['semi_kotlety.webp', 'Котлеты.webp'],
  'ливерные пирожки': ['pastry_pirog_liver.webp'],
  'шоколадный с оформлением': ['dessert_chocolate_design.webp'],
  'эклер в шоколаде': ['dessert_ekler_choco.webp'],
  'эклеры': ['dessert_ekler.webp'],
  'банановый торт': ['dessert_banana.webp', 'Банановый торт.webp'],
  'банофи пай торт': ['dessert_banoffee.webp', 'Торт Баноффи пай.webp'],
  'бауырсаки': ['bread_baursaki.webp'],
  'блины без начинки': ['bread_pancakes_plain.webp'],
  'булочка для бургера': ['bread_burger.webp'],
  'испанский чизкейк': ['Торт Испанский чизкейк.webp', 'dessert_cheesecake.webp'],
  'косички': ['bread_kosichki.webp'],
  'маковый пирог': ['pie_poppy.webp'],
  'медовый торт': ['dessert_medovik.webp', 'Торт медовый.webp'],
  'миренговый рулет': ['Миренговый рулет.webp'],
  'мишка на севере': ['Торт Мишка на севере.webp'],
  'морковный торт': ['dessert_carrot.webp', 'Морковный торт.webp'],
  'пирог с сухофруктами': ['pie_dryfruit.webp'],
  'пирог с творогом со сгущенкой': ['pie_cottage_condensed.webp'],
  'пирог с творогом': ['pie_curd.webp'],
  'пирожки с картошкой': ['Пирожки с картошкой.webp'],
  'пирожки с мясом': ['Пирожки с мясом и капустой.webp', 'bread_pancakes_meat.webp'],
  'пирожное шу': ['Пирожное Шу.webp'],
  'ржаной хлеб': ['bread_rye.webp'],
  'ржаные тандырные лепёшки': ['bread_rye_flatbread.webp'],
  'сайка': ['bread_saika.webp'],
  'сигара борек': ['semi_borek.webp', 'Сигара борек.webp'],
  'слоёное тесто': ['semi_dough_puff.webp', 'Слоёное тесто.webp'],
  'сметанник': ['pie_smetannik.webp'],
  'тандыр лепёшки': ['bread_flatbread.webp'],
  'тары чизкейк': ['Торт Тары Чизкейк.webp', 'Тары Чизкейк (половина).webp'],
  'тефтели с мясом': ['semi_tefteli.webp', 'Тефтели.webp'],
  'торт вупи пай': ['Торт вупипай.webp', 'berry_milk_girl.webp'],
  'торт графские развалины': ['Торт Графские развалины.webp'],
  'торт королевский': ['dessert_royal.webp', 'Королевский торт.webp'],
  'торт красный бархат': ['dessert_red_velvet.webp', 'Торт красный бархат.webp'],
  'торт медовый': ['Торт медовый.webp', 'dessert_medovik.webp'],
  'торт молочная девочка': ['dessert_milk_girl.webp', 'Торт молочная девочка.webp'],
  'торт орео': ['dessert_oreo.webp', 'Торт Орео.webp'],
  'торт сникерс': ['dessert_snickers.webp', 'Торт сникерс.webp'],
  'торт фисташка малина': ['dessert_pistachio_raspberry.webp', 'Фисташковый торт.webp'],
  'трубочки с кремом': ['Трубочки с кремом.webp'],
  'чайный набор': ['pastry_tea_set.webp', 'Чайный набор.webp'],
  'чесночный мини батон': ['bread_garlic.webp'],
  'шоколадный торт': ['dessert_chocolate.webp', 'Шоколадный торт.webp'],

  // Полуфабрикаты (Semi-finished products)
  'фрикадельки': ['semi_meatballs.webp'],
  'голубцы': ['semi_golubtsy.webp', 'Голубцы.webp'],
  'пельмени домашние': ['semi_pelmeni.webp', 'Пельмени.webp'],
  'манты с говядиной': ['semi_manty.webp', 'Манты.webp'],
  'чебуреки': ['semi_chebureki.webp', 'Чебукери.webp'],
  'вареники': ['semi_vareniki.webp', 'Вареники.webp'],
  'тесто для бауырсаков': ['semi_dough_baursak.webp', 'Тесто для бауырсаков.webp'],
  'чечевичный суп': ['semi_soup_lentil.webp', 'Чечевичный суп.webp'],
  'говяжий бульон': ['semi_beef_broth.webp', 'Бульон говяжий.webp'],
  'тесто для бешбармака': ['semi_dough_beshbarmak.webp', 'Тесто для бешбармака.webp']
};

async function processAllReadyPhotos() {
  if (!fs.existsSync(READY_DIR)) {
    console.error('Directory Готовые фото does not exist');
    return;
  }

  const readyFiles = fs.readdirSync(READY_DIR);
  const targetImageFiles = fs.readdirSync(IMAGES_DIR);

  console.log(`Found ${readyFiles.length} ready files to process.`);

  let updatedCount = 0;

  for (const file of readyFiles) {
    const readyFilePath = path.join(READY_DIR, file);
    const ext = path.extname(file);
    if (!['.jpg', '.jpeg', '.webp', '.png'].includes(ext.toLowerCase())) continue;

    const baseNameNoExt = file.substring(0, file.length - ext.length).trim();
    const cleanKey = baseNameNoExt.toLowerCase().replace(/\s*\(\d+\)$/, '').trim();

    let targetTargets = [];

    // 1. Direct override mapping
    if (MAP_OVERRIDE[cleanKey]) {
      targetTargets = MAP_OVERRIDE[cleanKey];
    } 
    // 2. Exact match in images/
    else if (targetImageFiles.includes(`${baseNameNoExt}.webp`)) {
      targetTargets = [`${baseNameNoExt}.webp`];
    }
    else if (targetImageFiles.includes(file)) {
      targetTargets = [file];
    } 
    // 3. Leven / Fuzzy match
    else {
      for (const imgFile of targetImageFiles) {
        const imgName = path.basename(imgFile, path.extname(imgFile)).toLowerCase();
        if (imgName === cleanKey || leven(imgName, cleanKey) <= 2) {
          targetTargets.push(imgFile);
        }
      }
    }

    if (targetTargets.length === 0) {
      console.log(`[SKIP] No match found for: ${file}`);
      continue;
    }

    console.log(`[PROCESS] ${file} ===> ${targetTargets.join(', ')}`);

    try {
      // Process image: 600x600 square crop, high quality WebP
      const buffer = await sharp(readyFilePath)
        .resize(600, 600, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 82 })
        .toBuffer();

      for (const targetName of targetTargets) {
        const destPath = path.join(IMAGES_DIR, targetName);
        fs.writeFileSync(destPath, buffer);
        console.log(`  ✓ Updated ${destPath}`);
        updatedCount++;
      }
    } catch (err) {
      console.error(`  ✕ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\nFinished! Total updated target image files in site: ${updatedCount}`);
}

processAllReadyPhotos();
