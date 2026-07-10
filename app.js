const CONFIG = {
  TELEGRAM_BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN",
  TELEGRAM_CHAT_ID: "YOUR_TELEGRAM_CHAT_ID"
};

// Confectionery Nazcake App Logic

// Product Catalog Data
let products = [
  // Хлебобулочные изделия (bakery)
  {
    id: "bread_burger",
    name: "Булочка для бургера",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 120,
    unit: "шт.",
    image: "images/bread_burger.jpg",
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
    image: "images/bread_baursaki.jpg",
    desc: "Традиционные золотистые бауырсаки. Нежные внутри и хрустящие снаружи. Готовятся непосредственно перед доставкой.",
    ingredients: "Пшеничная мука, молоко, ашытқы, қант, тұз, өсімдік майы.",
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
    image: "images/bread_burger.jpg",
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
    image: "images/bread_kosichki.jpg",
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
    image: "images/bread_kosichki.jpg",
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
    image: "images/bread_kosichki.jpg",
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
    image: "images/bread_baursaki.jpg",
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
    image: "images/bread_baursaki.jpg",
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
    image: "images/bread_burger.jpg",
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
    image: "images/bread_burger.jpg",
    desc: "Классическая пышная тандырная лепешка с хрустящей корочкой и мягким центром. Выпекается по старинным рецептам.",
    ingredients: "Мука пшеничная высшего сорта, вода питьевая, сухие дрожжи, кунжут черный, соль.",
    badge: "свежее"
  },

  // Выпечка (pastries)
  {
    id: "pastry_samsa_meat",
    name: "Самса с мясом",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 250,
    unit: "шт.",
    image: "images/pastry_samsa_meat.jpg",
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
    image: "images/pastry_samsa_meat.jpg",
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
    image: "images/pastry_samsa_chicken.jpg",
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
    image: "images/pastry_samsa_meat.jpg",
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
    image: "images/pastry_rogaliki.jpg",
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
    image: "images/pastry_rogaliki.jpg",
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
    image: "images/pastry_sochnik.jpg",
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
    image: "images/pastry_sochnik.jpg",
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
    image: "images/pastry_sochnik.jpg",
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
    image: "images/pastry_sochnik.jpg",
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
    image: "images/pastry_sochnik.jpg",
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
    image: "images/bread_baursaki.jpg",
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
    image: "images/pastry_rogaliki.jpg",
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
    image: "images/pastry_rogaliki.jpg",
    desc: "Ассорти из мелкой сладкой домашней выпечки, идеально подходящее для чаепития большой компании.",
    ingredients: "Печенье домашнее, мини-рогалики, кексы, орешки со сгущенкой.",
    badge: "бестселлер"
  },

  // Пироги (pies)
  {
    id: "pie_smetannik",
    name: "Пирог Сметанник",
    category: "pies",
    categoryLabel: "Пироги",
    price: 2200,
    unit: "шт.",
    image: "images/pie_smetannik.jpg",
    desc: "Нежнейший классический сметанник на тонкой песочной основе. По текстуре напоминает сливочное суфле.",
    ingredients: "Песочная основа (мука, масло, яйцо), фермерская сметана 25%, сахар, яйца, натуральный экстракт ванили.",
    badge: "бестселлер"
  },
  {
    id: "pie_snickers",
    name: "Пирог Сникерс",
    category: "pies",
    categoryLabel: "Пироги",
    price: 4200,
    unit: "шт.",
    image: "images/pie_snickers.jpg",
    desc: "Насыщенный десертный пирог с домашней карамелью, обилием хрустящего арахиса и шоколадным ганашем.",
    ingredients: "Шоколадный бисквит, домашняя мягкая соленая карамель, отборный обжаренный арахис, молочный бельгийский шоколад, сливки 33%.",
    badge: "премиум"
  },
  {
    id: "pie_poppy",
    name: "Пирог Маковый",
    category: "pies",
    categoryLabel: "Пироги",
    price: 2600,
    unit: "шт.",
    image: "images/pie_poppy.jpg",
    desc: "Ароматный пирог с сочной и плотной маковой начинкой в тонкой оболочке из сдобного теста.",
    ingredients: "Сдобное дрожжевое тесто, пищевой мак (специально уваренный с сахаром и молоком), сливочное масло, глазурь.",
    badge: ""
  },
  {
    id: "pie_meat_large",
    name: "Мясной пирог (Большой)",
    category: "on_order",
    categoryLabel: "На заказ",
    price: 11000,
    unit: "шт.",
    image: "images/pie_meat_large.jpg",
    desc: "Сытный праздничный пирог внушительного размера (45х30 см) с сочным фаршем из рубленой говядины.",
    ingredients: "Сдобное тесто, охлажденная говядина (фарш), репчатый лук, натуральное сливочное масло, бульон, перец, специи.",
    badge: "custom"
  },
  {
    id: "cake_custom_celebration",
    name: "Праздничный торт (на заказ)",
    category: "on_order",
    categoryLabel: "На заказ",
    price: 8500,
    unit: "кг",
    image: "images/cake_red_velvet.jpg",
    desc: "Эксклюзивный праздничный торт для вашего торжества. Дизайн и начинка обсуждаются индивидуально при заказе.",
    ingredients: "Начинка на выбор (Красный бархат, Сникерс, Эстерхази, Молочная девочка), кондитерский велюр, мастичный или ягодный декор.",
    badge: "custom"
  },

  // Пирожные (desserts)
  {
    id: "dessert_ekler",
    name: "Пирожное Эклер",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 260,
    unit: "шт.",
    image: "images/dessert_ekler.jpg",
    desc: "Французское заварное пирожное, наполненное шелковистым сливочно-заварным кремом и покрытое шоколадной глазурью.",
    ingredients: "Заварное тесто (вода, мука, сливочное масло, яйца), заварной крем Муслин (молоко, масло, сахар, ваниль), шоколадный ганаш.",
    badge: "хит"
  },
  {
    id: "dessert_napoleon",
    name: "Пирожное Наполеон",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 280,
    unit: "шт.",
    image: "images/dessert_napoleon.jpg",
    desc: "Порционный кусочек торта Наполеон. Хрустящие слоеные коржи с большим количеством крема.",
    ingredients: "Слоеное бездрожжевое тесто, классический крем Дипломат на основе сливок и заварного крема.",
    badge: ""
  },
  {
    id: "dessert_medovik",
    name: "Пирожное Медовик",
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 280,
    unit: "шт.",
    image: "images/dessert_medovik.jpg",
    desc: "Ароматное медовое пирожное со сметанным кремом, тающее во рту.",
    ingredients: "Медовые коржи с добавлением натурального цветочного меда, сметанный крем с добавлением взбитых сливок.",
    badge: ""
  },
  {
    id: "dessert_cupcake_red",
    name: "Капкейк Красный бархат",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 360,
    unit: "шт.",
    image: "images/dessert_cupcake_red.jpg",
    desc: "Яркий капкейк с влажным пористым бисквитом, скрытым ягодным центром и пышной шапочкой нежного сырного крема.",
    ingredients: "Кефирный бисквит «Красный бархат», малиновое конфи, сливочный крем-чиз (творожный сыр, сливки, пудра).",
    badge: "новое"
  },
  {
    id: "dessert_cupcake_berry",
    name: "Капкейк Ягодный микс",
    category: "berry_desserts",
    categoryLabel: "Пирожные с ягодами",
    price: 380,
    unit: "шт.",
    image: "images/dessert_cupcake_red.jpg",
    desc: "Нежный ванильный капкейк с начинкой из свежих ягод и легкой шапочкой из сливочного крема.",
    ingredients: "Мука пшеничная, яйца, сахар, клубника, черника, сливочный крем.",
    badge: "бестселлер"
  },

  // Торты (cakes)
  {
    id: "cake_pistachio",
    name: "Торт Фисташка-Малина",
    category: "cakes",
    categoryLabel: "Торты",
    price: 7500,
    unit: "шт.",
    image: "images/cake_pistachio.jpg",
    desc: "Роскошный торт с фисташковыми бисквитами, яркой малиновой прослойкой и фисташковым крем-чизом. Диаметр 20 см.",
    ingredients: "Фисташковый натуральный бисквит, конфитюр из лесной малины, крем-чиз на сливках с добавлением 100% фисташковой пасты.",
    badge: "vip"
  },
  {
    id: "cake_woopi_pai",
    name: "Торт Вупи Пай",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/cake_woopi_pai.jpg",
    desc: "Американская классика: шоколадные коржи, пропитанные нежным кремом на основе взбитых сливок и маскарпоне. Диаметр 20 см.",
    ingredients: "Воздушные шоколадные коржи с какао Barry Callebaut, крем на сливках и творожном сыре, пропитка.",
    badge: "бестселлер"
  },
  {
    id: "cake_red_velvet",
    name: "Торт Красный Бархат",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/cake_red_velvet.jpg",
    desc: "Знаменитый торт с бархатистыми рубиновыми коржами и белоснежным сырным кремом. Диаметр 20 см.",
    ingredients: "Кефирные сочные бисквиты с ноткой какао, сырно-сливочный крем-чиз на масле и творожном сыре Hohland.",
    badge: ""
  },
  {
    id: "cake_snickers",
    name: "Торт Сникерс премиум",
    category: "cakes",
    categoryLabel: "Торты",
    price: 6500,
    unit: "шт.",
    image: "images/cake_snickers.jpg",
    desc: "Супершоколадный торт с домашней нугой, соленой карамелью и хрустящим арахисом. Настоящее наслаждение. Диаметр 20 см.",
    ingredients: "Шоколадный бисквит, соленая сливочная карамель, арахис, арахисовый мусс, шоколадный крем-чиз, молочный шоколад.",
    badge: "хит"
  },
  {
    id: "cake_napoleon",
    name: "Торт Наполеон домашний",
    category: "cakes",
    categoryLabel: "Торты",
    price: 3200,
    unit: "шт.",
    image: "images/cake_napoleon.jpg",
    desc: "Домашний Наполеон по семейному рецепту. Тонкие коржи отлично пропитаны нежным сливочно-заварным кремом.",
    ingredients: "Рубленое домашнее слоеное тесто, заварной крем со сгущенным молоком и натуральным сливочным маслом.",
    badge: ""
  },
  {
    id: "cake_esterhazy",
    name: "Торт Эстерхази",
    category: "cakes",
    categoryLabel: "Торты",
    price: 9800,
    unit: "шт.",
    image: "images/cake_esterhazy.jpg",
    desc: "Изысканный венгерский миндальный торт. Белково-ореховые коржи прослоены нежным заварным кремом с пралине.",
    ingredients: "Белки яичные, миндальная мука, сахар, заварной крем Патисьер со сгущенным молоком, ореховое пралине, белый шоколад.",
    badge: "премиум"
  },
  {
    id: "cake_meringue_roll",
    name: "Меренговый рулет с малиной",
    category: "cakes",
    categoryLabel: "Торты",
    price: 3500,
    unit: "шт.",
    image: "images/cake_meringue_roll.jpg",
    desc: "Нежнейший рулет из хрустящей снаружи и мягкой внутри меренги со свежими ягодами малины и легким кремом.",
    ingredients: "Яичный белок, сырно-сливочный легкий крем, свежая малина, лепестки миндаля для украшения.",
    badge: "бестселлер"
  },

  // Полуфабрикаты (semi-finished)
  {
    id: "semi_manty",
    name: "Манты с говядиной (замороженные)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 3900,
    unit: "кг",
    image: "images/semi_manty.jpg",
    desc: "Настоящие домашние манты ручной лепки с начинкой из сочной рубленой говядины и лука. Заморожены методом шоковой заморозки.",
    ingredients: "Мука пшеничная, вода питьевая, охлажденная говядина (крупный рубленый фарш), лук репчатый, соль, черный перец.",
    badge: "ручная лепка"
  },
  {
    id: "semi_pelmeni",
    name: "Пельмени домашние (замороженные)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 4100,
    unit: "кг",
    image: "images/semi_pelmeni.jpg",
    desc: "Аккуратные пельмени ручной лепки из нежного теста. Идеально подходят для быстрого и сытного домашнего обеда.",
    ingredients: "Пшеничная мука, домашнее яйцо, фарш говядина/курица (50/50), репчатый лук, специи.",
    badge: "хит"
  },
  {
    id: "semi_chebureki",
    name: "Чебуреки с говядиной (замороженные)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 1500,
    unit: "12 шт.",
    image: "images/semi_chebureki.jpg",
    desc: "Упаковка чебуреков ручной лепки. При жарке получается пузырчатое хрустящее тесто и сочная мясная начинка внутри.",
    ingredients: "Тонкое пресное тесто на воде, сочный фарш из говядины с зеленью и бульоном, лук, специи.",
    badge: ""
  },
  {
    id: "semi_vareniki",
    name: "Вареники с картофелем (замороженные)",
    category: "semi-finished",
    categoryLabel: "Полуфабрикаты",
    price: 2000,
    unit: "уп",
    image: "images/semi_vareniki.jpg",
    desc: "Нежные домашние вареники с начинкой из воздушного картофельного пюре с жареным луком.",
    ingredients: "Тесто пресное, картофельное пюре, сливочное масло, пассерованный репчатый лук, укроп, перец.",
    badge: ""
  }
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
          inStock: custom.inStock !== false
        };
      }
      return { ...p, inStock: p.inStock !== false };
    });
  } else {
    products = products.map(p => ({ ...p, inStock: true }));
  }
} catch (e) {
  console.warn("Failed to load custom products:", e);
  products = products.map(p => ({ ...p, inStock: true }));
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
  if (p.id.startsWith("bento_custom_") && p.bentoConfig) {
    if (!window.i18n) return p.desc;
    const baseColorName = window.i18n.t(colorNameKeys[p.bentoConfig.baseColor] || "bento_color_pink");
    const textColorName = window.i18n.t(colorNameKeys[p.bentoConfig.textColor] || "bento_color_chocolate");
    const sprinklesName = window.i18n.t(sprinkleKeys[p.bentoConfig.sprinkles] || "bento_opt_sprinkles_none");
    const textVal = p.bentoConfig.text || (window.i18n.getCurrentLanguage() === "ru" ? "нет" : "жоқ");
    
    return window.i18n.t("bento_custom_desc")
      .replace("{base}", baseColorName)
      .replace("{text_color}", textColorName)
      .replace("{sprinkles}", sprinklesName)
      .replace("{text}", textVal);
  }
  return window.i18n ? window.i18n.t(`p_${p.id}_desc`) : p.desc;
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
  
  if (window.i18n) {
    window.i18n.onLanguageChange(() => {
      renderBestsellers();
      const activeTab = document.querySelector(".tab-btn.active");
      const category = activeTab ? activeTab.getAttribute("data-category") : "all";
      renderCatalog(category);
      updateCartUi();
      updateLocationUi();
    });
  }
});

