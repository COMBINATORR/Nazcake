🛡️ Sentinel: [HIGH] Fix XSS vulnerability in Product Cards

🚨 Severity: HIGH
💡 Vulnerability: Product names and category labels from localStorage/admin panel were interpolated directly into `innerHTML` strings in `createProductCardHtml` and `renderAdminCatalog` in `app.js` without sanitization. An attacker (or a user modifying local storage or gaining admin access) could inject malicious scripts.
🎯 Impact: This allows persistent (Self-)XSS as the malicious payload saved in localStorage would be executed when the product catalog is rendered in the user's browser.
🔧 Fix: Wrapped all user-controlled/dynamically loaded string variables (`pName`, `tName`, `tCategoryLabel`, `tBadge`, `tUnit`) with the existing `escapeHTML()` function before injecting them into `innerHTML`.
✅ Verification: Ran `npm test` successfully. Verified `escapeHTML` prevents JS execution on malicious product names. Added a journal entry to `.jules/sentinel.md`.
