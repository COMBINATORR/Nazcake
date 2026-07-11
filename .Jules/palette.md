## 2024-07-11 - Add ARIA labels to icon buttons
**Learning:** Found several close/icon buttons (like drawer menu, modals, cart sidebar) missing aria-labels. Screen reader users would only hear "button" for the close/dismiss action. Same with dynamic cart quantity increment/decrement buttons.
**Action:** When working on vanilla JS apps, always check for icon-only SVGs or entities like `&times;` and ensure they have descriptive `aria-label`s. Also ensure dynamically rendered templates have accessibility attributes included.
