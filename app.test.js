/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load app.js using eval to get access to its variables since it's not exported
const appJsPath = path.join(__dirname, 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf8');

// We need to mock DOM elements because app.js accesses them on load
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
  <form id="checkout-form"></form>
  <div id="checkout-address-group"></div>
  <div id="success-modal"></div>
  <button id="close-success-btn"></button>
  <div class="cart-count"></div>
`;

// Expose variables for testing and mock updateCartUi
appJsCode += `
  window.removeFromCart = removeFromCart;
  window.getCart = () => cart;
  window.setCart = (newCart) => { cart = newCart; };
  updateCartUi = jest.fn(); // Mocking updateCartUi
  window.getUpdateCartUiMock = () => updateCartUi;
`;

eval(appJsCode);

describe('removeFromCart', () => {
  beforeEach(() => {
    // Reset cart state before each test
    window.setCart([
      { product: { id: 'item1', price: 100 }, qty: 1 },
      { product: { id: 'item2', price: 200 }, qty: 2 }
    ]);
    window.getUpdateCartUiMock().mockClear();
  });

  test('should remove item from cart based on id', () => {
    window.removeFromCart('item1');
    expect(window.getCart().length).toBe(1);
    expect(window.getCart()[0].product.id).toBe('item2');
    expect(window.getUpdateCartUiMock()).toHaveBeenCalledTimes(1);
  });

  test('should do nothing if item does not exist', () => {
    window.removeFromCart('nonexistent');
    expect(window.getCart().length).toBe(2);
    expect(window.getUpdateCartUiMock()).toHaveBeenCalledTimes(1);
  });
});
