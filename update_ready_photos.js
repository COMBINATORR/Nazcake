const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const levenImport = require('leven');
const leven = typeof levenImport === 'function' ? levenImport : (levenImport.default || (() => 10));

const READY_DIR = path.join(__dirname, 'Фото', 'Готовые фото');
const IMAGES_DIR = path.join(__dirname, 'images');

// Explicit mapping dictionary for Russian names & aliases to images/ files
const MAP_OVERRIDE = {
  // Выпечка / Хлеб
  'булочка с сухофруктами': ['pastry_bun_dryfruit.webp'],
  'булочка с творогом': ['pastry_bun_cottage.webp'],
  'булочка со сгущенкой': ['pastry_bun_condensed.webp'],
  'булочка без начинки': ['pastry_bun_plain.webp'],
  'ливерные пирожки': ['pastry_pirog_liver.webp'],
  'бауырсаки': ['bread_baursaki.webp'],
  'блины без начинки': ['bread_pancakes_plain.webp'],
  'блины с мясом': ['bread_pancakes_meat.webp'],
  'булочка для бургера': ['bread_burger.webp'],
  'косички': ['bread_kosichki.webp'],
  'ржаной хлеб': ['bread_rye.webp'],
  'ржаные тандырные лепёшки': ['bread_rye_flatbread.webp'],
  'сайка': ['bread_saika.webp'],
  'тандыр лепёшки': ['bread_flatbread.webp'],
  'чесночный мини батон': ['bread_garlic.webp'],
  'чайный набор': ['pastry_tea_set.webp', 'Чайный набор.webp'],
  'пирожки с картошкой': ['Пирожки с картошкой.webp'],
  'пирожки с мясом': ['Пирожки с мясом и капустой.webp'],
  'сочники': ['pastry_sochnik.webp'],

  // Пироги
  'маковый пирог': ['pie_poppy.webp'],
  'микс пироги': ['pie_mix.webp'],
  'мясной пирог': ['pie_meat_round.webp'],
  'мясной пирог (прямоугольный)': ['pie_meat_rect.webp'],
  'пирог с сухофруктами': ['pie_dryfruit.webp'],
  'пирог с творогом со сгущенкой': ['pie_cottage_condensed.webp', 'pie_curd_condensed.webp'],
  'пирог с творогом': ['pie_curd.webp', 'pie_curd_large.webp'],
  'пирог карамель': ['pie_caramel.webp'],
  'сметанник': ['pie_smetannik.webp'],
  'пирог сникерс': ['pie_snickers.webp'],

  // Пирожные (Desserts / Порционные)
  'банановый': ['dessert_banana.webp'],
  'банофи пай': ['dessert_banoffee.webp'],
  'карамельный': ['dessert_caramel.webp'],
  'карамельный с оформлением': ['dessert_caramel_design.webp'],
  'шоколадный с оформлением': ['dessert_chocolate_design.webp'],
  'шоколадный': ['dessert_chocolate.webp'],
  'орео': ['dessert_oreo.webp'],
  'морковный': ['dessert_carrot.webp'],
  'медовик': ['dessert_medovik.webp'],
  'молочная девочка': ['dessert_milk_girl.webp'],
  'красный бархат': ['dessert_red_velvet.webp'],
  'сникерс': ['dessert_snickers.webp'],
  'королевский': ['dessert_royal.webp'],
  'фисташковый': ['dessert_pistachio.webp'],
  'фисташка-малина': ['dessert_pistachio_raspberry.webp'],
  'чизкейк': ['dessert_cheesecake.webp'],
  'эклер': ['dessert_ekler.webp'],
  'эклеры': ['dessert_ekler.webp'],
  'эклер в шоколаде': ['dessert_ekler_choco.webp'],
  'муровейник': ['dessert_muraveynik.webp'],
  'наполеон': ['dessert_napoleon.webp'],
  'павлова': ['dessert_pavlova.webp'],
  'рыжик': ['dessert_ryzhik.webp'],
  'пирожное шу': ['Пирожное Шу.webp', 'pastry_shu.webp'],
  'трубочки с кремом': ['Трубочки с кремом.webp', 'pastry_tubes.webp'],
  'воздушный сникерс': ['dessert_snickers_airy.webp'],
  'красный капкейк': ['dessert_cupcake_red_plain.webp'],
  'шоколадный капкейк': ['dessert_cupcake_choco.webp'],

  // Торты (Cakes)
  'банановый торт': ['cake_banana.webp', 'Банановый торт.webp'],
  'банофи пай торт': ['cake_banoffee.webp', 'Торт Баноффи пай.webp'],
  'испанский чизкейк': ['cake_cheesecake_spanish.webp', 'Торт Испанский чизкейк.webp'],
  'медовый торт': ['cake_medovik.webp', 'Торт медовый.webp'],
  'морковный торт': ['cake_carrot.webp', 'Морковный торт.webp'],
  'торт медовый': ['cake_medovik.webp', 'Торт медовый.webp'],
  'торт молочная девочка': ['cake_milk_girl.webp', 'Торт молочная девочка.webp'],
  'торт орео': ['cake_oreo.webp', 'Торт Орео.webp'],
  'торт сникерс': ['cake_snickers.webp', 'Торт сникерс.webp'],
  'торт фисташка малина': ['cake_pistachio_raspberry.webp', 'Фисташковый торт.webp'],
  'шоколадный торт': ['cake_chocolate.webp', 'Шоколадный торт.webp'],
  'торт красный бархат': ['cake_red_velvet.webp', 'Торт красный бархат.webp'],
  'торт королевский': ['cake_royal.webp', 'Королевский торт.webp'],
  'торт вупи пай': ['cake_whoopie_pie.webp', 'Торт вупипай.webp'],
  'торт графские развалины': ['cake_ruins.webp', 'Торт Графские развалины.webp'],
  'торт наполеон': ['cake_napoleon.webp', 'Торт наполеон.webp'],
  'торт киткат': ['cake_kitkat.webp', 'Торт киткат.webp'],
  'торт эстерхази': ['cake_esterhazy.webp', 'Торт Эстерхазе.webp'],
  'мишка на севере': ['Торт Мишка на севере.webp', 'cake_mishka_na_severe.webp'],
  'тары чизкейк': ['Торт Тары Чизкейк.webp', 'Тары Чизкейк (половина).webp', 'cake_cheesecake_tary.webp'],

  // Ягодные торты и капкейки (Berry variants)
  'молочная девочка с ягодами': ['berry_milk_girl.webp'],
  'чизкейк с ягодами': ['berry_cheesecake.webp'],
  'сникерс с ягодами': ['berry_snickers.webp'],
  'орео с ягодами': ['berry_oreo.webp'],
  'павлова с ягодами': ['berry_pavlova.webp'],
  'королевский с ягодами': ['berry_royal.webp'],
  'нуттела с ягодами': ['berry_nutella.webp'],
  'красный капкейк с ягодами': ['berry_cupcake_red.webp'],
  'шоколадный капкейк с ягодами': ['berry_cupcake_choco.webp'],

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
