// Premium Page Preloader removal logic
window.addEventListener("load", () => {
  const preloader = document.getElementById("page-preloader");
  if (preloader) {
    if (sessionStorage.getItem("nazcake_preloader_shown")) {
      preloader.remove();
      document.body.classList.remove("preloader-active");
      return;
    }

    setTimeout(() => {
      preloader.classList.add("fade-out");
      document.body.classList.remove("preloader-active");
      sessionStorage.setItem("nazcake_preloader_shown", "true");
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 1600); // 1.6s minimum display time for the sequence
  } else {
    document.body.classList.remove("preloader-active");
  }
});

const CONFIG = {
  TELEGRAM_BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN",
  TELEGRAM_CHAT_ID: "YOUR_TELEGRAM_CHAT_ID"
};

// Confectionery Nazcake App Logic

// Product Catalog Data
let products = [
  {
    id: "bread_burger",
    name: "Булочка для бургера",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 120,
    unit: "шт.",
    image: "images/bread_burger.webp",
    desc: "Свежая, невероятно мягкая и воздушная пшеничная булочка, посыпанная кунжутом. Отлично подходит для домашних бургеров.",
    ingredients: "Мука пшеничная высшего сорта, кунжут, молоко, яйца, сливочное масло, сахар, дрожжи, соль.",
    badge: "свежее"
  },
  {
    id: "bread_baursaki",
    name: "Бауырсаки",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 70,
    unit: "шт.",
    image: "images/bread_baursaki.webp",
    desc: "Традиционные золотистые бауырсаки. Нежные внутри и хрустящие снаружи. Готовятся непосредственно перед доставкой.",
    ingredients: "Пшеничная мука, молоко, дрожжи, сахар, соль, растительное масло.",
    badge: "бестселлер"
  },
  {
    id: "bread_rye",
    name: "Ржаной хлеб",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 120,
    unit: "шт.",
    image: "images/bread_rye.webp",
    desc: "Классический ржаной хлеб с хрустящей корочкой и плотным мякишем. Богат витаминами и клетчаткой.",
    ingredients: "Мука ржаная, вода питьевая, солод ржаной, закваска, соль.",
    badge: ""
  },
  {
    id: "bread_garlic_baguette",
    name: "Чесночный мини батон",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 130,
    unit: "шт.",
    image: "images/bread_garlic.webp",
    desc: "Ароматный мини-батон с начинкой из чесночного масла и зелени. Отлично подходит к супам и основным блюдам.",
    ingredients: "Мука пшеничная, чеснок свежий, зелень укропа, сливочное масло, соль.",
    badge: "свежее"
  },
  {
    id: "bread_sayka",
    name: "Сайка",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 120,
    unit: "шт.",
    image: "images/bread_saika.webp",
    desc: "Традиционная пшеничная сайка с нежным молочным вкусом и мягкой корочкой. Отличный выбор для завтрака.",
    ingredients: "Мука пшеничная высшего сорта, молоко пастеризованное, масло сливочное, сахар, дрожжи.",
    badge: ""
  },
  {
    id: "bread_kosichki",
    name: "Косички",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 130,
    unit: "шт.",
    image: "images/bread_kosichki.webp",
    desc: "Ароматная плетеная сдобная косичка с легким сахарным сиропом и румяной корочкой. Идеально к горячему чаю.",
    ingredients: "Дрожжевое сдобное тесто, молоко, сливочное масло, сахарный сироп, кунжутная обсыпка.",
    badge: ""
  },
  {
    id: "bread_pancakes_meat",
    name: "Блины с мясом",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 350,
    unit: "шт.",
    image: "images/bread_pancakes_meat.webp",
    desc: "Сытные и нежные домашние блины с начинкой из сочного фарша с луком и специями.",
    ingredients: "Тесто для блинов (молоко, мука, яйца, сахар), фарш говяжий, лук репчатый, перец черный, соль.",
    badge: "бестселлер"
  },
  {
    id: "bread_pancakes_plain",
    name: "Блины без начинки",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 150,
    unit: "шт.",
    image: "images/bread_pancakes_plain.webp",
    desc: "Тонкие, кружевные домашние блины на молоке. Подаются горячими с любыми топингами на ваш выбор.",
    ingredients: "Мука пшеничная, молоко, яйца куриные, подсолнечное масло, сахар, соль.",
    badge: ""
  },
  {
    id: "bread_rye_flatbread",
    name: "Ржаные тандырные лепешки",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 160,
    unit: "шт.",
    image: "images/bread_rye_flatbread.webp",
    desc: "Полезная и ароматная лепешка из ржаной муки, выпекаемая в традиционном тандыре с посыпкой из семян.",
    ingredients: "Ржаная мука, пшеничная мука, вода, кунжут, соль.",
    badge: ""
  },
  {
    id: "bread_flatbread",
    name: "Тандырные лепешки",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 160,
    unit: "шт.",
    image: "images/bread_tandoor_flatbread.webp",
    desc: "Классическая пышная тандырная лепешка с хрустящей корочкой и мягким центром. Выпекается по старинным рецептам.",
    ingredients: "Мука пшеничная высшего сорта, вода питьевая, сухие дрожжи, кунжут черный, соль.",
    badge: "свежее"
  },
  {
    id: "pastry_samsa_meat",
    name: "Самса с мясом",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 250,
    unit: "шт.",
    image: "images/pastry_samsa_meat.webp",
    desc: "Хрустящая слоеная самса с начинкой из сочного фарша с луком и специями.",
    ingredients: "Слоеное тесто, говядина, репчатый лук, черный перец, соль.",
    badge: "свежее"
  },
  {
    id: "pastry_samsa_liver",
    name: "Самса с печенью",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 250,
    unit: "шт.",
    image: "images/pastry_samsa_liver.webp",
    desc: "Ароматная самса с сытной и сочной начинкой из говяжьей печени с луком.",
    ingredients: "Слоеное тесто, печень говяжья, лук, сливочное масло, перец, соль.",
    badge: ""
  },
  {
    id: "pastry_samsa_chicken",
    name: "Самса с курицей и с сыром",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 250,
    unit: "шт.",
    image: "images/pastry_samsa_chicken.webp",
    desc: "Нежная самса с начинкой из сочного куриного филе и тянущегося сыра.",
    ingredients: "Слоеное тесто, филе куриное, сыр, лук, специи, соль.",
    badge: "новое"
  },
  {
    id: "pastry_samsa_cabbage",
    name: "Самса с мясом и капустой",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 250,
    unit: "шт.",
    image: "images/pastry_samsa_cabbage.webp",
    desc: "Сытная самса с традиционным сочетанием мясного фарша и сочной тушеной капусты.",
    ingredients: "Слоеное тесто, говядина, свежая капуста, лук, сливочное масло, специи.",
    badge: ""
  },
  {
    id: "pastry_liver_pie",
    name: "Ливерные пирожки",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 240,
    unit: "шт.",
    image: "images/pastry_pirog_liver.webp",
    desc: "Румяные домашние пирожки со специями и нежным ливерным паштетом.",
    ingredients: "Дрожжевое тесто, говяжий ливер (легкое, сердце, печень), лук, специи.",
    badge: ""
  },
  {
    id: "pastry_liver_pie_mini",
    name: "Ливерные пирожки мини",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 180,
    unit: "шт.",
    image: "images/pastry_pirog_liver_mini.webp",
    desc: "Маленькие порционные пирожки на один укус с сытной начинкой из ливера.",
    ingredients: "Дрожжевое тесто, отборный говяжий ливер, лук репчатый, соль, перец.",
    badge: ""
  },
  {
    id: "pastry_bun_plain",
    name: "Булочка без начинки",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 100,
    unit: "шт.",
    image: "images/pastry_bun_plain.webp",
    desc: "Мягкая сдобная булочка с румяной корочкой. Отлично подойдет к чаю или молоку.",
    ingredients: "Мука пшеничная, молоко, яйца, сахар, сливочное масло, дрожжи.",
    badge: ""
  },
  {
    id: "pastry_bun_condensed",
    name: "Булочка со сгущенкой",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 110,
    unit: "шт.",
    image: "images/pastry_bun_condensed.webp",
    desc: "Сладкая булочка с начинкой из цельного вареного сгущенного молока.",
    ingredients: "Сдобное дрожжевое тесто, вареная сгущенка премиум класса.",
    badge: "бестселлер"
  },
  {
    id: "pastry_bun_fruits",
    name: "Булочка с сухофруктами",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 120,
    unit: "шт.",
    image: "images/pastry_bun_dryfruit.webp",
    desc: "Ароматная булочка с начинкой из изюма, кураги и чернослива.",
    ingredients: "Сдобное тесто, изюм без косточек, курага, чернослив, сахарная пудра.",
    badge: ""
  },
  {
    id: "pastry_bun_curd",
    name: "Булочка с творогом",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 120,
    unit: "шт.",
    image: "images/pastry_bun_cottage.webp",
    desc: "Воздушная булочка с начинкой из сладкого домашнего творога.",
    ingredients: "Мука, молоко, сахар, натуральный творог, ванилин, сливочное масло.",
    badge: ""
  },
  {
    id: "pastry_sochnik",
    name: "Сочник",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 190,
    unit: "шт.",
    image: "images/pastry_sochnik.webp",
    desc: "Классический сочник с золотистой корочкой и нежным творожным центром.",
    ingredients: "Песочное тесто, домашний творог, сахар, ванильный экстракт, желток.",
    badge: ""
  },
  {
    id: "pastry_manty_condensed",
    name: "Манты с вареной сгущенкой",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 3400,
    unit: "кг",
    image: "images/pastry_manty_condensed.webp",
    desc: "Необычные сладкие манты с начинкой из ароматной вареной сгущенки. Настоящее лакомство!",
    ingredients: "Пресное тесто на яйцах, сгущенное молоко вареное, сливочное масло.",
    badge: "новое"
  },
  {
    id: "pastry_rogaliki",
    name: "Рогалики с творогом",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 3000,
    unit: "кг",
    image: "images/pastry_rogaliki.webp",
    desc: "Рассыпчатые мини-рогалики с начинкой из нежного сладкого творога.",
    ingredients: "Сметанно-песочное тесто, творог, сахарная пудра, ваниль.",
    badge: ""
  },
  {
    id: "pastry_tea_set",
    name: "Чайный набор",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 4200,
    unit: "кг",
    image: "images/pastry_tea_set.webp",
    desc: "Ассорти из мелкой сладкой домашней выпечки, идеально подходящее для чаепития большой компании.",
    ingredients: "Печенье домашнее, мини-рогалики, кексы, орешки со сгущенкой.",
    badge: "бестселлер"
  },
  {
    id: "pie_curd_condensed",
    name: "Пирог с творогом со сгущенкой",
    category: "pies",
    categoryLabel: "Пироги",
    price: 2500,
    unit: "шт.",
    image: "images/pie_cottage_condensed.webp",
    desc: "Сытный пирог с начинкой из нежного творога и сладкой вареной сгущенки.",
    ingredients: "Песочное тесто, творог 9%, вареное сгущенное молоко, сахар, ванилин.",
    badge: ""
  },
  {
    id: "pie_smetannik",
    name: "Сметанник",
    category: "pies",
    categoryLabel: "Пироги",
    price: 2200,
    unit: "шт.",
    image: "images/pie_smetannik.webp",
    desc: "Классический нежный сметанник на тонкой песочной основе.",
    ingredients: "Песочное тесто, фермерская сметана 25%, яйца, ванильный сахар.",
    badge: "бестселлер"
  },
  {
    id: "pie_snickers",
    name: "Пирог Сникерс",
    category: "pies",
    categoryLabel: "Пироги",
    price: 4200,
    unit: "шт.",
    image: "images/pie_snickers.webp",
    desc: "Насыщенный десертный пирог с домашней карамелью, арахисом и шоколадным ганашем.",
    ingredients: "Шоколадный бисквит, арахис обжаренный, соленая карамель, бельгийский шоколад.",
    badge: "премиум"
  },
  {
    id: "pie_caramel",
    name: "Пирог карамель",
    category: "pies",
    categoryLabel: "Пироги",
    price: 2600,
    unit: "шт.",
    image: "images/pie_caramel.webp",
    desc: "Сладкий пирог с обильным слоем домашней мягкой карамели и нежным тестом.",
    ingredients: "Песочное тесто, фирменная карамель Nazcake, сливки, сахар.",
    badge: ""
  },
  {
    id: "pie_poppy",
    name: "Маковый пирог",
    category: "pies",
    categoryLabel: "Пироги",
    price: 2600,
    unit: "шт.",
    image: "images/pie_poppy.webp",
    desc: "Ароматный пирог с сочной и плотной начинкой из уваренного мака.",
    ingredients: "Сдобное тесто, маковая начинка с сахаром, сливочное масло.",
    badge: ""
  },
  {
    id: "pie_mix",
    name: "Микс пироги",
    category: "pies",
    categoryLabel: "Пироги",
    price: 3500,
    unit: "шт.",
    image: "images/pie_mix.webp",
    desc: "Ассорти-пирог, сочетающий несколько разных начинок в одном пироге.",
    ingredients: "Сдобное тесто, творожная начинка, маковая начинка, фруктовый джем.",
    badge: ""
  },
  {
    id: "pie_meat_round",
    name: "Мясной пирог (круглый)",
    category: "pies",
    categoryLabel: "Пироги",
    price: 4000,
    unit: "шт.",
    image: "images/pie_meat_round.webp",
    desc: "Круглый закрытый мясной пирог диаметром 22 см с сочным фаршем.",
    ingredients: "Сдобное тесто, фарш говяжий, лук репчатый, сливочное масло, специи.",
    badge: ""
  },
  {
    id: "pie_meat_rect",
    name: "Мясной пирог (прямоугольный)",
    category: "on_order",
    categoryLabel: "На заказ",
    price: 9000,
    unit: "шт.",
    image: "images/pie_meat_rect.webp",
    desc: "Сытный прямоугольный мясной пирог с сочным фаршем из рубленой говядины и луком.",
    ingredients: "Сдобное тесто, фарш из рубленой говядины, репчатый лук, специи.",
    badge: "custom",
    sizeOptions: [
      { "size": "S (36х30 см)", "price": 9000 },
      { "size": "M (45х30 см)", "price": 11000 },
      { "size": "L (48х35 см)", "price": 14000 }
    ]
  },
  {
    id: "pie_curd_large",
    name: "Пирог с творогом",
    category: "on_order",
    categoryLabel: "На заказ",
    price: 7500,
    unit: "шт.",
    image: "images/pie_smetannik.webp",
    desc: "Большой прямоугольный пирог с нежной и сладкой творожной начинкой.",
    ingredients: "Сдобное тесто, натуральный творог, сахарная пудра, ваниль.",
    badge: "custom"
  },
  {
    id: "pie_fruits_large",
    name: "Пирог с сухофруктами",
    category: "on_order",
    categoryLabel: "На заказ",
    price: 7500,
    unit: "шт.",
    image: "images/pie_poppy.webp",
    desc: "Большой прямоугольный пирог, обильно наполненный отборным изюмом и курагой.",
    ingredients: "Сдобное тесто, курага, изюм, сахар, ванилин.",
    badge: "custom"
  },
  {
    id: "cake_custom_celebration",
    name: "Праздничный торт (на заказ)",
    category: "on_order",
    categoryLabel: "На заказ",
    price: 8500,
    unit: "кг",
    image: "",
    desc: "Эксклюзивный праздничный торт для вашего торжества. Дизайн и начинка обсуждаются индивидуально при заказе.",
    ingredients: "Начинка на выбор (Красный бархат, Сникерс, Эстерхази, Молочная девочка), кондитерский велюр, мастичный или ягодный декор.",
    badge: "custom"
  },
  {
    id: "dessert_napoleon",
    name: "Наполеон",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 280,
    unit: "шт.",
    image: "images/dessert_napoleon.webp",
    desc: "Порционный кусочек классического торта Наполеон с нежным заварным кремом.",
    ingredients: "Слоеное тесто, заварной крем Дипломат, ваниль.",
    badge: ""
  },
  {
    id: "dessert_ekler",
    name: "Эклер",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 260,
    unit: "шт.",
    image: "images/dessert_ekler.webp",
    desc: "Французское заварное пирожное, наполненное нежным сливочно-заварным кремом.",
    ingredients: "Заварное тесто, крем Муслин, шоколадная глазурь.",
    badge: "хит"
  },
  {
    id: "dessert_muraveynik",
    name: "Муравейник",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 450,
    unit: "шт.",
    image: "images/dessert_muraveynik.webp",
    desc: "Традиционное пирожное из песочного теста со сгущенным молоком и грецкими орехами.",
    ingredients: "Песочное тесто, вареная сгущенка, сливочное масло, мед, мак.",
    badge: ""
  },
  {
    id: "dessert_chak_chak",
    name: "Чак-чак",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 270,
    unit: "шт.",
    image: "images/dessert_chak_chak.webp",
    desc: "Восточная сладость из обжаренных кусочков теста, залитых натуральным медовым сиропом.",
    ingredients: "Мука пшеничная, яйца, мед натуральный, сахар, масло растительное.",
    badge: ""
  },
  {
    id: "dessert_chocolate",
    name: "Шоколадный",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 270,
    unit: "шт.",
    image: "images/dessert_chocolate.webp",
    desc: "Насыщенное шоколадное пирожное с шоколадным бисквитом и нежным кремом.",
    ingredients: "Шоколадный бисквит, крем с какао, темный шоколад.",
    badge: ""
  },
  {
    id: "dessert_caramel",
    name: "Карамельный",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 270,
    unit: "шт.",
    image: "images/dessert_caramel.webp",
    desc: "Нежное пирожное с мягким бисквитом и домашней карамелью.",
    ingredients: "Сдобный бисквит, мягкая карамель, сливочный крем.",
    badge: ""
  },
  {
    id: "dessert_snickers_airy",
    name: "Воздушный сникерс",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 270,
    unit: "шт.",
    image: "images/dessert_snickers_airy.webp",
    desc: "Пирожное с безе, жареным арахисом и нежным кремом со сгущенкой.",
    ingredients: "Воздушное безе, жареный арахис, вареная сгущенка, сливочное масло.",
    badge: "бестселлер"
  },
  {
    id: "dessert_medovik",
    name: "Медовик",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 280,
    unit: "шт.",
    image: "images/dessert_medovik.webp",
    desc: "Ароматное медовое пирожное со сметанным кремом, тающее во рту.",
    ingredients: "Медовые коржи с добавлением натурального меда, сметанный крем.",
    badge: ""
  },
  {
    id: "dessert_caramel_design",
    name: "Карамель с оформлением",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 290,
    unit: "шт.",
    image: "images/dessert_caramel_design.webp",
    desc: "Карамельное пирожное со стильным праздничным оформлением.",
    ingredients: "Бисквит, домашняя карамель, крем-чиз, элементы декора.",
    badge: ""
  },
  {
    id: "dessert_chocolate_design",
    name: "Шоколадный с оформлением",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 290,
    unit: "шт.",
    image: "images/dessert_chocolate_design.webp",
    desc: "Шоколадное пирожное с нарядным праздничным декором.",
    ingredients: "Шоколадный бисквит, шоколадный крем, праздничный декор.",
    badge: ""
  },
  {
    id: "dessert_banoffee",
    name: "Банофи пай",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 440,
    unit: "шт.",
    image: "images/dessert_banoffee.webp",
    desc: "Пирожное с бананами, ароматной карамелью и воздушными взбитыми сливками на песочной основе.",
    ingredients: "Песочная основа, свежие бананы, карамель, взбитые сливки.",
    badge: "новое"
  },
  {
    id: "dessert_ryzhik",
    name: "Рыжик",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 300,
    unit: "шт.",
    image: "images/dessert_ryzhik.webp",
    desc: "Классическое медовое пирожное с добавлением заварного крема.",
    ingredients: "Медовые коржи, заварной крем Дипломат, крошка.",
    badge: ""
  },
  {
    id: "dessert_cheesecake",
    name: "Чизкейк",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 295,
    unit: "шт.",
    image: "images/dessert_cheesecake.webp",
    desc: "Нежный сырный десерт на песочной основе с добавлением ванили.",
    ingredients: "Песочная крошка, сливочный сыр Cremette, сахар, сливки.",
    badge: ""
  },
  {
    id: "dessert_pavlova",
    name: "Павлова",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 380,
    unit: "шт.",
    image: "images/dessert_pavlova.webp",
    desc: "Воздушное безе с хрустящей корочкой и мягким центром, украшенное нежным кремом.",
    ingredients: "Французская меренга, маскарпоне, сливки, сахарная пудра.",
    badge: ""
  },
  {
    id: "dessert_milk_girl",
    name: "Молочная девочка",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 450,
    unit: "шт.",
    image: "images/dessert_milk_girl.webp",
    desc: "Порционное пирожное с нежными коржами на сгущенном молоке и легким кремом.",
    ingredients: "Коржи на сгущенном молоке Рогачев, крем на основе взбитых сливок.",
    badge: ""
  },
  {
    id: "dessert_carrot",
    name: "Морковный",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 420,
    unit: "шт.",
    image: "images/dessert_carrot.webp",
    desc: "Морковный бисквит с добавлением пряностей, грецкого ореха и сливочного сыра.",
    ingredients: "Морковно-ореховый бисквит, корица, сливочный сыр, карамель.",
    badge: ""
  },
  {
    id: "dessert_red_velvet",
    name: "Красный бархат",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 420,
    unit: "шт.",
    image: "images/dessert_red_velvet.webp",
    desc: "Яркое пирожное со знаменитым сочным красным бисквитом и кремом.",
    ingredients: "Бисквит Красный бархат, нежный крем-чиз, пропитка.",
    badge: ""
  },
  {
    id: "dessert_snickers",
    name: "Сникерс",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 480,
    unit: "шт.",
    image: "images/dessert_snickers.webp",
    desc: "Шоколадный бисквит с большим количеством арахиса и карамели.",
    ingredients: "Шоколадный бисквит, домашняя карамель, арахис, нуга.",
    badge: ""
  },
  {
    id: "dessert_oreo",
    name: "Орео",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 420,
    unit: "шт.",
    image: "images/dessert_oreo.webp",
    desc: "Шоколадное пирожное с кусочками оригинального печенья Oreo.",
    ingredients: "Шоколадный бисквит, крем со сливками и крошкой Oreo.",
    badge: ""
  },
  {
    id: "dessert_banana",
    name: "Банановый",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 420,
    unit: "шт.",
    image: "images/dessert_banana.webp",
    desc: "Ароматный банановый бисквит с банановым муссом и карамелью.",
    ingredients: "Банановый бисквит, свежие бананы, нежный мусс.",
    badge: ""
  },
  {
    id: "dessert_royal",
    name: "Королевский",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 450,
    unit: "шт.",
    image: "images/dessert_royal.webp",
    desc: "Изысканное шоколадное пирожное с орехами и прослойкой пралине.",
    ingredients: "Шоколадный бисквит, ореховый крем, фундук, пралине.",
    badge: ""
  },
  {
    id: "dessert_pistachio",
    name: "Фисташковый",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 470,
    unit: "шт.",
    image: "images/dessert_pistachio.webp",
    desc: "Пирожное с фисташковым бисквитом и натуральным фисташковым кремом.",
    ingredients: "Фисташковый бисквит, фисташковая паста, крем на сливках.",
    badge: ""
  },
  {
    id: "dessert_cupcake_choco",
    name: "Шоколадный капкейк",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 360,
    unit: "шт.",
    image: "images/dessert_cupcake_choco.webp",
    desc: "Шоколадный кекс с начинкой и пышной шапочкой из шоколадного крема.",
    ingredients: "Шоколадный бисквит, шоколадный ганаш, крем шантильи.",
    badge: ""
  },
  {
    id: "dessert_cupcake_red_plain",
    name: "Красный капкейк",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 360,
    unit: "шт.",
    image: "images/dessert_cupcake_red_plain.webp",
    desc: "Нежный капкейк Красный бархат со сливочной начинкой.",
    ingredients: "Красный бисквит, молочная пропитка, сливочный сыр.",
    badge: ""
  },
  {
    id: "dessert_pistachio_raspberry",
    name: "Фисташка - малина",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 1000,
    unit: "шт.",
    image: "images/dessert_pistachio_raspberry.webp",
    desc: "Премиум десерт с ярким сочетанием фисташкового мусса и малинового кули.",
    ingredients: "Фисташковый бисквит, малиновое кули, фисташковый крем.",
    badge: "премиум"
  },
  {
    id: "dessert_ekler_choco",
    name: "Эклер в шоколаде",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 800,
    unit: "шт.",
    image: "images/dessert_ekler_choco.webp",
    desc: "Увеличенный эклер, обильно покрытый бельгийским шоколадом.",
    ingredients: "Заварное тесто, крем Патисьер, бельгийский шоколад.",
    badge: "премиум"
  },
  {
    id: "dessert_almond_fruits",
    name: "Миндальный с сухофруктами",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 1000,
    unit: "шт.",
    image: "images/dessert_almond_fruits.webp",
    desc: "Изысканное миндальное пирожное с курагой, черносливом и орехами.",
    ingredients: "Миндальная мука, взбитые белки, сухофрукты, лепестки миндаля.",
    badge: "премиум"
  },
  {
    id: "dessert_pistachio_magnum",
    name: "Фисташка магнум",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 1200,
    unit: "шт.",
    image: "images/dessert_pistachio_magnum.webp",
    desc: "Изысканное пирожное в форме мороженого эскимо с фисташковым вкусом.",
    ingredients: "Фисташковый бисквит, фисташковый крем, глазурь из белого шоколада.",
    badge: "премиум"
  },
  {
    id: "dessert_grillage",
    name: "Грилляж",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 1400,
    unit: "шт.",
    image: "images/dessert_grillage.webp",
    desc: "Шоколадно-ореховый премиум десерт с хрустящими карамелизованными орехами.",
    ingredients: "Грильяж ореховый, шоколадный крем, карамель, темный шоколад.",
    badge: "премиум"
  },
  {
    id: "dessert_latte",
    name: "Латте",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 1200,
    unit: "шт.",
    image: "images/dessert_latte.webp",
    desc: "Нежное кофейное пирожное со вкусом и ароматом классического латте.",
    ingredients: "Кофейный бисквит, кофейный мусс, молочная пенка, корица.",
    badge: "премиум"
  },
  {
    id: "berry_oreo",
    name: "Орео с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 850,
    unit: "шт.",
    image: "images/berry_oreo.webp",
    desc: "Популярное пирожное Oreo, украшенное свежими лесными ягодами.",
    ingredients: "Шоколадный бисквит, крошка Oreo, крем, свежая клубника, голубика.",
    badge: ""
  },
  {
    id: "berry_milk_girl",
    name: "Молочная девочка с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 850,
    unit: "шт.",
    image: "images/berry_milk_girl.webp",
    desc: "Нежная порционная Молочная девочка со свежими ягодами сверху.",
    ingredients: "Коржи на сгущенном молоке, крем на сливках, свежие ягоды.",
    badge: "бестселлер"
  },
  {
    id: "berry_snickers",
    name: "Сникерс с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 800,
    unit: "шт.",
    image: "images/berry_snickers.webp",
    desc: "Шоколадное пирожное Сникерс со свежими ягодами клубники и малины.",
    ingredients: "Шоколадный бисквит, карамель, арахис, свежие ягоды, шоколад.",
    badge: ""
  },
  {
    id: "berry_royal",
    name: "Королевский с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 780,
    unit: "шт.",
    image: "images/berry_royal.webp",
    desc: "Пирожное Королевский, изысканно украшенное ягодами и золотым декором.",
    ingredients: "Ореховый бисквит, шоколад, ассорти из свежих сезонных ягод.",
    badge: ""
  },
  {
    id: "berry_nutella",
    name: "Нутелла",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 700,
    unit: "шт.",
    image: "images/berry_nutella.webp",
    desc: "Шоколадное пирожное со щедрым слоем пасты Nutella и свежей малиной.",
    ingredients: "Шоколадный бисквит, оригинальная паста Nutella, свежая малина.",
    badge: ""
  },
  {
    id: "berry_choux_rings",
    name: "Заварные кольца",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 500,
    unit: "шт.",
    image: "images/berry_choux_rings.webp",
    desc: "Традиционное заварное кольцо с творожным кремом и свежими ягодами клубники.",
    ingredients: "Заварное тесто, легкий творожный крем, сахарная пудра, клубника.",
    badge: ""
  },
  {
    id: "berry_cupcake_choco",
    name: "Шоколадный капкейк с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 750,
    unit: "шт.",
    image: "images/berry_cupcake_choco.webp",
    desc: "Шоколадный капкейк с ягодным конфи внутри и горкой свежих ягод сверху.",
    ingredients: "Шоколадный кекс, сливочный крем, ассорти из свежих ягод.",
    badge: "новое"
  },
  {
    id: "berry_pavlova",
    name: "Павлова с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 750,
    unit: "шт.",
    image: "images/berry_pavlova.webp",
    desc: "Классический десерт Анна Павлова с обильным количеством свежей малины и клубники.",
    ingredients: "Безе, крем маскарпоне, свежая малина, свежая клубника.",
    badge: "бестселлер"
  },
  {
    id: "berry_cheesecake",
    name: "Чизкейк с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 700,
    unit: "шт.",
    image: "images/berry_cheesecake.webp",
    desc: "Нежнейший чизкейк Нью-Йорк, покрытый ягодным соусом и украшенный свежими ягодами.",
    ingredients: "Сырный крем, песочная основа, свежая клубника, черника.",
    badge: ""
  },
  {
    id: "berry_cupcake_red",
    name: "Красный капкейк с ягодами",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 700,
    unit: "шт.",
    image: "images/berry_cupcake_red.webp",
    desc: "Капкейк Красный бархат со сливочным кремом и свежей клубникой.",
    ingredients: "Бисквит Красный бархат, клубничное кули, свежая клубника, крем.",
    badge: "новое"
  },
  {
    id: "cake_banana",
    name: "Банановый торт",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Банановый торт.webp",
    desc: "Нежнейший банановый торт с воздушным бисквитом, банановым муссом и карамелью.",
    ingredients: "Банановый бисквит, свежие бананы, домашняя карамель, сливочный мусс.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_pistachio",
    name: "Торт Фисташка-Малина",
    category: "cakes",
    categoryLabel: "Торты",
    price: 7500,
    unit: "шт.",
    image: "images/Фисташковый торт.webp",
    desc: "Роскошный торт с фисташковыми бисквитами, яркой малиновой прослойкой и фисташковым крем-чизом.",
    ingredients: "Фисташковый натуральный бисквит, конфитюр из лесной малины, крем-чиз на сливках с добавлением 100% фисташковой пасты.",
    badge: "vip",
    sizeOptions: [{"size":"20 см","price":7500},{"size":"24 см","price":10500},{"size":"28 см","price":14500}]
  },
  {
    id: "cake_carrot",
    name: "Морковный торт",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Морковный торт.webp",
    desc: "Пряный морковный торт с грецкими орехами и нежным сырно-сливочным кремом.",
    ingredients: "Морковно-ореховый бисквит, корица, сливочный сыр Cremette, домашняя карамель.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_oreo",
    name: "Торт Орео",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Торт Орео.webp",
    desc: "Насыщенный шоколадный торт с кусочками популярного печенья Oreo и нежным кремом.",
    ingredients: "Шоколадный бисквит, сливочный крем с крошкой печенья Oreo, ганаш на темном шоколаде.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_royal",
    name: "Торт Королевский",
    category: "cakes",
    categoryLabel: "Торты",
    price: 7000,
    unit: "шт.",
    image: "images/Королевский торт.webp",
    desc: "Роскошный шоколадный торт с обилием фундука, нежным шоколадным кремом и пралине.",
    ingredients: "Насыщенный шоколадный бисквит, ореховое пралине, цельный обжаренный фундук, бельгийский шоколад.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":7000},{"size":"24 см","price":10000},{"size":"28 см","price":13000}]
  },
  {
    id: "cake_woopi_pai",
    name: "Торт Вупи Пай",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Торт вупипай.webp",
    desc: "Американская классика: шоколадные коржи, пропитанные нежным кремом на основе взбитых сливок и маскарпоне.",
    ingredients: "Воздушные шоколадные коржи с какао Barry Callebaut, крем на сливках и творожном сыре, пропитка.",
    badge: "бестселлер",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_red_velvet",
    name: "Торт Красный Бархат",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Торт красный бархат.webp",
    desc: "Знаменитый торт с бархатистыми рубиновыми коржами и белоснежным сырным кремом.",
    ingredients: "Кефирные сочные бисквиты с ноткой какао, сырно-сливочный крем-чиз на масле и творожном сыре Hohland.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_snickers",
    name: "Торт Сникерс",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Торт сникерс.webp",
    desc: "Супершоколадный торт с домашней нугой, соленой карамелью и хрустящим арахисом. Настоящее наслаждение.",
    ingredients: "Шоколадный бисквит, соленая сливочная карамель, арахис, арахисовый мусс, шоколадный крем-чиз, молочный шоколад.",
    badge: "хит",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_milk_girl",
    name: "Торт Молочная девочка",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Торт молочная девочка.webp",
    desc: "Очень нежный торт из тонких коржей на сгущенном молоке с воздушным сливочным кремом.",
    ingredients: "Коржи на натуральном сгущенном молоке Рогачев, крем на основе взбитых фермерских сливок.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":6500},{"size":"24 см","price":9500},{"size":"28 см","price":12500}]
  },
  {
    id: "cake_chocolate",
    name: "Шоколадный торт",
    category: "cakes",
    categoryLabel: "Торты",
    price: 7500,
    unit: "шт. (26 см)",
    image: "images/Шоколадный торт.webp",
    desc: "Насыщенный шоколадный торт увеличенного размера (26 см) для любителей шоколада.",
    ingredients: "Шоколадные влажные бисквиты, крем с какао премиум класса, шоколадные капли.",
    badge: ""
  },
  {
    id: "cake_kitkat",
    name: "Торт Киткат",
    category: "cakes",
    categoryLabel: "Торты",
    price: 8500,
    unit: "шт.",
    image: "images/Торт киткат.webp",
    desc: "Праздничный шоколадный торт, оформленный хрустящими батончиками KitKat по кругу.",
    ingredients: "Шоколадный бисквит, шоколадный крем, оригинальные шоколадки KitKat.",
    badge: "",
    sizeOptions: [{"size":"20 см","price":8500},{"size":"24 см","price":12500}]
  },
  {
    id: "cake_esterhazy",
    name: "Торт Эстерхази",
    category: "cakes",
    categoryLabel: "Торты",
    price: 9800,
    unit: "шт.",
    image: "images/Торт Эстерхазе.webp",
    desc: "Изысканный венгерский миндальный торт. Белково-ореховые коржи прослоены нежным заварным кремом с пралине.",
    ingredients: "Белки яичные, миндальная мука, сахар, заварной крем Патисьер со сгущенным молоком, ореховое пралине, белый шоколад.",
    badge: "премиум",
    sizeOptions: [{"size":"size_half","price":4750},{"size":"size_whole","price":9800}]
  },
  {
    id: "cake_honey",
    name: "Медовый торт",
    category: "cakes",
    categoryLabel: "Торты",
    price: 3200,
    unit: "шт.",
    image: "images/Торт медовый.webp",
    desc: "Классический медовик с тонкими ароматными коржами на натуральном меду и сметанным кремом.",
    ingredients: "Пшеничная мука, натуральный цветочный мед, фермерская сметана, сахар.",
    badge: ""
  },
  {
    id: "cake_napoleon",
    name: "Торт Наполеон",
    category: "cakes",
    categoryLabel: "Торты",
    price: 3200,
    unit: "шт.",
    image: "images/Торт наполеон.webp",
    desc: "Домашний Наполеон по семейному рецепту. Тонкие коржи отлично пропитаны нежным сливочно-заварным кремом.",
    ingredients: "Рубленое домашнее слоеное тесто, заварной крем со сгущенным молоком и натуральным сливочным маслом.",
    badge: ""
  },
  {
    id: "cake_graf_ruins",
    name: "Торт Графские развалины",
    category: "cakes",
    categoryLabel: "Торты",
    price: 5500,
    unit: "шт.",
    image: "images/Торт Графские развалины.webp",
    desc: "Эффектный торт из воздушного безе со сгущенным кремом, шоколадной глазурью и орехами.",
    ingredients: "Воздушное безе, крем со сгущенным молоком и маслом, грецкие орехи, шоколадный ганаш.",
    badge: ""
  },
  {
    id: "cake_banoffee_pie",
    name: "Баноффи пай (торт)",
    category: "cakes",
    categoryLabel: "Торты",
    price: 4200,
    unit: "шт.",
    image: "images/Торт Баноффи пай.webp",
    desc: "Английский десертный торт на песочной основе со свежими бананами, карамелью и взбитыми сливками.",
    ingredients: "Песочное тесто, вареная сгущенка, спелые бананы, фермерские сливки 33%.",
    badge: ""
  },
  {
    id: "cake_cheesecake_spanish",
    name: "Испанский чизкейк Сан-Себастьян",
    category: "cakes",
    categoryLabel: "Торты",
    price: 7000,
    unit: "шт.",
    image: "images/Торт Испанский чизкейк.webp",
    desc: "Знаменитый обожженный чизкейк с нежнейшей кремовой текстурой внутри и карамельной корочкой сверху.",
    ingredients: "Премиальный творожный сыр, натуральные сливки, яйца, сахар.",
    badge: "бестселлер",
    sizeOptions: [{"size":"size_half","price":3750},{"size":"size_whole","price":7000}]
  },
  {
    id: "cake_cheesecake_tary",
    name: "Тары чизкейк",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/Торт Тары Чизкейк.webp",
    desc: "Фирменный чизкейк с добавлением традиционного обжаренного проса (тары). Уникальный вкус!",
    ingredients: "Сливочный сыр, сливки, карамель, обжаренное тары (казахское национальное просо).",
    badge: "хит",
    sizeOptions: [{"size":"size_half","price":3500},{"size":"size_whole","price":6500}]
  },
  {
    id: "cake_meringue_roll",
    name: "Меренговый рулет",
    category: "cakes",
    categoryLabel: "Торты",
    price: 3500,
    unit: "шт.",
    image: "images/Миренговый рулет.webp",
    desc: "Нежнейший рулет из воздушной меренги с легким кремом и свежими ягодами малины.",
    ingredients: "Яичный белок, сырно-сливочный легкий крем, свежая малина, лепестки миндаля для украшения.",
    badge: "бестселлер"
  },
  {
    id: "cake_biscuit_roll",
    name: "Рулет бисквитный",
    category: "cakes",
    categoryLabel: "Торты",
    price: 2400,
    unit: "шт.",
    image: "images/Рулет бисквитный.webp",
    desc: "Мягкий домашний бисквитный рулет с нежным сливочно-ягодным кремом.",
    ingredients: "Сдобное тесто на яйцах, сливочный крем, ягодный джем.",
    badge: ""
  },
  {
    id: "semi_meatballs",
    name: "Фрикадельки (1 кг)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 3300,
    unit: "кг",
    image: "images/Фрикадельки куриные.webp",
    desc: "Домашние фрикадельки для супа. Быстрое и сытное решение для семейного обеда.",
    ingredients: "Фарш на выбор (куриный или говяжий), лук, соль, специи.",
    badge: "заморозка",
    sizeOptions: [{"size":"opt_chicken","price":3300},{"size":"opt_beef","price":4900}]
  },
  {
    id: "semi_tefteli",
    name: "Тефтели (1 кг)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 3300,
    unit: "кг",
    image: "images/Тефтели.webp",
    desc: "Аппетитные домашние тефтели, приготовленные по классическому рецепту.",
    ingredients: "Фарш на выбор (куриный или говяжий), рис, лук, соль, специи.",
    badge: "заморозка",
    sizeOptions: [{"size":"opt_chicken","price":3300},{"size":"opt_beef","price":4900}]
  },
  {
    id: "semi_kotlety",
    name: "Котлеты (6 шт.)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1700,
    unit: "уп.",
    image: "images/Котлеты.webp",
    desc: "Домашние сочные котлеты в панировке, готовые к жарке.",
    ingredients: "Фарш на выбор (куриный или говяжий), хлеб пшеничный, лук, панировочные сухари, соль, специи.",
    badge: "ручная работа",
    sizeOptions: [{"size":"opt_chicken","price":1700},{"size":"opt_beef","price":2200}]
  },
  {
    id: "semi_golubtsy",
    name: "Голубцы (1 кг)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 3900,
    unit: "кг",
    image: "images/Голубцы.webp",
    desc: "Традиционные голубцы из сочного говяжьего фарша с рисом, завернутые в нежные капустные листья.",
    ingredients: "Листья капусты свежие, говяжий фарш, рис, лук репчатый, соль, черный перец.",
    badge: "заморозка"
  },
  {
    id: "semi_pelmeni",
    name: "Пельмени домашние (1 кг)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 4100,
    unit: "кг",
    image: "images/Пельмени.webp",
    desc: "Аккуратные пельмени ручной лепки из нежного теста с начинкой из говядины.",
    ingredients: "Пшеничная мука, домашнее яйцо, фарш говяжий, репчатый лук, специи.",
    badge: "хит"
  },
  {
    id: "semi_manty",
    name: "Манты с говядиной (1 кг)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 4100,
    unit: "кг",
    image: "images/Манты.webp",
    desc: "Настоящие домашние манты ручной лепки с начинкой из сочной рубленой говядины и лука.",
    ingredients: "Мука пшеничная, вода питьевая, охлажденная говядина (крупный рубленый фарш), лук репчатый, соль, черный перец.",
    badge: "ручная лепка"
  },
  {
    id: "semi_borek",
    name: "Сигара борек (12 шт.)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1800,
    unit: "уп.",
    image: "images/Сигара борек.webp",
    desc: "Хрустящие турецкие трубочки из тонкого теста филло с начинкой на выбор.",
    ingredients: "Тесто филло, начинка на выбор (куриный с сыром или с мясом и сыром).",
    badge: "закуска",
    sizeOptions: [{"size":"opt_chicken_cheese","price":1800},{"size":"opt_meat_cheese","price":1900}]
  },
  {
    id: "semi_chebureki",
    name: "Чебуреки с говядиной (12 шт.)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1500,
    unit: "уп.",
    image: "images/Чебукери.webp",
    desc: "Упаковка чебуреков ручной лепки. При жарке получается пузырчатое хрустящее тесто.",
    ingredients: "Тонкое пресное тесто на воде, сочный фарш из говядины, лук, специи.",
    badge: ""
  },
  {
    id: "semi_vareniki",
    name: "Вареники с картофелем (1 уп.)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 2000,
    unit: "уп.",
    image: "images/Вареники.webp",
    desc: "Нежные домашние вареники с начинкой из воздушного картофельного пюре.",
    ingredients: "Тесто пресное, картофельное пюре, сливочное масло, пассерованный репчатый лук.",
    badge: ""
  },
  {
    id: "semi_soup_lentil",
    name: "Чечевичный суп (замороженный)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 2100,
    unit: "кг",
    image: "images/Чечевичный суп.webp",
    desc: "Ароматный и сытный турецкий чечевичный суп-пюре. Готов к разогреву.",
    ingredients: "Красная чечевица, картофель, морковь, лук, специи, лимонный сок.",
    badge: "супы"
  },
  {
    id: "semi_beef_broth",
    name: "Говяжий бульон (замороженный)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1900,
    unit: "кг",
    image: "images/Бульон говяжий.webp",
    desc: "Наваристый крепкий говяжий бульон, уваренный в течение нескольких часов. Отличная основа для супов.",
    ingredients: "Говяжьи кости, мясо говядины, коренья, лук, морковь, специи.",
    badge: "супы"
  },
  {
    id: "semi_dough_baursak",
    name: "Тесто для бауырсака",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1200,
    unit: "кг",
    image: "images/Тесто для бауырсаков.webp",
    desc: "Фирменное дрожжевое тесто для пышных золотистых бауырсаков.",
    ingredients: "Мука пшеничная в/с, молоко, сахар, дрожжи, соль, растительное масло.",
    badge: "тесто"
  },
  {
    id: "semi_dough_beshbarmak",
    name: "Тесто для бешбармака",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 650,
    unit: "шт.",
    image: "images/Тесто для бешбармака.webp",
    desc: "Тонко раскатанное домашнее тесто (сочни) для традиционного казахского бешбармака.",
    ingredients: "Мука пшеничная, яйца домашние, вода, соль.",
    badge: "тесто"
  },
  {
    id: "semi_dough_puff",
    name: "Слоеное тесто",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1400,
    unit: "кг",
    image: "images/Слоёное тесто.webp",
    desc: "Универсальное домашнее слоеное тесто для выпечки на сливочном масле.",
    ingredients: "Мука, сливочное масло 82%, вода, лимонный сок, соль.",
    badge: "тесто"
  },
];

