🧪 [Testing] Add tests for calculateDeliveryTime

🎯 **What:** The testing gap addressed
This PR addresses an untested pure utility function, `calculateDeliveryTime`, in `app.js`. Testing it adds confidence in delivery cost/time estimation logic.

📊 **Coverage:** What scenarios are now tested
- Validates the base logic for zero distance (`20`).
- Validates behavior for standard integer distances (e.g., `5`, `10`).
- Verifies edge case rounding logic for fractional distances testing `Math.round` behavior correctly.

✨ **Result:** The improvement in test coverage
The previously untested function now has a dedicated `describe` block in the test suite that successfully handles normal and edge cases without polluting the test environment.
