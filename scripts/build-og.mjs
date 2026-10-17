// Renders the 1200×630 share image before Next scans the app directory.
// The PNG is a static metadata file so the GitHub Pages export keeps a .png URL.

import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
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