// Load custom products from local storage on load
try {
  const customProducts = localStorage.getItem("nazcake_custom_products");
  if (customProducts) {
    const parsed = JSON.parse(customProducts);
    products = products.map(p => {
      const custom = parsed.find(cp => cp.id === p.id);
      if (custom) {
        return {
          ...p,
          name: custom.name !== undefined ? custom.name : p.name,
          price: custom.price !== undefined ? custom.price : p.price,
          inStock: custom.inStock !== false,
          stock: custom.stock !== undefined ? custom.stock : p.stock,
          image: custom.image !== undefined ? custom.image : p.image,
          sizeOptions: custom.sizeOptions !== undefined ? custom.sizeOptions : p.sizeOptions,
          isCustomName: custom.isCustomName === true
        };
      }
      return { ...p, inStock: p.inStock !== false };
    });
  } else {
    products = products.map(p => ({ ...p, inStock: p.inStock !== false }));
  }
} catch (e) {
  console.warn("Failed to load custom products:", e);
  products = products.map(p => ({ ...p, inStock: p.inStock !== false }));
}

// Shopping Cart State
let cart = [];
try {
  const savedCart = localStorage.getItem("nazcake_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn("Failed to load cart from localStorage:", e);
}

// DOM Elements
const bestsellersGrid = document.getElementById("bestsellers-grid");
const catalogGrid = document.getElementById("catalog-grid");
const tabButtons = document.querySelectorAll(".tab-btn");

const previewModal = document.getElementById("preview-modal");
const closePreviewBtn = document.getElementById("close-preview-btn");
const modalProductImg = document.getElementById("modal-product-img");
const modalProductTitle = document.getElementById("modal-product-title");
const modalProductPrice = document.getElementById("modal-product-price");
const modalProductDesc = document.getElementById("modal-product-desc");
const modalProductIngredients = document.getElementById("modal-product-ingredients");
const modalQtyVal = document.getElementById("modal-qty-val");
const modalMinusBtn = document.getElementById("modal-minus-btn");
const modalPlusBtn = document.getElementById("modal-plus-btn");
const modalAddBtn = document.getElementById("modal-add-btn");
const modalSizeGroup = document.getElementById("modal-size-group");
const modalSizeContainer = document.getElementById("modal-size-container");

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalSum = document.getElementById("cart-total-sum");
const cartCountBadges = document.querySelectorAll(".cart-count");

const mobileDrawer = document.getElementById("mobile-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeDrawerBtn = document.getElementById("close-drawer-btn");
const drawerLinks = document.querySelectorAll(".drawer-link");

const checkoutForm = document.getElementById("checkout-form");
const checkoutAddressGroup = document.getElementById("checkout-address-group");
const deliveryMethodRadios = document.getElementsByName("delivery-method");

const successModal = document.getElementById("success-modal");
const closeSuccessBtn = document.getElementById("close-success-btn");

// Localization helpers
const colorNameKeys = {
  "#ffd1dc": "bento_color_pink",
  "#d4f0fc": "bento_color_blue",
  "#fdfae7": "bento_color_vanilla",
  "#e2f4c5": "bento_color_pistachio",
  "#ffffff": "bento_color_white",
  "#b08d57": "bento_color_caramel",
  "#e73895": "bento_color_raspberry",
  "#4a2c11": "bento_color_chocolate",
  "#2b5c8f": "bento_color_darkblue"
};

const sprinkleKeys = {
  "none": "bento_opt_sprinkles_none",
  "pearls": "bento_opt_sprinkles_pearls",
  "hearts": "bento_opt_sprinkles_hearts",
  "gold": "bento_opt_sprinkles_gold",
  "stars": "bento_opt_sprinkles_stars"
};

function getBadgeTranslationKey(badge) {
  if (!badge) return "";
  switch(badge) {
    case "свежее": return "badge_fresh";
    case "бестселлер": return "badge_bestseller";
    case "горячее": return "badge_hot";
    case "новое": return "badge_new";
    case "хит": return "badge_hit";
    case "премиум": return "badge_premium";
    case "заказной": return "badge_custom";
    case "vip": return "badge_vip";
    case "ручная лепка": return "badge_hand";
    default: return "";
  }
}

function getUnitTranslationKey(unit) {
  if (!unit) return "";
  switch(unit) {
    case "шт.": return "tg_unit_pcs";
    case "кг": return "tg_unit_kg";
    case "12 шт.": return "tg_unit_12pcs";
    case "уп": return "tg_unit_pack";
    default: return "";
  }
}

function getProductDesc(p) {
  const { id, bentoConfig, desc } = p;
  if (id.startsWith("bento_custom_") && bentoConfig) {
    if (!window.i18n) return desc;
    const baseColorName = window.i18n.t(colorNameKeys[bentoConfig.baseColor] || "bento_color_pink");
    const textColorName = window.i18n.t(colorNameKeys[bentoConfig.textColor] || "bento_color_chocolate");
    const sprinklesName = window.i18n.t(sprinkleKeys[bentoConfig.sprinkles] || "bento_opt_sprinkles_none");
    const textVal = bentoConfig.text || (window.i18n.getCurrentLanguage() === "ru" ? "нет" : "жоқ");

    return window.i18n.t("bento_custom_desc")
      .replace("{base}", baseColorName)
      .replace("{text_color}", textColorName)
      .replace("{sprinkles}", sprinklesName)
      .replace("{text}", textVal);
  }
  return window.i18n ? window.i18n.t(`p_${id}_desc`) : desc;
}

// Init App
document.addEventListener("DOMContentLoaded", () => {
  renderBestsellers();
  renderCatalog("all");
  setupEventListeners();
  setupBentoCustomizer();
  setupDeliveryCalculator();
  setupGeolocation();
  updateCartUi();
  setupAdminPanel();
  setupCartSwipeClose();
  setupModalSwipeClose();
  initScrollReveal();
  loadCachedCustomerData();
  setupKaspiQrCheckout();
  setupThemeToggler();
  setupBestsellersCarousel();

  if (window.i18n) {
    window.i18n.onLanguageChange(() => {
      triggerHapticFeedback();
      renderBestsellers();
      const activeTab = document.querySelector(".tab-btn.active");
      const category = activeTab ? activeTab.getAttribute("data-category") : "all";
      renderCatalog(category);
      updateCartUi();
      updateLocationUi();
    });
  }
});

function renderBestsellers() {
  if (!bestsellersGrid) return;
  const bestsellers = products.filter(p => p.badge === "бестселлер" || p.badge === "хит" || p.badge === "премиум");

  bestsellersGrid.innerHTML = bestsellers.map(p => createProductCardHtml(p)).join("");
  attachCardEvents(bestsellersGrid);
  refreshScrollReveal();
}

function renderSkeletons() {
  if (!catalogGrid) return;
  const skeletonHtml = Array(4).fill(`
    <div class="product-card skeleton">
      <div class="product-img-wrapper skeleton-shimmer"></div>
      <div class="product-info">
        <div class="skeleton-text skeleton-title-bar skeleton-shimmer"></div>
        <div class="skeleton-text skeleton-desc-bar skeleton-shimmer"></div>
        <div class="product-footer" style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div class="skeleton-text skeleton-price-bar skeleton-shimmer"></div>
          <div class="skeleton-btn skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  `).join("");
  catalogGrid.innerHTML = skeletonHtml;
}

let catalogTimeout;
// Render Catalog by Category Filter
function renderCatalog(category) {
  if (!catalogGrid) return;

  // Render skeletons immediately to indicate loading
  renderSkeletons();

  if (catalogTimeout) clearTimeout(catalogTimeout);

  catalogTimeout = setTimeout(() => {
    let filtered = products;
    if (category !== "all") {
      filtered = products.filter(p => p.category === category);
    }

    catalogGrid.innerHTML = filtered.map(p => createProductCardHtml(p)).join("");
    attachCardEvents(catalogGrid);
    refreshScrollReveal();
  }, 250);
}

function createProductCardHtml(p) {
  const { id, name, category, categoryLabel, badge, unit, price, sizeOptions, inStock, stock, image, isCustomName } = p;
  const tName = escapeHTML(isCustomName ? name : (window.i18n ? window.i18n.t(`p_${id}_name`) : name));
  const tCategoryLabel = escapeHTML(window.i18n ? window.i18n.t(`catalog_cat_${category}`) : categoryLabel);
  const tBadge = escapeHTML(badge ? (window.i18n ? window.i18n.t(getBadgeTranslationKey(badge)) : badge) : "");
  const tUnit = escapeHTML(window.i18n ? window.i18n.t(getUnitTranslationKey(unit)) : unit);

  const isOutOfStock = inStock === false || (stock !== undefined && stock <= 0);
  const cardClass = isOutOfStock ? "product-card out-of-stock" : "product-card";
  const tOutOfStock = window.i18n ? window.i18n.t("catalog_out_of_stock") : "Нет в наличии";
  const outOfStockBadge = isOutOfStock ? `<span class="product-badge product-badge-outofstock">${tOutOfStock}</span>` : "";
  const activeBadge = outOfStockBadge || (badge ? `<span class="product-badge">${tBadge}</span>` : "");

  return `
    <div class="${cardClass} reveal-item" data-id="${id}">
      <div class="product-img-wrapper btn-preview">
        ${activeBadge}
        <img src="${image}" alt="${tName}" class="lazy-image loading" loading="lazy" width="360" height="360" onload="this.classList.remove('loading')">
      </div>
      <div class="product-info">
        <span class="product-category">${tCategoryLabel}</span>
        <h3 class="product-name btn-preview">${tName}</h3>
        <div class="product-footer">
          <span class="product-price">${
            sizeOptions && sizeOptions.length > 0
              ? `${window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "бастап" : "от"} ${Math.min(...sizeOptions.map(o => o.price)).toLocaleString()} ₸`
              : `${price.toLocaleString()} ₸ / ${tUnit}`
          }</span>
          <button class="btn-card-add btn-add-to-cart" aria-label="Добавить в корзину" ${isOutOfStock ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Attach Events (Preview click, stepper click, add click) to Rendered Cards
function attachCardEvents(gridElement) {
  // Remove loading blur class if image is already cached/loaded
  gridElement.querySelectorAll(".lazy-image").forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.remove("loading");
    } else {
      img.addEventListener("load", () => {
        img.classList.remove("loading");
      });
      // Failsafe timeout to clear loading blur if event missed
      setTimeout(() => {
        if (img.complete) {
          img.classList.remove("loading");
        }
      }, 300);
    }
  });

  // Opening Preview Modal on image or name click
  gridElement.querySelectorAll(".btn-preview").forEach(btn => {
    btn.addEventListener("click", (e) => {
      triggerHapticFeedback();
      const card = e.target.closest(".product-card");
      const id = card.getAttribute("data-id");
      openProductPreview(id);
    });
  });

  // Simple Add to Cart logic
  gridElement.querySelectorAll(".product-card").forEach(card => {
    const addBtn = card.querySelector(".btn-add-to-cart");
    const id = card.getAttribute("data-id");

    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid triggering preview modal if clicked
        triggerHapticFeedback();
        addToCart(id, 1);

        if (addBtn.classList.contains("added")) {
          return;
        }

        // Visual feedback on button click: change plus icon to checkmark icon
        const originalHtml = addBtn.innerHTML;
        addBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" style="color: #4cd137;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        addBtn.classList.add("added");
        setTimeout(() => {
          addBtn.innerHTML = originalHtml;
          addBtn.classList.remove("added");
        }, 1000);
      });
    }
  });
}

// Setup Basic Navigation & UI Listeners
function setupEventListeners() {
  // Catalog tabs toggle
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      triggerHapticFeedback();
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderCatalog(category);
    });
  });

  // Hero circular category nav listeners
  document.querySelectorAll(".category-nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      const category = item.getAttribute("data-category");
      if (category) {
        e.preventDefault();
        const targetTab = Array.from(tabButtons).find(btn => btn.getAttribute("data-category") === category);
        if (targetTab) {
          triggerHapticFeedback();
          targetTab.click();
        }
        const targetSec = document.getElementById("catalog");
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Mobile Menu Drawer toggles
  setupModal(mobileDrawer, mobileMenuBtn, closeDrawerBtn, drawerOverlay, drawerLinks);

  // Cart Sidebar toggles
  setupModal(cartSidebar, openCartBtn, closeCartBtn, cartOverlay);

  // Preview Modal
  setupModal(previewModal, null, closePreviewBtn, previewModal);

  // Success modal
  setupModal(successModal, null, closeSuccessBtn, null);

  // Shipping Method Switcher inside Cart
  deliveryMethodRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "delivery") {
        checkoutAddressGroup.classList.remove("hidden");
        document.getElementById("checkout-address").setAttribute("required", "required");
      } else {
        checkoutAddressGroup.classList.add("hidden");
        document.getElementById("checkout-address").removeAttribute("required");
      }
    });
  });

  // Submit Order Form
    // Sticky Bottom Bar click to open cart
  const stickyBar = document.getElementById("sticky-bottom-bar");
  if (stickyBar) {
    stickyBar.addEventListener("click", () => {
      if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("open");
      }
    });
  }

  checkoutForm.addEventListener("submit", handleCheckoutSubmit);
}

// Open Product Preview Modal
let activePreviewProductId = null;
function openProductPreview(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const { name, price, sizeOptions, ingredients, unit, image, isCustomName } = p;

  const tName = isCustomName ? name : (window.i18n ? window.i18n.t(`p_${id}_name`) : name);
  const tDesc = getProductDesc(p);
  const tIngredients = window.i18n ? window.i18n.t(`p_${id}_ingredients`) : ingredients;
  const tUnit = window.i18n ? window.i18n.t(getUnitTranslationKey(unit)) : unit;

  activePreviewProductId = id;
  modalProductImg.src = image;
  modalProductImg.alt = tName;
  modalProductTitle.textContent = tName;
  modalProductDesc.textContent = tDesc;
  modalProductIngredients.textContent = tIngredients;
  modalQtyVal.textContent = 1; // Reset qty in modal

  let selectedSize = null;
  let selectedPrice = price;

  if (sizeOptions && sizeOptions.length > 0) {
    if (modalSizeGroup && modalSizeContainer) {
      modalSizeGroup.classList.remove("hidden");

      modalSizeContainer.innerHTML = sizeOptions.map((opt, index) => {
        const isActive = index === 0 ? "active" : "";
        const sizeLabel = opt.size;
        return `<button class="size-option-btn ${isActive}" data-index="${index}" data-price="${opt.price}">${sizeLabel}</button>`;
      }).join("");

      selectedSize = sizeOptions[0].size;
      selectedPrice = sizeOptions[0].price;

      modalSizeContainer.querySelectorAll(".size-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          triggerHapticFeedback();
          modalSizeContainer.querySelectorAll(".size-option-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const index = parseInt(btn.getAttribute("data-index"));
          selectedSize = sizeOptions[index].size;
          selectedPrice = sizeOptions[index].price;
          modalProductPrice.textContent = `${selectedPrice.toLocaleString()} ₸ / ${tUnit}`;
        });
      });
    }
  } else {
    if (modalSizeGroup) {
      modalSizeGroup.classList.add("hidden");
    }
  }

  modalProductPrice.textContent = `${selectedPrice.toLocaleString()} ₸ / ${tUnit}`;

  // Clean listeners
  modalMinusBtn.onclick = () => {
    triggerHapticFeedback();
    let qty = parseInt(modalQtyVal.textContent);
    if (qty > 1) {
      qty--;
      modalQtyVal.textContent = qty;
    }
  };

  modalPlusBtn.onclick = () => {
    triggerHapticFeedback();
    let qty = parseInt(modalQtyVal.textContent);
    if (p.stock !== undefined && qty >= p.stock) {
      const tMaxStockAlert = window.i18n && window.i18n.getCurrentLanguage() === "kk"
        ? `Кешіріңіз, бұл тауардан қоймада тек ${p.stock} дана бар.`
        : `Извините, доступно только ${p.stock} шт. этого товара.`;
      alert(tMaxStockAlert);
      return;
    }
    qty++;
    modalQtyVal.textContent = qty;
  };

  modalAddBtn.onclick = () => {
    triggerHapticFeedback();
    const qty = parseInt(modalQtyVal.textContent);
    addToCart(activePreviewProductId, qty, selectedSize, selectedPrice);
    closeModal(previewModal);

    // Open cart automatically to show it
    openModal(cartSidebar, cartOverlay);
  };

  openModal(previewModal);
}

// Add Item to Cart
function addToCart(productOrId, qty, selectedSize, selectedPrice) {
  let p;
  if (typeof productOrId === "object") {
    p = productOrId;
  } else {
    p = products.find(prod => prod.id === productOrId);
  }
  if (!p) return;

  const isOutOfStock = p.inStock === false || (p.stock !== undefined && p.stock <= 0);
  if (isOutOfStock) return;

  const cartItemId = p.id + (selectedSize ? "_" + selectedSize : "");
  const existing = cart.find(item => item.cartItemId === cartItemId);
  const currentQtyInCart = existing ? existing.qty : 0;
  if (p.stock !== undefined && currentQtyInCart + qty > p.stock) {
    const tMaxStockAlert = window.i18n && window.i18n.getCurrentLanguage() === "kk"
      ? `Кешіріңіз, бұл тауардан қоймада тек ${p.stock} дана бар.`
      : `Извините, доступно только ${p.stock} шт. этого товара.`;
    alert(tMaxStockAlert);
    return;
  }

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      cartItemId: cartItemId,
      product: p,
      qty: qty,
      selectedSize: selectedSize || null,
      price: selectedPrice !== undefined ? selectedPrice : p.price
    });
  }

  updateCartUi();
}

// Remove Item from Cart
function removeFromCart(cartItemId) {
  cart = cart.filter(item => (item.cartItemId || item.product.id) !== cartItemId);
  updateCartUi();
}

function changeCartItemQty(cartItemId, newQty) {
  const item = cart.find(i => (i.cartItemId || i.product.id) === cartItemId);
  if (item) {
    if (item.product.stock !== undefined && newQty > item.product.stock) {
      const tMaxStockAlert = window.i18n && window.i18n.getCurrentLanguage() === "kk"
        ? `Кешіріңіз, бұл тауардан қоймада тек ${item.product.stock} дана бар.`
        : `Извините, доступно только ${item.product.stock} шт. этого товара.`;
      alert(tMaxStockAlert);
      return;
    }
    item.qty = newQty;
    if (item.qty <= 0) {
      removeFromCart(cartItemId);
    } else {
      updateCartUi();
      updateLocationUi();
    }
  }
}

// Update Cart Display & Badges
function updateCartUi() {
  // Count badge
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Check if we should trigger jiggle bounce animation
  const badgeEl = document.querySelector(".cart-count-badge");
  const currentBadgeCount = badgeEl ? (parseInt(badgeEl.textContent) || 0) : 0;
  if (totalItems > currentBadgeCount) {
    const cartBtns = document.querySelectorAll(".cart-btn");
    cartBtns.forEach(btn => {
      btn.classList.remove("jiggle");
      void btn.offsetWidth; // Trigger reflow
      btn.classList.add("jiggle");
      setTimeout(() => btn.classList.remove("jiggle"), 500);
    });
  }

  cartCountBadges.forEach(badge => {
    badge.textContent = totalItems;
  });

  // Calculate sum using item.price instead of item.product.price
  const subtotal = cart.reduce((sum, item) => sum + ((item.price !== undefined ? item.price : item.product.price) * item.qty), 0);
  cartTotalSum.textContent = `${subtotal.toLocaleString()} ₸`;
  try {
    localStorage.setItem("nazcake_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Failed to save cart to localStorage:", e);
  }

  // Update floating glass pill sticky bar
  const stickyBar = document.getElementById("sticky-bottom-bar");
  const stickyBadge = document.getElementById("sticky-bar-badge");
  const stickyTotal = document.getElementById("sticky-bar-total");
  if (stickyBar) {
    if (totalItems > 0) {
      if (stickyBar.classList.contains("hidden")) {
        stickyBar.classList.remove("hidden", "hiding");
        // Re-trigger bounce animation
        stickyBar.style.animation = "none";
        stickyBar.offsetHeight; // force reflow
        stickyBar.style.animation = "";
      }
      document.body.classList.add("has-sticky-bar");
      if (stickyBadge) stickyBadge.textContent = totalItems;
      if (stickyTotal) stickyTotal.textContent = subtotal.toLocaleString() + " ₸";
    } else {
      if (!stickyBar.classList.contains("hidden")) {
        stickyBar.classList.add("hiding");
        stickyBar.addEventListener("animationend", () => {
          stickyBar.classList.add("hidden");
          stickyBar.classList.remove("hiding");
          document.body.classList.remove("has-sticky-bar");
        }, { once: true });
      }
    }
  }

  if (cart.length === 0) {
    const tEmptyTitle = window.i18n ? window.i18n.t("cart_empty_title") : "В корзине пусто";
    const tEmptyDesc = window.i18n ? window.i18n.t("cart_empty_desc") : "Похоже, вы еще не выбрали десерты. Давайте это исправим!";
    const tEmptyBtn = window.i18n ? window.i18n.t("cart_empty_btn") : "Хочу сладкого!";

    cartItemsContainer.innerHTML = `
      <div class="empty-cart-container">
        <div class="empty-cart-plate-svg">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-dasharray="4 2" opacity="0.6"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--accent-chocolate)" stroke-width="1.5" opacity="0.3"/>
            <circle cx="42" cy="46" r="2" fill="var(--accent-chocolate)" class="crumb crumb-1"/>
            <circle cx="56" cy="40" r="1.5" fill="var(--accent-gold)" class="crumb crumb-2"/>
            <circle cx="48" cy="58" r="2.5" fill="var(--accent-chocolate)" class="crumb crumb-3"/>
            <circle cx="60" cy="52" r="1" fill="var(--accent-gold)" class="crumb crumb-4"/>
            <path d="M 46,32 A 4,4 0 0,0 42,36 A 3,3 0 0,0 39,39 A 4,4 0 0,0 35,43 A 3,3 0 0,0 32,46" fill="none" stroke="var(--accent-gold)" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
          </svg>
        </div>
        <h4 class="empty-cart-title">${tEmptyTitle}</h4>
        <p class="empty-cart-desc">${tEmptyDesc}</p>
        <button class="empty-cart-btn btn" id="empty-cart-shop-btn">${tEmptyBtn}</button>
      </div>
    `;

    const shopBtn = document.getElementById("empty-cart-shop-btn");
    if (shopBtn) {
      shopBtn.addEventListener("click", () => {
        triggerHapticFeedback();
        const sidebar = document.getElementById("cart-sidebar");
        const overlay = document.getElementById("cart-overlay");
        closeModal(sidebar, overlay);
        const catalogEl = document.getElementById("catalog");
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => {
    const p = item.product;
    let tName = p.isCustomName ? p.name : (p.id.startsWith("bento_custom_")
      ? (window.i18n ? window.i18n.t("bento_custom_name") : p.name)
      : (window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name));

    if (item.selectedSize) {
      tName += ` (${item.selectedSize})`;
    }
    const tRemove = window.i18n ? window.i18n.t("cart_lbl_remove") : "Удалить";
    const itemPrice = item.price !== undefined ? item.price : p.price;

    return `
      <div class="cart-item" data-id="PLACEHOLDER_CART_ITEM_ID">
        <div class="cart-item-swipe-bg">
          <span class="swipe-delete-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            ${tRemove}
          </span>
        </div>
        <div class="cart-item-inner">
          <img src="${p.image}" alt="${tName}" class="cart-item-img" width="64" height="64">
          <div class="cart-item-details">
            <h5 class="cart-item-name">${tName}</h5>
            <span class="cart-item-price">PLACEHOLDER_ITEM_PRICE ₸</span>
            <div class="cart-item-actions">
              <div class="quantity-stepper">
                <button class="stepper-btn minus-cart-qty" data-id="PLACEHOLDER_CART_ITEM_ID" aria-label="Уменьшить количество">−</button>
                <span class="quantity-val">${item.qty}</span>
                <button class="stepper-btn plus-cart-qty" data-id="PLACEHOLDER_CART_ITEM_ID" aria-label="Увеличить количество">+</button>
              </div>
            </div>
          </div>
          <button class="cart-item-remove" data-id="PLACEHOLDER_CART_ITEM_ID" aria-label="${tRemove}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `.replace(/PLACEHOLDER_CART_ITEM_ID/g, item.cartItemId || p.id).replace(/PLACEHOLDER_ITEM_PRICE/g, (itemPrice * item.qty).toLocaleString());
  }).join("");

  // Add event listeners to newly generated elements inside cart list
  cartItemsContainer.querySelectorAll(".minus-cart-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerHapticFeedback();
      const id = btn.getAttribute("data-id");
      const item = cart.find(i => (i.cartItemId || i.product.id) === id);
      if (item) changeCartItemQty(id, item.qty - 1);
    });
  });

  cartItemsContainer.querySelectorAll(".plus-cart-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerHapticFeedback();
      const id = btn.getAttribute("data-id");
      const item = cart.find(i => (i.cartItemId || i.product.id) === id);
      if (item) changeCartItemQty(id, item.qty + 1);
    });
  });

  cartItemsContainer.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerHapticFeedback();
      const id = btn.getAttribute("data-id");
      removeFromCart(id);
    });
  });

  // Swipe-to-delete touch gestures for newly generated cart items
  cartItemsContainer.querySelectorAll(".cart-item").forEach(itemEl => {
    const inner = itemEl.querySelector(".cart-item-inner");
    if (!inner) return;
    const id = itemEl.getAttribute("data-id");

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;

    inner.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      isDragging = true;
      inner.style.transition = "none";
    }, { passive: true });

    inner.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      const deltaY = e.touches[0].clientY - startY;

      // Only swipe left and primarily horizontal
      if (deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
        inner.style.transform = `translateX(${deltaX}px)`;
      }
    }, { passive: true });

    inner.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      inner.style.transition = "";

      const deltaX = currentX - startX;
      if (deltaX < -120) {
        triggerHapticFeedback();
        inner.style.transform = "translateX(-100%)";
        setTimeout(() => {
          removeFromCart(id);
        }, 300);
      } else {
        inner.style.transform = "";
      }
    });
  });
}

