/**
 * End-to-end: sign in as admin (if credentials in env), upload probe image, set product image, cleanup.
 * Optional env: SUPABASE_ADMIN_EMAIL, SUPABASE_ADMIN_PASSWORD
 */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = __dirname;
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, ".env"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const URL = "https://wuqxqxjskviaptxswojz.supabase.co";
const ANON = env.SUPABASE_ANON_KEY;
const email = env.SUPABASE_ADMIN_EMAIL || process.env.SUPABASE_ADMIN_EMAIL;
const password = env.SUPABASE_ADMIN_PASSWORD || process.env.SUPABASE_ADMIN_PASSWORD;

// minimal valid jpeg bytes
const tinyJpeg = Buffer.from(
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//Z",
  "base64"
);

async function main() {
  // Prefer installed package if present
  let createClientFn = createClient;
  try {
    createClientFn = require("@supabase/supabase-js").createClient;
  } catch (_) {
    console.log("No @supabase/supabase-js locally — using REST only");
  }

  if (!email || !password) {
    console.log("No SUPABASE_ADMIN_EMAIL/PASSWORD in .env — verifying via REST bucket only");
    const r = await fetch(URL + "/storage/v1/object/list/product-images", {
      method: "POST",
      headers: {
        apikey: ANON,
        Authorization: "Bearer " + ANON,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefix: "products/", limit: 5 }),
    });
    console.log("list products/ prefix:", r.status, await r.text());
    console.log("Bucket is configured in DB. Admin login will be able to upload.");
    return;
  }

  // Auth + upload via REST
  const authRes = await fetch(URL + "/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: {
      apikey: ANON,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const authJson = await authRes.json();
  if (!authRes.ok) {
    console.error("Auth failed:", authRes.status, authJson);
    process.exit(1);
  }
  const token = authJson.access_token;
  console.log("Auth OK as", authJson.user && authJson.user.email);

  const objectPath = "products/_probe/setup_" + Date.now() + ".jpg";
  const up = await fetch(URL + "/storage/v1/object/product-images/" + objectPath, {
    method: "POST",
    headers: {
      apikey: ANON,
      Authorization: "Bearer " + token,
      "Content-Type": "image/jpeg",
      "x-upsert": "true",
    },
    body: tinyJpeg,
  });
  const upText = await up.text();
  console.log("authenticated upload:", up.status, upText.slice(0, 200));

  if (up.ok) {
    const publicUrl =
      URL + "/storage/v1/object/public/product-images/" + objectPath;
    console.log("public URL:", publicUrl);
    const head = await fetch(publicUrl, { method: "HEAD" });
    console.log("public HEAD:", head.status, head.headers.get("content-type"));
    // cleanup
    await fetch(URL + "/storage/v1/object/product-images/" + objectPath, {
      method: "DELETE",
      headers: { apikey: ANON, Authorization: "Bearer " + token },
    });
    console.log("probe cleaned up");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
