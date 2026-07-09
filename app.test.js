describe('addToCart', () => {
  let app;

  beforeAll(() => {
    document.body.innerHTML = `
      <div id="bestsellers-grid"></div>
      <div id="catalog-grid"></div>
      <div id="preview-modal"></div>
      <button id="close-preview-btn"></button>
      <img id="modal-product-img" />
      <div id="modal-product-title"></div>
      <div id="modal-product-price"></div>
      <div id="modal-product-desc"></div>
      <div id="modal-product-ingredients"></div>
      <div id="modal-qty-val"></div>
      <button id="modal-minus-btn"></button>
      <button id="modal-plus-btn"></button>
      <button id="modal-add-btn"></button>
      <div id="cart-sidebar"></div>
      <div id="cart-overlay"></div>
      <button id="open-cart-btn"></button>
      <button id="close-cart-btn"></button>
      <div id="cart-items-container"></div>
      <div id="cart-total-sum"></div>
      <div id="bento-base-color"></div>
      <div id="bento-cream-color"></div>
      <div id="bento-text"></div>
      <div id="bento-text-color"></div>
      <div id="bento-border-style"></div>
      <div id="delivery-calc-btn"></div>
      <div id="delivery-address"></div>
      <div id="delivery-result"></div>
      <div id="checkout-address-group"></div>
      <form id="checkout-form">
        <input id="checkout-name" />
        <input id="checkout-phone" />
        <select id="checkout-delivery"></select>
        <input id="checkout-address" />
        <input id="checkout-comment" />
        <button id="checkout-submit-btn"></button>
      </form>
      <div id="success-modal"></div>
      <button id="close-success-btn"></button>
      <button class="tab-btn" data-category="all"></button>
      <span class="cart-count-badge"></span>
    `;
    app = require('./app.js');
  });

  beforeEach(() => {
    // Reset the cart before each test
    app.setCart([]);
  });

  it('adds a new product to the cart', () => {
    const productId = app.products[0].id;
    app.addToCart(productId, 2);

    const cart = app.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].product.id).toBe(productId);
    expect(cart[0].qty).toBe(2);
  });

  it('increases quantity if product already exists in cart', () => {
    const productId = app.products[0].id;

    app.addToCart(productId, 2);
    app.addToCart(productId, 3);

    const cart = app.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].product.id).toBe(productId);
    expect(cart[0].qty).toBe(5);
  });

  it('does nothing if product is not found', () => {
    app.addToCart('non_existent_product', 1);

    const cart = app.getCart();
    expect(cart.length).toBe(0);
  });

  it('updates the UI after adding to cart', () => {
    const originalUpdateCartUi = app.updateCartUi;
    let uiUpdated = false;

    // We can't mock it directly on `app` because the function inside app.js calls the local updateCartUi,
    // but we can check if DOM was updated.
    const cartItemsContainer = document.getElementById('cart-items-container');
    const productId = app.products[0].id;

    app.addToCart(productId, 1);

    // The `updateCartUi` function renders the cart items in `cartItemsContainer`
    expect(cartItemsContainer.innerHTML).toContain(app.products[0].name);
  });
});
