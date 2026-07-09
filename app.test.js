/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Nazcake App Unit Tests', () => {
    beforeAll(() => {
        // Load the HTML content
        document.documentElement.innerHTML = html;
        const appJsPath = path.resolve(__dirname, './app.js');
        let appJsCode = fs.readFileSync(appJsPath, 'utf8');

        // Expose variables and mock updateCartUi
        appJsCode += `
            window.addToCart = addToCart;
            window.removeFromCart = removeFromCart;
            window.getCart = () => cart;
            window.setCart = (newCart) => { cart = newCart; };
            updateCartUi = jest.fn(); // Mocking updateCartUi
            window.getUpdateCartUiMock = () => updateCartUi;
            window.adjustColorBrightness = adjustColorBrightness;
            window.setupGeolocation = setupGeolocation;
            window.updateLocationUi = updateLocationUi;
            window.getDetectedCity = () => detectedCity;
            window.setDetectedCity = (c) => { detectedCity = c; };
        `;

        eval(appJsCode);
    });

    describe('adjustColorBrightness', () => {
      it('should be defined', () => {
        expect(window.adjustColorBrightness).toBeDefined();
      });

      it('should increase brightness with positive percentage', () => {
        expect(window.adjustColorBrightness('#646464', 20)).toBe('#787878');
      });

      it('should decrease brightness with negative percentage', () => {
        expect(window.adjustColorBrightness('#646464', -20)).toBe('#505050');
      });

      it('should cap brightness at 255', () => {
        expect(window.adjustColorBrightness('#f0f0f0', 20)).toBe('#ffffff');
        expect(window.adjustColorBrightness('#ffffff', 10)).toBe('#ffffff');
      });

      it('should return the exact same color with 0 percent change', () => {
        expect(window.adjustColorBrightness('#123456', 0)).toBe('#123456');
      });

      it('should work correctly with smaller single digit hex results', () => {
        expect(window.adjustColorBrightness('#050505', 0)).toBe('#050505');
      });
    });

    describe('addToCart', () => {
        beforeEach(() => {
            window.setCart([]);
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

    describe('removeFromCart', () => {
        beforeEach(() => {
            window.setCart([
                { product: { id: 'item1', price: 100 }, qty: 1 },
                { product: { id: 'item2', price: 200 }, qty: 2 }
            ]);
            window.getUpdateCartUiMock().mockClear();
        });

        it('should remove item from cart based on id', () => {
            window.removeFromCart('item1');
            expect(window.getCart().length).toBe(1);
            expect(window.getCart()[0].product.id).toBe('item2');
            expect(window.getUpdateCartUiMock()).toHaveBeenCalledTimes(1);
        });

        it('should do nothing if item does not exist', () => {
            window.removeFromCart('nonexistent');
            expect(window.getCart().length).toBe(2);
            expect(window.getUpdateCartUiMock()).toHaveBeenCalledTimes(1);
        });
    });


    describe('Geolocation UI and Logic', () => {
        let originalFetch;

        beforeAll(() => {
            originalFetch = global.fetch;
        });

        afterAll(() => {
            global.fetch = originalFetch;
        });

        beforeEach(() => {
            // Reset DOM elements
            document.getElementById("location-widget").classList.add("hidden");
            document.getElementById("drawer-location-widget").classList.add("hidden");
            document.getElementById("location-alert-banner").classList.add("hidden");
        });

        it('should update UI correctly for Atyrau (no alert, location visible)', () => {
            window.setDetectedCity("atyrau");
            window.updateLocationUi();

            expect(document.getElementById("location-text").textContent).toBe("Атырау");
            expect(document.getElementById("location-widget").classList.contains("hidden")).toBe(false);
            expect(document.getElementById("drawer-location-widget").classList.contains("hidden")).toBe(false);
            expect(document.getElementById("location-alert-banner").classList.contains("hidden")).toBe(true);
        });

        it('should update UI correctly for other cities (alert visible, city prefixed)', () => {
            window.setDetectedCity("almaty");
            window.updateLocationUi();

            expect(document.getElementById("location-text").textContent).toBe("Ваш город: Алматы");
            expect(document.getElementById("location-widget").classList.contains("hidden")).toBe(false);
            expect(document.getElementById("location-alert-banner").classList.contains("hidden")).toBe(false);
        });

        it('should call fetch and set city on successful API response', async () => {
            global.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ city: "Astana" }),
                })
            );

            await window.setupGeolocation();

            expect(global.fetch).toHaveBeenCalledWith("https://ipapi.co/json/");
            expect(window.getDetectedCity()).toBe("astana");
            expect(document.getElementById("location-text").textContent).toBe("Ваш город: Астана");
        });

        it('should fallback to Atyrau on failed API response', async () => {
            global.fetch = jest.fn().mockImplementation(() =>
                Promise.reject("Network error")
            );

            await window.setupGeolocation();

            expect(window.getDetectedCity()).toBe("atyrau");
            expect(document.getElementById("location-text").textContent).toBe("Атырау");
        });
    });

});
