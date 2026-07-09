/**
 * @jest-environment jsdom
 */

describe('Nazcake App Unit Tests', () => {
  let app;

  beforeAll(() => {
    document.body.innerHTML = `
      <div id="bestsellers-grid"></div>
      <div id="catalog-grid"></div>
      <div id="preview-modal"></div>
      <button id="close-preview-btn"></button>
      <img id="modal-product-img" />
      <h2 id="modal-product-title"></h2>
      <div id="modal-product-price"></div>
      <p id="modal-product-desc"></p>
      <p id="modal-product-ingredients"></p>
      <span id="modal-qty-val"></span>
      <button id="modal-minus-btn"></button>
      <button id="modal-plus-btn"></button>
      <button id="modal-add-btn"></button>
      <div id="cart-sidebar"></div>
      <div id="cart-overlay"></div>
      <button id="open-cart-btn"></button>
      <button id="close-cart-btn"></button>
      <div id="cart-items-container"></div>
      <div id="cart-total-sum"></div>
      <div id="mobile-drawer"></div>
      <div id="drawer-overlay"></div>
      <button id="mobile-menu-btn"></button>
      <button id="close-drawer-btn"></button>
      <form id="checkout-form">
        <input id="checkout-name" />
        <input id="checkout-phone" />
        <input id="checkout-address" />
        <button id="checkout-submit-btn"></button>
      </form>
      <div id="checkout-address-group"></div>
      <div id="success-modal"></div>
      <button id="close-success-btn"></button>
      <span class="cart-count-badge"></span>
    `;
    app = require('./app.js');
  });

  describe('addToCart', () => {
    beforeEach(() => {
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
      const cartItemsContainer = document.getElementById('cart-items-container');
      const productId = app.products[0].id;

      app.addToCart(productId, 1);

      expect(cartItemsContainer.innerHTML).toContain(app.products[0].name);
    });
  });

  describe('removeFromCart', () => {
    beforeEach(() => {
      app.setCart([
        { product: { id: 'item1', price: 100 }, qty: 1 },
        { product: { id: 'item2', price: 200 }, qty: 2 }
      ]);
    });

    it('should remove item from cart based on id', () => {
      app.removeFromCart('item1');
      expect(app.getCart().length).toBe(1);
      expect(app.getCart()[0].product.id).toBe('item2');
    });

    it('should do nothing if item does not exist', () => {
      app.removeFromCart('nonexistent');
      expect(app.getCart().length).toBe(2);
    });
  });
});
