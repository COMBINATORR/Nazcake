Title: 🧹 Refactor duplicated local storage logic for order history

Description:
🎯 **What:** Extracted duplicated logic for interacting with `localStorage.getItem("nazcake_orders_history")` and `setItem` into new helper functions `getOrderHistory()` and `saveOrderHistory(history)`.
💡 **Why:** This reduces code duplication across multiple methods (`orderSucceeded`, `setupKaspiQrCheckout`, `changeOrderStatus`, and `renderAdminOrders`). Centralizing the serialization and deserialization of the history data makes it easier to maintain and resilient to future changes.
✅ **Verification:** Ran test cases and verified modifications in `app.js` via manual bash verification. Tests pass.
✨ **Result:** A more maintainable, cleaner, and readable `app.js` without duplicated order history management code.
