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
      p_dessert_cupcake_berry_name: "Капкейк Ягодный микс",
      p_dessert_cupcake_berry_desc: "Нежный ванильный капкейк с начинкой из свежих ягод и легкой шапочкой из сливочного крема.",
      p_dessert_cupcake_berry_ingredients: "Мука пшеничная, яйца, сахар, клубника, черника, сливочный крем.",
      p_cake_custom_celebration_name: "Праздничный торт (на заказ)",
      p_cake_custom_celebration_desc: "Эксклюзивный праздничный торт для вашего торжества. Дизайн и начинка обсуждаются индивидуально.",
      p_cake_custom_celebration_ingredients: "Начинка на выбор, премиальный декор.",

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
      p_dessert_cupcake_berry_name: "Жидек қосылған капкейк",
      p_dessert_cupcake_berry_desc: "Балғын жидектер салмасы бар және кілегейлі кремнен жасалған жеңіл қалпақшасы бар нәзік ванильді капкейк.",
      p_dessert_cupcake_berry_ingredients: "Бидай ұны, жұмыртқа, қант, құлпынай, көкжидек, кілегейлі крем.",
      p_cake_custom_celebration_name: "Мерекелік торт (тапсырыспен)",
      p_cake_custom_celebration_desc: "Сіздің салтанатыңызға арналған эксклюзивті мерекелік торт. Дизайны мен салмасы жеке талқыланады.",
      p_cake_custom_celebration_ingredients: "Таңдау бойынша салмасы, премиум декор.",

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