// Setup Interactive Bento Customizer
function setupBentoCustomizer() {
  const cakeTextElement = document.getElementById("cake-text-element");
  const bentoTextInput = document.getElementById("bento-text");
  const baseColorOptions = document.getElementById("base-color-options");
  const textColorOptions = document.getElementById("text-color-options");
  const sprinklesSelect = document.getElementById("sprinkles-select");
  const addBentoBtn = document.getElementById("add-bento-btn");

  const cakeTop = document.getElementById("cake-top");
  const cakeSide = document.getElementById("cake-side");
  const sprinklesGroup = document.getElementById("sprinkles-group");

  let bentoConfig = {
    baseColor: "#ffd1dc", // default pastel pink
    textColor: "#4a2c11", // default chocolate
    sprinkles: "none",
    text: "Happy Birthday!"
  };

  setupBaseColorOptions(bentoConfig, baseColorOptions, cakeTop, cakeSide);
  setupTextColorOptions(bentoConfig, textColorOptions, cakeTextElement);
  setupTextInput(bentoConfig, bentoTextInput, cakeTextElement);
  setupSprinklesOptions(bentoConfig, sprinklesSelect, sprinklesGroup);
  setupAddBentoBtn(bentoConfig, addBentoBtn);
}

function setupBaseColorOptions(bentoConfig, baseColorOptions, cakeTop, cakeSide) {
  baseColorOptions.querySelectorAll(".color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      baseColorOptions.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      const color = dot.getAttribute("data-color");
      bentoConfig.baseColor = color;

      // Update SVG Cake colors
      cakeTop.setAttribute("fill", color);
      // Generate slightly darker color for the side shade
      const darkerColor = adjustColorBrightness(color, -15);
      cakeSide.setAttribute("fill", darkerColor);
    });
  });
}

