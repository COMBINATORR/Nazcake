const fs = require('fs');
const path = require('path');
const processPhotos = require('../process_photos_ai.js');

describe('process_photos_ai.js', () => {
    test('getKnownProducts returns image files asynchronously', async () => {
        const knownProducts = await processPhotos.getKnownProducts();
        expect(Array.isArray(knownProducts)).toBe(true);
        knownProducts.forEach(file => {
            const hasValidExt = file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png');
            expect(hasValidExt).toBe(true);
        });
    });
});
