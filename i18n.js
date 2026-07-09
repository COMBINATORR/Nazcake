// i18n Localization Configuration and Runtime for Nazcake

(function () {
  // Current language tracking
  let currentLang = localStorage.getItem("nazcake_lang") || "ru";

  // List of callbacks to run when language changes
  const changeCallbacks = [];

  const translations = {
    ru: {
      // Meta
      meta_title: "Nazcake — Премиальная кондитерская и пекарня в Атырау",
      meta_desc: "Авторские торты, изысканные пирожные, домашняя выпечка и премиальные полуфабрикаты в Атырау. Закажите с быстрой Яндекс.Доставкой!",

      // Nav Links
      nav_about: "О нас",
      nav_bestsellers: "Бестселлеры",
      nav_catalog: "Наша продукция",
      nav_customizer: "Конструктор Бенто",
      nav_delivery: "Доставка",
      nav_contacts: "Контакты",
      nav_menu_title: "Меню",

      // Hero Section
      hero_subtitle: "Премиальные кондитерские шедевры в Атырау",
      hero_title: "Искусство <br><span class=\"accent-text\">Премиальных</span> Десертов",
      hero_desc: "Авторские торты на заказ, изысканная выпечка и премиальные домашние полуфабрикаты, созданные по традиционным рецептам исключительно из натуральных ингредиентов.",
      hero_btn_catalog: "Посмотреть каталог",
      hero_btn_customizer: "Создать свой бенто-торт",

      // About Section
      about_subtitle: "Наша философия",
      about_title: "О кондитерской Nazcake",
      about_text_1: "Кондитерский дом **Nazcake** — это уголок изысканного вкуса и тепла в самом сердце Атырау. Каждый день мы открываем свои двери, чтобы радовать вас свежей выпечкой, воздушными пирожными и тортами, которые становятся украшением любого праздника.",
      about_text_2: "Мы гордимся тем, что не используем искусственные красители, консерванты или растительные сливки. Только натуральное сливочное масло, отборные бельгийские шоколадные дропсы, свежие ягоды и домашний творог. Для нас выпечка — это не просто ремесло, это искусство дарить радость.",
      about_feat_natural: "Натурально",
      about_feat_recipes: "Рецептов",
      about_feat_location: "Локация",

      // Bestsellers
      bestsellers_subtitle: "Популярный выбор",
      bestsellers_title: "Хиты наших гостей",
      bestsellers_desc: "Десерты и блюда, которые заслужили любовь жителей Атырау и чаще всего заказываются к столу.",

      // Catalog
      catalog_subtitle: "Ассортимент Nazcake",
      catalog_title: "Наша Продукция",
      catalog_desc: "От хрустящего утреннего хлеба до роскошных праздничных тортов и сытных полуфабрикатов ручной лепки.",
      catalog_cat_all: "Все товары",
      catalog_cat_bakery: "Хлебобулочные изделия",
      catalog_cat_pastries: "Выпечка",
      catalog_cat_pies: "Пироги",
      catalog_cat_desserts: "Пирожные",
      catalog_cat_cakes: "Торты",
      catalog_cat_semi: "Полуфабрикаты",

      // Bento Customizer
      bento_subtitle: "Создайте свой шедевр",
      bento_title: "Конструктор Bento-Тортов",
      bento_desc: "Соберите уникальный мини-торт (диаметр 10-12 см) для себя или в подарок. Настройте цвет покрытия, выберите крем для надписи и добавьте теплые слова!",
      bento_lbl_base_color: "Цвет покрытия торта:",
      bento_lbl_text_color: "Цвет крема для надписи:",
      bento_lbl_sprinkles: "Декоративная посыпка:",
      bento_lbl_text: "Надпись на торте (до 20 символов):",
      bento_placeholder_text: "Happy Birthday!",
      bento_lbl_price: "Цена bento-торта:",
      bento_btn_add: "Добавить в корзину",
      bento_badge_preview: "Предпросмотр 2D",
      bento_btn_added: "Шедевр в корзине! ✓",
      
      bento_opt_sprinkles_none: "Без посыпки",
      bento_opt_sprinkles_pearls: "Жемчужные шарики",
      bento_opt_sprinkles_hearts: "Маленькие сердечки",
      bento_opt_sprinkles_gold: "Золотая пыльца",
      bento_opt_sprinkles_stars: "Звездочки",

      bento_color_pink: "Нежно-розовый",
      bento_color_blue: "Нежно-голубой",
      bento_color_vanilla: "Ванильный крем",
      bento_color_pistachio: "Фисташковый",
      bento_color_white: "Белоснежный",
      bento_color_caramel: "Карамельный",
      bento_color_raspberry: "Малиновый",
      bento_color_chocolate: "Шоколадный",
      bento_color_darkblue: "Синий",

      bento_custom_name: "Бенто-торт Индивидуальный",
      bento_custom_desc: "Ваш собственный собранный дизайн! Покрытие: {base}, Крем: {text_color}, Посыпка: {sprinkles}, Надпись: \"{text}\"",
      bento_custom_ingredients: "Классический ванильный бисквит, клубничный конфитюр, нежный сырно-сливочный крем.",

      // Delivery Calculator
      delivery_subtitle: "Быстро и аккуратно",
      delivery_title: "Яндекс.Доставка по Атырау",
      delivery_desc: "Мы бережно упаковываем каждый десерт в жесткую коробку с термоизоляцией, чтобы торты приезжали к вам охлажденными и в идеальном виде. Доставка осуществляется курьерами Яндекс.Такси (Экспресс).",
      delivery_feat_zone: "Зона работы: Доставка доступна только в пределах города Атырау.",
      delivery_feat_price: "Условия: Базовый тариф — 500 ₸ + 150 ₸ за каждый километр пути.",
      delivery_feat_time: "Время: Среднее время сборки и доставки — от 45 до 90 минут.",
      delivery_calc_title: "Калькулятор доставки",
      delivery_calc_subtitle: "Введите ваш адрес в Атырау, чтобы узнать точную стоимость доставки:",
      delivery_input_placeholder: "Улица и дом (например: Сатпаева 15)",
      delivery_btn_calc: "Рассчитать доставку",
      delivery_btn_calculating: "Выполняется расчет...",
      delivery_res_dist: "Расстояние от кондитерской:",
      delivery_res_cost: "Стоимость доставки:",
      delivery_res_time: "Примерное время в пути:",
      delivery_err_empty: "Пожалуйста, введите адрес доставки в Атырау.",
      delivery_err_geocoder: "Не удалось подключиться к серверу геокодирования.",
      delivery_err_notfound: "Адрес не найден. Пожалуйста, проверьте правильность написания (например: Сатпаева 15).",
      delivery_err_outofbounds: "Яндекс.Доставка (Экспресс) доступна только в пределах города Атырау.",
      delivery_err_unknown: "Ошибка при расчете стоимости доставки.",
      location_your_city: "Ваш город: {city}",
      location_only_atyrau: "Обратите внимание: мы осуществляем доставку только по г. Атырау!",

      // Product Preview Modal
      preview_lbl_desc: "Описание:",
      preview_lbl_ingredients: "Состав:",
      preview_btn_add: "Добавить в корзину",

      // Cart Sidebar
      cart_title: "Ваша Корзина",
      cart_empty: "Ваша корзина пока пуста. Добавьте вкусняшек!",
      cart_subtotal: "Подытог:",
      cart_checkout_title: "Оформление Заказа",
      cart_input_name: "Ваше Имя",
      cart_input_phone: "Номер Телефона (+7...)",
      cart_lbl_method: "Способ получения:",
      cart_opt_pickup: "Самовывоз",
      cart_opt_delivery: "Доставка Яндекс",
      cart_input_address: "Адрес доставки в Атырау",
      cart_address_hint: "Для точного расчета стоимости доставки воспользуйтесь калькулятором на сайте.",
      cart_btn_checkout: "Оформить заказ в WhatsApp",
      sticky_bar_btn: "Оформить",
      cart_btn_submitting: "Отправка заказа...",
      cart_err_empty_cart: "Ваша корзина пуста. Невозможно отправить заказ!",
      cart_lbl_remove: "Удалить",
      cart_btn_buy: "Купить",
      cart_btn_added_to_cart: "Добавлено ✓",

      // Telegram Message Templates
      tg_order_title: "🍰 Новый заказ от Nazcake!",
      tg_client: "Клиент",
      tg_phone: "Телефон",
      tg_method: "Способ получения",
      tg_address: "Адрес",
      tg_items: "Товары",
      tg_details: "Детали",
      tg_total: "Итоговая сумма",
      tg_unit_pcs: "шт.",
      tg_unit_kg: "кг",
      tg_unit_12pcs: "12 шт.",
      tg_unit_pack: "уп",

      // Success Modal
      success_title: "Спасибо за заказ!",
      success_message: "Мы отправили информацию вашему менеджеру. В ближайшее время с вами свяжутся для подтверждения заказа и деталей доставки.",
      success_btn_ok: "Отлично",

      // Contacts Section & Footer
      contacts_subtitle: "Свяжитесь с нами",
      contacts_title: "Контакты кондитерской",
      contacts_lbl_address: "Наш адрес",
      contacts_lbl_hours: "Режим работы",
      contacts_lbl_phone: "Телефон",
      contacts_lbl_email: "Email",
      contacts_val_address: "г. Атырау, ул. Балхашская 23",
      contacts_open_2gis: "Открыть в 2ГИС",
      contacts_val_hours: "Ежедневно с 09:00 до 20:00",

      footer_desc: "Изысканные десерты и авторские торты на любой вкус. Готовим с любовью в городе Атырау.",
      footer_nav_title: "Быстрые ссылки",
      footer_social_title: "Мы в соцсетях",
      footer_social_desc: "Следите за нашими акциями, новинками и процессом выпечки в реальном времени!",
      footer_copyright: "&copy; 2026 Кондитерский дом Nazcake. Все права защищены. Разработано с заботой о вкусе.",

      // Dynamic Badges
      badge_fresh: "свежее",
      badge_bestseller: "бестселлер",
      badge_hot: "горячее",
      badge_new: "новое",
      badge_hit: "хит",
      badge_premium: "премиум",
      badge_custom: "заказной",
      badge_vip: "vip",
      badge_hand: "ручная лепка",

      // Product Translations
      // 1. bread_burger
      p_bread_burger_name: "Булочка для бургера",
      p_bread_burger_desc: "Свежая, невероятно мягкая и воздушная пшеничная булочка, посыпанная кунжутом. Отлично подходит для домашних бургеров.",
      p_bread_burger_ingredients: "Мука пшеничная высшего сорта, очищенный белый кунжут, молоко пастеризованное, яйца куриные, сливочное масло 82%, сахар, сухие дрожжи, соль.",
      
      // 2. bread_baursaki
      p_bread_baursaki_name: "Бауырсаки домашние",
      p_bread_baursaki_desc: "Традиционные золотистые бауырсаки. Нежные внутри и хрустящие снаружи. Готовятся непосредственно перед доставкой.",
      p_bread_baursaki_ingredients: "Пшеничная мука премиум, натуральное молоко, домашние дрожжи, сахар, соль, качественное подсолнечное масло для фритюра.",

      // 3. bread_kosichki
      p_bread_kosichki_name: "Булочки Косички",
      p_bread_kosichki_desc: "Ароматная плетеная сдобная косичка с легким сахарным сиропом и румяной корочкой. Идеально к горячему чаю.",
      p_bread_kosichki_ingredients: "Дрожжевое сдобное тесто, молоко, сливочное масло, сахарный сироп, кунжутная обсыпка.",

      // 4. pastry_samsa_meat
      p_pastry_samsa_meat_name: "Самса с говядиной",
      p_pastry_samsa_meat_desc: "Хрустящая слоеная самса с начинкой из сочной рубленой говядины и восточными специями.",
      p_pastry_samsa_meat_ingredients: "Домашнее слоеное тесто на сливочном масле, отборная рубленая говядина, репчатый лук, черный перец, зира, кунжут.",

      // 5. pastry_samsa_chicken
      p_pastry_samsa_chicken_name: "Самса с курицей и сыром",
      p_pastry_samsa_chicken_desc: "Нежная самса с начинкой из сочного куриного филе и тянущегося сыра сулугуни.",
      p_pastry_samsa_chicken_ingredients: "Слоеное тесто, филе куриной грудки, сыр сулугуни, лук, сливочный соус, специи.",

      // 6. pastry_rogaliki
      p_pastry_rogaliki_name: "Рогалики с творогом",
      p_pastry_rogaliki_desc: "Рассыпчатые домашние рогатки из песочного теста с нежной начинкой из натурального творога.",
      p_pastry_rogaliki_ingredients: "Мука пшеничная, натуральное сливочное масло, домашний творог 9%, сахар, ванильный экстракт, сахарная пудра.",

      // 7. pastry_sochnik
      p_pastry_sochnik_name: "Сочник с творогом",
      p_pastry_sochnik_desc: "Классический сочник с золотистой корочкой и обилием творожной начинки. Вкус родом из детства.",
      p_pastry_sochnik_ingredients: "Сдобно-песочное тесто, домашний творог, сахар, ванилин, яичный желток для глазури.",

      // 8. pie_smetannik
      p_pie_smetannik_name: "Пирог Сметанник",
      p_pie_smetannik_desc: "Нежнейший классический сметанник на тонкой песочной основе. По текстуре напоминает сливочное суфле.",
      p_pie_smetannik_ingredients: "Песочная основа (мука, масло, яйцо), фермерская сметана 25%, сахар, яйца, натуральный экстракт ванили.",

      // 9. pie_snickers
      p_pie_snickers_name: "Пирог Сникерс",
      p_pie_snickers_desc: "Насыщенный десертный пирог с домашней карамелью, обилием хрустящего арахиса и шоколадным ганашем.",
      p_pie_snickers_ingredients: "Шоколадный бисквит, домашняя мягкая соленая карамель, отборный обжаренный арахис, молочный бельгийский шоколад, сливки 33%.",

      // 10. pie_poppy
      p_pie_poppy_name: "Пирог Маковый",
      p_pie_poppy_desc: "Ароматный пирог с сочной и плотной маковой начинкой в тонкой оболочке из сдобного теста.",
      p_pie_poppy_ingredients: "Сдобное дрожжевое тесто, сливочное масло, глазурь, пищевой мак (специально уваренный с сахаром и молоком).",

      // 11. pie_meat_large
      p_pie_meat_large_name: "Мясной пирог (Большой)",
      p_pie_meat_large_desc: "Сытный праздничный пирог внушительного размера (45х30 см) с сочным фаршем из рубленой говядины.",
      p_pie_meat_large_ingredients: "Сдобное тесто, охлажденная говядина (фарш), репчатый лук, натуральное сливочное масло, бульон, перец, специи.",

      // 12. dessert_ekler
      p_dessert_ekler_name: "Пирожное Эклер",
      p_dessert_ekler_desc: "Французское заварное пирожное, наполненное шелковистым сливочно-заварным кремом и покрытое шоколадной глазурью.",
      p_dessert_ekler_ingredients: "Заварное тесто (вода, мука, сливочное масло, яйца), заварной крем Муслин (молоко, масло, сахар, ваниль), шоколадный ганаш.",

      // 13. dessert_napoleon
      p_dessert_napoleon_name: "Пирожное Наполеон",
      p_dessert_napoleon_desc: "Порционный кусочек торта Наполеон. Хрустящие слоеные коржи с большим количеством крема.",
      p_dessert_napoleon_ingredients: "Слоеное бездрожжевое тесто, классический крем Дипломат на основе сливок и заварного крема.",

      // 14. dessert_medovik
      p_dessert_medovik_name: "Пирожное Медовик",
      p_dessert_medovik_desc: "Ароматное медовое пирожное со сметанным кремом, тающее во рту.",
      p_dessert_medovik_ingredients: "Медовые коржи с добавлением натурального цветочного меда, сметанный крем с добавлением взбитых сливок.",

      // 15. dessert_cupcake_red
      p_dessert_cupcake_red_name: "Капкейк Красный бархат",
      p_dessert_cupcake_red_desc: "Яркий капкейк с влажным пористым бисквитом, скрытым ягодным центром и пышной шапочкой нежного сырного крема.",
      p_dessert_cupcake_red_ingredients: "Кефирный бисквит «Красный бархат», малиновое конфи, сливочный крем-чиз (творожный сыр, сливки, пудра).",

      // 16. cake_pistachio
      p_cake_pistachio_name: "Торт Фисташка-Малина",
      p_cake_pistachio_desc: "Роскошный торт с фисташковыми бисквитами, яркой малиновой прослойкой и фисташковым крем-чизом. Диаметр 20 см.",
      p_cake_pistachio_ingredients: "Фисташковый натуральный бисквит, конфитюр из лесной малины, крем-чиз на сливках с добавлением 100% фисташковой пасты.",

      // 17. cake_woopi_pai
      p_cake_woopi_pai_name: "Торт Вупи Пай",
      p_cake_woopi_pai_desc: "Американская классика: шоколадные коржи, пропитанные нежным кремом на основе взбитых сливок и маскарпоне. Диаметр 20 см.",
      p_cake_woopi_pai_ingredients: "Воздушные шоколадные коржи с какао Barry Callebaut, крем на сливках и творожном сыре, пропитка.",

      // 18. cake_red_velvet
      p_cake_red_velvet_name: "Торт Красный Бархат",
      p_cake_red_velvet_desc: "Знаменитый торт с бархатистыми рубиновыми коржами и белоснежным сырным кремом. Диаметр 20 см.",
      p_cake_red_velvet_ingredients: "Кефирные сочные бисквиты с ноткой какао, сырно-сливочный крем-чиз на масле и творожном сыре Hohland.",

      // 19. cake_snickers
      p_cake_snickers_name: "Торт Сникерс премиум",
      p_cake_snickers_desc: "Супершоколадный торт с домашней нугой, соленой карамелью и хрустящим арахисом. Настоящее наслаждение. Диаметр 20 см.",
      p_cake_snickers_ingredients: "Шоколадный бисквит, соленая сливочная карамель, арахис, арахисовый мусс, шоколадный крем-чиз, молочный шоколад.",

      // 20. cake_napoleon
      p_cake_napoleon_name: "Торт Наполеон домашний",
      p_cake_napoleon_desc: "Домашний Наполеон по семейному рецепту. Тонкие коржи отлично пропитаны нежным сливочно-заварным кремом.",
      p_cake_napoleon_ingredients: "Рубленое домашнее слоеное тесто, заварной крем со сгущенным молоком и натуральным сливочным маслом.",

      // 21. cake_esterhazy
      p_cake_esterhazy_name: "Торт Эстерхази",
      p_cake_esterhazy_desc: "Изысканный венгерский миндальный торт. Белково-ореховые коржи прослоены нежным заварным кремом с пралине.",
      p_cake_esterhazy_ingredients: "Белки яичные, миндальная мука, сахар, заварной крем Патисьер со сгущенным молоком, ореховое пралине, белый шоколад.",

      // 22. cake_meringue_roll
      p_cake_meringue_roll_name: "Меренговый рулет с малиной",
      p_cake_meringue_roll_desc: "Нежнейший рулет из хрустящей снаружи и мягкой внутри меренги со свежими ягодами малины и легким кремом.",
      p_cake_meringue_roll_ingredients: "Яичный белок, сырно-сливочный легкий крем, свежая малина, лепестки миндаля для украшения.",

      // 23. semi_manty
      p_semi_manty_name: "Манты с говядиной (замороженные)",
      p_semi_manty_desc: "Настоящие домашние манты ручной лепки с начинкой из сочной рубленой говядины и лука. Заморожены методом шоковой заморозки.",
      p_semi_manty_ingredients: "Мука пшеничная, вода питьевая, охлажденная говядина (крупный рубленый фарш), лук репчатый, соль, черный перец.",

      // 24. semi_pelmeni
      p_semi_pelmeni_name: "Пельмени домашние (замороженные)",
      p_semi_pelmeni_desc: "Аккуратные пельмени ручной лепки из нежного теста. Идеально подходят для быстрого и сытного домашнего обеда.",
      p_semi_pelmeni_ingredients: "Пшеничная мука, домашнее яйцо, фарш говядина/курица (50/50), репчатый лук, специи.",

      // 25. semi_chebureki
      p_semi_chebureki_name: "Чебуреки с говядиной (замороженные)",
      p_semi_chebureki_desc: "Упаковка чебуреков ручной лепки. При жарке получается пузырчатое хрустящее тесто и сочная мясная начинка внутри.",
      p_semi_chebureki_ingredients: "Тонкое пресное тесто на воде, сочный фарш из говядины с зеленью и бульоном, лук, специи.",

      // 26. semi_vareniki
      p_semi_vareniki_name: "Вареники с картофелем (замороженные)",
      p_semi_vareniki_desc: "Нежные домашние вареники с начинкой из воздушного картофельного пюре с жареным луком.",
      p_semi_vareniki_ingredients: "Тесто пресное, картофельное пюре, сливочное масло, пассерованный репчатый лук, укроп, перец."
    },
    kk: {
      // Meta
      meta_title: "Nazcake — Атыраудағы премиум кондитерлік және наубайхана өнімдері",
      meta_desc: "Атыраудағы авторлық торттар, талғампаз пирожныйлар, үй өнімдері және премиум жартылай фабрикаттар. Яндекс.Жеткізу арқылы жылдам тапсырыс беріңіз!",

      // Nav Links
      nav_about: "Біз туралы",
      nav_bestsellers: "Бестселлерлер",
      nav_catalog: "Өнімдеріміз",
      nav_customizer: "Бенто конструкторы",
      nav_delivery: "Жеткізу",
      nav_contacts: "Байланыс",
      nav_menu_title: "Мәзір",

      // Hero Section
      hero_subtitle: "Атыраудағы премиум кондитерлік туындылар",
      hero_title: "Премиум <br><span class=\"accent-text\">Десерттер</span> Өнері",
      hero_desc: "Дәстүрлі рецепттер бойынша тек табиғи ингредиенттерден дайындалған авторлық торттар, талғампаз пісірмелер және премиум үй жартылай фабрикаттары.",
      hero_btn_catalog: "Каталогты көру",
      hero_btn_customizer: "Бенто-тортты құрастыру",

      // About Section
      about_subtitle: "Біздің философиямыз",
      about_title: "Nazcake кондитерлік үйі туралы",
      about_text_1: "Nazcake кондитерлік үйі — бұл Атыраудың қақ ортасындағы ерекше дәм мен жылылық мекені. Күн сайын біз сіздерді кез келген мерекенің сәніне айналатын балғын тоқаштармен, үлпілдек пирожныйлармен және торттармен қуанту үшін есігімізді айқара ашамыз.",
      about_text_2: "Біз жасанды бояғыштарды, консерванттарды немесе өсімдік кілегейін қолданбайтынымызды мақтан тұтамыз. Тек табиғи сары май, таңдаулы бельгиялық шоколад тамшылары, балғын жидектер және үй сүзбесі. Біз үшін пісіру — бұл жай ғана қолөнер емес, бұл қуаныш сыйлау өнері.",
      about_feat_natural: "Табиғи",
      about_feat_recipes: "Рецепттер",
      about_feat_location: "Мекенжай",

      // Bestsellers
      bestsellers_subtitle: "Танымал таңдау",
      bestsellers_title: "Хит өнімдер",
      bestsellers_desc: "Атырау тұрғындарының ықыласына бөленіп, дастарқанға жиі тапсырыс берілетін десерттер мен тағамдар.",

      // Catalog
      catalog_subtitle: "Nazcake ассортименті",
      catalog_title: "Өнімдеріміз",
      catalog_desc: "Таңғы қытырлақ наннан бастап сәнді мерекелік торттар мен қолмен түйілген дәмді жартылай фабрикаттарға дойін.",
      catalog_cat_all: "Барлық тауарлар",
      catalog_cat_bakery: "Нан-тоқаш өнімдері",
      catalog_cat_pastries: "Пісірмелер",
      catalog_cat_pies: "Пирогтар",
      catalog_cat_desserts: "Пирожныйлар",
      catalog_cat_cakes: "Торттар",
      catalog_cat_semi: "Жартылай фабрикаттар",

      // Bento Customizer
      bento_subtitle: "Өз туындыңызды жасаңыз",
      bento_title: "Бенто-Торт Конструкторы",
      bento_desc: "Өзіңізге немесе сыйлыққа бірегей мини-торт (диаметрі 10-12 см) құрастырыңыз. Қаптама түсін реттеңіз, жазуға арналған кремді таңдаңыз және жылы лебізіңізді қосыңыз!",
      bento_lbl_base_color: "Торт қаптамасының түсі:",
      bento_lbl_text_color: "Жазу кремінің түсі:",
      bento_lbl_sprinkles: "Сәндік сеппе:",
      bento_lbl_text: "Торттағы жазу (20 таңбаға дейін):",
      bento_placeholder_text: "Happy Birthday!",
      bento_lbl_price: "Бенто-торт бағасы:",
      bento_btn_add: "Себетке қосу",
      bento_badge_preview: "2D Алдын ала қарау",
      bento_btn_added: "Шедевр себетте! ✓",

      bento_opt_sprinkles_none: "Сеппесіз",
      bento_opt_sprinkles_pearls: "Інжу моншақтар",
      bento_opt_sprinkles_hearts: "Кішкентай жүрекшелер",
      bento_opt_sprinkles_gold: "Алтын тозаң",
      bento_opt_sprinkles_stars: "Жұлдызшалар",

      bento_color_pink: "Нәзік қызғылт",
      bento_color_blue: "Нәзік көгілдір",
      bento_color_vanilla: "Ванильді крем",
      bento_color_pistachio: "Фисташкалы",
      bento_color_white: "Ақшақар",
      bento_color_caramel: "Карамельді",
      bento_color_raspberry: "Таңқурай",
      bento_color_chocolate: "Шоколадты",
      bento_color_darkblue: "Көк",

      bento_custom_name: "Бенто-торт Жеке дизайн",
      bento_custom_desc: "Өз бетіңізше жасаған дизайн! Қаптамасы: {base}, Крем: {text_color}, Сеппе: {sprinkles}, Жазу: \"{text}\"",
      bento_custom_ingredients: "Классикалық ванильді бисквит, құлпынай конфитүрі, нәзік ірімшік-кілегейлі крем.",

      // Delivery Calculator
      delivery_subtitle: "Жылдам әрі ұқыпты",
      delivery_title: "Атырау бойынша Яндекс.Жеткізу",
      delivery_desc: "Торттар сізге салқындатылған және мінсіз күйде жетуі үшін біз әрбір десертті термиялық оқшаулағышы бар қатты қорапқа мұқият ораймыз. Жеткізу Яндекс.Такси (Экспресс) курьерлерімен жүзеге асырылады.",
      delivery_feat_zone: "Жұмыс аймағы: Жеткізу тек Атырау қаласының шегінде қолжетімді.",
      delivery_feat_price: "Шарттар: Базалық тариф — 500 ₸ + жолдың әр километрі үшін 150 ₸.",
      delivery_feat_time: "Уақыт: Дайындау және жеткізудің орташа уақыты — 45-тен 90 минутқа дейін.",
      delivery_calc_title: "Жеткізу калькуляторы",
      delivery_calc_subtitle: "Жеткізудің нақты құнын білу үшін Атыраудағы мекенжайыңызды енгізіңіз:",
      delivery_input_placeholder: "Көшесі мен үйі (мысалы: Сәтбаев 15)",
      delivery_btn_calc: "Жеткізуді есептеу",
      delivery_btn_calculating: "Есептелуде...",
      delivery_res_dist: "Кондитерлік үйден қашықтық:",
      delivery_res_cost: "Жеткізу құны:",
      delivery_res_time: "Жолдағы шамалы уақыт:",
      delivery_err_empty: "Атыраудағы жеткізу мекенжайын енгізіңіз.",
      delivery_err_geocoder: "Геокодтау серверіне қосылу сәтсіз аяқталды.",
      delivery_err_notfound: "Мекенжай табылмады. Жазылуын тексеріңіз (мысалы: Сәтбаев 15).",
      delivery_err_outofbounds: "Яндекс.Жеткізу (Экспресс) тек Атырау қаласының шегінде қолжетімді.",
      delivery_err_unknown: "Жеткізу құнын есептеуде қате кетті.",
      location_your_city: "Қалаңыз: {city}",
      location_only_atyrau: "Назар аударыңыз: біз тек Атырау қаласы бойынша жеткіземіз!",

      // Product Preview Modal
      preview_lbl_desc: "Сипаттамасы:",
      preview_lbl_ingredients: "Құрамы:",
      preview_btn_add: "Себетке қосу",

      // Cart Sidebar
      cart_title: "Сіздің Себетіңіз",
      cart_empty: "Себетіңіз әлі бос. Тәттілер қосыңыз!",
      cart_subtotal: "Жиыны:",
      cart_checkout_title: "Тапсырысты рәсімдеу",
      cart_input_name: "Сіздің есіміңіз",
      cart_input_phone: "Телефон нөмірі (+7...)",
      cart_lbl_method: "Алу тәсілі:",
      cart_opt_pickup: "Өзіңіз алып кету",
      cart_opt_delivery: "Яндекс жеткізу",
      cart_input_address: "Атыраудағы жеткізу мекенжайы",
      cart_address_hint: "Жеткізу құнын дәл есептеу үшін сайттағы калькуляторды қолданыңыз.",
      cart_btn_checkout: "Тапсырысты WhatsApp арқылы рәсімдеу",
      sticky_bar_btn: "Рәсімдеу",
      cart_btn_submitting: "Тапсырыс жіберілуде...",
      cart_err_empty_cart: "Себетіңіз бос. Тапсырысты жіберу мүмкін емес!",
      cart_lbl_remove: "Өшіру",
      cart_btn_buy: "Сатып алу",
      cart_btn_added_to_cart: "Қосылды ✓",

      // Telegram Message Templates
      tg_order_title: "🍰 Nazcake-тен жаңа тапсырыс!",
      tg_client: "Тапсырыс беруші",
      tg_phone: "Телефон",
      tg_method: "Алу тәсілі",
      tg_address: "Мекенжай",
      tg_items: "Тауарлар",
      tg_details: "Толық мәлімет",
      tg_total: "Жиынтық сома",
      tg_unit_pcs: "дана",
      tg_unit_kg: "кг",
      tg_unit_12pcs: "12 дана",
      tg_unit_pack: "қаптама",

      // Success Modal
      success_title: "Тапсырысқа рақмет!",
      success_message: "Ақпаратты менеджерімізге жібердік. Жақын арада тапсырысты растау және жеткізу мәліметтерін нақтылау үшін сізбен байланысады.",
      success_btn_ok: "Тамаша",

      // Contacts Section & Footer
      contacts_subtitle: "Бізбен байланысыңыз",
      contacts_title: "Кондитерлік үйдің байланыс мәліметтері",
      contacts_lbl_address: "Біздің мекенжайымыз",
      contacts_lbl_hours: "Жұмыс режимі",
      contacts_lbl_phone: "Телефон",
      contacts_lbl_email: "Email",
      contacts_val_address: "Атырау қ., Балқаш көшесі 23",
      contacts_open_2gis: "2ГИС картасынан ашу",
      contacts_val_hours: "Күн сайын 09:00-ден 20:00-ге дейін",

      footer_desc: "Кез келген талғамға сай нәзік десерттер мен авторлық торттар. Атырау қаласында сүйіспеншілікпен дайындаймыз.",
      footer_nav_title: "Жылдам сілтемелер",
      footer_social_title: "Біз әлеуметтік желілерде",
      footer_social_desc: "Біздің акцияларымызды, жаңалықтарымызды және пісіру барысын тікелей эфирде бақылаңыз!",
      footer_copyright: "&copy; 2026 Nazcake кондитерлік үйі. Барлық құқықтар қорғалған. Дәмге деген қамқорлықпен жасалған.",

      // Dynamic Badges
      badge_fresh: "балғын",
      badge_bestseller: "бестселлер",
      badge_hot: "ыстық",
      badge_new: "жаңа",
      badge_hit: "хит",
      badge_premium: "премиум",
      badge_custom: "тапсырыспен",
      badge_vip: "vip",
      badge_hand: "қолмен түйілген",

      // Product Translations
      // 1. bread_burger
      p_bread_burger_name: "Бургерге арналған тоқаш",
      p_bread_burger_desc: "Күнжіт себілген балғын, өте жұмсақ әрі үлпілдек бидай тоқашы. Үйде бургер жасауға тамаша келеді.",
      p_bread_burger_ingredients: "Жоғары сұрыпты бидай ұны, тазартылған ақ күнжіт, пастерленген сүт, тауық жұмыртқасы, 82% сары май, қант, құрғақ ашытқы, тұз.",
      
      // 2. bread_baursaki
      p_bread_baursaki_name: "Үй бауырсағы",
      p_bread_baursaki_desc: "Дәстүрлі алтын түстес бауырсақтар. Іші жұмсақ, сырты қытырлақ. Жеткізу алдында ғана дайындалады.",
      p_bread_baursaki_ingredients: "Премиум бидай ұны, табиғи сүт, үй ашытқысы, қант, тұз, фритюрге арналған сапалы күнбағыс майы.",

      // 3. bread_kosichki
      p_bread_kosichki_name: "Косичка тоқаштары",
      p_bread_kosichki_desc: "Хош иісті, үстіне жеңіл қант шәрбаты жағылған және қызарып піскен өрімді тоқаш. Ыстық шайға өте ыңғайлы.",
      p_bread_kosichki_ingredients: "Ашытқылы сдобты қамыр, сүт, сары май, қант шәрбаты, күнжіт сеппесі.",

      // 4. pastry_samsa_meat
      p_pastry_samsa_meat_name: "Сиыр етінен жасалған самса",
      p_pastry_samsa_meat_desc: "Шырынды туралған сиыр еті мен шығыс дәмдеуіштерінен жасалған салмасы бар қытырлақ қабатты самса.",
      p_pastry_samsa_meat_ingredients: "Сары май қосылған үйдің қабатты қамыры, таңдаулы туралған сиыр еті, пияз, қара бұрыш, зире, күнжіт.",

      // 5. pastry_samsa_chicken
      p_pastry_samsa_chicken_name: "Тауық еті және ірімшік қосылған самса",
      p_pastry_samsa_chicken_desc: "Шырынды тауық филесі мен созылмалы сулугуни ірімшігі салынған нәзік самса.",
      p_pastry_samsa_chicken_ingredients: "Қабатты қамыр, тауық төс еті, сулугуни ірімшігі, пияз, кілегейлі соус, дәмдеуіштер.",

      // 6. pastry_rogaliki
      p_pastry_rogaliki_name: "Сүзбе қосылған рогаликтер",
      p_pastry_rogaliki_desc: "Табиғи сүзбеден жасалған нәзік салмасы бар үгітілмелі үй песочный рогаликтері.",
      p_pastry_rogaliki_ingredients: "Бидай ұны, табиғи сары май, 9% үй сүзбесі, қант, ваниль сығындысы, қант ұнтағы.",

      // 7. pastry_sochnik
      p_pastry_sochnik_name: "Сүзбе қосылған сочник",
      p_pastry_sochnik_desc: "Алтын түстес қабығы бар және сүзбе салмасы мол классикалық сочник. Балалық шақтың дәмі.",
      p_pastry_sochnik_ingredients: "Сдобно-песочный қамыр, үй сүзбесі, қант, ванилин, бетіне жағуға арналған жұмыртқаның сарысы.",

      // 8. pie_smetannik
      p_pie_smetannik_name: "Қаймақ пирогы",
      p_pie_smetannik_desc: "Жұқа песочный негіздегі ең нәзік классикалық сметанник. Құрылымы кілегейлі суфлені еске түсіреді.",
      p_pie_smetannik_ingredients: "Песочный негіз (ұн, май, жұмыртқа), 25% фермерлік қаймақ, қант, жұмыртқа, табиғи ваниль сығындысы.",

      // 9. pie_snickers
      p_pie_snickers_name: "Сникерс пирогы",
      p_pie_snickers_desc: "Үй карамелі, қытырлақ арахис және шоколадты ганаш қосылған қанық десертті пирог.",
      p_pie_snickers_ingredients: "Шоколадты бисквит, үйдің жұмсақ тұзды карамелі, таңдаулы қуырылған арахис, сүтті бельгиялық шоколад, 33% кілегей.",

      // 10. pie_poppy
      p_pie_poppy_name: "Көкнәр пирогы",
      p_pie_poppy_desc: "Сдобты қамырдан жасалған жұқа қабықтағы шырынды әрі тығыз көкнәр салмасы бар хош іісті пирог.",
      p_pie_poppy_ingredients: "Сдобты ашытқылы қамыр, сары май, глазурь, тағамдық көкнәр (қант және сүтпен арнайы қайнатылған).",

      // 11. pie_meat_large
      p_pie_meat_large_name: "Ет пирогы (Үлкен)",
      p_pie_meat_large_desc: "Үлкен өлшемді (45х30 см) туралған сиыр етінің шырынды тартылған еті қосылған тойымды мерекелік пирог.",
      p_pie_meat_large_ingredients: "Сдобты қамыр, салқындатылған сиыр еті (тартылған ет), пияз, табиғи сары май, сорпа, бұрыш, дәмдеуіштер.",

      // 12. dessert_ekler
      p_dessert_ekler_name: "Эклер пирожныйы",
      p_dessert_ekler_desc: "Жібектей кілегейлі-заварной кремімен толтырылған және шоколадты глазурмен қапталған француз заварной пирожныйы.",
      p_dessert_ekler_ingredients: "Заварной қамыр (су, ұн, сары май, жұмыртқа), Муслин заварной кремі (сүт, май, қант, ваниль), шоколадты ганаш.",

      // 13. dessert_napoleon
      p_dessert_napoleon_name: "Наполеон пирожныйы",
      p_dessert_napoleon_desc: "Наполеон тортының порциялық бөлігі. Кремі мол қытырлақ қабатты корждар.",
      p_dessert_napoleon_ingredients: "Ашытқысыз қабатты қамыр, кілегей және заварной крем негізіндегі классикалық Дипломат кремі.",

      // 14. dessert_medovik
      p_dessert_medovik_name: "Медовик пирожныйы",
      p_dessert_medovik_desc: "Ауызда еритін қаймақ кремі бар хош іісті бал пирожныйы.",
      p_dessert_medovik_ingredients: "Табиғи гүл балы қосылған бал корждары, көпіршітілген кілегей қосылған қаймақ кремі.",

      // 15. dessert_cupcake_red
      p_dessert_cupcake_red_name: "Красный бархат капкейгі",
      p_dessert_cupcake_red_desc: "Ылғалды кеуекті бисквиті, ішкі жидек орталығы және нәзік ірімшік кремінің үлпілдек қалпағы бар ашық капкейк.",
      p_dessert_cupcake_red_ingredients: "«Красный бархат» айран бисквиті, таңқурай конфиі, кілегейлі крем-чиз (сүзбе ірімшік, кілегей, ұнтақ).",

      // 16. cake_pistachio
      p_cake_pistachio_name: "Фисташка-таңқурай торты",
      p_cake_pistachio_desc: "Фисташка бисквиттері, ашық таңқурай қабаты және фисташка крем-чизі бар сәнді торт. Диаметрі 20 см.",
      p_cake_pistachio_ingredients: "Табиғи фисташка бисквиті, орман таңқурайынан жасалған конфитюр, 100% фисташка пастасы қосылған кілегейлі крем-чиз.",

      // 17. cake_woopi_pai
      p_cake_woopi_pai_name: "Вупи Пай торты",
      p_cake_woopi_pai_desc: "Америкалық классика: көпіршітілген кілегей мен маскарпоне негізіндегі нәзік креммен сіңдірілген шоколадты корждар. Диаметрі 20 см.",
      p_cake_woopi_pai_ingredients: "Barry Callebaut какаосы қосылған үлпілдек шоколад корждары, кілегей және сүзбе ірімшіктен жасалған крем, сіңіргіш.",

      // 18. cake_red_velvet
      p_cake_red_velvet_name: "Красный Бархат торты",
      p_cake_red_velvet_desc: "Барқыттай лағыл түсті корждары және аппақ ірімшік кремі бар әйгілі торт. Диаметрі 20 см.",
      p_cake_red_velvet_ingredients: "Какао дәмі бар айраннан жасалған шырынды бисквиттер, сары май мен Hohland сүзбе ірімшігінен жасалған ірімшік-кілегейлі крем-чиз.",

      // 19. cake_snickers
      p_cake_snickers_name: "Премиум Сникерс торты",
      p_cake_snickers_desc: "Үй нугасы, тұзды карамель және қытырлақ арахис қосылған супершоколадты торт. Шынайы ләззат. Диаметрі 20 см.",
      p_cake_snickers_ingredients: "Шоколадты бисквит, тұзды кілегейлі карамель, арахис, арахис муссы, шоколадты крем-чиз, сүтті шоколад.",

      // 20. cake_napoleon
      p_cake_napoleon_name: "Үй Наполеоны торты",
      p_cake_napoleon_desc: "Отбасылық рецепт бойынша қолдан жасалған Наполеон. Жұқа корждар нәзік кілегейлі-заварной креммен өте жақсы сіңдірілген.",
      p_cake_napoleon_ingredients: "Туралған үйдин қабатты қамыры, қоюлатылған сүт пен табиғи сары май қосылған заварной крем.",

      // 21. cake_esterhazy
      p_cake_esterhazy_name: "Эстерхази торты",
      p_cake_esterhazy_desc: "Талғампаз венгр бадам торты. Ақуызды-жаңғақты корждар пралине қосылған нәзік заварной креммен қапталған.",
      p_cake_esterhazy_ingredients: "Жұмыртқа ақуызы, бадам ұны, қант, қоюлатылған сүт қосылған Патисьер заварной кремі, жаңғақ пралинесі, ақ шоколад.",

      // 22. cake_meringue_roll
      p_cake_meringue_roll_name: "Таңқурай қосылған меренга рулеті",
      p_cake_meringue_roll_desc: "Сырты қытырлақ, іші жұмсақ меренгадан, балғын таңқурай жидектері мен жеңіл кремнен жасалған ең нәзік рулет.",
      p_cake_meringue_roll_ingredients: "Жұмыртқа ақуызы, жеңіл ірімшік-кілегейлі крем, балғын таңқурай, әсемдеуге арналған бадам жапырақшалары.",

      // 23. semi_manty
      p_semi_manty_name: "Сиыр етінен жасалған мәнті (мұздатылған)",
      p_semi_manty_desc: "Шырынды туралған сиыр еті мен пияздан жасалған салмасы бар, қолмен түйілген нағыз үй мәнтісі. Шокты мұздату әдісімен мұздатылған.",
      p_semi_manty_ingredients: "Бидай ұны, ауыз су, салқындатылған сиыр еті (ірі туралған тартылған ет), пияз, тұз, қара бұрыш.",

      // 24. semi_pelmeni
      p_semi_pelmeni_name: "Үй пельмені (мұздатылған)",
      p_semi_pelmeni_desc: "Нәзік қамырдан қолмен түйілген ұқыпты пельмендер. Жылдам әрі тойымды үй түскі асына тамаша келеді.",
      p_semi_pelmeni_ingredients: "Бидай ұны, үй жұмыртқасы, сиыр/тауық тартылған еті (50/50), пияз, дәмдеуіштер.",

      // 25. semi_chebureki
      p_semi_chebureki_name: "Сиыр етінен жасалған чебуреки (мұздатылған)",
      p_semi_chebureki_desc: "Қолмен түйілген чебуреки қаптамасы. Қуырған кезде көпіршікті қытырлақ қамыр мен шырынды ет салмасы шығады.",
      p_semi_chebureki_ingredients: "Суға иленген жұқа ашытқысыз қамыр, көк шөп пен сорпа қосылған сиыр етінің шырынды тартылған еті, пияз, дәмдеуіштер.",

      // 26. semi_vareniki
      p_semi_vareniki_name: "Картоп қосылған варениктер (мұздатылған)",
      p_semi_vareniki_desc: "Қуырылған пияз қосылған үлпілдек картоп езбесі салынған нәзік үй варениктері.",
      p_semi_vareniki_ingredients: "Ашытқысыз қамыр, картоп езбесі, сары май, қуырылған пияз, аскөк, бұрыш."
    }
  };

  // Safe translation retrieval helper
  function t(key) {
    if (!translations[currentLang]) {
      return translations["ru"][key] || key;
    }
    return translations[currentLang][key] || translations["ru"][key] || key;
  }

  // Update static elements marked with data-i18n attributes
  function updateDomTranslations() {
    // 1. Text translations
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = t(key);
      if (translation !== null && translation !== undefined) {
        // If element has inner HTML formatting like <span> or <br>, use innerHTML, otherwise textContent
        if (translation.includes("<br>") || translation.includes("<span") || translation.includes("<strong>")) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // 2. Placeholder translations
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = t(key);
      if (translation) {
        el.setAttribute("placeholder", translation);
      }
    });

    // 3. Title attribute translations
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const translation = t(key);
      if (translation) {
        el.setAttribute("title", translation);
      }
    });

    // 4. Update tab descriptions and meta tags
    document.title = t("meta_title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("meta_desc"));
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t("meta_title"));
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t("meta_desc"));

    // 5. Update language switcher buttons active states
    document.querySelectorAll(".lang-switcher, .drawer-lang-switcher").forEach(switcher => {
      switcher.querySelectorAll(".lang-btn").forEach(btn => {
        const lang = btn.getAttribute("data-lang");
        if (lang === currentLang) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    });
  }

  // Switch active language and update page
  function setLanguage(lang) {
    if (lang !== "ru" && lang !== "kk") return;
    currentLang = lang;
    localStorage.setItem("nazcake_lang", lang);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute("lang", lang);
    
    updateDomTranslations();

    // Trigger registered callbacks
    changeCallbacks.forEach(cb => {
      try {
        cb(lang);
      } catch (err) {
        console.error("Error executing i18n callback", err);
      }
    });
  }

  // Register callback to run when language changes
  function onLanguageChange(cb) {
    if (typeof cb === "function") {
      changeCallbacks.push(cb);
    }
  }

  // Initialize on page load
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.setAttribute("lang", currentLang);
    updateDomTranslations();

    // Delegate language switcher clicks globally
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn");
      if (btn) {
        const lang = btn.getAttribute("data-lang");
        if (lang) {
          setLanguage(lang);
        }
      }
    });
  });

  // Export functions to global scope
  window.i18n = {
    t: t,
    setLanguage: setLanguage,
    getCurrentLanguage: () => currentLang,
    onLanguageChange: onLanguageChange,
    updateDom: updateDomTranslations
  };
})();
