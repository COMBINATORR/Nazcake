/**
 * Compress heavy Nazcake images (sharp) + hero videos (ffmpeg).
 * Safe in-place: only overwrites when output is smaller.
 * Run: node compress_assets.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const sharp = require("sharp");

const ROOT = __dirname;
const IMAGES_DIR = path.join(ROOT, "images");
const VIDEOS_DIR = path.join(ROOT, "Videos");

const WEBP_QUALITY = 78;
const WEBP_ALPHA_QUALITY = 80;
const JPEG_QUALITY = 82;
const MIN_SAVE_RATIO = 0.02; // skip if less than 2% savings
const MIN_BYTES_TO_TOUCH = 40 * 1024; // ignore tiny files unless oversized

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function maxEdgeFor(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/").toLowerCase();
  const base = path.basename(filePath).toLowerCase();

  if (rel.includes("/stage/") || rel.includes("\\stage\\")) return 900;
  if (base.includes("hero-poster")) return 1280;
  if (base.includes("favicon") || base.includes("apple-touch")) return 512;
  if (base.includes("logo")) return 640;
  if (base.startsWith("max_")) return 1000;
  // Product / catalog photos — retina-friendly but not 2K
  return 1100;
}

async function compressRaster(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".webp", ".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const input = fs.readFileSync(filePath);
  const before = input.length;
  let meta;
  try {
    meta = await sharp(input, { failOn: "none" }).metadata();
  } catch (e) {
    return { file: filePath, error: e.message };
  }

  const w = meta.width || 0;
  const h = meta.height || 0;
  const longEdge = Math.max(w, h);
  const limit = maxEdgeFor(filePath);
  const needsResize = longEdge > limit;
  const oversizedBytes = before >= MIN_BYTES_TO_TOUCH;
  // Always fix mislabeled jpeg-as-webp and huge files
  const isFakeWebp = ext === ".webp" && meta.format === "jpeg";
  if (!needsResize && !oversizedBytes && !isFakeWebp && before < 120 * 1024) {
    return { file: filePath, skipped: true, reason: "small_ok", before };
  }

  let pipeline = sharp(input, { failOn: "none" }).rotate(); // respect EXIF
  if (needsResize) {
    pipeline = pipeline.resize({
      width: limit,
      height: limit,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const hasAlpha = Boolean(meta.hasAlpha);
  let outBuf;
  let outExt = ext;

  if (ext === ".webp" || isFakeWebp) {
    outBuf = await pipeline
      .webp({
        quality: hasAlpha ? WEBP_ALPHA_QUALITY : WEBP_QUALITY,
        alphaQuality: 85,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();
    outExt = ".webp";
  } else if (ext === ".jpg" || ext === ".jpeg") {
    outBuf = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();
  } else if (ext === ".png") {
    // Prefer webp-size win while keeping .png name if still smaller as png;
    // for logos with alpha keep png but palette/compress
    if (hasAlpha) {
      const asPng = await pipeline
        .clone()
        .png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 })
        .toBuffer();
      const asWebp = await pipeline
        .clone()
        .webp({ quality: WEBP_ALPHA_QUALITY, alphaQuality: 90, effort: 6 })
        .toBuffer();
      // Keep .png extension — write smaller of png-optimized, or if webp much smaller keep png of reasonable size
      // Actually for PNG files referenced as .png we must keep PNG format.
      outBuf = asPng;
      // If palette png is still huge, use full png with compression
      if (asPng.length > before * 0.95) {
        outBuf = await sharp(input, { failOn: "none" })
          .rotate()
          .resize(
            needsResize
              ? { width: limit, height: limit, fit: "inside", withoutEnlargement: true }
              : undefined
          )
          .png({ compressionLevel: 9, effort: 10 })
          .toBuffer();
      }
      // If still not smaller and webp is much smaller, also write sibling? No — keep png only.
      void asWebp;
    } else {
      // Opaque PNG → better as JPEG-sized but keep png for path stability; try webp-quality via png
      outBuf = await pipeline.png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 }).toBuffer();
      if (outBuf.length > before * 0.9) {
        // fallback: convert heavy opaque png content via high compression without palette
        outBuf = await sharp(input, { failOn: "none" })
          .rotate()
          .resize(
            needsResize
              ? { width: limit, height: limit, fit: "inside", withoutEnlargement: true }
              : undefined
          )
          .png({ compressionLevel: 9 })
          .toBuffer();
      }
    }
  }

  if (!outBuf || outBuf.length >= before * (1 - MIN_SAVE_RATIO)) {
    // Try aggressive webp rewrite for any raster that didn't shrink enough when extension is webp
    if (ext === ".webp" && outBuf && outBuf.length < before) {
      // accept small win
    } else if (ext === ".webp") {
      outBuf = await sharp(input, { failOn: "none" })
        .rotate()
        .resize(
          needsResize
            ? { width: limit, height: limit, fit: "inside", withoutEnlargement: true }
            : undefined
        )
        .webp({ quality: 72, effort: 6, smartSubsample: true })
        .toBuffer();
    }

    if (!outBuf || outBuf.length >= before * (1 - MIN_SAVE_RATIO)) {
      return {
        file: filePath,
        skipped: true,
        reason: "no_gain",
        before,
        after: outBuf ? outBuf.length : before,
        dims: `${w}x${h}`,
        limit,
      };
    }
  }

  fs.writeFileSync(filePath, outBuf);
  return {
    file: filePath,
    before,
    after: outBuf.length,
    saved: before - outBuf.length,
    dims: `${w}x${h}`,
    limit,
    format: meta.format,
    outExt,
  };
}

async function rebuildFaviconSvg() {
  // favicon.svg embeds a huge base64 raster — rebuild from optimized 192 PNG
  const candidates = [
    path.join(IMAGES_DIR, "favicon-192.png"),
    path.join(IMAGES_DIR, "apple-touch-icon.png"),
    path.join(IMAGES_DIR, "favicon-512.png"),
  ];
  const src = candidates.find((p) => fs.existsSync(p));
  if (!src) return { skipped: true, reason: "no_png" };

  const pngBuf = await sharp(src)
    .resize(192, 192, { fit: "cover" })
    .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
    .toBuffer();

  const b64 = pngBuf.toString("base64");
  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `viewBox="0 0 192 192" width="192" height="192">\n` +
    `  <image width="192" height="192" href="data:image/png;base64,${b64}"/>\n` +
    `</svg>\n`;

  const targets = [
    path.join(ROOT, "favicon.svg"),
    path.join(IMAGES_DIR, "favicon.svg"),
  ];
  const results = [];
  for (const t of targets) {
    if (!fs.existsSync(path.dirname(t))) continue;
    const before = fs.existsSync(t) ? fs.statSync(t).size : 0;
    fs.writeFileSync(t, svg, "utf8");
    results.push({ file: t, before, after: Buffer.byteLength(svg), saved: before - Buffer.byteLength(svg) });
  }
  return results;
}

async function minifyLogoSvg() {
  const logo = path.join(IMAGES_DIR, "Nazcake_logo.svg");
  if (!fs.existsSync(logo)) return null;
  let s = fs.readFileSync(logo, "utf8");
  const before = Buffer.byteLength(s);
  // Strip comments, collapse whitespace between tags, shorten long decimals in paths
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/>\s+</g, "><");
  s = s.replace(/\s{2,}/g, " ");
  // Reduce float precision in path data / numbers
  s = s.replace(/(-?\d+\.\d{3,})/g, (m) => {
    const n = Number(m);
    if (!Number.isFinite(n)) return m;
    return String(Math.round(n * 100) / 100);
  });
  const after = Buffer.byteLength(s);
  if (after < before * 0.98) {
    fs.writeFileSync(logo, s, "utf8");
    return { file: logo, before, after, saved: before - after };
  }
  return { file: logo, skipped: true, before, after };
}

function compressVideos() {
  if (!fs.existsSync(VIDEOS_DIR)) return [];
  const results = [];
  const files = fs.readdirSync(VIDEOS_DIR).filter((f) => /\.(webm|mp4)$/i.test(f));

  for (const name of files) {
    const input = path.join(VIDEOS_DIR, name);
    const before = fs.statSync(input).size;
    const ext = path.extname(name).toLowerCase();
    const tmp = path.join(VIDEOS_DIR, `__tmp_compress_${name}`);

    try {
      if (ext === ".webm") {
        // VP9 smaller for hero bg; scale to 1280 max, CRF ~34 (background video)
        execFileSync(
          "ffmpeg",
          [
            "-y",
            "-i",
            input,
            "-vf",
            "scale='min(1280,iw)':-2",
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "0",
            "-crf",
            "36",
            "-row-mt",
            "1",
            "-deadline",
            "good",
            "-cpu-used",
            "2",
            "-an",
            tmp,
          ],
          { stdio: "pipe" }
        );
      } else {
        // H.264 mobile fallback
        execFileSync(
          "ffmpeg",
          [
            "-y",
            "-i",
            input,
            "-vf",
            "scale='min(960,iw)':-2",
            "-c:v",
            "libx264",
            "-preset",
            "slow",
            "-crf",
            "28",
            "-movflags",
            "+faststart",
            "-an",
            tmp,
          ],
          { stdio: "pipe" }
        );
      }

      if (!fs.existsSync(tmp)) {
        results.push({ file: input, error: "no_output" });
        continue;
      }
      const after = fs.statSync(tmp).size;
      if (after < before * 0.95) {
        fs.renameSync(tmp, input);
        results.push({ file: input, before, after, saved: before - after });
      } else {
        fs.unlinkSync(tmp);
        results.push({ file: input, skipped: true, reason: "no_gain", before, after });
      }
    } catch (e) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      results.push({ file: input, error: e.message || String(e) });
    }
  }
  return results;
}

function fmtMB(n) {
  return (n / (1024 * 1024)).toFixed(2) + " MB";
}
function fmtKB(n) {
  return Math.round(n / 1024) + " KB";
}

async function main() {
  console.log("Nazcake asset compression starting...\n");

  const rasters = walk(IMAGES_DIR).filter((f) =>
    /\.(webp|jpe?g|png)$/i.test(f)
  );
  // also root favicon.png if any
  for (const extra of ["favicon.ico"]) {
    /* skip ico */
  }

  let savedTotal = 0;
  let beforeTotal = 0;
  let afterTotal = 0;
  let compressed = 0;
  let skipped = 0;
  const top = [];

  for (const f of rasters) {
    const r = await compressRaster(f);
    if (!r) continue;
    if (r.error) {
      console.warn("ERR", path.relative(ROOT, f), r.error);
      continue;
    }
    if (r.skipped) {
      skipped++;
      continue;
    }
    compressed++;
    savedTotal += r.saved;
    beforeTotal += r.before;
    afterTotal += r.after;
    top.push(r);
    console.log(
      `✓ ${path.relative(ROOT, f)}  ${fmtKB(r.before)} → ${fmtKB(r.after)}  (-${fmtKB(r.saved)})  [${r.dims} max${r.limit}]`
    );
  }

  console.log("\n--- Favicon SVG rebuild ---");
  const fav = await rebuildFaviconSvg();
  if (Array.isArray(fav)) {
    for (const r of fav) {
      savedTotal += Math.max(0, r.saved);
      console.log(`✓ ${path.relative(ROOT, r.file)}  ${fmtKB(r.before)} → ${fmtKB(r.after)}`);
    }
  }

  console.log("\n--- Logo SVG minify ---");
  const logo = await minifyLogoSvg();
  if (logo && logo.saved) {
    savedTotal += logo.saved;
    console.log(`✓ Nazcake_logo.svg  ${fmtKB(logo.before)} → ${fmtKB(logo.after)}`);
  } else if (logo) {
    console.log(`· logo svg skipped (${logo.reason || "no_gain"})`);
  }

  console.log("\n--- Videos (ffmpeg) ---");
  const vids = compressVideos();
  for (const r of vids) {
    if (r.error) {
      console.warn("ERR", path.basename(r.file), r.error.slice(0, 120));
      continue;
    }
    if (r.skipped) {
      console.log(`· ${path.basename(r.file)} no gain (${fmtMB(r.before)})`);
      continue;
    }
    savedTotal += r.saved;
    console.log(
      `✓ ${path.basename(r.file)}  ${fmtMB(r.before)} → ${fmtMB(r.after)}  (-${fmtMB(r.saved)})`
    );
  }

  // Final folder stats
  const imgSum = walk(IMAGES_DIR)
    .filter((f) => /\.(webp|jpe?g|png|svg)$/i.test(f))
    .reduce((s, f) => s + fs.statSync(f).size, 0);
  const vidSum = walk(VIDEOS_DIR).reduce((s, f) => s + fs.statSync(f).size, 0);

  console.log("\n========== SUMMARY ==========");
  console.log(`Images compressed: ${compressed}, skipped: ${skipped}`);
  console.log(`Bytes saved (this run): ${fmtMB(savedTotal)}`);
  console.log(`images/ total now: ${fmtMB(imgSum)}`);
  console.log(`Videos/ total now: ${fmtMB(vidSum)}`);
  top
    .sort((a, b) => b.saved - a.saved)
    .slice(0, 15)
    .forEach((r) =>
      console.log(`  top: ${path.relative(ROOT, r.file)} -${fmtKB(r.saved)}`)
    );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