function setupTextColorOptions(bentoConfig, textColorOptions, cakeTextElement) {
  textColorOptions.querySelectorAll(".color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      textColorOptions.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      const color = dot.getAttribute("data-color");
      bentoConfig.textColor = color;
      cakeTextElement.setAttribute("fill", color);
    });
  });
}

function setupTextInput(bentoConfig, bentoTextInput, cakeTextElement) {
  bentoTextInput.addEventListener("input", (e) => {
    let txt = e.target.value;
    if (txt.length === 0) {
      cakeTextElement.textContent = "";
      bentoConfig.text = "";
    } else {
      cakeTextElement.textContent = txt;
      bentoConfig.text = txt;
    }
  });
}

function setupSprinklesOptions(bentoConfig, sprinklesSelect, sprinklesGroup) {
  sprinklesSelect.addEventListener("change", (e) => {
    const type = e.target.value;
    bentoConfig.sprinkles = type;
    drawSprinkles(type, sprinklesGroup);
  });
}

// Helper: Draw sprinkles inside cake top ellipse (cx=150, cy=150, rx=90, ry=20)
function drawSprinkles(type, sprinklesGroup) {
  sprinklesGroup.innerHTML = "";
  if (type === "none") return;

  // Generate static spread of sprinkles inside ellipse boundaries using modern ES6 Array.from()
  // x = 150 + cos(t) * rx * scale, y = 150 + sin(t) * ry * scale
  const count = type === "pearls" ? 30 : 20;
  const points = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const rScale = Math.random() * 0.75 + 0.1; // keep away from edges
    const x = 150 + Math.cos(angle) * 90 * rScale;
    const y = 150 + Math.sin(angle) * 20 * rScale;
    return { x, y };
  });

  points.forEach((pt, idx) => {
    if (type === "pearls") {
      // Simple white shiny pearls
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("r", 2.5);
      circle.setAttribute("fill", "#ffffff");
      circle.setAttribute("stroke", "#e5d0ba");
      circle.setAttribute("stroke-width", "0.5");
      sprinklesGroup.appendChild(circle);
    } else if (type === "hearts") {
      // Red heart path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const scale = 0.5;
      path.setAttribute("d", `M ${pt.x} ${pt.y} c -2 -3, -5 -1, -5 2 c 0 2, 2 4, 5 6 c 3 -2, 5 -4, 5 -6 c 0 -3, -3 -5, -5 -2 Z`);
      path.setAttribute("fill", "#ff4f5e");
      sprinklesGroup.appendChild(path);
    } else if (type === "gold") {
      // Gold dust
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("r", 1.5);
      circle.setAttribute("fill", "#ffd700");
      sprinklesGroup.appendChild(circle);
    } else if (type === "stars") {
      // Little yellow stars
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("points", `${pt.x},${pt.y-3} ${pt.x+1},${pt.y-1} ${pt.x+3},${pt.y-1} ${pt.x+1.5},${pt.y} ${pt.x+2},${pt.y+2} ${pt.x},${pt.y+1} ${pt.x-2},${pt.y+2} ${pt.x-1.5},${pt.y} ${pt.x-3},${pt.y-1} ${pt.x-1},${pt.y-1}`);
      polygon.setAttribute("fill", "#ffe272");
      sprinklesGroup.appendChild(polygon);
    }
  });
}

