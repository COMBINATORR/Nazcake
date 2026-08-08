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
window.calculateDeliveryTime = calculateDeliveryTime;
window.generatePickupTimeSlots = generatePickupTimeSlots;

window.getHaversineDistance = getHaversineDistance;
            window.deg2rad = deg2rad;

window.checkAtyrauBounds = checkAtyrauBounds;
            window.normalizeStockValue = normalizeStockValue;
            window.isProductOutOfStock = isProductOutOfStock;
            window.exceedsProductStock = exceedsProductStock;
            window.applyLocalProductOverrides = applyLocalProductOverrides;
            window.persistLocalProductOverrides = persistLocalProductOverrides;
            window.normalizeProductBadge = normalizeProductBadge;
            window.isNewArrivalProduct = isNewArrivalProduct;
            window.resolveProductImage = resolveProductImage;
            window.dataUrlToBlob = dataUrlToBlob;
            window.extractProductImageStoragePath = extractProductImageStoragePath;
            window.imageForLocalStorage = imageForLocalStorage;
            window.PRODUCT_IMAGES_BUCKET = PRODUCT_IMAGES_BUCKET;
            window.parseLocalDate = parseLocalDate;
            window.clampNonNegativeIntInput = clampNonNegativeIntInput;
            window.getProducts = () => products;
            window.setProducts = (p) => { products = p; };
            window.getUnitTranslationKey = getUnitTranslationKey;
            window.sortProductsStable = sortProductsStable;
            window.getBadgeTranslationKey = getBadgeTranslationKey;
            window.generateSecureOrderId = generateSecureOrderId;
            window.loadProducts = loadProducts;
            loadCustomProductsLocalFallback = jest.fn(loadCustomProductsLocalFallback);
            window.getLoadCustomProductsLocalFallbackMock = () => loadCustomProductsLocalFallback;
            window.setSupabaseClient = (client) => { supabaseClient = client; };
        `;

        eval(appJsCode);
    });



    describe('loadProducts', () => {
        let originalConsoleError;


        beforeEach(() => {
            originalConsoleError = console.error;
            console.error = jest.fn();
            // Reset the fallback mock
            window.getLoadCustomProductsLocalFallbackMock().mockClear();
        });

        afterEach(() => {
            console.error = originalConsoleError;
            window.setSupabaseClient(null);
        });

        it('should call console.error and loadCustomProductsLocalFallback on Supabase error', async () => {
            const mockError = new Error('Mock Supabase connection error');
            const mockSupabaseClient = {
                from: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                order: jest.fn().mockResolvedValue({ data: null, error: mockError })
            };

            window.setSupabaseClient(mockSupabaseClient);

            await window.loadProducts();

            expect(console.error).toHaveBeenCalledWith(
                "Failed to load products from DB, using fallback",
                mockError
            );
            expect(window.getLoadCustomProductsLocalFallbackMock()).toHaveBeenCalled();
        });
    });

    describe('isNewArrivalProduct', () => {
      it('should return false for falsy values', () => {
        expect(window.isNewArrivalProduct(null)).toBe(false);
        expect(window.isNewArrivalProduct(undefined)).toBe(false);
      });

      it('should return true if isNew or is_new is true', () => {
        expect(window.isNewArrivalProduct({ isNew: true })).toBe(true);
        expect(window.isNewArrivalProduct({ is_new: true })).toBe(true);
        expect(window.isNewArrivalProduct({ isNew: true, badge: 'old' })).toBe(true);
      });

      it('should return true for new arrival badges (case-insensitive with trimming)', () => {
        expect(window.isNewArrivalProduct({ badge: 'новое' })).toBe(true);
        expect(window.isNewArrivalProduct({ badge: ' жаңа ' })).toBe(true);
        expect(window.isNewArrivalProduct({ badge: 'NEW' })).toBe(true);
        expect(window.isNewArrivalProduct({ badge: 'Новинка' })).toBe(true);
        expect(window.isNewArrivalProduct({ badge: 'новинки' })).toBe(true);
      });

      it('should return false for non-matching badges or missing properties', () => {
        expect(window.isNewArrivalProduct({})).toBe(false);
        expect(window.isNewArrivalProduct({ badge: 'хит' })).toBe(false);
        expect(window.isNewArrivalProduct({ badge: 'популярное' })).toBe(false);
        expect(window.isNewArrivalProduct({ isNew: false, badge: 'other' })).toBe(false);
      });
    });

  describe('sortProductsStable', () => {
    it('returns empty array for null or undefined', () => {
      expect(window.sortProductsStable(null)).toEqual([]);
      expect(window.sortProductsStable(undefined)).toEqual([]);
    });

    it('maintains the order of known products based on DEFAULT_PRODUCT_RANK', () => {
      // These are known product IDs from the initial 'products' array
      const list = [{ id: 'bread_baursaki' }, { id: 'bread_burger' }];
      // bread_burger has lower index (0) than bread_baursaki (1)
      const sorted = window.sortProductsStable(list);
      expect(sorted[0].id).toBe('bread_burger');
      expect(sorted[1].id).toBe('bread_baursaki');
    });

    it('sorts unknown products alphabetically', () => {
      const list = [{ id: 'z_unknown' }, { id: 'a_unknown' }];
      const sorted = window.sortProductsStable(list);
      expect(sorted[0].id).toBe('a_unknown');
      expect(sorted[1].id).toBe('z_unknown');
    });

    it('places known products before unknown products, and sorts unknown alphabetically', () => {
      const list = [
        { id: 'z_unknown' },
        { id: 'bread_rye' }, // Known, rank 2
        { id: 'a_unknown' },
        { id: 'bread_burger' } // Known, rank 0
      ];

      const sorted = window.sortProductsStable(list);

      expect(sorted[0].id).toBe('bread_burger');
      expect(sorted[1].id).toBe('bread_rye');
      expect(sorted[2].id).toBe('a_unknown');
      expect(sorted[3].id).toBe('z_unknown');
    });
  });

    describe('getBadgeTranslationKey', () => {
      it('should return correct translation key for known badges', () => {
        expect(window.getBadgeTranslationKey('бестселлер')).toBe('badge_bestseller');
        expect(window.getBadgeTranslationKey('горячее')).toBe('badge_hot');
        expect(window.getBadgeTranslationKey('новое')).toBe('badge_new');
        expect(window.getBadgeTranslationKey('хит')).toBe('badge_hit');
        expect(window.getBadgeTranslationKey('премиум')).toBe('badge_premium');
        expect(window.getBadgeTranslationKey('заказной')).toBe('badge_custom');
        expect(window.getBadgeTranslationKey('custom')).toBe('badge_custom');
        expect(window.getBadgeTranslationKey('vip')).toBe('badge_vip');
        expect(window.getBadgeTranslationKey('ручная лепка')).toBe('badge_hand');
      });

      it('should handle variations in casing and whitespace', () => {
        expect(window.getBadgeTranslationKey(' БЕСТСЕЛЛЕР ')).toBe('badge_bestseller');
        expect(window.getBadgeTranslationKey('Новое')).toBe('badge_new');
      });

      it('should return empty string for fresh badges', () => {
        expect(window.getBadgeTranslationKey('свежее')).toBe('');
        expect(window.getBadgeTranslationKey('fresh')).toBe('');
      });

      it('should return empty string for unknown badges', () => {
        expect(window.getBadgeTranslationKey('unknown_badge')).toBe('');
        expect(window.getBadgeTranslationKey('какой-то значок')).toBe('');
      });

      it('should return empty string for falsy/empty values', () => {
        expect(window.getBadgeTranslationKey('')).toBe('');
        expect(window.getBadgeTranslationKey(null)).toBe('');
        expect(window.getBadgeTranslationKey(undefined)).toBe('');
      });
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


    describe('clampNonNegativeIntInput', () => {
        it('should do nothing if input is null or undefined', () => {
            expect(() => window.clampNonNegativeIntInput(null)).not.toThrow();
            expect(() => window.clampNonNegativeIntInput(undefined)).not.toThrow();
        });

        it('should clear value if empty or non-digit and fillEmpty is false', () => {
            const input = { value: '' };
            window.clampNonNegativeIntInput(input);
            expect(input.value).toBe('');

            const input2 = { value: 'abc' };
            window.clampNonNegativeIntInput(input2);
            expect(input2.value).toBe('');

            const input3 = { value: '-' };
            window.clampNonNegativeIntInput(input3);
            expect(input3.value).toBe('');
        });

        it('should set value to "0" if empty or non-digit and fillEmpty is true', () => {
            const input = { value: '' };
            window.clampNonNegativeIntInput(input, true);
            expect(input.value).toBe('0');

            const input2 = { value: 'abc' };
            window.clampNonNegativeIntInput(input2, true);
            expect(input2.value).toBe('0');
        });

        it('should strip non-digit characters', () => {
            const input = { value: '1a2b3' };
            window.clampNonNegativeIntInput(input);
            expect(input.value).toBe('123');

            const input2 = { value: '-42' }; // '-' is stripped, so '42'
            window.clampNonNegativeIntInput(input2);
            expect(input2.value).toBe('42');
        });

        it('should strip leading zeros but keep a single zero', () => {
            const input = { value: '007' };
            window.clampNonNegativeIntInput(input);
            expect(input.value).toBe('7');

            const input2 = { value: '0' };
            window.clampNonNegativeIntInput(input2);
            expect(input2.value).toBe('0');

            const input3 = { value: '000' };
            window.clampNonNegativeIntInput(input3);
            expect(input3.value).toBe('0');
        });


        it('should handle extremely large numeric strings containing scientific notation from parseInt', () => {
            const input = document.createElement('input');
            input.value = '9'.repeat(50);
            window.clampNonNegativeIntInput(input);
            expect(input.value).toBe('1e+50');
        });

        it('should handle float numbers as input value by stripping the dot', () => {
            const input = document.createElement('input');
            input.value = '3.14';
            window.clampNonNegativeIntInput(input);
            expect(input.value).toBe('314');
        });

        it('should handle undefined value property', () => {
            const input = {};
            window.clampNonNegativeIntInput(input);
            expect(input.value).toBe('');
        });
    });

    describe('parseLocalDate', () => {
        it('should correctly parse a valid YYYY-MM-DD date string', () => {
            const date = window.parseLocalDate('2023-10-15');
            expect(date).not.toBeNull();
            expect(date.getFullYear()).toBe(2023);
            expect(date.getMonth()).toBe(9); // Months are 0-indexed
            expect(date.getDate()).toBe(15);
            expect(date.getHours()).toBe(0);
        });

        it('should return null for empty or falsy inputs', () => {
            expect(window.parseLocalDate(null)).toBeNull();
            expect(window.parseLocalDate(undefined)).toBeNull();
            expect(window.parseLocalDate('')).toBeNull();
        });

        it('should return null for invalid formats', () => {
            expect(window.parseLocalDate('2023/10/15')).toBeNull();
            expect(window.parseLocalDate('abc-10-15')).toBeNull();
            expect(window.parseLocalDate('2023-10')).toBeNull(); // Missing day
        });

        it('should return null when parsing results in NaN or zeros', () => {
             expect(window.parseLocalDate('0-0-0')).toBeNull();
             expect(window.parseLocalDate('0000-00-00')).toBeNull();
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



  describe('calculateDeliveryTime', () => {
    it('should correctly calculate delivery time for distance 0', () => {
      expect(window.calculateDeliveryTime(0)).toBe(30);
    });

    it('should correctly calculate delivery time for distance 3', () => {
      expect(window.calculateDeliveryTime(3)).toBe(45);
    });

    it('should correctly calculate delivery time for distance 3.5', () => {
      expect(window.calculateDeliveryTime(3.5)).toBe(50);
    });

    it('should correctly calculate delivery time for distance 10', () => {
      expect(window.calculateDeliveryTime(10)).toBe(80);
    });
  });

  describe('calculateDeliveryCost', () => {
    it('should correctly calculate delivery cost for distance 0', () => {
      expect(window.calculateDeliveryCost(0)).toBe(800);
    });

    it('should correctly calculate delivery cost for distance 3', () => {
      expect(window.calculateDeliveryCost(3)).toBe(800);
    });

    it('should correctly calculate delivery cost for distance 3.5', () => {
      expect(window.calculateDeliveryCost(3.5)).toBe(950);
    });

    it('should correctly calculate delivery cost for distance 10', () => {
      expect(window.calculateDeliveryCost(10)).toBe(1850);
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


    describe('generateSecureOrderId', () => {
    let originalCrypto;
    let originalMathRandom;

    beforeEach(() => {
      // Save originals
      originalCrypto = global.crypto;
      originalMathRandom = Math.random;
    });

    afterEach(() => {
      // Restore originals
      if (originalCrypto !== undefined) {
        Object.defineProperty(global, 'crypto', {
          value: originalCrypto,
          writable: true,
          configurable: true
        });
      } else {
        delete global.crypto;
      }
      Math.random = originalMathRandom;
    });

    it('should generate an ID with the given prefix', () => {
      const id = window.generateSecureOrderId('TEST-');
      expect(id.startsWith('TEST-')).toBe(true);
      // Depending on crypto or math random it is either 8 or up to 8 chars.
      // But we just verify it exists and is a string
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan('TEST-'.length);
    });

    it('should use crypto.getRandomValues if available', () => {
      const mockCrypto = {
        getRandomValues: jest.fn((array) => {
          array[0] = 0x12345678; // Mock random value
          return array;
        })
      };

      Object.defineProperty(global, 'crypto', {
        value: mockCrypto,
        writable: true,
        configurable: true
      });

      const id = window.generateSecureOrderId('NZ-');
      expect(mockCrypto.getRandomValues).toHaveBeenCalled();

      expect(id).toBe('NZ-163999');
    });

    it('should fallback to Math.random if crypto is undefined', () => {
      Object.defineProperty(global, 'crypto', {
        value: undefined,
        writable: true,
        configurable: true
      });

      const mockMathRandom = jest.fn(() => 0.123456789);
      Math.random = mockMathRandom;

      const id = window.generateSecureOrderId('FALLBACK-');

      expect(mockMathRandom).toHaveBeenCalled();
      expect(id).toBe('FALLBACK-211111');
    });

    it('should fallback to Math.random if crypto.getRandomValues is not a function', () => {
      Object.defineProperty(global, 'crypto', {
        value: {}, // No getRandomValues
        writable: true,
        configurable: true
      });

      const mockMathRandom = jest.fn(() => 0.987654321);
      Math.random = mockMathRandom;

      const id = window.generateSecureOrderId('NZ-');

      expect(mockMathRandom).toHaveBeenCalled();
      expect(id).toBe('NZ-988888');
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

  describe('resolveProductImage (admin vs static override)', () => {
    it('prefers admin data-URL over LOCAL_CATALOG_IMAGE_OVERRIDES', () => {
      const dataUrl = 'data:image/jpeg;base64,/9j/4AAQ';
      expect(window.resolveProductImage('pastry_tea_set', dataUrl)).toBe(dataUrl);
    });

    it('prefers https CDN URL over static override', () => {
      const url = 'https://cdn.example.com/tea.jpg';
      expect(window.resolveProductImage('pastry_tea_set', url)).toBe(url);
    });

    it('uses static override when DB has plain file path', () => {
      const resolved = window.resolveProductImage('pastry_tea_set', 'images/pastry_tea_set.webp');
      expect(resolved).toContain('pastry_tea_set.webp');
      expect(resolved).toMatch(/\?v=/);
    });

    it('falls back to DB path when no override', () => {
      expect(window.resolveProductImage('unknown_sku', 'images/foo.webp')).toBe('images/foo.webp');
    });
  });

  describe('admin image storage helpers', () => {
    it('dataUrlToBlob produces JPEG blob from data URL', () => {
      // 1x1 jpeg
      const dataUrl =
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z';
      const blob = window.dataUrlToBlob(dataUrl);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toMatch(/image\/jpeg/);
      expect(blob.size).toBeGreaterThan(0);
    });

    it('dataUrlToBlob throws invalid_data_url for empty, non-string, or non-data URL inputs', () => {
      expect(() => window.dataUrlToBlob(null)).toThrow('invalid_data_url');
      expect(() => window.dataUrlToBlob(undefined)).toThrow('invalid_data_url');
      expect(() => window.dataUrlToBlob('')).toThrow('invalid_data_url');
      expect(() => window.dataUrlToBlob(123)).toThrow('invalid_data_url');
      expect(() => window.dataUrlToBlob('notadataurl')).toThrow('invalid_data_url');
    });

    it('dataUrlToBlob throws invalid_data_url when there is no comma', () => {
      expect(() => window.dataUrlToBlob('data:image/jpeg;base64')).toThrow('invalid_data_url');
    });

    it('dataUrlToBlob parses image/png MIME type correctly', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
      const blob = window.dataUrlToBlob(dataUrl);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toMatch(/image\/png/);
      expect(blob.size).toBeGreaterThan(0);
    });

    it('dataUrlToBlob defaults to image/jpeg if MIME type is omitted', () => {
      const dataUrl = 'data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z';
      const blob = window.dataUrlToBlob(dataUrl);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toMatch(/image\/jpeg/);
      expect(blob.size).toBeGreaterThan(0);
    });

    describe('extractProductImageStoragePath', () => {
      const bucket = window.PRODUCT_IMAGES_BUCKET || 'product-images';

      it('parses public URL', () => {
        const url = `https://xxx.supabase.co/storage/v1/object/public/${bucket}/products/tea/1.jpg`;
        expect(window.extractProductImageStoragePath(url)).toBe('products/tea/1.jpg');
      });

      it('parses signed URL', () => {
        const url = `https://xxx.supabase.co/storage/v1/object/sign/${bucket}/products/cake/2.jpg?token=abc`;
        expect(window.extractProductImageStoragePath(url)).toBe('products/cake/2.jpg');
      });

      it('strips query strings from public URLs', () => {
        const url = `https://xxx.supabase.co/storage/v1/object/public/${bucket}/products/pie/3.jpg?t=12345`;
        expect(window.extractProductImageStoragePath(url)).toBe('products/pie/3.jpg');
      });

      it('decodes URL encoded paths', () => {
        const url = `https://xxx.supabase.co/storage/v1/object/public/${bucket}/products/fancy%20cake%26stuff.jpg`;
        expect(window.extractProductImageStoragePath(url)).toBe('products/fancy cake&stuff.jpg');
      });

      it('returns null for local/unmatched URLs', () => {
        expect(window.extractProductImageStoragePath('images/local.webp')).toBeNull();
        expect(window.extractProductImageStoragePath('/assets/img.png')).toBeNull();
      });

      it('handles invalid inputs gracefully', () => {
        expect(window.extractProductImageStoragePath(null)).toBeNull();
        expect(window.extractProductImageStoragePath(undefined)).toBeNull();
        expect(window.extractProductImageStoragePath('')).toBeNull();
        expect(window.extractProductImageStoragePath(123)).toBeNull();
        expect(window.extractProductImageStoragePath({})).toBeNull();
      });

      it('falls back to raw string match if decodeURIComponent fails', () => {
        // %81 is an invalid URI encoding, decodeURIComponent will throw
        const url = `https://xxx.supabase.co/storage/v1/object/public/${bucket}/products/bad%81path.jpg`;
        expect(window.extractProductImageStoragePath(url)).toBe('products/bad%81path.jpg');
      });
    });

    it('imageForLocalStorage strips data URLs', () => {
      expect(window.imageForLocalStorage('data:image/jpeg;base64,abc')).toBe('');
      expect(window.imageForLocalStorage('https://cdn/x.jpg')).toBe('https://cdn/x.jpg');
      expect(window.imageForLocalStorage('images/a.webp')).toBe('images/a.webp');
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

  describe("getUnitTranslationKey", () => {
    it("should return correct translation key for valid units", () => {
      expect(window.getUnitTranslationKey("шт.")).toBe("tg_unit_pcs");
      expect(window.getUnitTranslationKey("кг")).toBe("tg_unit_kg");
      expect(window.getUnitTranslationKey("12 шт.")).toBe("tg_unit_12pcs");
      expect(window.getUnitTranslationKey("уп")).toBe("tg_unit_pack");
    });

    it("should return empty string for missing or falsy units", () => {
      expect(window.getUnitTranslationKey(null)).toBe("");
      expect(window.getUnitTranslationKey(undefined)).toBe("");
      expect(window.getUnitTranslationKey("")).toBe("");
    });

    it("should return empty string for unknown units", () => {
      expect(window.getUnitTranslationKey("г")).toBe("");
      expect(window.getUnitTranslationKey("box")).toBe("");
      expect(window.getUnitTranslationKey("random")).toBe("");
    });
  });

    describe('generatePickupTimeSlots', () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it('returns all slots for a future date', () => {
            // Set current time to today 10:00 AM
            jest.setSystemTime(new Date('2023-10-10T10:00:00'));
            // Query for tomorrow
            const slots = window.generatePickupTimeSlots('2023-10-11');
            expect(slots.length).toBeGreaterThan(0);
            expect(slots[0]).toBe('09:00');
            expect(slots[slots.length - 1]).toBe('19:30');
        });

        it('returns all slots for today if current time is early morning', () => {
            // Set current time to today 07:00 AM
            jest.setSystemTime(new Date('2023-10-10T07:00:00'));
            const slots = window.generatePickupTimeSlots('2023-10-10');
            expect(slots.length).toBeGreaterThan(0);
            expect(slots[0]).toBe('09:00');
            expect(slots[slots.length - 1]).toBe('19:30');
        });

        it('filters out past slots for today based on current time + buffer', () => {
            // Set current time to today 10:00 AM.
            // Buffer is 45 mins, so min time is 10:45 AM.
            // Slots are 09:00, 09:30, 10:00, 10:30, 11:00...
            // So 11:00 should be the first slot.
            jest.setSystemTime(new Date('2023-10-10T10:00:00'));
            const slots = window.generatePickupTimeSlots('2023-10-10');
            expect(slots.length).toBeGreaterThan(0);
            expect(slots[0]).toBe('11:00');
            expect(slots[slots.length - 1]).toBe('19:30');
        });

        it('returns empty array if current time + buffer is past all slots for today', () => {
            // Set current time to today 19:30.
            // Buffer is 45 mins, min time is 20:15.
            // Last slot is 19:30, so no slots should be returned.
            jest.setSystemTime(new Date('2023-10-10T19:30:00'));
            const slots = window.generatePickupTimeSlots('2023-10-10');
            expect(slots).toEqual([]);
        });

        it('returns empty array for invalid dates', () => {
            expect(window.generatePickupTimeSlots(null)).toEqual([]);
            expect(window.generatePickupTimeSlots(undefined)).toEqual([]);
            expect(window.generatePickupTimeSlots('')).toEqual([]);
            expect(window.generatePickupTimeSlots('invalid-date')).toEqual([]);
        });
    });

});
