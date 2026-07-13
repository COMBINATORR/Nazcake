🧹 [Code Health] Deduplicate order history saving logic

🎯 **What:** Extracted direct `localStorage.setItem("nazcake_orders_history", ...)` calls into the existing `saveOrdersHistory(history)` helper function. Also extracted duplicate history unshifting logic into `saveOrderToHistory(newOrder)` inside `saveKaspiOrder`.

💡 **Why:** This improves maintainability by centralizing the history saving logic. If the storage mechanism or key ever changes, it only needs to be updated in one place instead of four. It also makes the code more DRY (Don't Repeat Yourself) and easier to read.

✅ **Verification:**
- Ran the full test suite (`pnpm test`), which passed successfully.
- Verified that all previously hardcoded `localStorage.setItem` instances for order history now use the shared helper.
- Ensured no changes in behavior or missing exports occurred.

✨ **Result:** A cleaner, more maintainable app.js with reduced code duplication and centralized logic for saving order history.
