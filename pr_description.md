🎯 **What:**
The testing gap for `normalizeProductBadge` has been addressed. The function is a pure string processing function used to strip redundant "fresh" badges. Before this PR, there were no test cases covering its behavior.

📊 **Coverage:**
The new test cases cover:
- Empty strings and nullish values (`null`, `undefined`, `""`) -> Returns `""`.
- Variations of "fresh" badges in Russian, Kazakh, and English (`"свежее"`, `"балғын"`, `"свежий"`, `"fresh"`) factoring in case-insensitivity and extra whitespace -> Returns `""`.
- Any other regular string (e.g. `"хит продаж"`, `"new"`) with whitespace trimming -> Returns the trimmed string.

✨ **Result:**
The `normalizeProductBadge` function now has full unit test coverage using Jest, increasing the test suite's reliability and ensuring proper normalization of product badges.
