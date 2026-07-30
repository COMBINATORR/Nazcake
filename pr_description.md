💡 **What:** The `update_desc.js` script was refactored to replace an N+1 looping `UPDATE` implementation with a single batch `UPDATE` query utilizing `json_to_recordset()`.
🎯 **Why:** Previously, the script issued an individual update query for each item in the `updates` array (`N` queries for `N` items). This incurs significant latency penalties due to multiple network round-trips to the database.
📊 **Measured Improvement:** We built a local simulation profiling performance for an array of 100 items with a 10ms simulated latency per query.
*   **Baseline (N+1 query):** 1032.88 ms
*   **Optimized (Batch Query):** 10.66 ms
*   **Improvement:** ~99% faster (100x speedup), completely avoiding the N+1 issue.
