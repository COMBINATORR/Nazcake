🎯 **What:** Removed the `anon` role from the UPDATE and DELETE policies for the `products` and `orders` tables.
⚠️ **Risk:** The previous policy allowed anyone with the public anon key to modify products and delete orders without authentication.
🛡️ **Solution:** Restricted `nazcake_products_update`, `nazcake_orders_update`, and `nazcake_orders_delete` policies to the `authenticated` role only.
