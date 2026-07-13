## 2026-07-11 - [Debounced Admin Catalog Search]
**Learning:** Found a performance bottleneck in the admin catalog search where it triggered full re-renders of the catalog and multiple `i18n` translations on every keystroke.
**Action:** Implemented a 300ms debounce on the search input event to significantly reduce unnecessary re-renders. Always check if user inputs that trigger state/UI changes are debounced, especially those involving loops or DOM updates.
## 2026-07-13 - [Nested Loop Optimization in Admin Save]
**Learning:** Found an O(N*M) nested loop inside `saveAdminProduct` where `products.find(p => p.id === id)` was executed inside a `cart.forEach()` loop despite the search criteria being constant.
**Action:** Hoisted the product lookup out of the loop to run exactly once per save instead of once per cart item matching the id. This dropped execution time significantly.