function setupAddBentoBtn(bentoConfig, addBentoBtn) {
  // Add Bento Cake to Cart
  addBentoBtn.addEventListener("click", () => {
    const bentoId = `bento_custom_${Date.now()}`;
    const descText = `Покрытие: ${bentoConfig.baseColor}, Крем: ${bentoConfig.textColor}, Посыпка: ${bentoConfig.sprinkles}, Надпись: "${bentoConfig.text || 'нет'}"`;

    const customizedBentoProduct = {
      id: bentoId,
      name: `Бенто-торт Индивидуальный`,
      category: "cakes",
      categoryLabel: "Торты",
      price: 3500,
      unit: "шт.",
      image: "images/bento_cake.webp", // default bento image
      desc: `Ваш собственный собранный дизайн! ${descText}`,
      ingredients: "Классический ванильный бисквит, клубничный конфитюр, нежный сырно-сливочный крем.",
      bentoConfig: { ...bentoConfig } // store configuration for dynamic translation
    };

    addToCart(customizedBentoProduct, 1);

    // Show feedback
    const originalText = addBentoBtn.textContent;
    addBentoBtn.textContent = window.i18n ? window.i18n.t("bento_btn_added") : "Шедевр в корзине! ✓";
    addBentoBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      addBentoBtn.textContent = originalText;
      addBentoBtn.style.transform = "";
    }, 1200);

    // Open cart sidebar
    setTimeout(() => {
      openModal(cartSidebar, cartOverlay);
    }, 800);
  });
}
// Adjust Hex Color brightness
function adjustColorBrightness(hex, percent) {
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = Math.max(0, Math.min(255, R));
  G = Math.max(0, Math.min(255, G));
  B = Math.max(0, Math.min(255, B));

  return `#${[R, G, B].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Setup Yandex.Delivery Address Price Calculator
// --- Delivery Calculator Helpers ---

async function fetchCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=Атырау, ${encodeURIComponent(address)}&format=json&limit=1`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "NazcakeConfectioneryDeliveryCalculator/1.0 (contact: info@nazcake.kz)"
    }
  });

  if (!response.ok) {
    throw new Error("delivery_err_geocoder");
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error("delivery_err_notfound");
  }

  const location = data[0];
  return {
    lat: parseFloat(location.lat),
lon: parseFloat(location.lon)
  };
}

