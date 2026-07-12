🎯 **What:** Tested `getHaversineDistance` and `deg2rad` functions to address the lack of test coverage for the distance calculation logic.

📊 **Coverage:**
- Added test coverage for `deg2rad` (0, 90, 180, 360, and negative angles).
- Added test coverage for `getHaversineDistance` (zero distance, distance across longitude, real-world distance between New York and London, commutative property, and negative coordinates).

✨ **Result:** Improved test coverage for core pure functions, reducing the chance of regressions if the distance calculation logic is modified in the future.
