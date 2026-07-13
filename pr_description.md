## 🧹 [Code Health] Extract duplicated localStorage order history logic

**What:**
Extracted the repeated code pattern for retrieving and parsing `nazcake_orders_history` from `localStorage` into a new shared helper function called `getOrdersHistory()`.

**Why:**
The application accesses the order history from `localStorage` in four distinct locations (`checkoutSubmit`, `renderAdminOrders`, `changeOrderStatus`, `saveKaspiOrder`). In each place, the exact same `try/catch` and `JSON.parse` logic was written out manually. Extracting this to a single helper function improves code maintainability, reduces lines of code, and ensures any future changes to how history is parsed only need to be made in one place.

**Verification:**
- Used `git diff` and syntax checks to ensure no typos or syntax errors were introduced.
- Evaluated scope placement of `getOrdersHistory()` to ensure it's globally available for all call sites.
- Ran the Jest test suite using `pnpm test` to confirm no regressions.

**Result:**
The codebase is cleaner and duplication is reduced without altering the existing functionality.
