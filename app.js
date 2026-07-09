// Confectionery Nazcake App Logic

// Product Catalog Data
const products = [
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
    ingredients: "Мука пшеничная высшего сорта, очищенный белый кунжут, молоко пастеризованное, яйца куриные, сливочное масло 82%, сахар, сухие дрожжи, соль.",
    badge: "свежее"
  },
  {
    id: "bread_baursaki",
    name: "Бауырсаки домашние",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 1500,
    unit: "кг",
    image: "images/bread_baursaki.jpg",
    desc: "Традиционные золотистые бауырсаки. Нежные внутри и хрустящие снаружи. Готовятся непосредственно перед доставкой.",
    ingredients: "Пшеничная мука премиум, натуральное молоко, домашние дрожжи, сахар, соль, качественное подсолнечное масло для фритюра.",
    badge: "бестселлер"
  },
  {
    id: "bread_kosichki",
    name: "Булочки Косички",
    category: "bakery",
    categoryLabel: "Хлебобулочные изделия",
    price: 120,
    unit: "шт.",
    image: "images/bread_kosichki.jpg",
    desc: "Ароматная плетеная сдобная косичка с легким сахарным сиропом и румяной корочкой. Идеально к горячему чаю.",
    ingredients: "Дрожжевое сдобное тесто, молоко, сливочное масло, сахарный сироп, кунжутная обсыпка.",
    badge: ""
  },

  // Выпечка (pastries)
  {
    id: "pastry_samsa_meat",
    name: "Самса с говядиной",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 240,
    unit: "шт.",
    image: "images/pastry_samsa_meat.jpg",
    desc: "Хрустящая слоеная самса с начинкой из сочной рубленой говядины и восточными специями.",
    ingredients: "Домашнее слоеное тесто на сливочном масле, отборная рубленая говядина, репчатый лук, черный перец, зира, кунжут.",
    badge: "горячее"
  },
  {
    id: "pastry_samsa_chicken",
    name: "Самса с курицей и сыром",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 250,
    unit: "шт.",
    image: "images/pastry_samsa_chicken.jpg",
    desc: "Нежная самса с начинкой из сочного куриного филе и тянущегося сыра сулугуни.",
    ingredients: "Слоеное тесто, филе куриной грудки, сыр сулугуни, лук, сливочный соус, специи.",
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
    desc: "Рассыпчатые домашние рогатки из песочного теста с нежной начинкой из натурального творога.",
    ingredients: "Мука пшеничная, натуральное сливочное масло, домашний творог 9%, сахар, ванильный экстракт, сахарная пудра.",
    badge: "хит"
  },
  {
    id: "pastry_sochnik",
    name: "Сочник с творогом",
    category: "pastries",
    categoryLabel: "Выпечка",
    price: 190,
    unit: "шт.",
    image: "images/pastry_sochnik.jpg",
    desc: "Классический сочник с золотистой корочкой и обилием творожной начинки. Вкус родом из детства.",
    ingredients: "Сдобно-песочное тесто, домашний творог, сахар, ванилин, яичный желток для глазури.",
    badge: ""
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
    category: "pies",
    categoryLabel: "Пироги",
    price: 11000,
    unit: "шт.",
    image: "images/pie_meat_large.jpg",
    desc: "Сытный праздничный пирог внушительного размера (45х30 см) с сочным фаршем из рубленой говядины.",
    ingredients: "Сдобное тесто, охлажденная говядина (фарш), репчатый лук, натуральное сливочное масло, бульон, перец, специи.",
    badge: "заказной"
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
    category: "desserts",
    categoryLabel: "Пирожные",
    price: 360,
    unit: "шт.",
    image: "images/dessert_cupcake_red.jpg",
    desc: "Яркий капкейк с влажным пористым бисквитом, скрытым ягодным центром и пышной шапочкой нежного сырного крема.",
    ingredients: "Кефирный бисквит «Красный бархат», малиновое конфи, сливочный крем-чиз (творожный сыр, сливки, пудра).",
    badge: "новое"
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

// Shopping Cart State
let cart = [];

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

// Init App
document.addEventListener("DOMContentLoaded", () => {
  renderBestsellers();
  renderCatalog("all");
  setupEventListeners();
  setupBentoCustomizer();
  setupDeliveryCalculator();
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
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrapper btn-preview">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${p.categoryLabel}</span>
        <h3 class="product-name btn-preview">${p.name}</h3>
        <div class="product-footer">
          <span class="product-price">${p.price.toLocaleString()} ₸ / ${p.unit}</span>
        </div>
        <div class="stepper-and-btn">
          <div class="quantity-stepper">
            <button class="stepper-btn minus-qty" aria-label="Уменьшить">−</button>
            <span class="quantity-val qty-number">1</span>
            <button class="stepper-btn plus-qty" aria-label="Увеличить">+</button>
          </div>
          <button class="btn btn-primary btn-gradient w-100 btn-add-to-cart">Купить</button>
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

  // Quantity Stepper logic
  gridElement.querySelectorAll(".product-card").forEach(card => {
    const minusBtn = card.querySelector(".minus-qty");
    const plusBtn = card.querySelector(".plus-qty");
    const qtySpan = card.querySelector(".qty-number");
    const addBtn = card.querySelector(".btn-add-to-cart");
    const id = card.getAttribute("data-id");

    minusBtn.addEventListener("click", () => {
      let qty = parseInt(qtySpan.textContent);
      if (qty > 1) {
        qty--;
        qtySpan.textContent = qty;
      }
    });

    plusBtn.addEventListener("click", () => {
      let qty = parseInt(qtySpan.textContent);
      qty++;
      qtySpan.textContent = qty;
    });

    addBtn.addEventListener("click", () => {
      const qty = parseInt(qtySpan.textContent);
      addToCart(id, qty);
      qtySpan.textContent = 1; // Reset to 1 after adding
      
      // Visual feedback on button click
      const originalText = addBtn.textContent;
      addBtn.textContent = "Добавлено ✓";
      addBtn.style.transform = "scale(0.95)";
      setTimeout(() => {
        addBtn.textContent = originalText;
        addBtn.style.transform = "";
      }, 1000);
    });
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
  mobileMenuBtn.addEventListener("click", () => {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
  });

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
  };

  closeDrawerBtn.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);
  drawerLinks.forEach(link => link.addEventListener("click", closeDrawer));

  // Cart Sidebar toggles
  openCartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");
  });

  const closeCart = () => {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("open");
  };

  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Close Preview Modal
  const closePreview = () => {
    previewModal.classList.remove("open");
  };
  closePreviewBtn.addEventListener("click", closePreview);
  previewModal.addEventListener("click", (e) => {
    if (e.target === previewModal) closePreview();
  });

  // Success modal close
  closeSuccessBtn.addEventListener("click", () => {
    successModal.classList.remove("open");
  });

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
  checkoutForm.addEventListener("submit", handleCheckoutSubmit);
}

