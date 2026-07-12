# 🧹 Extract empty cart shop button click handler

🎯 **What:** Extracted the anonymous function for the empty cart's "shop" button click handler into a top-level named function `handleEmptyCartShopClick`.
💡 **Why:** Reduces nesting depth in the `updateCartUi` function, improving code readability and maintainability without altering functionality.
✅ **Verification:** Verified by ensuring the Jest test suite passes without regressions (`pnpm test`) after updating the implementation and its exports for testing.
✨ **Result:** Improved code health and cleaner layout in `app.js` with identical behavior.
