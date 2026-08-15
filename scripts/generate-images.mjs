import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const originals = path.resolve("public/images/originals");
const generated = path.resolve("public/images/generated");
const manifestPath = path.resolve("src/data/image-manifest.json");
const widths = [480, 768, 1200, 1800, 2400];

await mkdir(generated, { recursive: true });
const entries = {};

for (const filename of (await readdir(originals)).sort()) {
  if (!/\.(jpe?g|png)$/i.test(filename) || filename === "dlucca-logo.png") continue;
  const input = path.join(originals, filename);
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) continue;
  const key = path.parse(filename).name;
  const availableWidths = [...new Set(widths.filter((width) => width < metadata.width).concat(metadata.width))];
  const formats = { avif: [], webp: [] };

  for (const width of availableWidths) {
    const height = Math.round((metadata.height / metadata.width) * width);
    const avifName = `${key}-${width}.avif`;
    const webpName = `${key}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).avif({ quality: 62, effort: 2 }).toFile(path.join(generated, avifName));
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 4 }).toFile(path.join(generated, webpName));
    formats.avif.push({ src: `/images/generated/${avifName}`, width, height });
    formats.webp.push({ src: `/images/generated/${webpName}`, width, height });
  }

  const blurBuffer = await sharp(input).resize({ width: 24 }).webp({ quality: 28 }).toBuffer();
  entries[key] = {
    src: `/images/originals/${filename}`,
    width: metadata.width,
    height: metadata.height,
    blurDataURL: `data:image/webp;base64,${blurBuffer.toString("base64")}`,
    formats,
  };
}

await writeFile(manifestPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

const logoSvg = await readFile(path.resolve("public/logo.svg"));
const ogDir = path.resolve("public/og");
await mkdir(ogDir, { recursive: true });
const ogSources = {
  home: "hero-blonde-2026.png",
  story: "flaviano-wide.jpg",
  hair: "work-1533.jpg",
  aesthetics: "aesthetics-room.png",
  weddings: "wedding-hero.jpg",
  gallery: "work-0847.jpg",
  financing: "salon-interior.jpg",
  contact: "salon-interior.jpg",
};

for (const [name, source] of Object.entries(ogSources)) {
  const backdrop = await sharp(path.join(originals, source))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .modulate({ brightness: 0.62, saturation: 0.72 })
    .toBuffer();
  const logo = await sharp(logoSvg).resize({ width: 700 }).png().toBuffer();
  await sharp(backdrop)
    .composite([{ input: logo, gravity: "center" }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(ogDir, `${name}.jpg`));
}

console.log(`Generated responsive sources for ${Object.keys(entries).length} photographs.`);
