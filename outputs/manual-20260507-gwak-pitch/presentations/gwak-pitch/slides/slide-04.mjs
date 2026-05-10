import { C, bg, body, footer, kicker, pill, rect, rule, text, title } from "./helpers.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Product");
  title(slide, ctx, "A vertical feed turns market discovery into a single, repeatable action pattern.", {
    w: 720,
    h: 106,
    size: 35,
  });
  body(slide, ctx, "Each card explains why the opportunity is hot, then lets the user choose a small preset stake without switching apps.", 58, 252, 610, 54, {
    size: 16,
  });

  rect(slide, ctx, 770, 78, 292, 560, C.deep);
  rect(slide, ctx, 792, 102, 248, 512, "#252730", { line: ctx.line("#3A3D45", 1) });
  text(slide, ctx, "$83.40 ready", 862, 126, 108, 24, { size: 11, color: C.white, bold: true, align: "center" });
  pill(slide, ctx, "PREDICTION", 822, 176, 114, C.yellow, { fill: "#302819" });
  text(slide, ctx, "Will the market price\nmove before Friday?", 822, 226, 190, 96, {
    size: 22,
    color: C.white,
    serif: true,
    bold: true,
  });
  ["volume up", "odds changed", "near resolve"].forEach((item, i) => {
    rect(slide, ctx, 822, 330 + i * 38, 156, 24, "#30323A", { line: ctx.line("#40434C", 1) });
    text(slide, ctx, item, 842, 335 + i * 38, 116, 14, { size: 8.5, color: "#D8D4CC", align: "center" });
  });
  ["$5", "$10", "$20", "$50"].forEach((v, i) => {
    rect(slide, ctx, 822 + (i % 2) * 99, 478 + Math.floor(i / 2) * 48, 84, 34, i === 2 ? C.yellow : "#30323A", {
      line: ctx.line(i === 2 ? C.yellow : "#40434C", 1),
    });
    text(slide, ctx, v, 822 + (i % 2) * 99, 486 + Math.floor(i / 2) * 48, 84, 16, {
      size: 11,
      color: i === 2 ? C.ink : C.white,
      bold: true,
      align: "center",
    });
  });

  const leftX = 74;
  [
    ["Signal card", "ranked by heat score", C.green],
    ["Decision action", "$5 / $10 / $20 / $50", C.yellow],
    ["Portfolio state", "open, close, withdraw", C.blue],
  ].forEach(([h, s, color], i) => {
    const y = 346 + i * 78;
    rect(slide, ctx, leftX, y, 492, 56, "#FBF8F1", { line: ctx.line(color, 2) });
    text(slide, ctx, h, leftX + 20, y + 14, 150, 22, { size: 15, bold: true });
    body(slide, ctx, s, leftX + 194, y + 17, 250, 18, { size: 11 });
  });
  rule(slide, ctx, 600, 374, 96, C.rule, 2);
  rule(slide, ctx, 600, 452, 96, C.rule, 2);
  rule(slide, ctx, 600, 530, 96, C.rule, 2);
  footer(slide, ctx, 4, "Product structure: vertical feed, signal chips, preset stakes, portfolio loop");
  return slide;
}
