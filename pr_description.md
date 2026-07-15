🎯 **What:** The code health issue addressed
Extracted the deeply nested, anonymous async function used in the `tabButtons` click listener inside `setupAdminDashboardNav` into a standalone function named `switchAdminTab`.

💡 **Why:** How this improves maintainability
The original tab-switching logic was buried inside a `forEach` loop and an event listener within a larger setup function, leading to deep nesting and poor readability. Extracting it to a named function cleanly separates the logic, making `setupAdminDashboardNav` easier to read and maintain.

✅ **Verification:** How you confirmed the change is safe
Ran the existing Jest test suite for the `app.js` file using `pnpm test`. It passed without any failures, confirming that the extraction correctly maintained the existing behavior.

✨ **Result:** The improvement achieved
A cleaner `setupAdminDashboardNav` setup method that simply delegates to a clear and concise `switchAdminTab` logic function.
