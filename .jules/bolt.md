## Performance Optimizations
- **Geocoding API Caching**: Implementing client-side caching (e.g., `geocodingCache`) for repetitive external API calls like `nominatim.openstreetmap.org` provides a significant performance boost (over 5x speedup in repeated calls) and avoids unnecessary rate limiting. Always check for missing caches on duplicate/similar data fetching paths.