// Open Product Preview Modal
let activePreviewProductId = null;
function openProductPreview(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  activePreviewProductId = id;
  modalProductImg.src = p.image;
  modalProductImg.alt = p.name;
  modalProductTitle.textContent = p.name;
  modalProductPrice.textContent = `${p.price.toLocaleString()} ₸ / ${p.unit}`;
  modalProductDesc.textContent = p.desc;
  modalProductIngredients.textContent = p.ingredients;
  
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
    previewModal.classList.remove("open");
    
    // Open cart automatically to show it
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");
  };

  previewModal.classList.add("open");
}

// Add Item to Cart
function addToCart(id, qty) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const existing = cart.find(item => item.product.id === id);
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

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="empty-cart-message">Ваша корзина пока пуста. Добавьте вкусняшек!</div>`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => {
    const p = item.product;
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h5 class="cart-item-name">${p.name}</h5>
          <span class="cart-item-price">${(p.price * item.qty).toLocaleString()} ₸</span>
          <div class="cart-item-actions">
            <div class="quantity-stepper">
              <button class="stepper-btn minus-cart-qty" data-id="${p.id}">−</button>
              <span class="quantity-val">${item.qty}</span>
              <button class="stepper-btn plus-cart-qty" data-id="${p.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${p.id}">Удалить</button>
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

  setupBaseColorSelection(baseColorOptions, cakeTop, cakeSide, bentoConfig);
  setupTextColorSelection(textColorOptions, cakeTextElement, bentoConfig);
  setupInscriptionTextEdit(bentoTextInput, cakeTextElement, bentoConfig);
  setupSprinklesChange(sprinklesSelect, sprinklesGroup, bentoConfig);
  setupAddBentoToCart(addBentoBtn, bentoConfig);
}

function setupBaseColorSelection(baseColorOptions, cakeTop, cakeSide, bentoConfig) {
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

function setupTextColorSelection(textColorOptions, cakeTextElement, bentoConfig) {
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

function setupInscriptionTextEdit(bentoTextInput, cakeTextElement, bentoConfig) {
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

function setupSprinklesChange(sprinklesSelect, sprinklesGroup, bentoConfig) {
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

function setupAddBentoToCart(addBentoBtn, bentoConfig) {
  addBentoBtn.addEventListener("click", () => {
    // Generate a unique id
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
      ingredients: "Классический ванильный бисквит, клубничный конфитюр, нежный сырно-сливочный крем."
    };

    addToCart(customizedBentoProduct, 1);
    
    // Show feedback
    const originalText = addBentoBtn.textContent;
    addBentoBtn.textContent = "Шедевр в корзине! ✓";
    addBentoBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      addBentoBtn.textContent = originalText;
      addBentoBtn.style.transform = "";
    }, 1200);

    // Open cart sidebar
    setTimeout(() => {
      cartSidebar.classList.add("open");
      cartOverlay.classList.add("open");
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

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const rHex = R.toString(16).padStart(2, '0');
  const gHex = G.toString(16).padStart(2, '0');
  const bHex = B.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

// Setup Yandex.Delivery Address Price Calculator
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
      showError("Пожалуйста, введите адрес доставки в Атырау.");
      return;
    }

    calcBtn.disabled = true;
    calcBtn.textContent = "Выполняется расчет...";
    hideError();
    resultsBox.classList.add("hidden");

    try {
      // Nominatim search query restricted to Atyrau
      const url = `https://nominatim.openstreetmap.org/search?q=Атырау, ${encodeURIComponent(address)}&format=json&limit=1`;
      
      const response = await fetch(url, {
        headers: {
          "User-Agent": "NazcakeConfectioneryDeliveryCalculator/1.0 (contact: info@nazcake.kz)"
        }
      });

      if (!response.ok) {
        throw new Error("Не удалось подключиться к серверу геокодирования.");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("Адрес не найден. Пожалуйста, проверьте правильность написания (например: Сатпаева 15).");
      }

      const location = data[0];
      const lat = parseFloat(location.lat);
      const lon = parseFloat(location.lon);

      // Verify that coordinates belong to Atyrau city
      if (lat < atyrauBounds.minLat || lat > atyrauBounds.maxLat || lon < atyrauBounds.minLon || lon > atyrauBounds.maxLon) {
        throw new Error("Яндекс.Доставка (Экспресс) доступна только в пределах города Атырау.");
      }

      // Calculate distance using Haversine formula
      const distance = getHaversineDistance(bakeryLat, bakeryLon, lat, lon);
      
      // Calculate price
      // Base: 500 ₸ + 150 ₸ / km. Rounded to nearest 50 ₸. Min 500 ₸.
      let cost = 500 + Math.round(distance * 150);
      cost = Math.ceil(cost / 50) * 50; // round to nearest 50
      if (cost < 500) cost = 500;
      if (cost > 3500) cost = 3500; // max cost cap within city

      // Format results
      resDistance.textContent = `${distance.toFixed(1)} км`;
      resCost.textContent = `${cost.toLocaleString()} ₸`;
      
      // Estimated time: distance * 4 min/km + 15 min prep/pickup time
      const estTime = Math.round(distance * 4) + 20;
      resTime.textContent = `~${estTime} минут`;

      resultsBox.classList.remove("hidden");
      
      // Fill the checkout address field if it's open
      const checkoutAddressField = document.getElementById("checkout-address");
      if (checkoutAddressField) {
        checkoutAddressField.value = address;
      }

    } catch (err) {
      showError(err.message || "Ошибка при расчете стоимости доставки.");
    } finally {
      calcBtn.disabled = false;
      calcBtn.textContent = "Рассчитать доставку";
    }
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove("hidden");
    resultsBox.classList.add("hidden");
  }

  function hideError() {
    errorBox.textContent = "";
    errorBox.classList.add("hidden");
  }

  // Haversine Distance Calculation Formula
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
}

