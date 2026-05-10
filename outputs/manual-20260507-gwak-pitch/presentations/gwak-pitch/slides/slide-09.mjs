import { C, bg, body, footer, kicker, rect, rule, text, title } from "./helpers.mjs";

export async function slide09(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Launch path");
  title(slide, ctx, "MVP scope is narrow enough to ship, but broad enough to own the workflow.", {
    w: 780,
    h: 102,
    size: 37,
  });
  body(slide, ctx, "The first version proves the loop with real feeds, real Solana execution, and one portfolio. Expansion can then come from better ranking, watchlists, and deeper rail coverage.", 58, 210, 760, 54, {
    size: 16,
  });

  const phases = [
    ["Now", "Ship waitlist and live demo loop", C.green],
    ["MVP", "Three rails, one wallet, portfolio", C.yellow],
    ["Next", "Personalized discovery and alerts", C.blue],
    ["Scale", "More markets, deeper analytics", C.lavender],
  ];
  phases.forEach(([label, sub, color], i) => {
    const x = 90 + i * 286;
    rect(slide, ctx, x, 360, 220, 98, i === 1 ? C.deep : C.paper2, { line: ctx.line(color, 2) });
    text(slide, ctx, label, x + 22, 382, 176, 25, {
      size: 20,
      color: i === 1 ? C.white : C.ink,
      serif: true,
      bold: true,
      align: "center",
    });
    text(slide, ctx, sub, x + 20, 420, 180, 24, {
      size: 10.5,
      color: i === 1 ? "#D8D4CC" : C.soft,
      align: "center",
    });
    if (i < phases.length - 1) {
      rule(slide, ctx, x + 220, 409, 66, color, 3);
    }
  });

  rect(slide, ctx, 226, 552, 828, 62, "#00000000", { line: ctx.line(C.rule, 1) });
  text(slide, ctx, "Ask: launch partners, early users, and capital to turn the unified market feed into the default daily workflow.", 260, 566, 760, 40, {
    size: 15,
    color: C.ink,
    bold: true,
    align: "center",
  });
  footer(slide, ctx, 9, "Roadmap framed around shipped repo capabilities and near-term product scope");
  return slide;
}
