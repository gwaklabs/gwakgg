import { C, bg, body, footer, kicker, pill, rect, rule, text, title } from "./helpers.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Investor pitch");
  text(slide, ctx, "gwak.gg", 58, 108, 340, 44, { size: 28, bold: true });
  title(slide, ctx, "The unified market feed for three related ways people discover opportunities.", {
    y: 180,
    w: 700,
    h: 158,
    size: 44,
  });
  body(
    slide,
    ctx,
    "Meme tokens, prediction markets, and whale position signals already influence each other. gwak.gg puts discovery, staking, portfolio tracking, and withdrawal into one Solana wallet experience.",
    62,
    370,
    600,
    86,
    { size: 17, color: C.ink },
  );
  rule(slide, ctx, 58, 506, 600, C.rule, 1);
  [
    ["3 rails", "meme, prediction, whale"],
    ["1 wallet", "USDC-funded Solana account"],
    ["1 feed", "ranked by live signal heat"],
  ].forEach((m, i) => {
    const x = 62 + i * 194;
    text(slide, ctx, m[0], x, 540, 150, 30, { size: 24, serif: true, bold: true });
    body(slide, ctx, m[1], x, 574, 150, 24, { size: 10.5 });
  });

  rect(slide, ctx, 782, 96, 328, 474, C.deep);
  rect(slide, ctx, 816, 138, 260, 112, "#23252D", { line: ctx.line("#343741", 1) });
  rect(slide, ctx, 816, 278, 260, 112, "#23252D", { line: ctx.line("#343741", 1) });
  rect(slide, ctx, 816, 418, 260, 112, "#23252D", { line: ctx.line("#343741", 1) });
  pill(slide, ctx, "MEME", 836, 156, 78, C.green, { fill: "#18231D" });
  pill(slide, ctx, "PREDICTION", 836, 296, 116, C.yellow, { fill: "#262214" });
  pill(slide, ctx, "WHALE", 836, 436, 84, C.blue, { fill: "#192133" });
  text(slide, ctx, "one funded\nmarket surface", 954, 170, 94, 58, {
    size: 16,
    color: C.white,
    serif: true,
    bold: true,
    align: "right",
  });
  text(slide, ctx, "discover\ncompare\nstake", 968, 310, 80, 64, {
    size: 16,
    color: C.white,
    serif: true,
    bold: true,
    align: "right",
  });
  text(slide, ctx, "track\nclose\nwithdraw", 968, 450, 80, 64, {
    size: 16,
    color: C.white,
    serif: true,
    bold: true,
    align: "right",
  });
  rect(slide, ctx, 1122, 250, 42, 1, C.green);
  rect(slide, ctx, 1122, 390, 42, 1, C.yellow);
  rect(slide, ctx, 1122, 530, 42, 1, C.blue);
  footer(slide, ctx, 1, "Source: local product guidance and project specs");
  return slide;
}