// Handle Order Checkout Submission & Send to Telegram
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("checkout-name").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const method = document.querySelector('input[name="delivery-method"]:checked').value;
  const address = document.getElementById("checkout-address").value.trim();

  if (cart.length === 0) {
    alert("Ваша корзина пуста. Невозможно отправить заказ!");
    return;
  }

  const submitBtn = document.getElementById("checkout-submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Отправка заказа...";

  // Calculate total
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  
  // Format HTML message for Telegram
  let message = `<b>🍰 Новый заказ от Nazcake!</b>\n\n`;
  message += `👤 <b>Клиент:</b> ${name}\n`;
  message += `📞 <b>Телефон:</b> ${phone}\n`;
  message += `📦 <b>Способ получения:</b> ${method === "delivery" ? "Доставка Яндекс" : "Самовывоз"}\n`;
  if (method === "delivery") {
    message += `📍 <b>Адрес:</b> ${address}\n`;
  }
  message += `\n🛒 <b>Товары:</b>\n`;

  cart.forEach((item, idx) => {
    message += `${idx + 1}. <b>${item.product.name}</b> — ${item.qty} шт. (${(item.product.price * item.qty).toLocaleString()} ₸)\n`;
    if (item.product.id.startsWith("bento_custom_")) {
      message += `   <i>Детали: ${item.product.desc}</i>\n`;
    }
  });

  message += `\n💵 <b>Итоговая сумма:</b> ${subtotal.toLocaleString()} ₸`;

  // Telegram configuration placeholders (users should insert their real Bot Token and Chat ID)
  const botToken = "YOUR_TELEGRAM_BOT_TOKEN";
  const chatId = "YOUR_TELEGRAM_CHAT_ID";

  // Check if they are placeholder values
  if (botToken === "YOUR_TELEGRAM_BOT_TOKEN" || chatId === "YOUR_TELEGRAM_CHAT_ID") {
    console.log("Telegram configuration is not completed yet. Order Details:");
    console.log(message);
    
    // Simulate API delay and succeed
    setTimeout(() => {
      orderSucceeded();
    }, 1000);
  } else {
    // Send to Telegram Bot API
    try {
      const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(tgUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML"
        })
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить сообщение в Telegram.");
      }

      orderSucceeded();
    } catch (err) {
      console.error(err);
      alert("Заказ оформлен локально, но произошла ошибка отправки в Telegram: " + err.message);
      orderSucceeded();
    }
  }
}

// Actions to perform on successful checkout
function orderSucceeded() {
  // Clear cart
  cart = [];
  updateCartUi();

  // Close Cart Sidebar
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
  
  // Clear checkout form fields
  checkoutForm.reset();
  checkoutAddressGroup.classList.add("hidden");
  document.getElementById("checkout-address").removeAttribute("required");

  // Show Success Modal
  successModal.classList.add("open");

  // Re-enable submit button
  const submitBtn = document.getElementById("checkout-submit-btn");
  submitBtn.disabled = false;
  submitBtn.textContent = "Оформить заказ в Telegram";
}
