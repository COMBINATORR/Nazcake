🎯 **What:** Extracted internal logic of `setupDeliveryCalculator` in `app.js` into smaller, independent helper functions (`fetchCoordinates`, `checkAtyrauBounds`, `calculateDeliveryCost`, `calculateDeliveryTime`, `showDeliveryError`, `hideDeliveryError`).

💡 **Why:** `setupDeliveryCalculator` previously violated the Single Responsibility Principle, containing complex UI updates, external API calls, bounds checking, and mathematical logic in one giant inline event listener. Refactoring this into well-named helper functions dramatically improves code readability, testability, and overall maintainability without altering existing application behavior.

✅ **Verification:**
- Ran syntax checks using `node -c app.js`.
- Created a headless JSDOM test script to successfully verify the mathematical logic inside `calculateDeliveryCost` works correctly, and that the event listener triggers accurately.
- Verified visual function explicitly using Playwright by serving the application locally, calculating delivery costs within the app, recording a video, and asserting correct results.

✨ **Result:** The `setupDeliveryCalculator` is now very clean and declarative, acting as an orchestrator for the modular helper functions.
