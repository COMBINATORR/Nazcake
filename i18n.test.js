/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Nazcake i18n Unit Tests', () => {
    beforeEach(() => {
        // Reset language state
        localStorage.clear();

        // Load the HTML content (just minimal structure if needed)
        document.documentElement.innerHTML = '<html><body></body></html>';

        const i18nJsPath = path.resolve(__dirname, './i18n.js');
        let i18nJsCode = fs.readFileSync(i18nJsPath, 'utf8');

        // Evaluate the i18n script to attach to window
        eval(i18nJsCode);
    });

    describe('t(key)', () => {
        it('should return correct translation for ru language (happy path)', () => {
            // By default, localStorage is empty, so 'ru' is selected
            window.i18n.setLanguage('ru'); // Ensure ru is active
            const result = window.i18n.t('meta_title');
            expect(result).toBe('Nazcake — Премиальная кондитерская и пекарня в Атырау');
        });

        it('should return the key itself if translation does not exist in any language', () => {
            const result = window.i18n.t('non_existent_key_123');
            expect(result).toBe('non_existent_key_123');
        });

        it('should fallback to ru translation if currentLang is invalid or not in translations', () => {
            // Set an invalid language in localStorage before eval
            localStorage.setItem("nazcake_lang", "invalid_lang");

            const i18nJsPath = path.resolve(__dirname, './i18n.js');
            let i18nJsCode = fs.readFileSync(i18nJsPath, 'utf8');
            eval(i18nJsCode); // Re-initialize i18n with currentLang = "invalid_lang"

            // It should fall back to ru translation for a known key
            const result = window.i18n.t('meta_title');
            expect(result).toBe('Nazcake — Премиальная кондитерская и пекарня в Атырау');
        });
    });
});
