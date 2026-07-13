🧪 Add edge case tests for escapeHTML function

🎯 **What:**
The `escapeHTML` helper function in `app.js` lacked dedicated tests, leading to a gap in testing coverage. This function sanitizes user input before rendering it in the DOM or placing it in checkout links, making it crucial for security.

📊 **Coverage:**
New tests were added to the test suite in both `app.test.js` and `tests/app.test.js` covering:
- **Non-string inputs:** Ensuring `null`, `undefined`, numbers, objects, arrays, and booleans fail safely by returning an empty string instead of causing exceptions.
- **HTML character escaping:** Verifying the replacement of `&`, `<`, `>`, `"`, and `'` with their respective HTML entities.
- **Complex inputs:** Handling strings with multiple interspersed HTML characters that need escaping.
- **Clean inputs:** Confirming strings with no HTML characters are returned unmodified.
- **Empty strings:** Handling empty string input gracefully.

✨ **Result:**
The `escapeHTML` function is now fully covered by unit tests, ensuring the safety net catches any regressions to this function in future refactors or optimizations. 30 tests are now executed and pass reliably.
