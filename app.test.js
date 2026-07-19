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
            window.escapeHTML = escapeHTML;
            window.setupGeolocation = setupGeolocation;
            window.updateLocationUi = updateLocationUi;
            window.getDetectedCity = () => detectedCity;
            window.setDetectedCity = (c) => { detectedCity = c; };
            window.calculateImageDimensions = calculateImageDimensions;
window.calculateDeliveryCost = calculateDeliveryCost;

window.getHaversineDistance = getHaversineDistance;
            window.deg2rad = deg2rad;

window.checkAtyrauBounds = checkAtyrauBounds;
            window.normalizeStockValue = normalizeStockValue;
            window.isProductOutOfStock = isProductOutOfStock;
            window.exceedsProductStock = exceedsProductStock;
            window.applyLocalProductOverrides = applyLocalProductOverrides;
            window.persistLocalProductOverrides = persistLocalProductOverrides;
            window.normalizeProductBadge = normalizeProductBadge;
            window.getProducts = () => products;
            window.setProducts = (p) => { products = p; };
        `;

        eval(appJsCode);
    });


    describe('normalizeProductBadge', () => {
      it('should return empty string for null, undefined, or empty string', () => {
        expect(window.normalizeProductBadge(null)).toBe('');
        expect(window.normalizeProductBadge(undefined)).toBe('');
        expect(window.normalizeProductBadge('')).toBe('');
      });

      it('should return empty string for fresh badges (case-insensitive with trimming)', () => {
        expect(window.normalizeProductBadge('свежее')).toBe('');
        expect(window.normalizeProductBadge(' балғын ')).toBe('');
        expect(window.normalizeProductBadge('СВЕЖИЙ')).toBe('');
        expect(window.normalizeProductBadge(' fresh ')).toBe('');
      });

      it('should return trimmed badge string for other inputs', () => {
        expect(window.normalizeProductBadge('  хит продаж ')).toBe('хит продаж');
        expect(window.normalizeProductBadge('new')).toBe('new');
        expect(window.normalizeProductBadge(' 123 ')).toBe('123');
      });
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

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining("https://get.geojs.io/v1/ip/geo.json"),
                expect.any(Object)
            );
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


describe('calculateDeliveryCost', () => {
        it('should return minimum cost of 500', () => {
            expect(window.calculateDeliveryCost(0)).toBe(500);
        });

        it('should round up to the nearest 50', () => {
            // 500 + Math.round(2 * 150) = 800
            expect(window.calculateDeliveryCost(2)).toBe(800);
            // 500 + Math.round(2.1 * 150) = 500 + 315 = 815 -> ceil(815/50)*50 = 850
            expect(window.calculateDeliveryCost(2.1)).toBe(850);
        });

        it('should cap the maximum cost at 3500', () => {
            expect(window.calculateDeliveryCost(20)).toBe(3500);
            expect(window.calculateDeliveryCost(50)).toBe(3500);
        });
  });

describe('Distance Calculator (Haversine)', () => {
        describe('deg2rad', () => {
            it('should be defined', () => {
                expect(window.deg2rad).toBeDefined();
            });

            it('should convert 0 degrees to 0 radians', () => {
                expect(window.deg2rad(0)).toBe(0);
            });

            it('should convert 90 degrees to PI/2 radians', () => {
                expect(window.deg2rad(90)).toBeCloseTo(Math.PI / 2);
            });

            it('should convert 180 degrees to PI radians', () => {
                expect(window.deg2rad(180)).toBeCloseTo(Math.PI);
            });

            it('should convert 360 degrees to 2*PI radians', () => {
                expect(window.deg2rad(360)).toBeCloseTo(2 * Math.PI);
            });

            it('should handle negative degrees correctly', () => {
                expect(window.deg2rad(-90)).toBeCloseTo(-Math.PI / 2);
            });
        });

        describe('getHaversineDistance', () => {
            it('should be defined', () => {
                expect(window.getHaversineDistance).toBeDefined();
            });

            it('should return 0 when coordinates are exactly the same', () => {
                expect(window.getHaversineDistance(0, 0, 0, 0)).toBe(0);
                expect(window.getHaversineDistance(45.5, -122.6, 45.5, -122.6)).toBe(0);
            });

            it('should calculate distance across longitude (0,0 to 0,1)', () => {
                // Circumference is ~40075 km, so 1 degree longitude at equator is ~111.32 km
                // Using 6371 radius, 1 degree is ~111.19 km
                expect(window.getHaversineDistance(0, 0, 0, 1)).toBeCloseTo(111.195, 2);
            });

            it('should calculate a real-world distance (New York to London)', () => {
                const nyLat = 40.7128;
                const nyLon = -74.0060;
                const lonLat = 51.5074;
                const lonLon = -0.1278;

                // Approximate distance is ~5570 km
                const distance = window.getHaversineDistance(nyLat, nyLon, lonLat, lonLon);
                expect(distance).toBeGreaterThan(5500);
                expect(distance).toBeLessThan(5600);
            });

            it('should have commutative property (distance A->B equals B->A)', () => {
                const nyLat = 40.7128, nyLon = -74.0060;
                const lonLat = 51.5074, lonLon = -0.1278;

                const distAB = window.getHaversineDistance(nyLat, nyLon, lonLat, lonLon);
                const distBA = window.getHaversineDistance(lonLat, lonLon, nyLat, nyLon);

                expect(distAB).toBe(distBA);
            });

            it('should handle negative coordinates correctly', () => {
                // Sydney (33.8688┬░ S, 151.2093┬░ E) to Cape Town (33.9249┬░ S, 18.4241┬░ E)
                const sydLat = -33.8688, sydLon = 151.2093;
                const ctLat = -33.9249, ctLon = 18.4241;

                const distance = window.getHaversineDistance(sydLat, sydLon, ctLat, ctLon);
                expect(distance).toBeGreaterThan(0);

                // Opposite sides of globe
                expect(window.getHaversineDistance(0, -90, 0, 90)).toBeCloseTo(20015.08, 1);
            });
  });
  });

describe('checkAtyrauBounds', () => {
        const bounds = {
            minLat: 46.9,
            maxLat: 47.2,
            minLon: 51.7,
            maxLon: 52.1
        };

        it('should be defined', () => {
            expect(window.checkAtyrauBounds).toBeDefined();
        });

        it('should not throw an error when coordinates are within bounds', () => {
            expect(() => window.checkAtyrauBounds(47.0, 51.9, bounds)).not.toThrow();
            expect(() => window.checkAtyrauBounds(46.9, 51.7, bounds)).not.toThrow();
            expect(() => window.checkAtyrauBounds(47.2, 52.1, bounds)).not.toThrow();
        });

        it('should throw an error when latitude is too small', () => {
            expect(() => window.checkAtyrauBounds(46.8, 51.9, bounds)).toThrow("delivery_err_outofbounds");
        });

        it('should throw an error when latitude is too large', () => {
            expect(() => window.checkAtyrauBounds(47.3, 51.9, bounds)).toThrow("delivery_err_outofbounds");
        });

        it('should throw an error when longitude is too small', () => {
            expect(() => window.checkAtyrauBounds(47.0, 51.6, bounds)).toThrow("delivery_err_outofbounds");
        });

        it('should throw an error when longitude is too large', () => {
            expect(() => window.checkAtyrauBounds(47.0, 52.2, bounds)).toThrow("delivery_err_outofbounds");
        });
    });

describe('escapeHTML', () => {
      it('should be defined', () => {
        expect(window.escapeHTML).toBeDefined();
      });

      it('should return empty string for non-string inputs', () => {
        expect(window.escapeHTML(null)).toBe('');
        expect(window.escapeHTML(undefined)).toBe('');
        expect(window.escapeHTML(123)).toBe('');
        expect(window.escapeHTML({})).toBe('');
        expect(window.escapeHTML([])).toBe('');
        expect(window.escapeHTML(true)).toBe('');
      });

      it('should escape HTML characters correctly', () => {
        expect(window.escapeHTML('&')).toBe('&amp;');
        expect(window.escapeHTML('<')).toBe('&lt;');
        expect(window.escapeHTML('>')).toBe('&gt;');
        expect(window.escapeHTML('"')).toBe('&quot;');
        expect(window.escapeHTML("'")).toBe('&#039;');
      });

      it('should escape a string with multiple HTML characters', () => {
        const input = '<script>alert("XSS & test\'s")</script>';
        const expected = '&lt;script&gt;alert(&quot;XSS &amp; test&#039;s&quot;)&lt;/script&gt;';
        expect(window.escapeHTML(input)).toBe(expected);
      });

      it('should return the exact same string if no characters to escape', () => {
        const input = 'Just a regular string 123.';
        expect(window.escapeHTML(input)).toBe(input);
      });

      it('should handle empty string', () => {
        expect(window.escapeHTML('')).toBe('');
      });
    });

  describe('calculateImageDimensions', () => {
    it('should calculate correct dimensions for wide images exceeding maxDim', () => {
        const result = window.calculateImageDimensions(1200, 800, 600);
        expect(result).toEqual({ width: 600, height: 400 });
    });

    it('should calculate correct dimensions for tall images exceeding maxDim', () => {
        const result = window.calculateImageDimensions(800, 1200, 600);
        expect(result).toEqual({ width: 400, height: 600 });
    });

    it('should calculate correct dimensions for square images exceeding maxDim', () => {
        const result = window.calculateImageDimensions(1000, 1000, 600);
        expect(result).toEqual({ width: 600, height: 600 });
    });

    it('should not scale images smaller than maxDim', () => {
        const result = window.calculateImageDimensions(400, 300, 600);
        expect(result).toEqual({ width: 400, height: 300 });
    });
  });

  describe('Admin product stock & local overrides', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('normalizeStockValue: null/empty = no limit, never coerce null to 0', () => {
      expect(window.normalizeStockValue(null)).toBeNull();
      expect(window.normalizeStockValue(undefined)).toBeNull();
      expect(window.normalizeStockValue('')).toBeNull();
      expect(window.normalizeStockValue(0)).toBe(0);
      expect(window.normalizeStockValue('5')).toBe(5);
      expect(window.normalizeStockValue(-1)).toBeNull();
    });

    it('isProductOutOfStock: inStock false OR stock 0', () => {
      expect(window.isProductOutOfStock({ inStock: false, stock: null })).toBe(true);
      expect(window.isProductOutOfStock({ inStock: true, stock: null })).toBe(false);
      expect(window.isProductOutOfStock({ inStock: true, stock: 0 })).toBe(true);
      expect(window.isProductOutOfStock({ inStock: true, stock: 3 })).toBe(false);
      expect(window.isProductOutOfStock({ inStock: undefined, stock: null })).toBe(false);
    });

    it('exceedsProductStock: null stock has no cap; finite stock enforces limit', () => {
      expect(window.exceedsProductStock({ stock: null }, 99)).toBe(false);
      expect(window.exceedsProductStock({ stock: undefined }, 99)).toBe(false);
      expect(window.exceedsProductStock({ stock: 2 }, 2)).toBe(false);
      expect(window.exceedsProductStock({ stock: 2 }, 3)).toBe(true);
    });

    it('applyLocalProductOverrides restores unchecked inStock after "server reload"', () => {
      const fromServer = [
        { id: 'bread_burger', name: 'Булочка', price: 120, category: 'bakery', inStock: true, stock: null },
        { id: 'bread_baursaki', name: 'Бауырсаки', price: 70, category: 'bakery', inStock: true, stock: null }
      ];
      // Simulate admin save: product marked unavailable in localStorage
      localStorage.setItem('nazcake_custom_products', JSON.stringify([
        { id: 'bread_burger', name: 'Булочка', price: 120, inStock: false, stock: 0, isCustomName: true },
        { id: 'bread_baursaki', name: 'Бауырсаки', price: 70, inStock: true, stock: null, isCustomName: false }
      ]));

      const merged = window.applyLocalProductOverrides(fromServer);
      const burger = merged.find((p) => p.id === 'bread_burger');
      const baursaki = merged.find((p) => p.id === 'bread_baursaki');

      expect(burger.inStock).toBe(false);
      expect(window.isProductOutOfStock(burger)).toBe(true);
      expect(baursaki.inStock).toBe(true);
      expect(window.isProductOutOfStock(baursaki)).toBe(false);
    });

    it('persistLocalProductOverrides survives round-trip like page refresh', () => {
      const list = [
        { id: 'x1', name: 'Test', price: 100, inStock: false, stock: 0, image: '', isCustomName: true, category: 'bakery' }
      ];
      expect(window.persistLocalProductOverrides(list)).toBe(true);

      const serverAgain = [
        { id: 'x1', name: 'Old server name', price: 999, category: 'bakery', inStock: true, stock: null }
      ];
      const afterReload = window.applyLocalProductOverrides(serverAgain);
      expect(afterReload[0].inStock).toBe(false);
      expect(afterReload[0].name).toBe('Test');
      expect(afterReload[0].price).toBe(100);
      expect(afterReload[0].stock).toBe(0);
    });

    it('addToCart rejects out-of-stock product after local unavailability', () => {
      window.setCart([]);
      const products = window.getProducts();
      const p = products.find((x) => x.id === 'bread_burger');
      expect(p).toBeTruthy();
      const prev = { ...p };
      p.inStock = false;
      p.stock = 0;
      window.addToCart('bread_burger', 1);
      expect(window.getCart().length).toBe(0);
      // restore
      Object.assign(p, prev);
    });
  });
});
