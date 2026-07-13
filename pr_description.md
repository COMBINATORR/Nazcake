🎯 **What:** The overly long `setupKaspiQrCheckout` function in `app.js` was refactored. The inner event listener logic and repeated product parsing steps were extracted into several standalone, well-named functions: `getKaspiProductDetails`, `closeKaspiModal`, `handleQuickKaspiClick`, `handleKaspiGenerateClick`, and `handleKaspiCompleteClick`.

💡 **Why:** The original `setupKaspiQrCheckout` function contained roughly 150 lines of code doing multiple things: configuring phone masks, calculating order totals, setting up the UI for different steps, and managing local storage. This made it difficult to read and maintain. By extracting this logic, the main setup function is simplified to just attaching event listeners, and the core logic is easier to track.

✅ **Verification:** Verified the logic remains intact by checking variable scoping, resolving outer dependencies properly, checking syntax using Node, and running the complete test suite with `pnpm test`. All 55 tests passed successfully without regressions.

✨ **Result:** A drastically improved code structure in `app.js` around the Kaspi QR checkout flow that preserves exact functionality while enhancing readability and maintainability.
