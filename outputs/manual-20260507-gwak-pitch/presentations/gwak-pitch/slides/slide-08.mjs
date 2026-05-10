import { C, bg, body, footer, kicker, miniBar, rect, rule, text, title } from "./helpers.mjs";

export async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.deep);
  kicker(slide, ctx, "Business model", true);
  title(slide, ctx, "The model monetizes execution frequency while keeping exits free.", {
    color: C.white,
    w: 770,
    h: 102,
    size: 36,
  });
  body(slide, ctx, "Each open can carry a small platform fee, while portfolio closes and withdrawals stay free. That keeps the product aligned with fast discovery and responsible position management.", 58, 210, 750, 56, {
    size: 16,
    color: "#D8D4CC",
  });

  rect(slide, ctx, 86, 346, 308, 150, "#22242B", { line: ctx.line("#3A3D45", 1) });
  text(slide, ctx, "Open position", 120, 374, 240, 24, { size: 18, color: C.white, serif: true, bold: true, align: "center" });
  text(slide, ctx, "0.5% + $0.05", 120, 420, 240, 34, { size: 28, color: C.green, serif: true, bold: true, align: "center" });
  text(slide, ctx, "platform fee", 120, 462, 240, 16, { size: 10, color: "#D8D4CC", align: "center" });

  rect(slide, ctx, 486, 346, 308, 150, "#22242B", { line: ctx.line("#3A3D45", 1) });
  text(slide, ctx, "Close / withdraw", 520, 374, 240, 24, { size: 18, color: C.white, serif: true, bold: true, align: "center" });
  text(slide, ctx, "free", 520, 416, 240, 44, { size: 30, color: C.yellow, serif: true, bold: true, align: "center" });
  text(slide, ctx, "reduces exit anxiety", 520, 462, 240, 16, { size: 10, color: "#D8D4CC", align: "center" });

  rect(slide, ctx, 886, 326, 270, 210, C.paper);
  text(slide, ctx, "Expansion logic", 920, 356, 204, 24, { size: 18, color: C.ink, serif: true, bold: true, align: "center" });
  miniBar(slide, ctx, "More signals", 0.82, 914, 410, 196, C.green);
  miniBar(slide, ctx, "More saved lists", 0.66, 914, 448, 196, C.yellow);
  miniBar(slide, ctx, "More portfolio actions", 0.58, 914, 486, 196, C.blue);
  rule(slide, ctx, 394, 421, 92, C.rule, 2);
  rule(slide, ctx, 794, 421, 92, C.rule, 2);
  body(slide, ctx, "Monetization grows with useful action, not with custody complexity.", 214, 594, 850, 28, {
    size: 17,
    color: C.white,
    bold: true,
    align: "center",
  });
  footer(slide, ctx, 8, "Fee model from gasless trade implementation notes", true);
  return slide;
}