// Render Bestsellers (4 items with 'бестселлеры', 'хит', or 'vip' badges)
function renderBestsellers() {
  if (!bestsellersGrid) return;
  const bestsellers = products.filter(p => p.badge === "бестселлер" || p.badge === "хит" || p.badge === "премиум").slice(0, 4);
  
  bestsellersGrid.innerHTML = bestsellers.map(p => createProductCardHtml(p)).join("");
  attachCardEvents(bestsellersGrid);
}

// Render Catalog by Category Filter
function renderCatalog(category) {
  if (!catalogGrid) return;
  let filtered = products;
  if (category !== "all") {
    filtered = products.filter(p => p.category === category);
  }
  
  catalogGrid.innerHTML = filtered.map(p => createProductCardHtml(p)).join("");
  attachCardEvents(catalogGrid);
}

// Generate HTML for Product Card
function createProductCardHtml(p) {
  const tName = window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name;
  const tCategoryLabel = window.i18n ? window.i18n.t(`catalog_cat_${p.category}`) : p.categoryLabel;
  const tBadge = p.badge ? (window.i18n ? window.i18n.t(getBadgeTranslationKey(p.badge)) : p.badge) : "";
  const tUnit = window.i18n ? window.i18n.t(getUnitTranslationKey(p.unit)) : p.unit;
  
  const isOutOfStock = p.inStock === false;
  const cardClass = isOutOfStock ? "product-card out-of-stock" : "product-card";
  const tOutOfStock = window.i18n ? window.i18n.t("catalog_out_of_stock") : "Нет в наличии";
  const outOfStockBadge = isOutOfStock ? `<span class="product-badge product-badge-outofstock">${tOutOfStock}</span>` : "";
  const activeBadge = outOfStockBadge || (p.badge ? `<span class="product-badge">${tBadge}</span>` : "");
  
  return `
    <div class="${cardClass}" data-id="${p.id}">
      <div class="product-img-wrapper btn-preview">
        ${activeBadge}
        <img src="${p.image}" alt="${tName}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${tCategoryLabel}</span>
        <h3 class="product-name btn-preview">${tName}</h3>
        <div class="product-footer">
          <span class="product-price">${p.price.toLocaleString()} ₸ / ${tUnit}</span>
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
  // Opening Preview Modal on image or name click
  gridElement.querySelectorAll(".btn-preview").forEach(btn => {
    btn.addEventListener("click", (e) => {
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
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderCatalog(category);
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

  const tName = window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name;
  const tDesc = getProductDesc(p);
  const tIngredients = window.i18n ? window.i18n.t(`p_${p.id}_ingredients`) : p.ingredients;
  const tUnit = window.i18n ? window.i18n.t(getUnitTranslationKey(p.unit)) : p.unit;

  activePreviewProductId = id;
  modalProductImg.src = p.image;
  modalProductImg.alt = tName;
  modalProductTitle.textContent = tName;
  modalProductPrice.textContent = `${p.price.toLocaleString()} ₸ / ${tUnit}`;
  modalProductDesc.textContent = tDesc;
  modalProductIngredients.textContent = tIngredients;
  
  modalQtyVal.textContent = 1; // Reset qty in modal
  
  // Clean listeners
  modalMinusBtn.onclick = () => {
    let qty = parseInt(modalQtyVal.textContent);
    if (qty > 1) {
      qty--;
      modalQtyVal.textContent = qty;
    }
  };
  
  modalPlusBtn.onclick = () => {
    let qty = parseInt(modalQtyVal.textContent);
    qty++;
    modalQtyVal.textContent = qty;
  };
  
  modalAddBtn.onclick = () => {
    const qty = parseInt(modalQtyVal.textContent);
    addToCart(activePreviewProductId, qty);
    closeModal(previewModal);

    // Open cart automatically to show it
    openModal(cartSidebar, cartOverlay);
  };

  openModal(previewModal);
}

// Add Item to Cart
function addToCart(productOrId, qty) {
  let p;
  if (typeof productOrId === "object") {
    p = productOrId;
  } else {
    p = products.find(prod => prod.id === productOrId);
  }
  if (!p) return;

  const existing = cart.find(item => item.product.id === p.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      product: p,
      qty: qty
    });
  }

  updateCartUi();
}

// Remove Item from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item.product.id !== id);
  updateCartUi();
}

// Update quantity in Cart directly
function changeCartItemQty(id, newQty) {
  const item = cart.find(i => i.product.id === id);
  if (item) {
    item.qty = newQty;
    if (item.qty <= 0) {
      removeFromCart(id);
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
  cartCountBadges.forEach(badge => {
    badge.textContent = totalItems;
  });

  // Calculate sum
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  cartTotalSum.textContent = `${subtotal.toLocaleString()} ₸`;
  try {
    localStorage.setItem("nazcake_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Failed to save cart to localStorage:", e);
  }

  // Update sticky bottom bar
  const stickyBar = document.getElementById("sticky-bottom-bar");
  const stickyText = document.getElementById("sticky-bar-text");
  if (stickyBar && stickyText) {
    if (totalItems > 0) {
      stickyBar.classList.remove("hidden");
      document.body.classList.add("has-sticky-bar");
      const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : "ru";
      const formattedSum = subtotal.toLocaleString();
      const text = currentLang === "ru"
        ? `🛍️ В корзине: ${totalItems} шт. — ${formattedSum} ₸`
        : `🛍️ Себетте: ${totalItems} дана — ${formattedSum} ₸`;
      stickyText.textContent = text;
    } else {
      stickyBar.classList.add("hidden");
      document.body.classList.remove("has-sticky-bar");
    }
  }

  if (cart.length === 0) {
    const tEmpty = window.i18n ? window.i18n.t("cart_empty") : "Ваша корзина пока пуста. Добавьте вкусняшек!";
    cartItemsContainer.innerHTML = `<div class="empty-cart-message">${tEmpty}</div>`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => {
    const p = item.product;
    const tName = p.id.startsWith("bento_custom_") 
      ? (window.i18n ? window.i18n.t("bento_custom_name") : p.name)
      : (window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name);
    const tRemove = window.i18n ? window.i18n.t("cart_lbl_remove") : "Удалить";
    
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${tName}" class="cart-item-img">
        <div class="cart-item-details">
          <h5 class="cart-item-name">${tName}</h5>
          <span class="cart-item-price">${(p.price * item.qty).toLocaleString()} ₸</span>
          <div class="cart-item-actions">
            <div class="quantity-stepper">
              <button class="stepper-btn minus-cart-qty" data-id="${p.id}">−</button>
              <span class="quantity-val">${item.qty}</span>
              <button class="stepper-btn plus-cart-qty" data-id="${p.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${p.id}">${tRemove}</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Add event listeners to newly generated elements inside cart list
  cartItemsContainer.querySelectorAll(".minus-cart-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = cart.find(i => i.product.id === id);
      if (item) changeCartItemQty(id, item.qty - 1);
    });
  });

  cartItemsContainer.querySelectorAll(".plus-cart-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = cart.find(i => i.product.id === id);
      if (item) changeCartItemQty(id, item.qty + 1);
    });
  });

  cartItemsContainer.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removeFromCart(id);
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

let points = [];
  // Generate static spread of sprinkles inside ellipse boundaries
  // x = 150 + cos(t) * rx * scale, y = 150 + sin(t) * ry * scale
  const count = type === "pearls" ? 30 : 20;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rScale = Math.random() * 0.75 + 0.1; // keep away from edges
    const x = 150 + Math.cos(angle) * 90 * rScale;
    const y = 150 + Math.sin(angle) * 20 * rScale;
    points.push({ x, y });

  }

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
      image: "images/bento_cake.jpg", // default bento image
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
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("checkout-name").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const method = document.querySelector('input[name="delivery-method"]:checked').value;
  const address = document.getElementById("checkout-address").value.trim();

  const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

  if (cart.length === 0) {
    alert(window.i18n ? t("cart_err_empty_cart") : "Ваша корзина пуста. Невозможно отправить заказ!");
    return;
  }

  const submitBtn = document.getElementById("checkout-submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = window.i18n ? t("cart_btn_submitting") : "Отправка заказа...";

  // Calculate total
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  
  // Format message for WhatsApp
  let message = `*🍰 ${window.i18n ? t("tg_order_title") : "Новый заказ от Nazcake!"}*

`;
  message += `👤 *${window.i18n ? t("tg_client") : "Клиент"}:* ${name}
`;
  message += `📞 *${window.i18n ? t("tg_phone") : "Телефон"}:* ${phone}
`;
  
  const tMethod = method === "delivery" 
    ? (window.i18n ? t("cart_opt_delivery") : "Доставка Яндекс") 
    : (window.i18n ? t("cart_opt_pickup") : "Самовывоз");
  message += `📦 *${window.i18n ? t("tg_method") : "Способ получения"}:* ${tMethod}
`;
  if (method === "delivery") {
    message += `📍 *${window.i18n ? t("tg_address") : "Адрес"}:* ${address}
`;
  }
  message += `\n🛒 *${window.i18n ? t("tg_items") : "Товары"}:*\n`;

  cart.forEach((item, idx) => {
    const p = item.product;
    const tName = p.id.startsWith("bento_custom_") 
      ? (window.i18n ? t("bento_custom_name") : p.name) 
      : (window.i18n ? t(`p_${p.id}_name`) : p.name);
    const tUnit = window.i18n ? t(getUnitTranslationKey(p.unit)) : p.unit;
    message += `${idx + 1}. *${tName}* — ${item.qty} ${tUnit} (${(p.price * item.qty).toLocaleString()} ₸)
`;
    if (p.id.startsWith("bento_custom_")) {
      const tDesc = getProductDesc(p);
      message += `   _${window.i18n ? t("tg_details") : "Детали"}: ${tDesc}_
`;
    }
  });

  message += `\n💵 *${window.i18n ? t("tg_total") : "Итоговая сумма"}:* ${subtotal.toLocaleString()} ₸`;

  // Send to WhatsApp
  const phoneWA = "77783567221"; // Target WhatsApp number
  const waUrl = `https://wa.me/${phoneWA}?text=${encodeURIComponent(message)}`;

  // Save order to history
  const newOrder = {
    id: "NZ-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString("ru-RU"),
    customerName: name,
    customerPhone: phone,
    deliveryMethod: method,
    address: method === "delivery" ? address : "",
    items: cart.map(item => {
      const p = item.product;
      const tName = p.id.startsWith("bento_custom_") 
        ? (window.i18n ? t("bento_custom_name") : p.name) 
        : (window.i18n ? t(`p_${p.id}_name`) : p.name);
      return {
        id: p.id,
        name: tName,
        qty: item.qty,
        price: p.price
      };
    }),
    subtotal: subtotal,
    status: "new"
  };
  try {
    let history = [];
    const savedHistory = localStorage.getItem("nazcake_orders_history");
    if (savedHistory) {
      history = JSON.parse(savedHistory);
    }
    history.unshift(newOrder);
    localStorage.setItem("nazcake_orders_history", JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save order to history:", e);
  }

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



function openModal(modal, overlay) {
  if (modal) modal.classList.add("open");
  if (overlay) overlay.classList.add("open");
}

function closeModal(modal, overlay) {
  if (modal) modal.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
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
        localStorage.removeItem("nazcake_orders_history");
        renderAdminOrders();
      }
    });
  }
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

  const tName = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Атауы" : "Название";
  const tPrice = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Бағасы (₸)" : "Цена (₸)";
  const tInStock = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Қолжетімді" : "В наличии";
  const tSave = window.i18n && window.i18n.getCurrentLanguage() === "kk" ? "Сақтау" : "Сохранить";

  listContainer.innerHTML = products.map(p => {
    const isChecked = p.inStock !== false ? "checked" : "";
    const pName = window.i18n ? window.i18n.t(`p_${p.id}_name`) : p.name;
    
    return `
      <div class="admin-product-row" data-id="${p.id}">
        <img src="${p.image}" alt="${pName}" class="admin-prod-img">
        <div class="admin-prod-form-group">
          <label>${tName}</label>
          <input type="text" class="admin-edit-name" value="${pName}">
        </div>
        <div class="admin-prod-form-group">
          <label>${tPrice}</label>
          <input type="text" class="admin-edit-price" value="${p.price}">
        </div>
        <div class="admin-prod-form-group">
          <label class="admin-checkbox-label">
            <input type="checkbox" class="admin-edit-instock" ${isChecked}>
            ${tInStock}
          </label>
        </div>
        <button class="btn btn-primary btn-admin-save" onclick="saveAdminProduct('${p.id}')">${tSave}</button>
      </div>
    `;
  }).join("");
}

