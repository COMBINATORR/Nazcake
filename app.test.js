/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('addToCart', () => {
    beforeAll(() => {
        // Load the HTML content
        document.documentElement.innerHTML = html;
        const appJs = fs.readFileSync(path.resolve(__dirname, './app.js'), 'utf8');

        // Execute app.js and expose necessary variables and functions to window
        const scriptCode = `
            ${appJs}
            window.addToCart = addToCart;
            window.getCart = () => cart;
            window.resetCart = () => { cart = []; };
        `;

        const script = document.createElement('script');
        script.textContent = scriptCode;
        document.body.appendChild(script);
    });

    beforeEach(() => {
        // Reset the cart state before each test
        window.resetCart();
    });

    it('should add a new product to the cart', () => {
        const initialCartSize = window.getCart().length;

        // Add 2 units of a valid product
        window.addToCart('bread_burger', 2);

        const newCart = window.getCart();
        expect(newCart.length).toBe(initialCartSize + 1);
        expect(newCart[newCart.length - 1].product.id).toBe('bread_burger');
        expect(newCart[newCart.length - 1].qty).toBe(2);
    });

    it('should increase quantity if product is already in cart', () => {
        // Add initially
        window.addToCart('bread_baursaki', 1);
        const cartAfterFirstAdd = window.getCart();
        expect(cartAfterFirstAdd.length).toBe(1);
        expect(cartAfterFirstAdd[0].qty).toBe(1);

        // Add again
        window.addToCart('bread_baursaki', 3);
        const cartAfterSecondAdd = window.getCart();
        expect(cartAfterSecondAdd.length).toBe(1); // Length should not change, product already exists
        expect(cartAfterSecondAdd[0].qty).toBe(4); // Quantity should correctly increase
    });

    it('should not add to cart if product id is invalid', () => {
        const initialCartSize = window.getCart().length;

        // Try adding invalid product id
        window.addToCart('invalid_product_id', 1);

        const newCart = window.getCart();
        expect(newCart.length).toBe(initialCartSize); // No new item should be added
    });
});
