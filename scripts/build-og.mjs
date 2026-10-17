// Renders the 1200×630 share image before Next scans the app directory.
// The PNG is a static metadata file so the GitHub Pages export keeps a .png URL.

import { createRequire } from "node:module";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const React = require("react");
const { ImageResponse } = require("next/og");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [regular, bold, markSvg] = await Promise.all([
  readFile(join(root, "src/og/Geist-Regular.ttf")),
  readFile(join(root, "src/og/Geist-Bold.ttf")),
  readFile(join(root, "public/brand/mark.svg")),
]);
const markPng = await sharp(markSvg).resize(184, 184).png().toBuffer();
const markSrc = `data:image/png;base64,${markPng.toString("base64")}`;

const h = React.createElement;
const image = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#08090b",
      padding: "88px 96px",
      position: "relative",
    },
  },
  h("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 280,
      backgroundImage: "linear-gradient(180deg, rgba(242,180,65,0.16), rgba(242,180,65,0))",
    },
  }),
  h(
    "div",
    { style: { display: "flex", alignItems: "center" } },
    h("img", { src: markSrc, width: 92, height: 92 }),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", marginLeft: 28 } },
      h(
        "div",
        {
          style: {
            fontFamily: "Geist",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: 8,
            color: "#8b929c",
          },
        },
        "THINK",
      ),
      h(
        "div",
        {
          style: {
            fontFamily: "Geist",
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#f3f5f7",
            marginTop: 8,
          },
        },
        "OPERATOR",
      ),
    ),
  ),
  h(
    "div",
    {
      style: {
        display: "flex",
        fontFamily: "Geist",
        fontSize: 36,
        fontWeight: 400,
        lineHeight: 1.35,
        color: "#b4bac2",
        marginTop: 52,
        width: 860,
      },
    },
    "Test your judgment. Train your weaknesses. Make better decisions faster.",
  ),
  h("div", {
    style: {
      marginTop: 44,
      width: 88,
      height: 4,
      backgroundColor: "#f2b441",
      borderRadius: 4,
    },
  }),
);

const response = new ImageResponse(image, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Geist", data: regular, weight: 400, style: "normal" },
    { name: "Geist", data: bold, weight: 700, style: "normal" },
  ],
});
const png = Buffer.from(await response.arrayBuffer());
await Promise.all([
  writeFile(join(root, "src/app/opengraph-image.png"), png),
  writeFile(join(root, "src/app/twitter-image.png"), png),
]);
console.log(`opengraph: wrote ${png.length} bytes`);

const SKILL_LABEL = {
  people: "People & Delegation",
  resource: "Resource Allocation",
  financial: "Financial Judgment",
  bottleneck: "Bottleneck Detection",
  prioritization: "Prioritization",
  sales: "Sales & Marketing",
  operations: "Operations",
  strategy: "Strategy",
};

async function guideCard(title, kicker) {
  const size = title.length > 68 ? 40 : title.length > 46 ? 48 : 56;
  const card = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#08090b",
        padding: "72px 80px",
        position: "relative",
      },
    },
    h("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 240,
        backgroundImage: "linear-gradient(180deg, rgba(242,180,65,0.16), rgba(242,180,65,0))",
      },
    }),
    h(
      "div",
      { style: { display: "flex", alignItems: "center" } },
      h("img", { src: markSrc, width: 64, height: 64 }),
      h(
        "div",
        {
          style: {
            display: "flex",
            marginLeft: 22,
            fontFamily: "Geist",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 3,
            color: "#f3f5f7",
          },
        },
        "THINK OPERATOR",
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          marginTop: 48,
          fontFamily: "Geist",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 4,
          color: "#f2b441",
        },
      },
      kicker.toUpperCase(),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          marginTop: 18,
          width: 980,
          fontFamily: "Geist",
          fontSize: size,
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#f3f5f7",
        },
      },
      title,
    ),
    h("div", {
      style: {
        marginTop: 36,
        width: 88,
        height: 4,
        backgroundColor: "#f2b441",
        borderRadius: 4,
      },
    }),
  );
  const rendered = new ImageResponse(card, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Geist", data: regular, weight: 400, style: "normal" },
      { name: "Geist", data: bold, weight: 700, style: "normal" },
    ],
  });
  return Buffer.from(await rendered.arrayBuffer());
}

const guideRoot = join(root, "src/content/guides");
const guideOut = join(root, "public/og/guides");
await mkdir(guideOut, { recursive: true });
const guideFiles = (await readdir(guideRoot)).filter(
  (name) => name.endsWith(".ts") && !["index.ts", "types.ts", "words.ts"].includes(name),
);
const cards = [{ slug: "index", title: "Guides for owners who have to decide", kicker: "Guides" }];
for (const name of guideFiles) {
  const source = await readFile(join(guideRoot, name), "utf8");
  const slug = source.match(/slug:\s*"([^"]+)"/)?.[1];
  const title = source.match(/title:\s*"([^"]+)"/)?.[1];
  const skill = source.match(/skill:\s*"([^"]+)"/)?.[1];
  if (!slug || !title) throw new Error(`Guide OG metadata missing in ${name}`);
  cards.push({ slug, title, kicker: SKILL_LABEL[skill] ?? "Guide" });
}
for (const card of cards) {
  const stampPath = join(guideOut, `${card.slug}.txt`);
  const signature = `${card.kicker}\n${card.title}`;
  let previous = "";
  try {
    previous = await readFile(stampPath, "utf8");
  } catch {
    previous = "";
  }
  if (previous === signature) continue;
  const bytes = await guideCard(card.title, card.kicker);
  await writeFile(join(guideOut, `${card.slug}.png`), bytes);
  await writeFile(stampPath, signature);
  console.log(`opengraph: ${card.slug} ${bytes.length} bytes`);
}
