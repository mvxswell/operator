// Render the vector identity into browser and home-screen icons.
// Run manually when public/brand/mark.svg changes; outputs are committed.
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");
const mark = await readFile("public/brand/mark.svg", "utf8");
const paths = mark.match(/<path[^>]+\/>/g).join("");
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 80 80"><rect width="80" height="80" rx="18" fill="#08090b"/><g transform="translate(8 8)">${paths}</g></svg>`;
await writeFile("src/app/icon.svg", icon);
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile("src/app/apple-icon.png");
const sizes = [16, 32, 48, 256];
const images = await Promise.all(sizes.map((size) => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, i) => {
  const position = 6 + i * 16;
  header[position] = sizes[i] === 256 ? 0 : sizes[i];
  header[position + 1] = header[position];
  header.writeUInt16LE(1, position + 4);
  header.writeUInt16LE(32, position + 6);
  header.writeUInt32LE(image.length, position + 8);
  header.writeUInt32LE(offset, position + 12);
  offset += image.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...images]));
for (const [variant, ink, background] of [["dark", "#f3f5f7", "#08090b"], ["light", "#14171b", "#faf8f3"]]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="180" viewBox="0 0 600 180"><rect width="600" height="180" rx="20" fill="${background}"/><g transform="translate(40 38) scale(1.6)">${paths}</g><g fill="${ink}" font-family="Arial, Helvetica, sans-serif"><text x="176" y="73" font-size="18" letter-spacing="6">THINK</text><text x="173" y="119" font-size="42" font-weight="700" letter-spacing="3">OPERATOR</text></g></svg>`;
  await writeFile(`public/brand/wordmark-${variant}.svg`, svg);
  await sharp(Buffer.from(svg)).resize(1200, 360).png().toFile(`public/brand/wordmark-${variant}.png`);
}
console.log("Generated SVG, multi-size ICO, Apple icon, and light/dark wordmarks.");