// Render Dashboard Data
function renderAdminDashboard() {
  renderAdminCatalog();
  renderAdminOrders();
}

// Render products in catalog management tab
function renderAdminCatalog() {
  const listContainer = document.getElementById("admin-catalog-list");
  if (!listContainer) return;

  const categoryFilter = document.getElementById("admin-filter-category")?.value || "all";
  const searchQuery = document.getElementById("admin-filter-search")?.value.toLowerCase() || "";

  let filtered = products;
  if (categoryFilter !== "all") {
    filtered = filtered.filter(p => p.category === categoryFilter);
  }
  if (searchQuery) {
    filtered = filtered.filter(p => {
      const pName = (p.isCustomName ? p.name : (window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name)).toLowerCase();
      return pName.includes(searchQuery);
    });
  }

  const tName = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Атауы" : "Название";
  const tPrice = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Бағасы (₸)" : "Цена (₸)";
  const tInStock = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Қолжетімді" : "В наличии";
  const tSave = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Сақтау" : "Сохранить";
  const tStock = window.i18n ? window.i18n.t("admin_lbl_stock") : "Кол-во";

  listContainer.innerHTML = filtered.map(p => {
    const isChecked = p.inStock !== false ? "checked" : "";
    const pName = escapeHTML(p.isCustomName ? p.name : (window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name));

    return `
      <div class="admin-product-row" data-id="${p.id}">
        <div class="admin-prod-img-container" onclick="triggerAdminImageUpload('${p.id}')">
          ${p.image ? `<img src="${p.image}" alt="${pName}" class="admin-prod-img" width="50" height="50">` : `<div class="admin-prod-img empty-admin-img" style="background-color: var(--bg-tertiary);"></div>`}
          <div class="admin-prod-img-overlay">
            <span>Изменить</span>
          </div>
          <input type="file" id="admin-file-input-${p.id}" class="admin-edit-image-file" accept="image/*" style="display: none;" onchange="handleAdminImageUpload(event, '${p.id}')">
        </div>
        <div class="admin-product-details">
          <div class="admin-prod-form-group">
            <label>${tName}</label>
            <input type="text" class="admin-edit-name" value="${pName}">
          </div>
          <div class="admin-prod-form-group">
            <label>${tStock}</label>
            <input type="number" class="admin-edit-stock" value="${p.stock !== undefined ? p.stock : ""}" placeholder="∞">
          </div>
          <div class="admin-prod-form-group">
            <label>${tPrice}</label>
            <input type="number" class="admin-edit-price" value="${p.price}" min="0">
          </div>
          <div class="admin-prod-form-group">
            <label class="admin-checkbox-label">
              <input type="checkbox" class="admin-edit-instock" ${isChecked}>
              ${tInStock}
            </label>
          </div>
          <button class="btn btn-primary btn-admin-save" onclick="saveAdminProduct('${p.id}')">${tSave}</button>
        </div>
      </div>
    `;
  }).join("");
}

// Global helper functions for image uploads
window.triggerAdminImageUpload = function(id) {
  const fileInput = document.getElementById(`admin-file-input-${id}`);
  if (fileInput) fileInput.click();
};

window.handleAdminImageUpload = function(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Resize using canvas to keep it lightweight for localStorage
      const canvas = document.createElement("canvas");
      const maxDim = 600;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed jpeg data URL (0.7 quality is about ~10-15KB)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);

      // Preview locally in the admin panel row
      window.updateAdminImagePreview(id, dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};


window.updateAdminImagePreview = function(id, dataUrl) {
      const row = document.querySelector(`.admin-product-row[data-id="${id}"]`);
  if (!row) return;

        const imgEl = row.querySelector(".admin-prod-img");
        if (imgEl) {
          imgEl.src = dataUrl;
        } else {
          const imgContainer = row.querySelector(".admin-prod-img-container");
    if (!imgContainer) return;
          const emptyDiv = imgContainer.querySelector(".empty-admin-img");
          if (emptyDiv) {
            const newImg = document.createElement("img");
            newImg.className = "admin-prod-img";
            newImg.alt = "Preview";
            newImg.src = dataUrl;
            imgContainer.replaceChild(newImg, emptyDiv);
          }
        }
        row.setAttribute("data-new-image", dataUrl);
};

// Global helper function to save product edit
window.saveAdminProduct = function(id) {
  const row = document.querySelector(`.admin-product-row[data-id="${id}"]`);
  if (!row) return;

  const nameInput = row.querySelector(".admin-edit-name").value.trim();
  const priceInput = parseInt(row.querySelector(".admin-edit-price").value.trim());
  const inStockInput = row.querySelector(".admin-edit-instock").checked;
  const stockInputVal = row.querySelector(".admin-edit-stock").value.trim();
  const stockInput = stockInputVal === "" ? undefined : parseInt(stockInputVal);
  const newImageVal = row.getAttribute("data-new-image") || undefined;

  if (isNaN(priceInput) || priceInput < 0) {
    alert("Пожалуйста, введите корректную цену!");
    return;
  }
  if (stockInput !== undefined && (isNaN(stockInput) || stockInput < 0)) {
    alert("Пожалуйста, введите корректное количество!");
    return;
  }

  // Update in local memory array
  products = products.map(p => {
    if (p.id === id) {
      return {
        ...p,
        name: nameInput,
        price: priceInput,
        inStock: inStockInput,
        stock: stockInput,
        image: newImageVal !== undefined ? newImageVal : p.image,
        isCustomName: true
      };
    }
    return p;
  });

  // Save to local storage
  try {
    const customList = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      inStock: p.inStock,
      stock: p.stock,
      image: p.image,
      isCustomName: p.isCustomName || false
    }));
    localStorage.setItem("nazcake_custom_products", JSON.stringify(customList));
  } catch(e) {
    console.warn("Failed to save custom products to localStorage:", e);
  }

  // Visual feedback on save
  const saveBtn = row.querySelector(".btn-admin-save");
  const origText = saveBtn.textContent;
  saveBtn.textContent = "✓";
  saveBtn.style.background = "#27ae60";
  setTimeout(() => {
    saveBtn.textContent = origText;
    saveBtn.style.background = "";
  }, 1000);

  // Re-render main site catalog, bestsellers, and cart
  renderBestsellers();
  const activeTab = document.querySelector(".tab-btn.active");
  const category = activeTab ? activeTab.getAttribute("data-category") : "all";
  renderCatalog(category);

  // Sync cart items with updated product data
  cart.forEach(item => {
    if (item.product && item.product.id === id) {
      const updatedProduct = products.find(p => p.id === id);
      if (updatedProduct) {
        item.product = updatedProduct;
      }
    }
  });
  updateCartUi();
}

function checkAtyrauBounds(lat, lon, bounds) {
  if (lat < bounds.minLat || lat > bounds.maxLat || lon < bounds.minLon || lon > bounds.maxLon) {
    throw new Error("delivery_err_outofbounds");
  }
}

function calculateDeliveryCost(distance) {
  let cost = 500 + Math.round(distance * 150);
  cost = Math.ceil(cost / 50) * 50;
  if (cost < 500) cost = 500;
  if (cost > 3500) cost = 3500;
  return cost;
}

function calculateDeliveryTime(distance) {
  return Math.round(distance * 4) + 20;
}

function getDeliveryErrorMessage(msg) {
  if (window.i18n) {
    if (msg === "delivery_err_geocoder" || msg === "delivery_err_notfound" || msg === "delivery_err_outofbounds") {
      return window.i18n.t(msg);
    } else {
      return window.i18n.t("delivery_err_unknown");
    }
  } else {
    if (msg === "delivery_err_geocoder") return "Не удалось подключиться к серверу геокодирования.";
    if (msg === "delivery_err_notfound") return "Адрес не найден. Пожалуйста, проверьте правильность написания.";
    if (msg === "delivery_err_outofbounds") return "Яндекс.Доставка (Экспресс) доступна только в пределах города Атырау.";
    return "Ошибка при расчете стоимости доставки.";
  }
}

function showDeliveryError(msg, errorBox, resultsBox) {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
  resultsBox.classList.add("hidden");
}

function hideDeliveryError(errorBox) {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function setupDeliveryCalculator() {
  const calcBtn = document.getElementById("calc-delivery-btn");
  const addressInput = document.getElementById("delivery-address");
  const resultsBox = document.getElementById("calc-results-box");
  const errorBox = document.getElementById("calc-error-box");

  const resDistance = document.getElementById("result-distance");
  const resCost = document.getElementById("result-cost");
  const resTime = document.getElementById("result-time");

  // Bakery coordinates (г. Атырау, ул. Балхашская 23)
  const bakeryLat = 47.124524;
  const bakeryLon = 51.939947;

  // Atyrau bounding box coordinates (approximate city limits)
  const atyrauBounds = {
    minLat: 46.95,
    maxLat: 47.25,
    minLon: 51.75,
    maxLon: 52.10
  };

  calcBtn.addEventListener("click", async () => {
    const address = addressInput.value.trim();
    if (!address) {
showDeliveryError(window.i18n ? window.i18n.t("delivery_err_empty") : "Пожалуйста, введите адрес доставки в Атырау.", errorBox, resultsBox);
      return;
    }

    calcBtn.disabled = true;
calcBtn.textContent = window.i18n ? window.i18n.t("delivery_btn_calculating") : "Выполняется расчет...";
    hideDeliveryError(errorBox);
    resultsBox.classList.add("hidden");

    try {
      const { lat, lon } = await fetchCoordinates(address);

      checkAtyrauBounds(lat, lon, atyrauBounds);


      const distance = getHaversineDistance(bakeryLat, bakeryLon, lat, lon);
      const cost = calculateDeliveryCost(distance);
      const estTime = calculateDeliveryTime(distance);

      resDistance.textContent = `${distance.toFixed(1)} км`;
      resCost.textContent = `${cost.toLocaleString()} ₸`;
      resTime.textContent = `~${estTime} минут`;

      resultsBox.classList.remove("hidden");

      const checkoutAddressField = document.getElementById("checkout-address");
      if (checkoutAddressField) {
        checkoutAddressField.value = address;
      }

    } catch (err) {
let msg = err.message;
      if (window.i18n) {
        if (msg === "delivery_err_geocoder" || msg === "delivery_err_notfound" || msg === "delivery_err_outofbounds") {
          msg = window.i18n.t(msg);
        } else {
          msg = window.i18n.t("delivery_err_unknown");
        }
      } else {
        if (msg === "delivery_err_geocoder") msg = "Не удалось подключиться к серверу геокодирования.";
        else if (msg === "delivery_err_notfound") msg = "Адрес не найден. Пожалуйста, проверьте правильность написания.";
        else if (msg === "delivery_err_outofbounds") msg = "Яндекс.Доставка (Экспресс) доступна только в пределах города Атырау.";
        else msg = "Ошибка при расчете стоимости доставки.";
      }
      showDeliveryError(msg, errorBox, resultsBox);
    } finally {
      calcBtn.disabled = false;
      calcBtn.textContent = window.i18n ? window.i18n.t("delivery_btn_calc") : "Рассчитать доставку";
    }
  });
}


// Helper to sanitize HTML to prevent injection in Telegram messages
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

// Handle Order Checkout Submission & Send to Telegram
function formatCheckoutMessage(name, phone, method, address, cart, subtotal, t) {
  let message = `*🍰 ${window.i18n ? t("tg_order_title") : "Новый заказ от Nazcake!"}*\n\n`;
  message += `👤 *${window.i18n ? t("tg_client") : "Клиент"}:* ${name}\n`;
  message += `📞 *${window.i18n ? t("tg_phone") : "Телефон"}:* ${phone}\n`;

  const tMethod = method === "delivery"
    ? (window.i18n ? t("cart_opt_delivery") : "Доставка Яндекс")
    : (window.i18n ? t("cart_opt_pickup") : "Самовывоз");
  message += `📦 *${window.i18n ? t("tg_method") : "Способ получения"}:* ${tMethod}\n`;

  if (method === "delivery") {
    message += `📍 *${window.i18n ? t("tg_address") : "Адрес"}:* ${address}\n`;
  }

  message += `\n🛒 *${window.i18n ? t("tg_items") : "Товары"}:*\n`;

  cart.forEach((item, idx) => {
    const p = item.product;
    let displayName = p.isCustomName ? p.name : (p.id.startsWith("bento_custom_")
      ? (window.i18n ? t("bento_custom_name") : p.name)
      : (window.i18n ? t(`p_${p.id}_name`) : p.name));

    if (item.selectedSize) {
      displayName += ` (${item.selectedSize})`;
    }
    const tUnit = window.i18n ? t(getUnitTranslationKey(p.unit)) : p.unit;
    const itemPrice = item.price !== undefined ? item.price : p.price;

    message += `${idx + 1}. *${displayName}* — ${item.qty} ${tUnit} (${(itemPrice * item.qty).toLocaleString()} ₸)\n`;

    if (p.id.startsWith("bento_custom_")) {
      const tDesc = getProductDesc(p);
      message += `   _${window.i18n ? t("tg_details") : "Детали"}: ${tDesc}_\n`;
    }
  });

  message += `\n💵 *${window.i18n ? t("tg_total") : "Итоговая сумма"}:* ${subtotal.toLocaleString()} ₸`;
  return message;
}

function buildOrderObject(name, phone, method, address, cart, subtotal, t) {
  return {
    id: "NZ-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString("ru-RU"),
    customerName: name,
    customerPhone: phone,
    deliveryMethod: method,
    address: method === "delivery" ? address : "",
    items: cart.map(item => {
      const p = item.product;
      let displayName = p.isCustomName ? p.name : (p.id.startsWith("bento_custom_")
        ? (window.i18n ? t("bento_custom_name") : p.name)
        : (window.i18n ? t(`p_${p.id}_name`) : p.name));
      if (item.selectedSize) {
        displayName += ` (${item.selectedSize})`;
      }
      return {
        id: p.id,
        name: displayName,
        qty: item.qty,
        price: item.price !== undefined ? item.price : p.price
      };
    }),
    subtotal: subtotal,
    status: "new"
  };
}

function saveOrderToHistory(newOrder) {
  try {
    let history = getOrdersHistory();
    history.unshift(newOrder);
    localStorage.setItem("nazcake_orders_history", JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save order to history:", e);
  }
}

// Handle Order Checkout Submission & Send to Telegram
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("checkout-name").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const method = document.querySelector('input[name="delivery-method"]:checked').value;
  const address = document.getElementById("checkout-address").value.trim();

  // Save customer data to localStorage
  localStorage.setItem("nazcake_customer_name", name);
  localStorage.setItem("nazcake_customer_phone", phone);
  localStorage.setItem("nazcake_customer_address", address);
  localStorage.setItem("nazcake_customer_method", method);

  const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

  if (cart.length === 0) {
    alert(window.i18n ? t("cart_err_empty_cart") : "Ваша корзина пуста. Невозможно отправить заказ!");
    return;
  }

  const submitBtn = document.getElementById("checkout-submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = window.i18n ? t("cart_btn_submitting") : "Отправка заказа...";

  // Calculate total using item.price
  const subtotal = cart.reduce((sum, item) => sum + ((item.price !== undefined ? item.price : item.product.price) * item.qty), 0);

  // Format message for WhatsApp (Telegram)
  const message = formatCheckoutMessage(name, phone, method, address, cart, subtotal, t);

  // Send to WhatsApp
  const phoneWA = "77783567221"; // Target WhatsApp number
  const waUrl = `https://wa.me/${phoneWA}?text=${encodeURIComponent(message)}`;

  // Save order to history
  const newOrder = buildOrderObject(name, phone, method, address, cart, subtotal, t);
  saveOrderToHistory(newOrder);

  window.open(waUrl, '_blank');
  orderSucceeded();
}

// Actions to perform on successful checkout
function orderSucceeded() {
  // Clear cart
  cart = [];
  updateCartUi();

  // Close Cart Sidebar
  closeModal(cartSidebar, cartOverlay);

  // Clear checkout form fields
  checkoutForm.reset();
  checkoutAddressGroup.classList.add("hidden");
  document.getElementById("checkout-address").removeAttribute("required");

  // Show Success Modal
  openModal(successModal);

  // Re-enable submit button
  const submitBtn = document.getElementById("checkout-submit-btn");
  submitBtn.disabled = false;
  submitBtn.textContent = window.i18n ? window.i18n.t("cart_btn_checkout") : "Оформить заказ в WhatsApp";
}



function triggerHapticFeedback() {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(12);
    } catch (e) {
      // Ignore vibration blocks
    }
  }
}

