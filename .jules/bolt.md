## 2026-07-11 - [Debounced Admin Catalog Search]
**Learning:** Found a performance bottleneck in the admin catalog search where it triggered full re-renders of the catalog and multiple `i18n` translations on every keystroke.
**Action:** Implemented a 300ms debounce on the search input event to significantly reduce unnecessary re-renders. Always check if user inputs that trigger state/UI changes are debounced, especially those involving loops or DOM updates.
- Extracted static `categoryLabel` fields into a `CATEGORY_LABELS` lookup map to avoid data duplication. This makes the frontend bundle slightly smaller and easier to maintain. Programmatic initialization scales much better for config-like repeated fields.
