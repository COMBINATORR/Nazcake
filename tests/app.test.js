/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Read the actual JS file
const appJsCode = fs.readFileSync(path.resolve(__dirname, '../app.js'), 'utf8');

describe('App Functions', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="bestsellers-grid"></div>
      <div id="catalog-grid"></div>
      <button class="tab-btn" data-category="all"></button>
      <div id="preview-modal"></div>
      <button id="close-preview-btn"></button>
      <img id="modal-product-img" />
      <h2 id="modal-product-title"></h2>
      <span id="modal-product-price"></span>
      <p id="modal-product-desc"></p>
      <p id="modal-product-ingredients"></p>
      <span id="modal-qty-val">1</span>
      <button id="modal-minus-btn"></button>
      <button id="modal-plus-btn"></button>
      <button id="modal-add-btn"></button>
      <div id="cart-sidebar"></div>
      <div id="cart-overlay"></div>
      <button id="open-cart-btn"></button>
      <button id="close-cart-btn"></button>
      <div id="cart-items-container"></div>
      <span id="cart-total-sum"></span>
      <span class="cart-count"></span>
      <div id="mobile-drawer"></div>
      <div id="drawer-overlay"></div>
      <button id="mobile-menu-btn"></button>
      <button id="close-drawer-btn"></button>
      <form id="checkout-form">
        <input type="radio" name="delivery-method" value="pickup" checked />
        <input type="radio" name="delivery-method" value="delivery" />
        <div id="checkout-address-group" class="hidden"></div>
        <input type="text" id="checkout-address" />
        <input type="text" id="checkout-name" />
        <input type="text" id="checkout-phone" />
        <button id="checkout-submit-btn">Оформить заказ в Telegram</button>
      </form>
      <div id="success-modal"></div>
      <button id="close-success-btn"></button>

      <text id="cake-text-element"></text>
      <input id="bento-text" />
      <div id="base-color-options"></div>
      <div id="text-color-options"></div>
      <select id="sprinkles-select"></select>
      <button id="add-bento-btn"></button>
      <div id="cake-top"></div>
      <div id="cake-side"></div>
      <g id="sprinkles-group"></g>

      <button id="calc-delivery-btn"></button>
      <input id="delivery-address" />
      <div id="calc-results-box"></div>
      <div id="calc-error-box"></div>
      <span id="result-distance"></span>
      <span id="result-cost"></span>
      <span id="result-time"></span>
    `;
  });

  it('tests adjustColorBrightness', () => {
    const codeWithExports = appJsCode + `
      window.adjustColorBrightness = adjustColorBrightness;
    `;
    eval(codeWithExports);

    expect(window.adjustColorBrightness('#ff0000', 10)).toBe('#ff0000');
    expect(window.adjustColorBrightness('#646464', 10)).toBe('#6e6e6e');
  });

  it('tests cart operations', () => {
    const codeWithExports = appJsCode + `
      window.addToCart = addToCart;
      window.removeFromCart = removeFromCart;
      window.changeCartItemQty = changeCartItemQty;
      window.getCart = () => cart;
      window.clearCart = () => { cart = []; };
    `;
    eval(codeWithExports);

    // Reset cart
    window.clearCart();

    // add an item
    window.addToCart("bread_burger", 2);
    expect(window.getCart().length).toBe(1);
    expect(window.getCart()[0].qty).toBe(2);
    expect(window.getCart()[0].product.id).toBe("bread_burger");

    // add same item again
    window.addToCart("bread_burger", 3);
    expect(window.getCart().length).toBe(1);
    expect(window.getCart()[0].qty).toBe(5);

    // change qty
    window.changeCartItemQty("bread_burger", 10);
    expect(window.getCart()[0].qty).toBe(10);

    // change qty to 0 (should remove)
    window.changeCartItemQty("bread_burger", 0);
    expect(window.getCart().length).toBe(0);

    // add back and remove
    window.addToCart("bread_burger", 1);
    expect(window.getCart().length).toBe(1);
    window.removeFromCart("bread_burger");
    expect(window.getCart().length).toBe(0);
  });

  it('tests Haversine Distance (nested functions)', () => {
    // Extract nested functions for testing
    const codeWithExports = appJsCode + `
      // We need to extract the logic to test it directly
      // Since it's nested inside setupDeliveryCalculator, we can extract using regex

      const haversineMatch = appJsCode.match(/function getHaversineDistance\\(.*?\\)[\\s\\S]*?return R \\* c; \\/\\/ Distance in km\\s*}/);
      const deg2radMatch = appJsCode.match(/function deg2rad\\(.*?\\)[\\s\\S]*?return deg \\* \\(Math\\.PI \\/ 180\\);\\s*}/);

      if (haversineMatch && deg2radMatch) {
        eval(deg2radMatch[0]);
        eval(haversineMatch[0]);
        window.getHaversineDistance = getHaversineDistance;
      }
    `;
    eval(codeWithExports);

    // London to Paris: ~344 km
    // Lat/Lon London: 51.5074, -0.1278
    // Lat/Lon Paris: 48.8566, 2.3522
    const dist = window.getHaversineDistance(51.5074, -0.1278, 48.8566, 2.3522);
    expect(dist).toBeGreaterThan(340);
    expect(dist).toBeLessThan(350);
  });
});
