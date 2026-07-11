## 2024-05-18 - XSS via Product Name & Category
**Vulnerability:** Product names and category labels were interpolated directly into the `innerHTML` string in `app.js` when rendering the product catalog cards and admin product rows. An attacker (or a user modifying local storage or gaining admin access) could inject malicious scripts.
**Learning:** Even in single-page applications without a backend, concatenating user-controlled or dynamically modified properties (e.g., custom product names stored in local storage) directly into `innerHTML` represents a persistent (Self-)XSS risk.
**Prevention:** Always use HTML sanitization functions (like `escapeHTML()`) or set properties like `textContent` instead of injecting raw strings into `innerHTML` when building UI templates.
