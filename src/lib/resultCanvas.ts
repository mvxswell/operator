/** The preview and downloaded PNG use the same pixels, entirely in the browser. */
export async function drawResult(canvas: HTMLCanvasElement, title: string, score: string, verdict: string) {
  await document.fonts.ready;
  const font = getComputedStyle(document.body).fontFamily;
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = "#08090b";
  ctx.fillRect(0, 0, 1200, 630);
  const glow = ctx.createRadialGradient(1050, 0, 0, 1050, 0, 850);
  glow.addColorStop(0, "#332717");
  glow.addColorStop(1, "#08090b");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1200, 630);
  ctx.strokeStyle = "#34302a";
  ctx.strokeRect(24, 24, 1152, 582);
  ctx.fillStyle = "#f2b441";
  ctx.fillRect(64, 66, 8, 26);
  ctx.font = `600 24px ${font}`;
  ctx.fillText("THINK OPERATOR", 90, 90);
  const fitted = (text: string, size: number, min: number, width: number) => {
    do { ctx.font = `600 ${size}px ${font}`; size -= 1; } while (ctx.measureText(text).width > width && size >= min);
  };
  ctx.fillStyle = "#f3f5f7";
  fitted(title, 52, 24, 1060);
  ctx.fillText(title, 64, 180);
  ctx.fillStyle = "#f2b441";
  fitted(score, 164, 90, 1060);
  ctx.fillText(score, 60, 370);
  ctx.fillStyle = "#f3f5f7";
  fitted(verdict, 34, 20, 1060);
  ctx.fillText(verdict, 64, 440);
  ctx.fillStyle = "#8b929c";
  ctx.font = `400 24px ${font}`;
  ctx.fillText("Think you can beat it?", 64, 536);
  ctx.fillStyle = "#f2b441";
  ctx.textAlign = "right";
  ctx.fillText("thinkoperator.com", 1136, 536);
}
