const { adjustColorBrightness } = require('./app');

describe('adjustColorBrightness', () => {
  it('should be defined', () => {
    expect(adjustColorBrightness).toBeDefined();
  });

  it('should increase brightness with positive percentage', () => {
    expect(adjustColorBrightness('#646464', 20)).toBe('#787878');
  });

  it('should decrease brightness with negative percentage', () => {
    expect(adjustColorBrightness('#646464', -20)).toBe('#505050');
  });

  it('should cap brightness at 255', () => {
    expect(adjustColorBrightness('#f0f0f0', 20)).toBe('#ffffff');
    expect(adjustColorBrightness('#ffffff', 10)).toBe('#ffffff');
  });

  it('should return the exact same color with 0 percent change', () => {
    expect(adjustColorBrightness('#123456', 0)).toBe('#123456');
  });

  it('should work correctly with smaller single digit hex results', () => {
    expect(adjustColorBrightness('#050505', 0)).toBe('#050505');
  });
});