function openModal(modal, overlay) {
  if (modal) modal.classList.add("open");
  if (overlay) overlay.classList.add("open");
  triggerHapticFeedback();
}

function closeModal(modal, overlay) {
  if (modal) modal.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  triggerHapticFeedback();
}

function setupCartSwipeClose() {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar) return;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;

  sidebar.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = startX;
    isDragging = true;
    sidebar.style.transition = "none";
  }, { passive: true });

  sidebar.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    const deltaY = e.touches[0].clientY - startY;

    if (deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
      sidebar.style.transform = `translateX(${deltaX}px)`;
    }
  }, { passive: true });

  sidebar.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    sidebar.style.transition = "";

    const deltaX = currentX - startX;
    if (deltaX > 100) {
      closeModal(sidebar, cartOverlay);
      setTimeout(() => {
        sidebar.style.transform = "";
      }, 400);
    } else {
      sidebar.style.transform = "";
    }
  });
}

function setupModalSwipeClose() {
  const modalContainer = document.querySelector("#preview-modal .modal-container");
  if (!modalContainer) return;

  let startX = 0;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  modalContainer.addEventListener("touchstart", (e) => {
    if (modalContainer.scrollTop > 0) return;
    if (e.touches.length !== 1) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentY = startY;
    isDragging = true;
    modalContainer.style.transition = "none";
  }, { passive: true });

  modalContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    const deltaX = e.touches[0].clientX - startX;

    if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (e.cancelable) e.preventDefault();
      modalContainer.style.transform = `scale(1) translateY(${deltaY}px)`;
    }
  }, { passive: false });

  modalContainer.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    modalContainer.style.transition = "";

    const deltaY = currentY - startY;
    if (deltaY > 120) {
      const closeBtn = document.getElementById("close-preview-btn");
      if (closeBtn) {
        closeBtn.click();
      } else {
        closeModal(previewModal, previewModal);
      }
      setTimeout(() => {
        modalContainer.style.transform = "";
      }, 400);
    } else {
      modalContainer.style.transform = "";
    }
  });
}

let scrollObserver;

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
    return;
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  refreshScrollReveal();
}

function refreshScrollReveal() {
  if (!scrollObserver) return;
  document.querySelectorAll('.reveal-item:not(.revealed)').forEach(el => {
    scrollObserver.observe(el);
  });
}

function setupModal(modal, openBtn, closeBtn, overlay, extraCloseElements = []) {
  const open = () => openModal(modal, overlay);

  const close = () => closeModal(modal, overlay);

  if (openBtn) openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      // Only close if clicking the overlay itself, not its children
      if (e.target === overlay) {
        close();
      }
    });
  }

  if (extraCloseElements && extraCloseElements.length > 0) {
    extraCloseElements.forEach(el => el.addEventListener("click", close));
  }
}
let detectedCity = "atyrau";

async function setupGeolocation() {
  const widget = document.getElementById("location-widget");
  const drawerWidget = document.getElementById("drawer-location-widget");

  if (!widget || !drawerWidget) return;

  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Geolocation failed");
    const data = await response.json();

    if (data && data.city) {
      detectedCity = data.city.toLowerCase().trim();
    }
  } catch (err) {
    console.warn("Could not determine user location via IP:", err);
    detectedCity = "atyrau"; // Default fallback
  }

  updateLocationUi();
}

function updateLocationUi() {
  const widget = document.getElementById("location-widget");
  const drawerWidget = document.getElementById("drawer-location-widget");
  const alertBanner = document.getElementById("location-alert-banner");
  const textEl = document.getElementById("location-text");
  const drawerTextEl = document.getElementById("drawer-location-text");

  if (!widget || !drawerWidget) return;

  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : "ru";

  // Translate city if we know it
  const cityMap = {
    atyrau: { ru: "Атырау", kk: "Атырау" },
    almaty: { ru: "Алматы", kk: "Алматы" },
    astana: { ru: "Астана", kk: "Астана" },
    shymkent: { ru: "Шымкент", kk: "Шымкент" },
    karaganda: { ru: "Караганда", kk: "Қарағанды" },
    aktobe: { ru: "Актобе", kk: "Ақтөбе" },
    taraz: { ru: "Тараз", kk: "Тараз" },
    pavlodar: { ru: "Павлодар", kk: "Павлодар" },
    semey: { ru: "Семей", kk: "Семей" },
    vocals: { ru: "Уральск", kk: "Орал" },
    uralsk: { ru: "Уральск", kk: "Орал" },
    kostanay: { ru: "Костанай", kk: "Қостанай" },
    kyzylorda: { ru: "Кызылорда", kk: "Қызылорда" },
    petropavlovsk: { ru: "Петропавловск", kk: "Петропавл" }
  };

  let displayCity = detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1);
  if (cityMap[detectedCity]) {
    displayCity = cityMap[detectedCity][currentLang];
  }

  if (detectedCity !== "atyrau") {
    if (window.i18n) {
      displayCity = window.i18n.t("location_your_city").replace("{city}", displayCity);
    } else {
      displayCity = "Ваш город: " + displayCity;
    }
  }

  // Update text
  if (textEl) textEl.textContent = displayCity;
  if (drawerTextEl) drawerTextEl.textContent = displayCity;

  // Show widgets
  widget.classList.remove("hidden");
  drawerWidget.classList.remove("hidden");

  // Show/hide banner if not in Atyrau
  if (alertBanner) {
    if (detectedCity !== "atyrau") {
      alertBanner.classList.remove("hidden");
    } else {
      alertBanner.classList.add("hidden");
    }
  }
}


// --- Admin Panel Logic ---
let logoClickCount = 0;
let logoClickTimeout = null;

function setupAdminPanel() {
  const logoLink = document.querySelector(".logo");
  const loginModal = document.getElementById("admin-login-modal");
  const closeLoginBtn = document.getElementById("close-admin-login-btn");
  const loginForm = document.getElementById("admin-login-form");
  const loginErrorMsg = document.getElementById("admin-login-error-msg");
  const loginPasswordInput = document.getElementById("admin-password");

  const dashModal = document.getElementById("admin-dashboard-modal");
  const closeDashBtn = document.getElementById("close-admin-dash-btn");
  const logoutBtn = document.getElementById("admin-logout-btn");

  const tabCatalogBtn = document.getElementById("tab-btn-catalog");
  const tabOrdersBtn = document.getElementById("tab-btn-orders");
  const clearHistoryBtn = document.getElementById("admin-clear-history-btn");

  if (!logoLink || !loginModal || !dashModal) return;

  const categoryFilterInput = document.getElementById("admin-filter-category");
  const searchFilterInput = document.getElementById("admin-filter-search");

  if (categoryFilterInput) {
    categoryFilterInput.addEventListener("change", () => {
      renderAdminCatalog();
    });
  }

  if (searchFilterInput) {
    // ⚡ Bolt: Debounce search input to prevent expensive re-renders on every keystroke
    let searchTimeout;
    searchFilterInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        renderAdminCatalog();
      }, 300);
    });
  }

  // 1. Mobile Secret Trigger (3 clicks on logo in 2 seconds)
  logoLink.addEventListener("click", (e) => {
    // If target is links/action, prevent default to avoid scrolling to top if triple clicked
    logoClickCount++;
    if (logoClickCount === 1) {
      logoClickTimeout = setTimeout(() => {
        logoClickCount = 0;
      }, 2000);
    }

    if (logoClickCount === 3) {
      e.preventDefault();
      logoClickCount = 0;
      clearTimeout(logoClickTimeout);
      openModal(loginModal);
    }
  });

  // 2. Desktop Secret Trigger (Ctrl + Shift + A)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
      e.preventDefault();
      openModal(loginModal);
    }
  });

  // Close Login Modal
  if (closeLoginBtn) {
    closeLoginBtn.addEventListener("click", () => {
      closeModal(loginModal);
      loginPasswordInput.value = "";
      loginErrorMsg.classList.add("hidden");
    });
  }

  // Handle Login Submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = loginPasswordInput.value;
    if (password === "NazAdmin777") {
      closeModal(loginModal);
      loginPasswordInput.value = "";
      loginErrorMsg.classList.add("hidden");
      openModal(dashModal);
      renderAdminDashboard();
    } else {
      loginErrorMsg.classList.remove("hidden");
    }
  });

  // Close Dashboard
  if (closeDashBtn) {
    closeDashBtn.addEventListener("click", () => {
      closeModal(dashModal);
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      closeModal(dashModal);
    });
  }

  // Tabs Navigation
  const tabButtons = [tabCatalogBtn, tabOrdersBtn];
  tabButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tab = btn.getAttribute("data-tab");
        document.querySelectorAll(".dash-tab-content").forEach(content => {
          content.classList.remove("active");
        });
        document.getElementById("tab-content-" + tab).classList.add("active");
      });
    }
  });

  // Clear orders history
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
      const confirmText = window.i18n && window.i18n.getCurrentLanguage() === "kk"
        ? "Барлық тапсырыстар тарихын өшіруді растайсыз ба?"
        : "Вы уверены, что хотите очистить всю историю заказов?";
      if (confirm(confirmText)) {
        clearOrdersHistory();
        renderAdminOrders();
      }
    });
  }
}



// Helper to get orders history
// --- Orders History Helpers ---
function getOrdersHistory() {
  try {
    const saved = localStorage.getItem("nazcake_orders_history");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("Failed to get orders history:", e);
    return [];
  }
}

