🎯 **What:** Extracted inline event listener callbacks from `setupKaspiQrCheckout()` into standalone named functions (`openKaspiQrModal`, `generateKaspiQr`, and `completeKaspiOrder`).

💡 **Why:** `setupKaspiQrCheckout()` was an overly long and complex function. Moving its click logic to distinct functions improves code readability, limits closure scope size, and makes the logic for each step of the flow easier to test and maintain.

✅ **Verification:**
- Confirmed that the DOM selection previously reliant on the closure correctly handles elements locally in the new standalone functions.
- Removed unused variables to ensure cleanup.
- Ran the full test suite (`pnpm test`), ensuring existing tests continue passing.

✨ **Result:** The large function is significantly shorter and more focused on event wiring, while actual step execution logic is properly encapsulated in self-contained helper functions.
