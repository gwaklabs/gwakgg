import { C, bg, body, footer, kicker, pill, rect, rule, text, title } from "./helpers.mjs";

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.deep);
  kicker(slide, ctx, "Insight", true);
  title(slide, ctx, "The three rails are separate products today, but they often answer the same question.", {
    color: C.white,
    w: 780,
    h: 104,
    size: 34,
  });
  body(slide, ctx, "What is moving, why is it moving, and who is already positioned?", 58, 246, 720, 34, {
    size: 18,
    color: "#D8D4CC",
  });

  const cx = 640;
  const cy = 400;
  rect(slide, ctx, cx - 120, cy - 118, 240, 236, "#202229", { line: ctx.line("#3A3D45", 1) });
  text(slide, ctx, "related\ndiscovery loop", cx - 76, cy - 34, 152, 72, {
    size: 22,
    color: C.white,
    serif: true,
    bold: true,
    align: "center",
  });

  const nodes = [
    ["Meme", "price and community attention", 218, 286, C.green],
    ["Prediction", "belief change and event timing", 824, 286, C.yellow],
    ["Whale", "large position movement", 522, 532, C.blue],
  ];
  nodes.forEach(([label, sub, x, y, color]) => {
    rect(slide, ctx, x, y, 236, 86, "#252730", { line: ctx.line(color, 2) });
    text(slide, ctx, label, x + 20, y + 17, 196, 24, { size: 18, color: C.white, bold: true, align: "center" });
    text(slide, ctx, sub, x + 22, y + 48, 192, 22, { size: 9.5, color: "#CFC8BD", align: "center" });
  });
  rule(slide, ctx, 454, 328, 366, C.rule, 1);
  rule(slide, ctx, 390, 370, 176, C.rule, 1);
  rule(slide, ctx, 714, 370, 176, C.rule, 1);
  pill(slide, ctx, "shared context, different action", 500, 304, 280, C.green, { fill: "#202229", h: 30, size: 9 });
  body(
    slide,
    ctx,
    "A token can move because an event changes odds. A whale position can validate or challenge the same story. The product value is making those links visible fast.",
    172,
    622,
    936,
    38,
    { size: 16, color: "#E8E1D7", align: "center" },
  );
  footer(slide, ctx, 3, "Product insight: discovery rails are correlated enough to share one feed", true);
  return slide;
}
