const palette = {
  ink: "#f8fafc",
  dark: "#0a0a0a",
  panel: "#0f0f0f",
  card: "#151515",
  border: "#1f1f1f",
  green: "#22c55e",
  emerald: "#059669",
  lime: "#84cc16",
  gold: "#fbbf24",
  amber: "#d97706",
  muted: "#94a3b8",
  gray: "#64748b",
  white: "#e2e8f0",
  blue: "#3b82f6",
  violet: "#8b5cf6",
};

function scaleCanvas(canvas, logicalWidth, logicalHeight) {
  const ratio = window.devicePixelRatio || 1;
  const w = Math.round(logicalWidth * ratio);
  const h = Math.round(logicalHeight * ratio);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function drawChartGPTLogo(ctx, x, y, size) {
  const s = size;
  const cx = x + s / 2;
  const cy = y + s / 2;
  const r = s * 0.38;

  ctx.clearRect(x, y, s, s);

  const grad = ctx.createLinearGradient(x, y, x + s, y + s);
  grad.addColorStop(0, palette.green);
  grad.addColorStop(0.5, palette.emerald);
  grad.addColorStop(1, palette.blue);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x + s * 0.08, y + s * 0.08, s * 0.84, s * 0.84, s * 0.2);
  ctx.fill();

  ctx.fillStyle = palette.dark;
  ctx.beginPath();
  ctx.roundRect(x + s * 0.16, y + s * 0.16, s * 0.68, s * 0.68, s * 0.14);
  ctx.fill();

  ctx.fillStyle = palette.ink;
  ctx.font = `bold ${s * 0.4}px "Inter", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("C", cx, cy + s * 0.02);

  ctx.strokeStyle = palette.green;
  ctx.lineWidth = s * 0.04;
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI * 0.3, Math.PI * 0.8);
  ctx.stroke();

  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = s * 0.04;
  ctx.beginPath();
  ctx.arc(cx - s * 0.04, cy + s * 0.04, r * 0.65, Math.PI * 1.1, Math.PI * 1.7);
  ctx.stroke();
}

function drawFavicon(ctx, size) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  const grad = ctx.createLinearGradient(0, 0, s, s);
  grad.addColorStop(0, palette.green);
  grad.addColorStop(0.5, palette.emerald);
  grad.addColorStop(1, palette.blue);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(s * 0.1, s * 0.1, s * 0.8, s * 0.8, s * 0.22);
  ctx.fill();

  ctx.fillStyle = palette.dark;
  ctx.beginPath();
  ctx.roundRect(s * 0.18, s * 0.18, s * 0.64, s * 0.64, s * 0.16);
  ctx.fill();

  ctx.fillStyle = palette.ink;
  ctx.font = `bold ${s * 0.45}px "Inter", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("C", cx, cy + s * 0.02);
}

function drawOGBanner(ctx, w, h) {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, palette.dark);
  grad.addColorStop(0.5, "#0a1a0a");
  grad.addColorStop(1, "#0a0a20");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = palette.ink;
  ctx.font = `bold ${h * 0.14}px "Inter", system-ui, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("ChartGPT", w * 0.07, h * 0.38);

  ctx.fillStyle = palette.muted;
  ctx.font = `${h * 0.055}px "Inter", system-ui, sans-serif`;
  ctx.fillText("Unlock the power of AI with GPT-5.", w * 0.07, h * 0.56);
  ctx.fillText("Table summarization, charting, code generation.", w * 0.07, h * 0.64);

  const logoSize = h * 0.3;
  drawChartGPTLogo(ctx, w * 0.82, h * 0.35, logoSize);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("canvas[data-design]").forEach((canvas) => {
    const design = canvas.dataset.design;
    const logicalW = parseInt(canvas.dataset.w, 10) || 64;
    const logicalH = parseInt(canvas.dataset.h, 10) || 64;
    const ctx = scaleCanvas(canvas, logicalW, logicalH);
    if (design === "logo") drawChartGPTLogo(ctx, 0, 0, logicalW);
    else if (design === "favicon") drawFavicon(ctx, logicalW);
    else if (design === "og-banner") drawOGBanner(ctx, logicalW, logicalH);
  });
});