function saveOrdersHistory(history) {
  try {
    localStorage.setItem("nazcake_orders_history", JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save orders history:", e);
  }
}

function clearOrdersHistory() {
  try {
    localStorage.removeItem("nazcake_orders_history");
  } catch (e) {
    console.warn("Failed to clear orders history:", e);
  }
}
// ------------------------------

// Render orders in history tab
function renderAdminOrders() {
  const listContainer = document.getElementById("admin-orders-list");
  if (!listContainer) return;

  let history = getOrdersHistory();

  if (history.length === 0) {
    const tEmpty = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Тапсырыстар әлі жоқ" : "Заказов пока нет";
    listContainer.innerHTML = `<div class="empty-cart-message">${tEmpty}</div>`;
    return;
  }

  const tMethod = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Алу тәсілі" : "Способ получения";
  const tPhone = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Телефон" : "Телефон";
  const tAddress = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Мекенжай" : "Адрес";
  const tTotal = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Қорытынды" : "Итого";
  const tStatus = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Мәртебе" : "Статус";
  const tItems = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Тауарлар" : "Товары";

  const statusNew = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Жаңа" : "Новый";
  const statusWork = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Жұмыста" : "В работе";
  const statusDone = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Орындалды" : "Выполнен";
  const statusCancel = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Бас тартылды" : "Отменен";

  listContainer.innerHTML = history.map(order => {
    const methodText = order.deliveryMethod === "delivery"
      ? (window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Яндекс жеткізу" : "Доставка Яндекс")
      : (window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Өзіңіз алып кету" : "Самовывоз");

    const statusClass = "status-badge-" + order.status;

    return `
      <div class="admin-order-card" data-order-id="${order.id}">
        <div class="admin-order-title-row">
          <div class="admin-order-id-date">
            <span class="admin-order-id">${order.id}</span>
            <span class="admin-order-date">${order.date}</span>
          </div>
          <div class="admin-order-status-control">
            <label style="font-size: 0.75rem; font-weight:700; color:var(--text-muted); margin-right:8px; text-transform:uppercase;">${tStatus}</label>
            <select class="admin-status-dropdown ${statusClass}" onchange="changeOrderStatus('${order.id}', this.value)">
              <option value="new" ${order.status === 'new' ? 'selected' : ''}>${statusNew}</option>
              <option value="work" ${order.status === 'work' ? 'selected' : ''}>${statusWork}</option>
              <option value="done" ${order.status === 'done' ? 'selected' : ''}>${statusDone}</option>
              <option value="cancel" ${order.status === 'cancel' ? 'selected' : ''}>${statusCancel}</option>
            </select>
          </div>
        </div>

        <div class="admin-order-grid">
          <div class="admin-order-details-col">
            <p>👤 <strong>${order.customerName}</strong></p>
            <p>📞 <strong>${tPhone}:</strong> <a href="tel:${order.customerPhone}">${order.customerPhone}</a></p>
            <p>📦 <strong>${tMethod}:</strong> ${methodText}</p>
            ${order.deliveryMethod === 'delivery' ? `<p>📍 <strong>${tAddress}:</strong> ${order.address}</p>` : ''}
          </div>
          <div class="admin-order-items-col">
            <div class="admin-order-items-title">${tItems}</div>
            ${order.items.map(item => `
              <div class="admin-order-item-row">
                <span>${item.name} x ${item.qty}</span>
                <span>${(item.price * item.qty).toLocaleString()} ₸</span>
              </div>
            `).join("")}
            <div class="admin-order-total">
              <span>${tTotal}:</span>
              <span>${order.subtotal.toLocaleString()} ₸</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Global status changer
window.changeOrderStatus = function(orderId, newStatus) {
  try {
    let history = getOrdersHistory();
    history = history.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    localStorage.setItem("nazcake_orders_history", JSON.stringify(history));
    renderAdminOrders();
  } catch (e) {
    console.warn(e);
  }
};
// ----------------------------

// ----------------------------
// Kaspi QR & Auto-Fill & Phone Mask UX Improvements
// ----------------------------

function formatPhoneInput(e) {
  let input = e.target.value.replace(/\D/g, "");
  if (input.startsWith("7") || input.startsWith("8")) {
    input = input.substring(1);
  }
  input = input.substring(0, 10);

  let formatted = "";
  if (input.length > 0) {
    formatted += "+7 (";
    if (input.length <= 3) {
      formatted += input;
    } else {
      formatted += input.substring(0, 3) + ") ";
      if (input.length <= 6) {
        formatted += input.substring(3);
      } else {
        formatted += input.substring(3, 6) + "-";
        if (input.length <= 8) {
          formatted += input.substring(6);
        } else {
          formatted += input.substring(6, 8) + "-" + input.substring(8);
        }
      }
    }
  }
  e.target.value = formatted;
}

function loadCachedCustomerData() {
  const cachedName = localStorage.getItem("nazcake_customer_name");
  const cachedPhone = localStorage.getItem("nazcake_customer_phone");
  const cachedAddress = localStorage.getItem("nazcake_customer_address");
  const cachedMethod = localStorage.getItem("nazcake_customer_method");

  if (cachedName) {
    const cName = document.getElementById("checkout-name");
    const kName = document.getElementById("kaspi-name");
    if (cName) cName.value = cachedName;
    if (kName) kName.value = cachedName;
  }
  if (cachedPhone) {
    const cPhone = document.getElementById("checkout-phone");
    const kPhone = document.getElementById("kaspi-phone");
    if (cPhone) cPhone.value = cachedPhone;
    if (kPhone) kPhone.value = cachedPhone;
  }
  if (cachedAddress) {
    const cAddress = document.getElementById("checkout-address");
    if (cAddress) cAddress.value = cachedAddress;
  }
  if (cachedMethod) {
    const radio = document.querySelector(`input[name="delivery-method"][value="${cachedMethod}"]`);
    if (radio) {
      radio.checked = true;
      // Trigger change event to show/hide address group
      const event = new Event('change');
      radio.dispatchEvent(event);
    }
  }
}

function saveKaspiOrder(name, phone, productName, qty, price) {
  const newOrder = {
    id: "NZ-K-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString("ru-RU"),
    customerName: name,
    customerPhone: phone,
    deliveryMethod: "pickup",
    address: "",
    items: [
      {
        id: activePreviewProductId,
        name: productName,
        qty: qty,
        price: price
      }
    ],
    subtotal: qty * price,
    status: "new"
  };

  try {
    let history = getOrdersHistory();
    history.unshift(newOrder);
    localStorage.setItem("nazcake_orders_history", JSON.stringify(history));

    if (typeof renderAdminOrders === "function") {
      renderAdminOrders();
    }
  } catch (e) {
    console.warn("Failed to save order to history:", e);
  }
}

function setupKaspiQrCheckout() {
  const quickKaspiBtn = document.getElementById("modal-quick-kaspi-btn");
  const kaspiModal = document.getElementById("kaspi-qr-modal");
  const closeKaspiBtn = document.getElementById("close-kaspi-modal-btn");
  const btnKaspiGenerate = document.getElementById("btn-kaspi-generate");
  const btnKaspiComplete = document.getElementById("btn-kaspi-complete");
  const btnKaspiCloseFinal = document.getElementById("btn-kaspi-close-final");

  const stepForm = document.getElementById("kaspi-form-step");
  const stepQr = document.getElementById("kaspi-qr-step");
  const stepSuccess = document.getElementById("kaspi-success-step");

  const kaspiProdName = document.getElementById("kaspi-product-name");
  const kaspiProdQty = document.getElementById("kaspi-product-qty");
  const kaspiTotalPrice = document.getElementById("kaspi-total-price");
  const kaspiQrAmount = document.getElementById("kaspi-qr-amount");
  const kaspiQrPlaceholder = document.getElementById("kaspi-qr-placeholder");

  if (!quickKaspiBtn || !kaspiModal) return;

  // Phone masks
  const chPhone = document.getElementById("checkout-phone");
  const kaPhone = document.getElementById("kaspi-phone");
  if (chPhone) chPhone.addEventListener("input", formatPhoneInput);
  if (kaPhone) kaPhone.addEventListener("input", formatPhoneInput);

  // Close helper
  const closeKaspi = () => {
    triggerHapticFeedback();
    kaspiModal.style.display = "none";
    kaspiModal.classList.remove("open");
    document.body.classList.remove("modal-open");
  };

  closeKaspiBtn.addEventListener("click", closeKaspi);
  btnKaspiCloseFinal.addEventListener("click", closeKaspi);
  kaspiModal.addEventListener("click", (e) => {
    if (e.target === kaspiModal) closeKaspi();
  });

  quickKaspiBtn.addEventListener("click", () => {
    triggerHapticFeedback();

    // Close preview modal
    const previewModal = document.getElementById("preview-modal");
    if (previewModal) {
      previewModal.style.display = "none";
      previewModal.classList.remove("open");
    }

    // Open Kaspi QR Modal
    kaspiModal.style.display = "flex";
    setTimeout(() => {
      kaspiModal.classList.add("open");
    }, 10);
    document.body.classList.add("modal-open");

    // Reset steps
    stepForm.style.display = "block";
    stepQr.style.display = "none";
    stepSuccess.style.display = "none";

    // Populate data
    const p = products.find(prod => prod.id === activePreviewProductId);
    if (p) {
      let displayName = p.isCustomName ? p.name : (window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name);
      const selectedSizeBtn = modalSizeContainer ? modalSizeContainer.querySelector(".size-btn.active") : null;
      const selectedSize = selectedSizeBtn ? selectedSizeBtn.getAttribute("data-size") : null;
      if (selectedSize) {
        displayName += ` (${selectedSize})`;
      }

      // Quantity
      const qtyVal = parseInt(document.getElementById("modal-qty-val").textContent) || 1;

      // Price calculation
      let itemPrice = p.price;
      if (selectedSize && p.sizeOptions) {
        const opt = p.sizeOptions.find(o => o.size === selectedSize);
        if (opt) itemPrice = opt.price;
      }

      const total = itemPrice * qtyVal;

      kaspiProdName.textContent = displayName;
      kaspiProdQty.textContent = `x${qtyVal}`;
      kaspiTotalPrice.textContent = `${total.toLocaleString()} ₸`;
      kaspiQrAmount.textContent = `${total.toLocaleString()} ₸`;

      // Draw custom simulated Kaspi QR code inside placeholder using custom SVG
      kaspiQrPlaceholder.innerHTML = `
        <svg viewBox="0 0 100 100" width="160" height="160" style="display: block;">
          <!-- Corner anchors -->
          <rect x="5" y="5" width="25" height="25" fill="#e11d48" rx="2"/>
          <rect x="9" y="9" width="17" height="17" fill="white" rx="1"/>
          <rect x="13" y="13" width="9" height="9" fill="#e11d48"/>

          <rect x="70" y="5" width="25" height="25" fill="#e11d48" rx="2"/>
          <rect x="74" y="74" width="17" height="17" fill="white" rx="1"/>
          <rect x="78" y="78" width="9" height="9" fill="#e11d48"/>

          <rect x="5" y="70" width="25" height="25" fill="#e11d48" rx="2"/>
          <rect x="9" y="74" width="17" height="17" fill="white" rx="1"/>
          <rect x="13" y="78" width="9" height="9" fill="#e11d48"/>

          <!-- Random QR-like blocks -->
          <rect x="35" y="5" width="8" height="15" fill="#4a2c11"/>
          <rect x="48" y="12" width="12" height="8" fill="#4a2c11"/>
          <rect x="35" y="25" width="15" height="8" fill="#4a2c11"/>
          <rect x="5" y="35" width="15" height="8" fill="#4a2c11"/>
          <rect x="25" y="35" width="8" height="12" fill="#4a2c11"/>
          <rect x="40" y="40" width="20" height="20" fill="#e11d48" rx="4"/>
          <rect x="45" y="45" width="10" height="10" fill="white" rx="2"/>
          <circle cx="50" cy="50" r="3" fill="#e11d48"/>

          <rect x="70" y="35" width="8" height="15" fill="#4a2c11"/>
          <rect x="85" y="42" width="10" height="8" fill="#4a2c11"/>

          <rect x="35" y="70" width="12" height="8" fill="#4a2c11"/>
          <rect x="52" y="78" width="8" height="12" fill="#4a2c11"/>
          <rect x="35" y="85" width="20" height="8" fill="#4a2c11"/>

          <rect x="70" y="70" width="25" height="25" fill="#e11d48" rx="2"/>
        </svg>
      `;

      // Load cache
      loadCachedCustomerData();
    }
  });

  btnKaspiGenerate.addEventListener("click", () => {
    triggerHapticFeedback();
    const nameVal = document.getElementById("kaspi-name").value.trim();
    const phoneVal = document.getElementById("kaspi-phone").value.trim();

    if (!nameVal) {
      alert(window.i18n ? window.i18n.t("cart_err_empty_cart") : "Пожалуйста, введите ваше имя.");
      return;
    }
    if (phoneVal.length < 17) {
      alert(window.i18n ? window.i18n.t("cart_err_empty_cart") : "Пожалуйста, введите корректный номер телефона.");
      return;
    }

    // Save cache
    localStorage.setItem("nazcake_customer_name", nameVal);
    localStorage.setItem("nazcake_customer_phone", phoneVal);

    // Sync checkout form in cart
    const cName = document.getElementById("checkout-name");
    const cPhone = document.getElementById("checkout-phone");
    if (cName) cName.value = nameVal;
    if (cPhone) cPhone.value = phoneVal;

    // Proceed to QR code step
    stepForm.style.display = "none";
    stepQr.style.display = "block";
  });

  btnKaspiComplete.addEventListener("click", () => {
    triggerHapticFeedback();

    const nameVal = document.getElementById("kaspi-name").value.trim();
    const phoneVal = document.getElementById("kaspi-phone").value.trim();
    const p = products.find(prod => prod.id === activePreviewProductId);

    if (p) {
      let displayName = p.isCustomName ? p.name : (window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name);
      const selectedSizeBtn = modalSizeContainer ? modalSizeContainer.querySelector(".size-btn.active") : null;
      const selectedSize = selectedSizeBtn ? selectedSizeBtn.getAttribute("data-size") : null;
      if (selectedSize) {
        displayName += ` (${selectedSize})`;
      }

      const qtyVal = parseInt(document.getElementById("modal-qty-val").textContent) || 1;
      let itemPrice = p.price;
      if (selectedSize && p.sizeOptions) {
        const opt = p.sizeOptions.find(o => o.size === selectedSize);
        if (opt) itemPrice = opt.price;
      }

      // Save order to history
      saveKaspiOrder(nameVal, phoneVal, displayName, qtyVal, itemPrice);
    }

    // Success step
    stepQr.style.display = "none";
    stepSuccess.style.display = "block";
  });
}

function setupThemeToggler() {
  const headerToggle = document.getElementById("theme-toggle-btn");
  const drawerToggle = document.getElementById("drawer-theme-toggle-btn");

  const updateIcons = (isDark) => {
    const sunIcons = document.querySelectorAll(".theme-icon-sun");
    const moonIcons = document.querySelectorAll(".theme-icon-moon");

    if (isDark) {
      sunIcons.forEach(icon => icon.style.display = "block");
      moonIcons.forEach(icon => icon.style.display = "none");
    } else {
      sunIcons.forEach(icon => icon.style.display = "none");
      moonIcons.forEach(icon => icon.style.display = "block");
    }

    // Update text in drawer button
    const drawerText = drawerToggle ? drawerToggle.querySelector("span") : null;
    if (drawerText) {
      const key = isDark ? "theme_light" : "theme_dark";
      drawerText.setAttribute("data-i18n", key);
      drawerText.textContent = window.i18n ? window.i18n.t(key) : (isDark ? "Светлая тема" : "Темная тема");
    }
  };

  const toggleTheme = () => {
    triggerHapticFeedback();
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("nazcake_theme", isDark ? "dark" : "light");
    updateIcons(isDark);
  };

  if (headerToggle) headerToggle.addEventListener("click", toggleTheme);
  if (drawerToggle) drawerToggle.addEventListener("click", toggleTheme);

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem("nazcake_theme");
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

  if (isDark) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
  updateIcons(isDark);
}

function setupBestsellersCarousel() {
  const grid = document.getElementById("bestsellers-grid");
  const wrapper = document.querySelector(".bestsellers-carousel-wrapper");
  if (!grid || !wrapper) return;

  const prevBtn = wrapper.querySelector(".prev-btn");
  const nextBtn = wrapper.querySelector(".next-btn");

  // Scroll by buttons
  const cardWidth = 310; // card 280 + gap 30
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      triggerHapticFeedback();
      grid.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      triggerHapticFeedback();
      grid.scrollBy({ left: cardWidth, behavior: "smooth" });
    });
  }

  // Mouse Drag-to-Scroll (LKM drag)
  let isDown = false;
  let hasMoved = false;
  let startX;
  let scrollLeft;

  grid.addEventListener("mousedown", (e) => {
    // Only drag with left click
    if (e.button !== 0) return;
    isDown = true;
    hasMoved = false;
    grid.classList.add("active-drag");
    startX = e.pageX - grid.offsetLeft;
    scrollLeft = grid.scrollLeft;
  });

  grid.addEventListener("mouseleave", () => {
    isDown = false;
    grid.classList.remove("active-drag");
  });

  grid.addEventListener("mouseup", () => {
    isDown = false;
    grid.classList.remove("active-drag");
  });

  grid.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - grid.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed modifier
    if (Math.abs(x - startX) > 5) {
      hasMoved = true;
    }
    grid.scrollLeft = scrollLeft - walk;
  });

  // Capture click events and block them if we dragged
  grid.addEventListener("click", (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved = false;
    }
  }, true);
}

// ----------------------------

function handleEmptyCartShopClick() {
  triggerHapticFeedback();
  const sidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("cart-overlay");
  closeModal(sidebar, overlay);
  const catalogEl = document.getElementById("catalog");
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: "smooth" });
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    addToCart: typeof addToCart !== 'undefined' ? addToCart : null,
    products: typeof products !== 'undefined' ? products : null,
    cart: typeof cart !== 'undefined' ? cart : null,
    getCart: () => typeof cart !== 'undefined' ? cart : [],
    setCart: (c) => { if (typeof cart !== 'undefined') cart = c; },
    removeFromCart: typeof removeFromCart !== 'undefined' ? removeFromCart : null,
    updateCartUi: typeof updateCartUi !== 'undefined' ? updateCartUi : null,
    updateAdminImagePreview: typeof updateAdminImagePreview !== 'undefined' ? updateAdminImagePreview : null,
    adjustColorBrightness: typeof adjustColorBrightness !== 'undefined' ? adjustColorBrightness : null
  };
}