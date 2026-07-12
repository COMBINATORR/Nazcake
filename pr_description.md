Title: 🧹 [Code Health Improvement: Refactored Error Message Generation in app.js]

Description:
🎯 **What:** Extracted the deeply nested error message logic in `app.js` (around line 2673) into a pure helper function called `getDeliveryErrorMessage`.
💡 **Why:** Reduces nesting, improves readability, and makes the code more maintainable and easier to extend or test in the future.
✅ **Verification:** Ran `pnpm test` successfully (2 passed suites, 18 passed tests) to ensure no regressions were introduced. Evaluated changes manually.
✨ **Result:** Improved code structure while preserving exact behavior.
