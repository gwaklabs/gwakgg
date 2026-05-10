import { C, bg, body, footer, kicker, rect, rule, text, title } from "./helpers.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Problem");
  title(slide, ctx, "Active market users split attention, capital, and signing across too many surfaces.", {
    w: 780,
    h: 132,
    size: 38,
  });
  body(
    slide,
    ctx,
    "A single session can move between token charts, prediction markets, whale trackers, bridges, wallets, and portfolio tabs. The opportunity may be related, but the workflow is fragmented.",
    58,
    248,
    700,
    58,
    { size: 16 },
  );

  const items = [
    ["Meme token tools", 142, 342, C.green],
    ["Prediction venues", 430, 298, C.yellow],
    ["Whale trackers", 718, 342, C.blue],
    ["Separate wallets", 214, 506, C.lavender],
    ["Portfolio tabs", 592, 506, C.red],
  ];
  items.forEach(([label, x, y, color]) => {
    rect(slide, ctx, x, y, 194, 72, "#FBF8F1", { line: ctx.line(color, 2) });
    text(slide, ctx, label, x + 18, y + 20, 158, 26, { size: 15, bold: true, align: "center" });
  });
  rect(slide, ctx, 996, 310, 178, 194, C.deep);
  text(slide, ctx, "User cost", 1022, 336, 126, 24, { size: 16, color: C.white, bold: true, align: "center" });
  rule(slide, ctx, 1038, 377, 94, "#494B52", 1);
  ["missed context", "stale balances", "slow execution", "unclear exposure"].forEach((item, i) => {
    text(slide, ctx, item, 1022, 400 + i * 22, 132, 18, { size: 10.5, color: "#D8D4CC", align: "center" });
  });

  rule(slide, ctx, 336, 378, 92, C.rule, 2);
  rule(slide, ctx, 624, 334, 92, C.rule, 2);
  rule(slide, ctx, 240, 456, 104, C.rule, 2);
  rule(slide, ctx, 648, 456, 104, C.rule, 2);
  body(slide, ctx, "The core problem is not a lack of markets. It is too much context spread across too many execution environments.", 236, 614, 760, 48, {
    size: 18,
    color: C.ink,
    bold: true,
    align: "center",
  });
  footer(slide, ctx, 2, "Problem frame derived from user brief and shipped product architecture");
  return slide;
}
