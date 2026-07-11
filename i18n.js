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
      catalog_cat_berry_desserts: "Пирожные с ягодами",
      catalog_cat_cakes: "Торты",
      catalog_cat_on_order: "На заказ",
      catalog_cat_on_order: "На заказ",
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
      preview_lbl_size: "Выберите размер:",
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
      admin_login_title: "Вход в Панель Управления",
      admin_login_btn: "Войти",
      admin_login_err: "Неверный пароль!",
      admin_dash_title: "Панель Администратора",
      admin_tab_catalog: "Каталог товаров",
      admin_tab_orders: "История заказов",
      admin_lbl_name: "Название",
      admin_lbl_price: "Цена (₸)",
      admin_lbl_instock: "В наличии",
      admin_btn_save: "Сохранить",
      admin_btn_logout: "Выйти",
      admin_order_empty: "Заказов пока нет",
      admin_order_clear: "Очистить историю",
      admin_order_status_new: "Новый",
      admin_order_status_work: "В работе",
      admin_order_status_done: "Выполнен",
      admin_order_status_cancel: "Отменен",
      admin_lbl_status: "Статус",
      admin_filter_category_lbl: "Категория:",
      admin_filter_search_lbl: "Поиск:",
      admin_filter_search_ph: "Поиск по названию...",
      admin_lbl_stock: "Кол-во в наличии",
      catalog_out_of_stock: "Нет в наличии",
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
      p_bread_burger_ingredients: "Мука пшеничная высшего сорта, кунжут, молоко, яйца, сливочное масло, сахар, дрожжи, соль.",

      // 2. bread_baursaki
      p_bread_baursaki_name: "Бауырсаки",
      p_bread_baursaki_desc: "Традиционные золотистые бауырсаки. Нежные внутри и хрустящие снаружи. Готовятся непосредственно перед доставкой.",
      p_bread_baursaki_ingredients: "Пшеничная мука, молоко, дрожжи, сахар, соль, растительное масло.",

      // 2b. bread_rye
      p_bread_rye_name: "Ржаной хлеб",
      p_bread_rye_desc: "Классический ржаной хлеб с хрустящей корочкой и плотным мякишем. Богат витаминами и клетчаткой.",
      p_bread_rye_ingredients: "Мука ржаная, вода питьевая, солод ржаной, закваска, соль.",

      // 2c. bread_garlic_baguette
      p_bread_garlic_baguette_name: "Чесночный мини батон",
      p_bread_garlic_baguette_desc: "Ароматный мини-батон с начинкой из чесночного масла и зелени. Отлично подходит к супам и основным блюдам.",
      p_bread_garlic_baguette_ingredients: "Мука пшеничная, чеснок свежий, зелень укропа, сливочное масло, соль.",

      // 2d. bread_sayka
      p_bread_sayka_name: "Сайка",
      p_bread_sayka_desc: "Традиционная пшеничная сайка с нежным молочным вкусом и мягкой корочкой. Отличный выбор для завтрака.",
      p_bread_sayka_ingredients: "Мука пшеничная высшего сорта, молоко пастеризованное, масло сливочное, сахар, дрожжи.",

      // 3. bread_kosichki
      p_bread_kosichki_name: "Косички",
      p_bread_kosichki_desc: "Ароматная плетеная сдобная косичка с легким сахарным сиропом и румяной корочкой. Идеально к горячему чаю.",
      p_bread_kosichki_ingredients: "Дрожжевое сдобное тесто, молоко, сливочное масло, сахарный сироп, кунжутная обсыпка.",

      // 3b. bread_pancakes_meat
      p_bread_pancakes_meat_name: "Блины с мясом",
      p_bread_pancakes_meat_desc: "Сытные и нежные домашние блины с начинкой из сочного фарша с луком и специями.",
      p_bread_pancakes_meat_ingredients: "Тесто для блинов (молоко, мука, яйца, сахар), фарш говяжий, лук репчатый, перец черный, соль.",

      // 3c. bread_pancakes_plain
      p_bread_pancakes_plain_name: "Блины без начинки",
      p_bread_pancakes_plain_desc: "Тонкие, кружевные домашние блины на молоке. Подаются горячими с любыми топингами на ваш выбор.",
      p_bread_pancakes_plain_ingredients: "Мука пшеничная, молоко, яйца куриные, подсолнечное масло, сахар, соль.",

      // 3d. bread_rye_flatbread
      p_bread_rye_flatbread_name: "Ржаные тандырные лепешки",
      p_bread_rye_flatbread_desc: "Полезная и ароматная лепешка из ржаной муки, выпекаемая в традиционном тандыре с посыпкой из семян.",
      p_bread_rye_flatbread_ingredients: "Ржаная мука, пшеничная мука, вода, кунжут, соль.",

      // 3e. bread_flatbread
      p_bread_flatbread_name: "Тандырные лепешки",
      p_bread_flatbread_desc: "Классическая пышная тандырная лепешка с хрустящей корочкой и мягким центром. Выпекается по старинным рецептам.",
      p_bread_flatbread_ingredients: "Мука пшеничная высшего сорта, вода питьевая, сухие дрожжи, кунжут черный, соль.",

      // 4. pastry_samsa_meat
      p_pastry_samsa_meat_name: "Самса с мясом",
      p_pastry_samsa_meat_desc: "Хрустящая слоеная самса с начинкой из сочного фарша с луком и специями.",
      p_pastry_samsa_meat_ingredients: "Слоеное тесто, говядина, репчатый лук, черный перец, соль.",

      // 4b. pastry_samsa_liver
      p_pastry_samsa_liver_name: "Самса с печенью",
      p_pastry_samsa_liver_desc: "Ароматная самса с сытной и сочной начинкой из говяжьей печени с луком.",
      p_pastry_samsa_liver_ingredients: "Слоеное тесто, печень говяжья, лук, сливочное масло, перец, соль.",

      // 5. pastry_samsa_chicken
      p_pastry_samsa_chicken_name: "Самса с курицей и с сыром",
      p_pastry_samsa_chicken_desc: "Нежная самса с начинкой из сочного куриного филе и тянущегося сыра.",
      p_pastry_samsa_chicken_ingredients: "Слоеное тесто, филе куриное, сыр, лук, специи, соль.",

      // 5b. pastry_samsa_cabbage
      p_pastry_samsa_cabbage_name: "Самса с мясом и капустой",
      p_pastry_samsa_cabbage_desc: "Сытная самса с традиционным сочетанием мясного фарша и сочной тушеной капусты.",
      p_pastry_samsa_cabbage_ingredients: "Слоеное тесто, говядина, свежая капуста, лук, сливочное масло, специи.",

      // 5c. pastry_liver_pie
      p_pastry_liver_pie_name: "Ливерные пирожки",
      p_pastry_liver_pie_desc: "Румяные домашние пирожки со специями и нежным ливерным паштетом.",
      p_pastry_liver_pie_ingredients: "Дрожжевое тесто, говяжий ливер (легкое, сердце, печень), лук, специи.",

      // 5d. pastry_liver_pie_mini
      p_pastry_liver_pie_mini_name: "Ливерные пирожки mini",
      p_pastry_liver_pie_mini_desc: "Маленькие порционные пирожки на один укус с сытной начинкой из ливера.",
      p_pastry_liver_pie_mini_ingredients: "Дрожжевое тесто, отборный говяжий ливер, лук репчатый, соль, перец.",

      // 5e. pastry_bun_plain
      p_pastry_bun_plain_name: "Булочка без начинки",
      p_pastry_bun_plain_desc: "Мягкая сдобная булочка с румяной корочкой. Отлично подойдет к чаю или молоку.",
      p_pastry_bun_plain_ingredients: "Мука пшеничная, молоко, яйца, сахар, сливочное масло, дрожжи.",

      // 5f. pastry_bun_condensed
      p_pastry_bun_condensed_name: "Булочка со сгущенкой",
      p_pastry_bun_condensed_desc: "Сладкая булочка с начинкой из цельного вареного сгущенного молока.",
      p_pastry_bun_condensed_ingredients: "Сдобное дрожжевое тесто, вареная сгущенка премиум класса.",

      // 5g. pastry_bun_fruits
      p_pastry_bun_fruits_name: "Булочка с сухофруктами",
      p_pastry_bun_fruits_desc: "Ароматная булочка с начинкой из изюма, кураги и чернослива.",
      p_pastry_bun_fruits_ingredients: "Сдобное тесто, изюм без косточек, курага, чернослив, сахарная пудра.",

      // 5h. pastry_bun_curd
      p_pastry_bun_curd_name: "Булочка с творогом",
      p_pastry_bun_curd_desc: "Воздушная булочка с начинкой из сладкого домашнего творога.",
      p_pastry_bun_curd_ingredients: "Мука, молоко, сахар, натуральный творог, ванилин, сливочное масло.",

      // 7. pastry_sochnik
      p_pastry_sochnik_name: "Сочник",
      p_pastry_sochnik_desc: "Классический сочник с золотистой корочкой и нежным творожным центром.",
      p_pastry_sochnik_ingredients: "Песочное тесто, домашний творог, сахар, ванильный экстракт, желток.",

      // 7b. pastry_manty_condensed
      p_pastry_manty_condensed_name: "Манты с вареной сгущенкой",
      p_pastry_manty_condensed_desc: "Необычные сладкие манты с начинкой из ароматной вареной сгущенки. Настоящее лакомство!",
      p_pastry_manty_condensed_ingredients: "Пресное тесто на яйцах, сгущенное молоко вареное, сливочное масло.",

      // 6. pastry_rogaliki
      p_pastry_rogaliki_name: "Рогалики с творогом",
      p_pastry_rogaliki_desc: "Рассыпчатые мини-рогалики с начинкой из нежного сладкого творога.",
      p_pastry_rogaliki_ingredients: "Сметанно-песочное тесто, творог, сахарная пудра, ваниль.",

      // 7c. pastry_tea_set
      p_pastry_tea_set_name: "Чайный набор",
      p_pastry_tea_set_desc: "Ассорти из мелкой сладкой домашней выпечки, идеально подходящее для чаепития большой компании.",
      p_pastry_tea_set_ingredients: "Печенье домашнее, mini-рогалики, кексы, орешки со сгущенкой.",

      // 8. pie_smetannik
      p_pie_curd_condensed_name: "Пирог с творогом со сгущенкой",
      p_pie_curd_condensed_desc: "Сытный пирог с начинкой из нежного творога и сладкой вареной сгущенки.",
      p_pie_curd_condensed_ingredients: "Песочное тесто, творог 9%, вареное сгущенное молоко, сахар, ванилин.",

      p_pie_smetannik_name: "Сметанник",
      p_pie_smetannik_desc: "Классический нежный сметанник на тонкой песочной основе.",
      p_pie_smetannik_ingredients: "Песочное тесто, фермерская сметана 25%, яйца, ванильный сахар.",

      p_pie_snickers_name: "Пирог Сникерс",
      p_pie_snickers_desc: "Насыщенный десертный пирог с домашней карамелью, арахисом и шоколадным ганашем.",
      p_pie_snickers_ingredients: "Шоколадный бисквит, арахис обжаренный, соленая карамель, бельгийский шоколад.",

      p_pie_caramel_name: "Пирог карамель",
      p_pie_caramel_desc: "Сладкий пирог с обильным слоем домашней мягкой карамели и нежным тестом.",
      p_pie_caramel_ingredients: "Песочное тесто, фирменная карамель Nazcake, сливки, сахар.",

      p_pie_poppy_name: "Маковый пирог",
      p_pie_poppy_desc: "Ароматный пирог с сочной и плотной начинкой из уваренного мака.",
      p_pie_poppy_ingredients: "Сдобное тесто, маковая начинка с сахаром, сливочное масло.",

      p_pie_mix_name: "Микс пироги",
      p_pie_mix_desc: "Ассорти-пирог, сочетающий несколько разных начинок в одном пироге.",
      p_pie_mix_ingredients: "Сдобное тесто, творожная начинка, маковая начинка, фруктовый джем.",

      p_pie_meat_round_name: "Мясной пирог (круглый)",
      p_pie_meat_round_desc: "Круглый закрытый мясной пирог диаметром 22 см с сочным фаршем.",
      p_pie_meat_round_ingredients: "Сдобное тесто, фарш говяжий, лук репчатый, сливочное масло, специи.",

      p_pie_meat_rect_name: "Мясной пирог (прямоугольный)",
      p_pie_meat_rect_desc: "Сытный прямоугольный мясной пирог с сочным фаршем из рубленой говядины и луком.",
      p_pie_meat_rect_ingredients: "Сдобное тесто, фарш из рубленой говядины, репчатый лук, специи.",

      p_pie_meat_rect_s_name: "Мясной пирог (Размер S)",
      p_pie_meat_rect_s_desc: "Сытный прямоугольный мясной пирог размером 36х30 см. Идеально для небольшой компании.",
      p_pie_meat_rect_s_ingredients: "Сдобное тесто, фарш из рубленой говядины, репчатый лук, специи.",

      p_pie_meat_rect_m_name: "Мясной пирог (Размер M)",
      p_pie_meat_rect_m_desc: "Сытный прямоугольный мясной пирог размером 45х30 см. Традиционное праздничное блюдо.",
      p_pie_meat_rect_m_ingredients: "Сдобное тесто, отборный говяжий фарш, репчатый лук, специи, масло.",

      p_pie_meat_rect_l_name: "Мясной пирог (Размер L)",
      p_pie_meat_rect_l_desc: "Большой семейный прямоугольный мясной пирог размером 48х35 см для крупных торжеств.",
      p_pie_meat_rect_l_ingredients: "Сдобное тесто, рубленый говяжий фарш, много лука, сливочное масло, специи.",

      p_pie_curd_large_name: "Пирог с творогом",
      p_pie_curd_large_desc: "Большой прямоугольный пирог с нежной и сладкой творожной начинкой.",
      p_pie_curd_large_ingredients: "Сдобное тесто, натуральный творог, сахарная пудра, ваниль.",

      p_pie_fruits_large_name: "Пирог с сухофруктами",
      p_pie_fruits_large_desc: "Большой прямоугольный пирог, обильно наполненный отборным изюмом и курагой.",
      p_pie_fruits_large_ingredients: "Сдобное тесто, курага, изюм, сахар, ванилин.",

      p_dessert_napoleon_name: "Наполеон",
      p_dessert_napoleon_desc: "Порционный кусочек классического торта Наполеон с нежным заварным кремом.",
      p_dessert_napoleon_ingredients: "Слоеное тесто, заварной крем Дипломат, ваниль.",

      p_dessert_ekler_name: "Эклер",
      p_dessert_ekler_desc: "Французское заварное пирожное, наполненное нежным сливочно-заварным кремом.",
      p_dessert_ekler_ingredients: "Заварное тесто, крем Муслин, шоколадная глазурь.",

      p_dessert_muraveynik_name: "Муравейник",
      p_dessert_muraveynik_desc: "Традиционное пирожное из песочного теста со сгущенным молоком и грецкими орехами.",
      p_dessert_muraveynik_ingredients: "Песочное тесто, вареная сгущенка, сливочное масло, мед, мак.",

      p_dessert_chak_chak_name: "Чак-чак",
      p_dessert_chak_chak_desc: "Восточная сладость из обжаренных кусочков теста, залитых натуральным медовым сиропом.",
      p_dessert_chak_chak_ingredients: "Мука пшеничная, яйца, мед натуральный, сахар, масло растительное.",

      p_dessert_chocolate_name: "Шоколадный",
      p_dessert_chocolate_desc: "Насыщенное шоколадное пирожное с шоколадным бисквитом и нежным кремом.",
      p_dessert_chocolate_ingredients: "Шоколадный бисквит, крем с какао, темный шоколад.",

      p_dessert_caramel_name: "Карамельный",
      p_dessert_caramel_desc: "Нежное пирожное с мягким бисквитом и домашней карамелью.",
      p_dessert_caramel_ingredients: "Сдобный бисквит, мягкая карамель, сливочный крем.",

      p_dessert_snickers_airy_name: "Воздушный сникерс",
      p_dessert_snickers_airy_desc: "Пирожное с безе, жареным арахисом и нежным кремом со сгущенкой.",
      p_dessert_snickers_airy_ingredients: "Воздушное безе, жареный арахис, вареная сгущенка, сливочное масло.",

      p_dessert_medovik_name: "Медовик",
      p_dessert_medovik_desc: "Ароматное медовое пирожное со сметанным кремом, тающее во рту.",
      p_dessert_medovik_ingredients: "Медовые коржи с добавлением натурального меда, сметанный крем.",

      p_dessert_caramel_design_name: "Карамель с оформлением",
      p_dessert_caramel_design_desc: "Карамельное пирожное со стильным праздничным оформлением.",
      p_dessert_caramel_design_ingredients: "Бисквит, домашняя карамель, крем-чиз, элементы декора.",

      p_dessert_chocolate_design_name: "Шоколадный с оформлением",
      p_dessert_chocolate_design_desc: "Шоколадное пирожное с нарядным праздничным декором.",
      p_dessert_chocolate_design_ingredients: "Шоколадный бисквит, шоколадный крем, праздничный декор.",

      p_dessert_banoffee_name: "Банофи пай",
      p_dessert_banoffee_desc: "Пирожное с бананами, ароматной карамелью и воздушными взбитыми сливками на песочной основе.",
      p_dessert_banoffee_ingredients: "Песочная основа, свежие бананы, карамель, взбитые сливки.",

      p_dessert_ryzhik_name: "Рыжик",
      p_dessert_ryzhik_desc: "Классическое медовое пирожное с добавлением заварного крема.",
      p_dessert_ryzhik_ingredients: "Медовые коржи, заварной крем Дипломат, крошка.",

      p_dessert_cheesecake_name: "Чизкейк",
      p_dessert_cheesecake_desc: "Нежный сырный десерт на песочной основе с добавлением ванили.",
      p_dessert_cheesecake_ingredients: "Песочная крошка, сливочный сыр Cremette, сахар, сливки.",

      p_dessert_pavlova_name: "Павлова",
      p_dessert_pavlova_desc: "Воздушное безе с хрустящей корочкой и мягким центром, украшенное нежным кремом.",
      p_dessert_pavlova_ingredients: "Французская меренга, маскарпоне, сливки, сахарная пудра.",

      p_dessert_milk_girl_name: "Молочная девочка",
      p_dessert_milk_girl_desc: "Порционное пирожное с нежными коржами на сгущенном молоке и легким кремом.",
      p_dessert_milk_girl_ingredients: "Коржи на сгущенном молоке Рогачев, крем на основе взбитых сливок.",

      p_dessert_carrot_name: "Морковный",
      p_dessert_carrot_desc: "Морковный бисквит с добавлением пряностей, грецкого ореха и сливочного сыра.",
      p_dessert_carrot_ingredients: "Морковно-ореховый бисквит, корица, сливочный сыр, карамель.",

      p_dessert_red_velvet_name: "Красный бархат",
      p_dessert_red_velvet_desc: "Яркое пирожное со знаменитым сочным красным бисквитом и кремом.",
      p_dessert_red_velvet_ingredients: "Бисквит Красный бархат, нежный крем-чиз, пропитка.",

      p_dessert_snickers_name: "Сникерс",
      p_dessert_snickers_desc: "Шоколадный бисквит с большим количеством арахиса и карамели.",
      p_dessert_snickers_ingredients: "Шоколадный бисквит, домашняя карамель, арахис, нуга.",

      p_dessert_oreo_name: "Орео",
      p_dessert_oreo_desc: "Шоколадное пирожное с кусочками оригинального печенья Oreo.",
      p_dessert_oreo_ingredients: "Шоколадный бисквит, крем со сливками и крошкой Oreo.",

      p_dessert_banana_name: "Банановый",
      p_dessert_banana_desc: "Ароматный банановый бисквит с банановым муссом и карамелью.",
      p_dessert_banana_ingredients: "Банановый бисквит, свежие бананы, нежный мусс.",

      p_dessert_royal_name: "Королевский",
      p_dessert_royal_desc: "Изысканное шоколадное пирожное с орехами и прослойкой пралине.",
      p_dessert_royal_ingredients: "Шоколадный бисквит, ореховый крем, фундук, пралине.",

      p_dessert_pistachio_name: "Фисташковый",
      p_dessert_pistachio_desc: "Пирожное с фисташковым бисквитом и натуральным фисташковым кремом.",
      p_dessert_pistachio_ingredients: "Фисташковый бисквит, фисташковая паста, крем на сливках.",

      p_dessert_cupcake_choco_name: "Шоколадный капкейк",
      p_dessert_cupcake_choco_desc: "Шоколадный кекс с начинкой и пышной шапочкой из шоколадного крема.",
      p_dessert_cupcake_choco_ingredients: "Шоколадный бисквит, шоколадный ганаш, крем шантильи.",

      p_dessert_cupcake_red_plain_name: "Красный капкейк",
      p_dessert_cupcake_red_plain_desc: "Нежный капкейк Красный бархат со сливочной начинкой.",
      p_dessert_cupcake_red_plain_ingredients: "Красный бисквит, молочная пропитка, сливочный сыр.",

      p_dessert_pistachio_raspberry_name: "Фисташка - малина",
      p_dessert_pistachio_raspberry_desc: "Премиум десерт с ярким сочетанием фисташкового мусса и малинового кули.",
      p_dessert_pistachio_raspberry_ingredients: "Фисташковый бисквит, малиновое кули, фисташковый крем.",

      p_dessert_ekler_choco_name: "Эклер в шоколаде",
      p_dessert_ekler_choco_desc: "Увеличенный эклер, обильно покрытый бельгийским шоколадом.",
      p_dessert_ekler_choco_ingredients: "Заварное тесто, крем Патисьер, бельгийский шоколад.",

      p_dessert_almond_fruits_name: "Миндальный с сухофруктами",
      p_dessert_almond_fruits_desc: "Изысканное миндальное пирожное с курагой, черносливом и орехами.",
      p_dessert_almond_fruits_ingredients: "Миндальная мука, взбитые белки, сухофрукты, лепестки миндаля.",

      p_dessert_pistachio_magnum_name: "Фисташка магнум",
      p_dessert_pistachio_magnum_desc: "Изысканное пирожное в форме мороженого эскимо с фисташковым вкусом.",
      p_dessert_pistachio_magnum_ingredients: "Фисташковый бисквит, фисташковый крем, глазурь из белого шоколада.",

      p_dessert_grillage_name: "Грилляж",
      p_dessert_grillage_desc: "Шоколадно-ореховый премиум десерт с хрустящими карамелизованными орехами.",
      p_dessert_grillage_ingredients: "Грильяж ореховый, шоколадный крем, карамель, темный шоколад.",

      p_dessert_latte_name: "Латте",
      p_dessert_latte_desc: "Нежное кофейное пирожное со вкусом и ароматом классического латте.",
      p_dessert_latte_ingredients: "Кофейный бисквит, кофейный мусс, молочная пенка, корица.",

      p_berry_oreo_name: "Орео с ягодами",
      p_berry_oreo_desc: "Популярное пирожное Oreo, украшенное свежими лесными ягодами.",
      p_berry_oreo_ingredients: "Шоколадный бисквит, крошка Oreo, крем, свежая клубника, голубика.",

      p_berry_milk_girl_name: "Молочная девочка с ягодами",
      p_berry_milk_girl_desc: "Нежная порционная Молочная девочка со свежими ягодами сверху.",
      p_berry_milk_girl_ingredients: "Коржи на сгущенном молоке, крем на сливках, свежие ягоды.",

      p_berry_snickers_name: "Сникерс с ягодами",
      p_berry_snickers_desc: "Шоколадное пирожное Сникерс со свежими ягодами клубники и малины.",
      p_berry_snickers_ingredients: "Шоколадный бисквит, карамель, арахис, свежие ягоды, шоколад.",

      p_berry_royal_name: "Королевский с ягодами",
      p_berry_royal_desc: "Пирожное Королевский, изысканно украшенное ягодами и золотым декором.",
      p_berry_royal_ingredients: "Ореховый бисквит, шоколад, ассорти из свежих сезонных ягод.",

      p_berry_nutella_name: "Нутелла",
      p_berry_nutella_desc: "Шоколадное пирожное со щедрым слоем пасты Nutella и свежей малиной.",
      p_berry_nutella_ingredients: "Шоколадный бисквит, оригинальная паста Nutella, свежая малина.",

      p_berry_choux_rings_name: "Заварные кольца",
      p_berry_choux_rings_desc: "Традиционное заварное кольцо с творожным кремом и свежими ягодами клубники.",
      p_berry_choux_rings_ingredients: "Заварное тесто, легкий творожный крем, сахарная пудра, клубника.",

      p_berry_cupcake_choco_name: "Шоколадный капкейк с ягодами",
      p_berry_cupcake_choco_desc: "Шоколадный капкейк с ягодным конфи внутри и горкой свежих ягод сверху.",
      p_berry_cupcake_choco_ingredients: "Шоколадный кекс, сливочный крем, ассорти из свежих ягод.",

      p_berry_pavlova_name: "Павлова с ягодами",
      p_berry_pavlova_desc: "Классический десерт Анна Павлова с обильным количеством свежей малины и клубники.",
      p_berry_pavlova_ingredients: "Безе, крем маскарпоне, свежая малина, свежая клубника.",

      p_berry_cheesecake_name: "Чизкейк с ягодами",
      p_berry_cheesecake_desc: "Нежнейший чизкейк Нью-Йорк, покрытый ягодным соусом и украшенный свежими ягодами.",
      p_berry_cheesecake_ingredients: "Сырный крем, песочная основа, свежая клубника, черника.",

      p_berry_cupcake_red_name: "Красный капкейк с ягодами",
      p_berry_cupcake_red_desc: "Капкейк Красный бархат со сливочным кремом и свежей клубникой.",
      p_berry_cupcake_red_ingredients: "Бисквит Красный бархат, клубничное кули, свежая клубника, крем.",

      p_cake_banana_name: "Банановый торт",
      p_cake_banana_desc: "Нежнейший банановый торт с воздушным бисквитом, банановым муссом и карамелью.",
      p_cake_banana_ingredients: "Банановый бисквит, свежие бананы, домашняя карамель, сливочный мусс.",

      p_cake_pistachio_name: "Торт Фисташка-Малина",
      p_cake_pistachio_desc: "Роскошный торт с фисташковыми бисквитами, яркой малиновой прослойкой и фисташковым крем-чизом.",
      p_cake_pistachio_ingredients: "Фисташковый натуральный бисквит, конфитюр из лесной малины, крем-чиз на сливках с добавлением 100% фисташковой пасты.",

      p_cake_carrot_name: "Морковный торт",
      p_cake_carrot_desc: "Пряный морковный торт с грецкими орехами и нежным сырно-сливочным кремом.",
      p_cake_carrot_ingredients: "Морковно-ореховый бисквит, корица, сливочный сыр Cremette, домашняя карамель.",

      p_cake_oreo_name: "Торт Орео",
      p_cake_oreo_desc: "Насыщенный шоколадный торт с кусочками популярного печенья Oreo и нежным кремом.",
      p_cake_oreo_ingredients: "Шоколадный бисквит, сливочный крем с крошкой печенья Oreo, ганаш на темном шоколаде.",

      p_cake_royal_name: "Торт Королевский",
      p_cake_royal_desc: "Роскошный шоколадный торт с обилием фундука, нежным шоколадным кремом и пралине.",
      p_cake_royal_ingredients: "Насыщенный шоколадный бисквит, ореховое пралине, цельный обжаренный фундук, бельгийский шоколад.",

      p_cake_woopi_pai_name: "Торт Вупи Пай",
      p_cake_woopi_pai_desc: "Американская классика: шоколадные коржи, пропитанные нежным кремом на основе взбитых сливок и маскарпоне.",
      p_cake_woopi_pai_ingredients: "Воздушные шоколадные коржи с какао Barry Callebaut, крем на сливках и творожном сыре, пропитка.",

      p_cake_red_velvet_name: "Торт Красный Бархат",
      p_cake_red_velvet_desc: "Знаменитый торт с бархатистыми рубиновыми коржами и белоснежным сырным кремом.",
      p_cake_red_velvet_ingredients: "Кефирные сочные бисквиты с ноткой какао, сырно-сливочный крем-чиз на масле и творожном сыре Hohland.",

      p_cake_snickers_name: "Торт Сникерс",
      p_cake_snickers_desc: "Супершоколадный торт с домашней нугой, соленой карамелью и хрустящим арахисом. Настоящее наслаждение.",
      p_cake_snickers_ingredients: "Шоколадный бисквит, соленая сливочная карамель, арахис, арахисовый мусс, шоколадный крем-чиз, молочный шоколад.",

      p_cake_milk_girl_name: "Торт Молочная девочка",
      p_cake_milk_girl_desc: "Очень нежный торт из тонких коржей на сгущенном молоке с воздушным сливочным кремом.",
      p_cake_milk_girl_ingredients: "Коржи на натуральном сгущенном молоке Рогачев, крем на основе взбитых фермерских сливок.",

      p_cake_chocolate_name: "Шоколадный торт",
      p_cake_chocolate_desc: "Насыщенный шоколадный торт увеличенного размера (26 см) для любителей шоколада.",
      p_cake_chocolate_ingredients: "Шоколадные влажные бисквиты, крем с какао премиум класса, шоколадные капли.",

      p_cake_kitkat_name: "Торт Киткат",
      p_cake_kitkat_desc: "Праздничный шоколадный торт, оформленный хрустящими батончиками KitKat по кругу.",
      p_cake_kitkat_ingredients: "Шоколадный бисквит, шоколадный крем, оригинальные шоколадки KitKat.",

      p_cake_esterhazy_name: "Торт Эстерхази",
      p_cake_esterhazy_desc: "Изысканный венгерский миндальный торт. Белково-ореховые коржи прослоены нежным заварным кремом с пралине.",
      p_cake_esterhazy_ingredients: "Белки яичные, миндальная мука, сахар, заварной крем Патисьер со сгущенным молоком, ореховое пралине, белый шоколад.",

      p_cake_honey_name: "Медовый торт",
      p_cake_honey_desc: "Классический медовик с тонкими ароматными коржами на натуральном меду и сметанным кремом.",
      p_cake_honey_ingredients: "Пшеничная мука, натуральный цветочный мед, фермерская сметана, сахар.",

      p_cake_napoleon_name: "Торт Наполеон",
      p_cake_napoleon_desc: "Домашний Наполеон по семейному рецепту. Тонкие коржи отлично пропитаны нежным сливочно-заварным кремом.",
      p_cake_napoleon_ingredients: "Рубленое домашнее слоеное тесто, заварной крем со сгущенным молоком и натуральным сливочным маслом.",

      p_cake_graf_ruins_name: "Торт Графские развалины",
      p_cake_graf_ruins_desc: "Эффектный торт из воздушного безе со сгущенным кремом, шоколадной глазурью и орехами.",
      p_cake_graf_ruins_ingredients: "Воздушное безе, крем со сгущенным молоком и маслом, грецкие орехи, шоколадный ганаш.",

      p_cake_banoffee_pie_name: "Баноффи пай (торт)",
      p_cake_banoffee_pie_desc: "Английский десертный торт на песочной основе со свежими бананами, карамелью и взбитыми сливками.",
      p_cake_banoffee_pie_ingredients: "Песочное тесто, вареная сгущенка, спелые бананы, фермерские сливки 33%.",

      p_cake_cheesecake_spanish_name: "Испанский чизкейк Сан-Себастьян",
      p_cake_cheesecake_spanish_desc: "Знаменитый обожженный чизкейк с нежнейшей кремовой текстурой внутри и карамельной корочкой сверху.",
      p_cake_cheesecake_spanish_ingredients: "Премиальный творожный сыр, натуральные сливки, яйца, сахар.",

      p_cake_cheesecake_tary_name: "Тары чизкейк",
      p_cake_cheesecake_tary_desc: "Фирменный чизкейк с добавлением традиционного обжаренного проса (тары). Уникальный вкус!",
      p_cake_cheesecake_tary_ingredients: "Сливочный сыр, сливки, карамель, обжаренное тары (казахское национальное просо).",

      p_cake_meringue_roll_name: "Меренговый рулет",
      p_cake_meringue_roll_desc: "Нежнейший рулет из воздушной меренги с легким кремом и свежими ягодами малины.",
      p_cake_meringue_roll_ingredients: "Яичный белок, сырно-сливочный легкий крем, свежая малина, лепестки миндаля для украшения.",

      p_cake_biscuit_roll_name: "Рулет бисквитный",
      p_cake_biscuit_roll_desc: "Мягкий домашний бисквитный рулет с нежным сливочно-ягодным кремом.",
      p_cake_biscuit_roll_ingredients: "Сдобное тесто на яйцах, сливочный крем, ягодный джем.",

      p_semi_meatballs_name: "Фрикадельки (1 кг)",
      p_semi_meatballs_desc: "Домашние фрикадельки для супа. Быстрое и сытное решение для семейного обеда.",
      p_semi_meatballs_ingredients: "Фарш на выбор (куриный или говяжий), лук, соль, специи.",

      p_semi_tefteli_name: "Тефтели (1 кг)",
      p_semi_tefteli_desc: "Аппетитные домашние тефтели, приготовленные по классическому рецепту.",
      p_semi_tefteli_ingredients: "Фарш на выбор (куриный или говяжий), рис, лук, соль, специи.",

      p_semi_kotlety_name: "Котлеты (6 шт.)",
      p_semi_kotlety_desc: "Домашние сочные котлеты в панировке, готовые к жарке.",
      p_semi_kotlety_ingredients: "Фарш на выбор (куриный или говяжий), хлеб пшеничный, лук, панировочные сухари, соль, специи.",

      p_semi_golubtsy_name: "Голубцы (1 кг)",
      p_semi_golubtsy_desc: "Традиционные голубцы из сочного говяжьего фарша с рисом, завернутые в нежные капустные листья.",
      p_semi_golubtsy_ingredients: "Листья капусты свежие, говяжий фарш, рис, лук репчатый, соль, черный перец.",

      p_semi_pelmeni_name: "Пельмени домашние (1 кг)",
      p_semi_pelmeni_desc: "Аккуратные пельмени ручной лепки из нежного теста с начинкой из говядины.",
      p_semi_pelmeni_ingredients: "Пшеничная мука, домашнее яйцо, фарш говяжий, репчатый лук, специи.",

      p_semi_manty_name: "Манты с говядиной (1 кг)",
      p_semi_manty_desc: "Настоящие домашние манты ручной лепки с начинкой из сочной рубленой говядины и лука.",
      p_semi_manty_ingredients: "Мука пшеничная, вода питьевая, охлажденная говядина (крупный рубленый фарш), лук репчатый, соль, черный перец.",

      p_semi_borek_name: "Сигара борек (12 шт.)",
      p_semi_borek_desc: "Хрустящие турецкие трубочки из тонкого теста филло с начинкой на выбор.",
      p_semi_borek_ingredients: "Тесто филло, начинка на выбор (куриный с сыром или с мясом и сыром).",

      p_semi_chebureki_name: "Чебуреки с говядиной (12 шт.)",
      p_semi_chebureki_desc: "Упаковка чебуреков ручной лепки. При жарке получается пузырчатое хрустящее тесто.",
      p_semi_chebureki_ingredients: "Тонкое пресное тесто на воде, сочный фарш из говядины, лук, специи.",

      p_semi_vareniki_name: "Вареники с картофелем (1 уп.)",
      p_semi_vareniki_desc: "Нежные домашние вареники с начинкой из воздушного картофельного пюре.",
      p_semi_vareniki_ingredients: "Тесто пресное, картофельное пюре, сливочное масло, пассерованный репчатый лук.",

      p_semi_soup_lentil_name: "Чечевичный суп (замороженный)",
      p_semi_soup_lentil_desc: "Ароматный и сытный турецкий чечевичный суп-пюре. Готов к разогреву.",
      p_semi_soup_lentil_ingredients: "Красная чечевица, картофель, морковь, лук, специи, лимонный сок.",

      p_semi_beef_broth_name: "Говяжий бульон (замороженный)",
      p_semi_beef_broth_desc: "Наваристый крепкий говяжий бульон, уваренный в течение нескольких часов. Отличная основа для супов.",
      p_semi_beef_broth_ingredients: "Говяжьи кости, мясо говядины, коренья, лук, морковь, специи.",

      p_semi_dough_baursak_name: "Тесто для бауырсака",
      p_semi_dough_baursak_desc: "Фирменное дрожжевое тесто для пышных золотистых бауырсаков.",
      p_semi_dough_baursak_ingredients: "Мука пшеничная в/с, молоко, сахар, дрожжи, соль, растительное масло.",

      p_semi_dough_beshbarmak_name: "Тесто для бешбармака",
      p_semi_dough_beshbarmak_desc: "Тонко раскатанное домашнее тесто (сочни) для традиционного казахского бешбармака.",
      p_semi_dough_beshbarmak_ingredients: "Мука пшеничная, яйца домашние, вода, соль.",

      p_semi_dough_puff_name: "Слоеное тесто",
      p_semi_dough_puff_desc: "Универсальное домашнее слоеное тесто для выпечки на сливочном масле.",
      p_semi_dough_puff_ingredients: "Мука, сливочное масло 82%, вода, лимонный сок, соль.",
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
      catalog_cat_berry_desserts: "Жидек қосылған пирожныйлар",
      catalog_cat_cakes: "Торттар",
      catalog_cat_on_order: "Тапсырыс бойынша",
      catalog_cat_on_order: "Тапсырыс бойынша",
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
      preview_lbl_size: "Өлшемді таңдаңыз:",
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
      admin_login_title: "Басқару панеліне кіру",
      admin_login_btn: "Кіру",
      admin_login_err: "Қате құпия сөз!",
      admin_dash_title: "Әкімші панелі",
      admin_tab_catalog: "Тауарлар каталогы",
      admin_tab_orders: "Тапсырыстар тарихы",
      admin_lbl_name: "Атауы",
      admin_lbl_price: "Бағасы (₸)",
      admin_lbl_instock: "Қелбетті" /* Қолжетімді */,
      admin_lbl_instock: "Қолжетімді",
      admin_btn_save: "Сақтау",
      admin_btn_logout: "Шығу",
      admin_order_empty: "Тапсырыстар әлі жоқ",
      admin_order_clear: "Тарихты тазалау",
      admin_order_status_new: "Жаңа",
      admin_order_status_work: "Жұмыста",
      admin_order_status_done: "Орындалды",
      admin_order_status_cancel: "Бас тартылды",
      admin_lbl_status: "Мәртебе",
      admin_filter_category_lbl: "Санат:",
      admin_filter_search_lbl: "Іздеу:",
      admin_filter_search_ph: "Атауы бойынша іздеу...",
      admin_lbl_stock: "Қоймадағы саны",
      catalog_out_of_stock: "Қолжетімсіз",
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
      p_bread_burger_name: "Бургер бөлкесі",
      p_bread_burger_desc: "Күнжіт себілген жаңа піскен, өте жұмсақ және үлпілдек бидай бөлкесі. Үй бургерлеріне өте ыңғайлы.",
      p_bread_burger_ingredients: "Жоғары сұрыпты бидай ұны, күнжіт, сүт, жұмыртқа, сары май, қант, ашытқы, тұз.",

      // 2. bread_baursaki
      p_bread_baursaki_name: "Бауырсақтар",
      p_bread_baursaki_desc: "Дәстүрлі алтын түстес бауырсақтар. Іші жұмсақ, сырты қытырлақ. Жеткізу алдында дайындалады.",
      p_bread_baursaki_ingredients: "Бидай ұны, сүт, ашытқы, қант, тұз, өсімдік майы.",

      // 2b. bread_rye
      p_bread_rye_name: "Қара бидай наны",
      p_bread_rye_desc: "Қытырлақ қабығы мен тығыз жұмсағы бар классикалық қара бидай наны. Витаминдер мен талшықтарға бай.",
      p_bread_rye_ingredients: "Қара бидай ұны, ауыз су, қара бидай уыты, ашытқы, тұз.",

      // 2c. bread_garlic_baguette
      p_bread_garlic_baguette_name: "Сарымсақ қосылған мини батон",
      p_bread_garlic_baguette_desc: "Сарымсақ майы мен көк шөптер салынған хош иісті шағын батон. Сорпалар мен негізгі тағамдарға өте қолайлы.",
      p_bread_garlic_baguette_ingredients: "Бидай ұны, жаңа піскен сарымсақ, аскөк, сары май, тұз.",

      // 2d. bread_sayka
      p_bread_sayka_name: "Сайка тоқашы",
      p_bread_sayka_desc: "Нәзік сүт дәмі мен жұмсақ қабығы бар дәстүрлі бидай сайкасы. Таңғы ас үшін тамаша таңдау.",
      p_bread_sayka_ingredients: "Жоғары сұрыпты бидай ұны, пастерленген сүт, сары май, қант, ашытқы.",

      // 3. bread_kosichki
      p_bread_kosichki_name: "Өрім нан",
      p_bread_kosichki_desc: "Жеңіл қант шәрбаты және қызарған қабығы бар хош иісті өрілген тәтті тоқаш. Ыстық шайға өте ыңғайлы.",
      p_bread_kosichki_ingredients: "Ашытқы қамыры, сүт, сары май, қант шәрбаты, күнжіт.",

      // 3b. bread_pancakes_meat
      p_bread_pancakes_meat_name: "Ет қосылған құймақ",
      p_bread_pancakes_meat_desc: "Пияз және дәмдеуіштер қосылған шырынды тартылған ет салынған тойымды әрі нәзік үй құймақтары.",
      p_bread_pancakes_meat_ingredients: "Құймақ қамыры (сүт, ұн, жұмыртқа, қант), тартылған сиыр еті, пияз, қара бұрыш, тұз.",

      // 3c. bread_pancakes_plain
      p_bread_pancakes_plain_name: "Құймақ (салмасыз)",
      p_bread_pancakes_plain_desc: "Сүтке дайындалған жұқа, шілтерлі үй құймақтары. Сіздің қалауыңыз бойынша кез келген топингпен ыстық күйінде ұсынылады.",
      p_bread_pancakes_plain_ingredients: "Бидай ұны, сүт, жұмыртқа, күнбағыс майы, қант, тұз.",

      // 3d. bread_rye_flatbread
      p_bread_rye_flatbread_name: "Қара бидай тандыр наны",
      p_bread_rye_flatbread_desc: "Тұқым себілген дәстүрлі тандырда пісірілетін қара бидай ұнынан жасалған пайдалы әрі хош іісті тандыр нан.",
      p_bread_rye_flatbread_ingredients: "Қара бидай ұны, бидай ұны, су, күнжіт, тұз.",

      // 3e. bread_flatbread
      p_bread_flatbread_name: "Тандыр нан",
      p_bread_flatbread_desc: "Қытырлақ қабығы мен жұмсақ ортасы бар классикалық үлпілдек тандыр нан. Көне рецепттер бойынша пісіріледі.",
      p_bread_flatbread_ingredients: "Жоғары сұрыпты бидай ұны, ауыз су, құрғақ ашытқы, қара күнжіт, тұз.",

      // 4. pastry_samsa_meat
      p_pastry_samsa_meat_name: "Ет қосылған самса",
      p_pastry_samsa_meat_desc: "Пияз бен дәмдеуіштер қосылған шырынды тартылған ет салынған қытырлақ қатпарлы самса.",
      p_pastry_samsa_meat_ingredients: "Қатпарлы қамыр, сиыр еті, пияз, қара бұрыш, тұз.",

      // 4b. pastry_samsa_liver
      p_pastry_samsa_liver_name: "Бауыр қосылған самса",
      p_pastry_samsa_liver_desc: "Пияз қосылған сиыр бауырынан жасалған тойымды әрі шырынды салмасы бар хош иісті самса.",
      p_pastry_samsa_liver_ingredients: "Қатпарлы қамыр, сиыр бауыры, пияз, сары май, бұрыш, тұз.",

      // 5. pastry_samsa_chicken
      p_pastry_samsa_chicken_name: "Тауық пен сыр қосылған самса",
      p_pastry_samsa_chicken_desc: "Шырынды тауық филесі мен созылмалы сыр салынған нәзік самса.",
      p_pastry_samsa_chicken_ingredients: "Қатпарлы қамыр, тауық филесі, сыр, пияз, дәмдеуіштер, тұз.",

      // 5b. pastry_samsa_cabbage
      p_pastry_samsa_cabbage_name: "Ет пен қырыққабат қосылған самса",
      p_pastry_samsa_cabbage_desc: "Тартылған ет пен шырынды бұқтырылған қырыққабаттың дәстүрлі үйлесімі бар тойымды самса.",
      p_pastry_samsa_cabbage_ingredients: "Қатпарлы қамыр, сиыр еті, жаңа пісен қырыққабат, пияз, сары май, дәмдеуіштер.",

      // 5c. pastry_liver_pie
      p_pastry_liver_pie_name: "Өкпе-бауыр бәліштері",
      p_pastry_liver_pie_desc: "Дәмдеуіштер мен нәзік өкпе-бауыр паштеті салынған қызарған үй бәліштері.",
      p_pastry_liver_pie_ingredients: "Ашытқы қамыры, сиырдың өкпе-бауыры, пияз, дәмдеуіштер.",

      // 5d. pastry_liver_pie_mini
      p_pastry_liver_pie_mini_name: "Мини өкпе-бауыр бәліштері",
      p_pastry_liver_pie_mini_desc: "Өкпе-бауырдан жасалған тойымды салмасы бар бір тістеп жейтін шағын бәліштер.",
      p_pastry_liver_pie_mini_ingredients: "Ашытқы қамыры, сиыр өкпе-бауыры, пияз, тұз, бұрыш.",

      // 5e. pastry_bun_plain
      p_pastry_bun_plain_name: "Салмасыз тоқаш",
      p_pastry_bun_plain_desc: "Беті қызарған жұмсақ тәтті тоқаш. Шайға немесе сүтке өте жақсы келеді.",
      p_pastry_bun_plain_ingredients: "Бидай ұны, сүт, жұмыртқа, қант, сары май, ашытқы.",

      // 5f. pastry_bun_condensed
      p_pastry_bun_condensed_name: "Қоюлатылған сүт қосылған тоқаш",
      p_pastry_bun_condensed_desc: "Қоюлатылған пісірілген сүт салынған тәтті тоқаш.",
      p_pastry_bun_condensed_ingredients: "Тәтті ашытқы қамыры, жоғары сапалы пісірілген қоюлатылған сүт.",

      // 5g. pastry_bun_fruits
      p_pastry_bun_fruits_name: "Кептірілген жемістер қосылған тоқаш",
      p_pastry_bun_fruits_desc: "Мейіз, өрік және қара өрік салынған хош иісті тоқаш.",
      p_pastry_bun_fruits_ingredients: "Тәтті қамыр, сүйексіз мейіз, кептірілген өрік, қара өрік, қант ұнтағы.",

      // 5h. pastry_bun_curd
      p_pastry_bun_curd_name: "Сүзбе қосылған тоқаш",
      p_pastry_bun_curd_desc: "Тәтті табиғи сүзбе салынған үлпілдек тоқаш.",
      p_pastry_bun_curd_ingredients: "Ұн, сүт, қант, табиғи сүзбе, ванилин, сары май.",

      // 7. pastry_sochnik
      p_pastry_sochnik_name: "Сочник",
      p_pastry_sochnik_desc: "Қытырлақ қабығы мен нәзік сүзбе ортасы бар классикалық сочник бәліші.",
      p_pastry_sochnik_ingredients: "Құмды қамыр, үй сүзбесі, қант, ваниль сығындысы, жұмыртқаның сарысы.",

      // 7b. pastry_manty_condensed
      p_pastry_manty_condensed_name: "Қоюлатылған сүт қосылған мәнті",
      p_pastry_manty_condensed_desc: "Хош иісті пісірілген қоюлатылған сүт салынған ерекше тәтті мәнті. Нағыз дәмді ас!",
      p_pastry_manty_condensed_ingredients: "Жұмыртқа қосылған тұщы қамыр, пісірілген қоюлатылған сүт, сары май.",

      // 6. pastry_rogaliki
      p_pastry_rogaliki_name: "Сүзбе қосылған рогаликтер",
      p_pastry_rogaliki_desc: "Нәзік тәтті сүзбе салынған үгітілмелі шағын рогаликтер.",
      p_pastry_rogaliki_ingredients: "Қаймақты-құмды қамыр, сүзбе, қант ұнтағы, ваниль.",

      // 7c. pastry_tea_set
      p_pastry_tea_set_name: "Шәй жиынтығы",
      p_pastry_tea_set_desc: "Үлкен компанияның шай ішуіне өте ыңғайлы үйде дайындалған шағын тәтті пісірмелер жиынтығы.",
      p_pastry_tea_set_ingredients: "Үй печеньесі, мини-рогаликтер, кекстер, қоюлатылған сүт қосылған жаңғақтар.",

      // 8. pie_smetannik
      p_pie_curd_condensed_name: "Қоюлатылған сүт қосылған сүзбе пирогы",
      p_pie_curd_condensed_desc: "Нәзік сүзбе мен тәтті пісірілген қоюлатылған сүт салынған тойымды пирог.",
      p_pie_curd_condensed_ingredients: "Құмды қамыр, 9% сүзбе, пісірілген қоюлатылған сүт, қант, ванилин.",

      p_pie_smetannik_name: "Қаймақ пирогы",
      p_pie_smetannik_desc: "Жұқа песочный негіздегі классикалық нәзік қаймақ пирогы.",
      p_pie_smetannik_ingredients: "Песочный қамыр, 25% фермерлік қаймақ, жұмыртқа, ванильді қант.",

      p_pie_snickers_name: "Сникерс пирогы",
      p_pie_snickers_desc: "Үй карамелі, жержаңғақ және шоколадты ганаш қосылған қаныққан десертті пирог.",
      p_pie_snickers_ingredients: "Шоколадты бисквит, қуырылған жержаңғақ, тұзды карамель, белгиялық шоколад.",

      p_pie_caramel_name: "Карамель пирогы",
      p_pie_caramel_desc: "Үйдің нәзік карамелінің қалың қабаты және нәзік қамыры бар тәтті пирог.",
      p_pie_caramel_ingredients: "Құмды қамыр, фирмалық Nazcake карамелі, кілегей, қант.",

      p_pie_poppy_name: "Мак пирогы",
      p_pie_poppy_desc: "Пісірілген мактың шырынды әрі тығыз салмасы бар хош іісті пирог.",
      p_pie_poppy_ingredients: "Тәтті қамыр, қант қосылған мак салмасы, сары май.",

      p_pie_mix_name: "Микс пирогі",
      p_pie_mix_desc: "Бір пирогта бірнеше түрлі салманы біріктіретін ассорти-пирог.",
      p_pie_mix_ingredients: "Тәтті қамыр, сүзбе салмасы, мак салмасы, жеміс джемі.",

      p_pie_meat_round_name: "Ет қосылған пирог (дөңгелек)",
      p_pie_meat_round_desc: "Шырынды тартылған ет салынған диаметрі 22 см дөңгелек жабық ет пирогы.",
      p_pie_meat_round_ingredients: "Тәтті қамыр, сиыр фаршы, пияз, сары май, дәмдеуіштер.",

      p_pie_meat_rect_name: "Ет қосылған пирог (тікбұрышты)",
      p_pie_meat_rect_desc: "Туралған сиыр еті мен пияздан жасалған шырынды тікбұрышты ет пирогы.",
      p_pie_meat_rect_ingredients: "Тәтті қамыр, туралған сиыр еті, пияз, дәмдеуіштер.",

      p_pie_meat_rect_s_name: "Ет пирогы (S өлшемі)",
      p_pie_meat_rect_s_desc: "Өлшемі 36х30 см тойымды тікбұрышты ет пирогы. Шағын компанияға өте ыңғайлы.",
      p_pie_meat_rect_s_ingredients: "Тәтті қамыр, туралған сиыр еті, пияз, дәмдеуіштер.",

      p_pie_meat_rect_m_name: "Ет пирогы (М өлшемі)",
      p_pie_meat_rect_m_desc: "Өлшемі 45х30 см тойымды тікбұрышты ет пирогы. Дәстүрлі мерекелік тағам.",
      p_pie_meat_rect_m_ingredients: "Тәтті қамыр, таңдаулы сиыр фаршы, пияз, дәмдеуіштер, май.",

      p_pie_meat_rect_l_name: "Ет пирогы (L өлшемі)",
      p_pie_meat_rect_l_desc: "Үлкен салтанаттарға арналған өлшемі 48х35 см үлкен отбасылық тікбұрышты ет пирогы.",
      p_pie_meat_rect_l_ingredients: "Тәтті қамыр, туралған сиыр фаршы, көп пияз, сары май, дәмдеуіштер.",

      p_pie_curd_large_name: "Сүзбе пирогы",
      p_pie_curd_large_desc: "Нәзік әрі тәтті сүзбе салмасы бар үлкен тікбұрышты пирог.",
      p_pie_curd_large_ingredients: "Тәтті қамыр, табиғи сүзбе, қант ұнтағы, ваниль.",

      p_pie_fruits_large_name: "Кептірілген жемістер пирогы",
      p_pie_fruits_large_desc: "Таңдаулы мейіз бен кептірілген өрікке толы үлкен тікбұрышты пирог.",
      p_pie_fruits_large_ingredients: "Тәтті қамыр, кептірілген өрік, мейіз, қант, ванилин.",

      p_dessert_napoleon_name: "Наполеон",
      p_dessert_napoleon_desc: "Нәзік заварной кремі бар классикалық Наполеон тортының порциялық бөлігі.",
      p_dessert_napoleon_ingredients: "Қатпарлы қамыр, Дипломат заварной кремі, ваниль.",

      p_dessert_ekler_name: "Эклер",
      p_dessert_ekler_desc: "Нәзік кілегейлі-заварной кремімен толтырылған француз заварной пирожныйы.",
      p_dessert_ekler_ingredients: "Заварной қамыр, Муслин кремі, шоколад глазурі.",

      p_dessert_muraveynik_name: "Муравейник",
      p_dessert_muraveynik_desc: "Қоюлатылған сүт пен грек жаңғағы қосылған құмды қамырдан жасалған дәстүрлі пирожный.",
      p_dessert_muraveynik_ingredients: "Құмды қамыр, пісірілген қоюлатылған сүт, сары май, бал, мак.",

      p_dessert_chak_chak_name: "Чак-чак",
      p_dessert_chak_chak_desc: "Табиғи бал шәрбаты құйылған, қуырылған қамыр кесектерінен жасалған шығыс тәттісі.",
      p_dessert_chak_chak_ingredients: "Бидай ұны, жұмыртқа, табиғи бал, қант, өсімдік майы.",

      p_dessert_chocolate_name: "Шоколадты",
      p_dessert_chocolate_desc: "Шоколадты бисквит пен нәзік кремі бар қанық шоколадты пирожный.",
      p_dessert_chocolate_ingredients: "Шоколадты бисквит, какао қосылған крем, қара шоколад.",

      p_dessert_caramel_name: "Карамельді",
      p_dessert_caramel_desc: "Жұмсақ бисквит пен үй карамелі қосылған нәзік пирожный.",
      p_dessert_caramel_ingredients: "Сдобты бисквит, жұмсақ карамель, кілегейлі крем.",

      p_dessert_snickers_airy_name: "Үлпілдек Сникерс",
      p_dessert_snickers_airy_desc: "Безе, қуырылған жержаңғақ және қоюлатылған сүт қосылған нәзік кремі бар пирожный.",
      p_dessert_snickers_airy_ingredients: "Үлпілдек безе, қуырылған жержаңғақ, пісірілген қоюлатылған сүт, сары май.",

      p_dessert_medovik_name: "Медовик",
      p_dessert_medovik_desc: "Ауызда еритін қаймақ кремі бар хош іісті бал пирожныйы.",
      p_dessert_medovik_ingredients: "Табиғи бал қосылған бал корждары, қаймақ кремі.",

      p_dessert_caramel_design_name: "Сәнделген карамель",
      p_dessert_caramel_design_desc: "Сәнді мерекелік безендіруі бар карамельді пирожный.",
      p_dessert_caramel_design_ingredients: "Бисквит, үй карамелі, крем-чиз, безендіру элементтері.",

      p_dessert_chocolate_design_name: "Сәнделген шоколадты",
      p_dessert_chocolate_design_desc: "Әдемі мерекелік безендіруі бар шоколадты пирожный.",
      p_dessert_chocolate_design_ingredients: "Шоколадты бисквит, шоколадты крем, мерекелік декор.",

      p_dessert_banoffee_name: "Баноффи пай",
      p_dessert_banoffee_desc: "Құмды негіздегі банан, хош иісті карамель және үлпілдек көпіршітілген кілегей қосылған пирожный.",
      p_dessert_banoffee_ingredients: "Құмды негіз, жаңа піскен банандар, карамель, көпіршітілген кілегей.",

      p_dessert_ryzhik_name: "Рыжик",
      p_dessert_ryzhik_desc: "Заварной кремі бар классикалық бал пирожныйы.",
      p_dessert_ryzhik_ingredients: "Бал корждары, Дипломат заварной кремі, үгінді.",

      p_dessert_cheesecake_name: "Чизкейк",
      p_dessert_cheesecake_desc: "Ваниль қосылған құмды негіздегі нәзік ірімшік десерті.",
      p_dessert_cheesecake_ingredients: "Құмды үгінді, Cremette кілегейлі ірімшігі, қант, кілегей.",

      p_dessert_pavlova_name: "Павлова",
      p_dessert_pavlova_desc: "Нәзік креммен безендірілген, қытырлақ қабығы мен жұмсақ ортасы бар үлпілдек безе.",
      p_dessert_pavlova_ingredients: "Француз меренгасы, маскарпоне, кілегей, қант ұнтағы.",

      p_dessert_milk_girl_name: "Сүтті қыз",
      p_dessert_milk_girl_desc: "Қоюлатылған сүтке дайындалған нәзік корждары мен жеңіл кремі бар порциялық пирожный.",
      p_dessert_milk_girl_ingredients: "Рогачев қоюлатылған сүтінен жасалған корждар, көпіршітілген кілегей кремі.",

      p_dessert_carrot_name: "Сәбізді",
      p_dessert_carrot_desc: "Дәмдеуіштер, грек жаңғағы және кілегейлі ірімшік қосылған сәбіз бисквиті.",
      p_dessert_carrot_ingredients: "Сәбізді-жаңғақты бисквит, дәріш, кілегейлі ірімшік, карамель.",

      p_dessert_red_velvet_name: "Қызыл барқыт",
      p_dessert_red_velvet_desc: "Әйгілі шырынды қызыл бисквит пен кремі бар ашық пирожный.",
      p_dessert_red_velvet_ingredients: "Қызыл барқыт бисквиті, нәзік крем-чиз, сіңіргіш.",

      p_dessert_snickers_name: "Сникерс",
      p_dessert_snickers_desc: "Арахис пен карамельдің көп мөлшері бар шоколадты бисквит.",
      p_dessert_snickers_ingredients: "Шоколадты бисквит, үй карамелі, жержаңғақ, нуга.",

      p_dessert_oreo_name: "Орео",
      p_dessert_oreo_desc: "Түпнұсқа Oreo печеньесінің кесектері бар шоколадты пирожный.",
      p_dessert_oreo_ingredients: "Шоколадты бисквит, Oreo үгіндісі мен кілегей қосылған крем.",

      p_dessert_banana_name: "Бананды",
      p_dessert_banana_desc: "Банан муссы мен карамель қосылған хош иісті банан бисквиті.",
      p_dessert_banana_ingredients: "Банан бисквиті, жаңа піскен банандар, нәзік мусс.",

      p_dessert_royal_name: "Корольдік",
      p_dessert_royal_desc: "Жаңғақтар мен пралине қабаты бар талғампаз шоколадты пирожный.",
      p_dessert_royal_ingredients: "Шоколадты бисквит, жаңғақ кремі, орман жаңғағы, пралине.",

      p_dessert_pistachio_name: "Фисташкалы",
      p_dessert_pistachio_desc: "Фисташка бисквиті мен табиғи фисташка кремі бар пирожный.",
      p_dessert_pistachio_ingredients: "Фисташка бисквиті, фисташка пастасы, кілегей кремі.",

      p_dessert_cupcake_choco_name: "Шоколадты капкейк",
      p_dessert_cupcake_choco_desc: "Шоколадты кремі бар үлпілдек қалпақшасы мен салмасы бар шоколадты кекс.",
      p_dessert_cupcake_choco_ingredients: "Шоколадты бисквит, шоколадты ганаш, шантильи кремі.",

      p_dessert_cupcake_red_plain_name: "Қызыл капкейк",
      p_dessert_cupcake_red_plain_desc: "Кілегейлі салмасы бар нәзік Қызыл барқыт капкейгі.",
      p_dessert_cupcake_red_plain_ingredients: "Қызыл бисквит, сүтті сіңіргіш, кілегейлі ірімшік.",

      p_dessert_pistachio_raspberry_name: "Фисташка - таңқурай",
      p_dessert_pistachio_raspberry_desc: "Фисташка муссы мен таңқурай кулиінің керемет үйлесімі бар премиум десерт.",
      p_dessert_pistachio_raspberry_ingredients: "Фисташка бисквиті, таңқурай кулиі, фисташка кремі.",

      p_dessert_ekler_choco_name: "Шоколадты эклер",
      p_dessert_ekler_choco_desc: "Бельгиялық шоколадпен жомарт жабылған үлкейтілген эклер.",
      p_dessert_ekler_choco_ingredients: "Заварной қамыр, Патисьер кремі, бельгиялық шоколад.",

      p_dessert_almond_fruits_name: "Кептірілген жемістер қосылған бадам десерті",
      p_dessert_almond_fruits_desc: "Кептірілген өрік, қара өрік және жаңғақтары бар талғампаз бадам пирожныйы.",
      p_dessert_almond_fruits_ingredients: "Бадам ұны, көпіршітілген жұмыртқа ақуызы, кептірілген жемістер, бадам жапырақшалары.",

      p_dessert_pistachio_magnum_name: "Магнум фисташка",
      p_dessert_pistachio_magnum_desc: "Фисташка дәмі бар эскимо балмұздағы түріндегі талғампаз пирожный.",
      p_dessert_pistachio_magnum_ingredients: "Фисташка бисквиті, фисташка кремі, ақ шоколад глазурі.",

      p_dessert_grillage_name: "Грильяж",
      p_dessert_grillage_desc: "Қытырлақ карамельденген жаңғақтары бар шоколадты-жаңғақты премиум десерт.",
      p_dessert_grillage_ingredients: "Жаңғақ грильяжы, шоколадты крем, карамель, қара шоколад.",

      p_dessert_latte_name: "Латте",
      p_dessert_latte_desc: "Классикалық латтенің дәмі мен хош иісі бар нәзік кофе пирожныйы.",
      p_dessert_latte_ingredients: "Кофе бисквиті, кофе муссы, сүт көбігі, дәріш.",

      p_berry_oreo_name: "Жидек қосылған Орео",
      p_berry_oreo_desc: "Балғын жидектермен безендірілген танымал Oreo пирожныйы.",
      p_berry_oreo_ingredients: "Шоколадты бисквит, Oreo үгіндісі, крем, балғын құлпынай, көкжидек.",

      p_berry_milk_girl_name: "Жидек қосылған сүтті қыз",
      p_berry_milk_girl_desc: "Үстіне балғын жидектер қойылған нәзік порциялық Сүтті қыз пирожныйы.",
      p_berry_milk_girl_ingredients: "Қоюлатылған сүт корждары, кілегей кремі, балғын жидектер.",

      p_berry_snickers_name: "Жидек қосылған Сникерс",
      p_berry_snickers_desc: "Балғын құлпынай және таңқурай жидектері бар шоколадты Сникерс пирожныйы.",
      p_berry_snickers_ingredients: "Шоколадты бисквит, карамель, жержаңғақ, балғын жидектер, шоколад.",

      p_berry_royal_name: "Жидек қосылған Корольдік",
      p_berry_royal_desc: "Жидектермен және алтын декормен талғампаз безендірілген Корольдік пирожныйы.",
      p_berry_royal_ingredients: "Жаңғақ бисквиті, шоколад, балғын маусымдық жидектер жиынтығы.",

      p_berry_nutella_name: "Нутелла",
      p_berry_nutella_desc: "Nutella пастасының қалың қабаты және балғын таңқурайы бар шоколадты пирожный.",
      p_berry_nutella_ingredients: "Шоколадты бисквит, түпнұсқа Nutella пастасы, балғын таңқурай.",

      p_berry_choux_rings_name: "Заварной сақиналар",
      p_berry_choux_rings_desc: "Сүзбе кремі және балғын құлпынай жидектері бар дәстүрлі заварной сақинасы.",
      p_berry_choux_rings_ingredients: "Заварной қамыр, жеңіл сүзбе кремі, қант ұнтағы, құлпынай.",

      p_berry_cupcake_choco_name: "Жидек қосылған шоколадты капкейк",
      p_berry_cupcake_choco_desc: "Ішінде жидек конфиі және үстінде балғын жидектер үйіндісі бар шоколадты капкейк.",
      p_berry_cupcake_choco_ingredients: "Шоколадты кекс, кілегейлі крем, балғын жидектер жиынтығы.",

      p_berry_pavlova_name: "Жидек қосылған Павлова",
      p_berry_pavlova_desc: "Балғын таңқурай мен құлпынайдың көп мөлшері бар Анна Павлова классикалық десерті.",
      p_berry_pavlova_ingredients: "Безе, маскарпоне кремі, балғын таңқурай, балғын құлпынай.",

      p_berry_cheesecake_name: "Жидек қосылған чизкейк",
      p_berry_cheesecake_desc: "Жидек соусымен жабылған және балғын жидектермен безендірілген нәзік Нью-Йорк чизкейгі.",
      p_berry_cheesecake_ingredients: "Ірімшік кремі, құмды негіз, балғын құлпынай, көкжидек.",

      p_berry_cupcake_red_name: "Жидек қосылған қызыл капкейк",
      p_berry_cupcake_red_desc: "Кілегейлі кремі мен балғын құлпынайы бар Қызыл барқыт капкейгі.",
      p_berry_cupcake_red_ingredients: "Қызыл барқыт бисквиті, құлпынай кулиі, балғын құлпынай, крем.",

      p_cake_banana_name: "Банан торты",
      p_cake_banana_desc: "Банан муссы және үй карамелі қосылған ең нәзік банан торты.",
      p_cake_banana_ingredients: "Банан бисквиті, жаңа піскен банандар, үй карамелі, кілегейлі мусс.",

      p_cake_pistachio_name: "Фисташка-таңқурай торты",
      p_cake_pistachio_desc: "Фисташка бисквиттері, ашық таңқурай қабаты және фисташка крем-чизі бар сәнді торт.",
      p_cake_pistachio_ingredients: "Табиғи фисташка бисквиті, орман таңқурайынан жасалған конфитюр, 100% фисташка пастасы қосылған кілегейлі крем-чиз.",

      p_cake_carrot_name: "Сәбіз торты",
      p_cake_carrot_desc: "Грек жаңғағы және нәзік ірімшік-кілегейлі кремі бар хош иісті сәбіз торты.",
      p_cake_carrot_ingredients: "Сәбізді-жаңғақты бисквит, дәріш, Cremette кілегейлі ірімшігі, үй карамелі.",

      p_cake_oreo_name: "Орео торты",
      p_cake_oreo_desc: "Танымал Oreo печеньесінің кесектері және нәзік кремі бар қанық шоколадты торт.",
      p_cake_oreo_ingredients: "Шоколадты бисквит, Oreo печеньесінің үгіндісі бар кілегейлі крем, қара шоколадты ганаш.",

      p_cake_royal_name: "Корольдік торт",
      p_cake_royal_desc: "Орман жаңғағы, нәзік шоколад кремі и пралинесі бар сәнді шоколадты торт.",
      p_cake_royal_ingredients: "Қанық шоколадты бисквит, жаңғақ пралинесі, қуырылған орман жаңғағы, бельгиялық шоколад.",

      p_cake_woopi_pai_name: "Вупи Пай торты",
      p_cake_woopi_pai_desc: "Америкалық классика: көпіршітілген кілегей мен маскарпоне негізіндегі нәзік креммен сіңірілген шоколадты корждар.",
      p_cake_woopi_pai_ingredients: "Barry Callebaut какаосы қосылған ауа шоколадты корждар, кілегей мен сүзбе ірімшік кремі, сіңіргіш.",

      p_cake_red_velvet_name: "Красный Бархат торты",
      p_cake_red_velvet_desc: "Барқыттай рубин корждары мен аппақ ірімшік кремі бар әйгілі торт.",
      p_cake_red_velvet_ingredients: "Какао нотасы бар айран сочные бисквиттері, Hohland сүзбе ірімшігі мен сары май негізіндегі кілегейлі крем-чиз.",

      p_cake_snickers_name: "Сникерс торты",
      p_cake_snickers_desc: "Үй нугасы, тұзды карамель және қытырлақ жержаңғағы бар супершоколадты торт. Нағыз ләззат.",
      p_cake_snickers_ingredients: "Шоколадты бисквит, тұзды кілегейлі карамель, жержаңғақ, жержаңғақ муссы, шоколадты крем-чиз, сүтті шоколад.",

      p_cake_milk_girl_name: "Сүтті қыз торты",
      p_cake_milk_girl_desc: "Көпіршітілген кілегей кремі және қоюлатылған сүт негізіндегі жұқа корждары бар өте нәзік торт.",
      p_cake_milk_girl_ingredients: "Рогачев табиғи қоюлатылған сүтінен жасалған корждар, көпіршітілген фермерлік кілегей кремі.",

      p_cake_chocolate_name: "Шоколадты торт",
      p_cake_chocolate_desc: "Шоколадты жақсы көретіндерге арналған үлкейтілген өлшемді (26 см) қанық шоколадты торт.",
      p_cake_chocolate_ingredients: "Шоколадты ылғалды бисквиттер, премиум сапалы какао кремі, шоколад тамшылары.",

      p_cake_kitkat_name: "Киткат торты",
      p_cake_kitkat_desc: "Шеңбер бойымен қытырлақ KitKat батончиктерімен безендірілген мерекелік шоколадты торт.",
      p_cake_kitkat_ingredients: "Шоколадты бисквит, шоколад кремі, түпнұсқа KitKat шоколадтары.",

      p_cake_esterhazy_name: "Эстерхази торты",
      p_cake_esterhazy_desc: "Миндальді-ақуызды корждары және пралине қосылған заварной кремі бар классикалық венгр торы.",
      p_cake_esterhazy_ingredients: "Жұмыртқа ақуыздары, бадам ұны, қант, қоюлатылған сүт қосылған Патисьер заварной кремі, жаңғақ пралинесі, ақ шоколад.",

      p_cake_honey_name: "Бал торты",
      p_cake_honey_desc: "Табиғи бал қосылған жұқа хош иісті корждары және қаймақ кремі бар классикалық медовик.",
      p_cake_honey_ingredients: "Бидай ұны, табиғи гүл балы, фермерлік қаймақ, қант.",

      p_cake_napoleon_name: "Наполеон торты",
      p_cake_napoleon_desc: "Үй рецепті бойынша Наполеон. Жұқа корждар нәзік сливочно-заварной кремімен жақсы сіңірілген.",
      p_cake_napoleon_ingredients: "Үгітілген үй қабатты қамыры, қоюлатылған сүт пен табиғи сары май қосылған заварной крем.",

      p_cake_graf_ruins_name: "Графские развалины торты",
      p_cake_graf_ruins_desc: "Қоюлатылған крем, шоколад глазурі және жаңғақтары бар үлпілдек безеден жасалған әсерлі торт.",
      p_cake_graf_ruins_ingredients: "Үлпілдек безе, қоюлатылған сүт пен май кремі, грек жаңғағы, шоколадты ганаш.",

      p_cake_banoffee_pie_name: "Баноффи пай (торт)",
      p_cake_banoffee_pie_desc: "Жаңа піскен банандар, карамель және көпіршітілген кілегейі бар құмды негіздегі ағылшын десертті торты.",
      p_cake_banoffee_pie_ingredients: "Құмды қамыр, пісірілген қоюлатылған сүт, піскен банандар, фермерлік кілегей 33%.",

      p_cake_cheesecake_spanish_name: "Испандық чизкейк Сан-Себастьян",
      p_cake_cheesecake_spanish_desc: "Ішінде өте нәзік кілегейлі текстурасы және үстінде карамель қабығы бар әйгілі күйген чизкейк.",
      p_cake_cheesecake_spanish_ingredients: "Премиум сүзбе ірімшігі, табиғи кілегей, жұмыртқа, қант.",

      p_cake_cheesecake_tary_name: "Тары чизкейкі",
      p_cake_cheesecake_tary_desc: "Дәстүрлі қуырылған тары қосылған фирмалық чизкейк. Бірегей дәм!",
      p_cake_cheesecake_tary_ingredients: "Кілегейлі ірімшік, кілегей, карамель, қуырылған тары (қазақтың ұлттық тағамы).",

      p_cake_meringue_roll_name: "Меренга рулеті",
      p_cake_meringue_roll_desc: "Жеңіл кремі мен балғын таңқурай жидектері бар үлпілдек меренгадан жасалған нәзік рулет.",
      p_cake_meringue_roll_ingredients: "Жұмыртқа ақуызы, кілегейлі-ірімшік жеңіл кремі, балғын таңқурай, безендіруге арналған бадам жапырақшалары.",

      p_cake_biscuit_roll_name: "Бисквит рулеті",
      p_cake_biscuit_roll_desc: "Нәзік кілегейлі-жидек кремі бар жұмсақ үй бисквит рулеті.",
      p_cake_biscuit_roll_ingredients: "Жұмыртқа қосылған сдобты қамыр, кілегейлі крем, жидек джемі.",

      p_semi_meatballs_name: "Фрикаделькалар (1 кг)",
      p_semi_meatballs_desc: "Сорпаға арналған үй фрикаделькалары. Отбасылық түскі ас үшін жылдам және тойымды шешім.",
      p_semi_meatballs_ingredients: "Таңдау бойынша тартылған ет (тауық немесе сиыр еті), пияз, тұз, дәмдеуіштер.",

      p_semi_tefteli_name: "Тефтелилер (1 кг)",
      p_semi_tefteli_desc: "Классикалық рецепт бойынша дайындалған тәбетті үй тефтелилері.",
      p_semi_tefteli_ingredients: "Таңдау бойынша тартылған ет (тауық немесе сиыр еті), күріш, пияз, тұз, дәмдеуіштер.",

      p_semi_kotlety_name: "Котлеттер (6 дана)",
      p_semi_kotlety_desc: "Қуыруға дайын, нан үгіндісіне аунатылған үйдің шырынды котлеттері.",
      p_semi_kotlety_ingredients: "Таңдау бойынша тартылған ет (тауық немесе сиыр еті), бидай наны, пияз, нан үгіндісі, тұз, дәмдеуіштер.",

      p_semi_golubtsy_name: "Голубцы (1 кг)",
      p_semi_golubtsy_desc: "Нәзік қырыққабат жапырақтарына оралған, күріш қосылған шырынды сиыр тартылған етінен жасалған дәстүрлі голубцы.",
      p_semi_golubtsy_ingredients: "Жаңа піскен қырыққабат жапырақтары, сиыр тартылған еті, күріш, пияз, тұз, қара бұрыш.",

      p_semi_pelmeni_name: "Үй пельмені (1 кг)",
      p_semi_pelmeni_desc: "Нәзік қамырдан қолмен түйілген, сиыр еті салынған ұқыпты пельмендер.",
      p_semi_pelmeni_ingredients: "Бидай ұны, үй жұмыртқасы, сиыр тартылған еті, пияз, дәмдеуіштер.",

      p_semi_manty_name: "Сиыр етінен жасалған мәнті (1 кг)",
      p_semi_manty_desc: "Шырынды туралған сиыр еті мен пияздан жасалған салмасы бар, қолмен түйілген нағыз үй мәнтісі.",
      p_semi_manty_ingredients: "Бидай ұны, ауыз су, салқындатылған сиыр еті (ірі туралған тартылған ет), пияз, тұз, қара бұрыш.",

      p_semi_borek_name: "Сигара борек (12 дана)",
      p_semi_borek_desc: "Таңдау бойынша салмасы бар, жұқа филло қамырынан жасалған қытырлақ түрік түтікшелері.",
      p_semi_borek_ingredients: "Филло қамыры, таңдау бойынша салмасы (ірімшік қосылған тауық немесе ет пен ірімшік).",

      p_semi_chebureki_name: "Сиыр етінен жасалған чебуреки (12 дана)",
      p_semi_chebureki_desc: "Қолмен түйілген чебуреки қаптамасы. Қуырған кезде көпіршікті қытырлақ қамыр шығады.",
      p_semi_chebureki_ingredients: "Суға иленген жұқа ашытқысыз қамыр, сиыр етінің шырынды тартылған еті, пияз, дәмдеуіштер.",

      p_semi_vareniki_name: "Картоп қосылған варениктер (1 қап)",
      p_semi_vareniki_desc: "Үлпілдек картоп езбесі салынған нәзік үй варениктері.",
      p_semi_vareniki_ingredients: "Ашытқысыз қамыр, картоп езбесі, сары май, қуырылған пияз.",

      p_semi_soup_lentil_name: "Жасымық сорпасы (мұздатылған)",
      p_semi_soup_lentil_desc: "Хош иісті және тойымды түрік жасымық сорпа-пюресі. Жылытуға дайын.",
      p_semi_soup_lentil_ingredients: "Қызыл жасымық, картоп, сәбіз, пияз, дәмдеуіштер, лимон шырыны.",

      p_semi_beef_broth_name: "Сиыр етінің сорпасы (мұздатылған)",
      p_semi_beef_broth_desc: "Бірнеше сағат бойы қайнатылған қою сиыр етінің сорпасы. Сорпалар үшін тамаша негіз.",
      p_semi_beef_broth_ingredients: "Сиыр сүйектері, сиыр еті, тамырлар, пияз, сәбіз, дәмдеуіштер.",

      p_semi_dough_baursak_name: "Бауырсақ қамыры",
      p_semi_dough_baursak_desc: "Үлпілдек алтын бауырсақтарға арналған фирмалық ашытқы қамыры.",
      p_semi_dough_baursak_ingredients: "Жоғары сұрыпты бидай ұны, сүт, қант, ашытқы, тұз, өсімдік майы.",

      p_semi_dough_beshbarmak_name: "Бешбармақ қамыры",
      p_semi_dough_beshbarmak_desc: "Дәстүрлі қазақ бешбармағына арналған жұқа жайылған үй қамыры (жайма).",
      p_semi_dough_beshbarmak_ingredients: "Бидай ұны, үй жұмыртқасы, су, тұз.",

      p_semi_dough_puff_name: "Қатпарлы қамыр",
      p_semi_dough_puff_desc: "Сары маймен дайындалған пісірмелерге арналған әмбебап үй қатпарлы қамыры.",
      p_semi_dough_puff_ingredients: "Ұн, 82% сары май, су, лимон шырыны, тұз.",
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
