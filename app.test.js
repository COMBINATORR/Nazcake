const { adjustColorBrightness } = require('./app.js');

describe('adjustColorBrightness', () => {
    it('should adjust brightness correctly for valid inputs', () => {
        expect(adjustColorBrightness('#ff0000', -10)).toBe('#e50000');
    });

    it('should cap brightness at 255', () => {
        expect(adjustColorBrightness('#ffffff', 10)).toBe('#ffffff');
    });

    it('should floor brightness at 0 when percent is largely negative', () => {
        expect(adjustColorBrightness('#111111', -200)).toBe('#000000');
    });
});