// Global helper function to save product edit
window.saveAdminProduct = function(id) {
  const row = document.querySelector(`.admin-product-row[data-id="${id}"]`);
  if (!row) return;

  const nameInput = row.querySelector(".admin-edit-name").value.trim();
  const priceInput = parseInt(row.querySelector(".admin-edit-price").value.trim());
  const inStockInput = row.querySelector(".admin-edit-instock").checked;

  if (isNaN(priceInput) || priceInput < 0) {
    alert("Пожалуйста, введите корректную цену!");
    return;
  }

  // Update in local memory array
  products = products.map(p => {
    if (p.id === id) {
      return { ...p, name: nameInput, price: priceInput, inStock: inStockInput };
    }
    return p;
  });

  // Save to local storage
  try {
    const customList = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      inStock: p.inStock
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

  // Re-render main site catalog and bestsellers
  renderBestsellers();
  const activeTab = document.querySelector(".tab-btn.active");
  const category = activeTab ? activeTab.getAttribute("data-category") : "all";
  renderCatalog(category);
};

// Render orders in history tab
function renderAdminOrders() {
  const listContainer = document.getElementById("admin-orders-list");
  if (!listContainer) return;

  let history = [];
  try {
    const savedHistory = localStorage.getItem("nazcake_orders_history");
    if (savedHistory) {
      history = JSON.parse(savedHistory);
    }
  } catch (e) {
    console.warn(e);
  }

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
    let history = [];
    const savedHistory = localStorage.getItem("nazcake_orders_history");
    if (savedHistory) {
      history = JSON.parse(savedHistory);
    }
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

if (typeof module !== 'undefined') {
  module.exports = {
    addToCart: typeof addToCart !== 'undefined' ? addToCart : null,
    products: typeof products !== 'undefined' ? products : null,
    cart: typeof cart !== 'undefined' ? cart : null,
    getCart: () => typeof cart !== 'undefined' ? cart : [],
    setCart: (c) => { if (typeof cart !== 'undefined') cart = c; },
    removeFromCart: typeof removeFromCart !== 'undefined' ? removeFromCart : null,
    updateCartUi: typeof updateCartUi !== 'undefined' ? updateCartUi : null,
    adjustColorBrightness: typeof adjustColorBrightness !== 'undefined' ? adjustColorBrightness : null
  };
}