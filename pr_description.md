💡 **What:** Replaced an O(N*M) nested loop (using `Array.prototype.find()` inside an `Array.prototype.map()`) with an O(N+M) lookup using a Javascript `Map` in `app.js` when loading custom products from `localStorage`.
🎯 **Why:** To optimize loading times and reduce CPU load when processing the custom products. Using `find` on every iteration of `map` resulted in significant processing overhead which scales poorly as the array of custom products and general products increases.
📊 **Measured Improvement:** In a micro-benchmark using 10,000 products and 5,000 custom items overriding them with 100 iterations:
- **Baseline (nested loop):** 42,687.79ms
- **Optimized (Map):** 630.72ms
- **Result:** ~98.5% reduction in execution time in the benchmark.
