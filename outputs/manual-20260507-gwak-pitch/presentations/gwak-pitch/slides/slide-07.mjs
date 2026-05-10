import { C, bg, body, footer, kicker, rect, rule, text, title } from "./helpers.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Wallet layer");
  title(slide, ctx, "One funded Solana wallet removes the hidden friction behind multi-venue activity.", {
    w: 800,
    h: 102,
    size: 34,
  });
  body(slide, ctx, "The user sees one ready balance. Behind the scenes, Privy handles the embedded wallet and the gasless path keeps SOL fees out of the user decision.", 58, 246, 720, 52, {
    size: 16,
  });

  text(slide, ctx, "Before", 116, 316, 180, 22, { size: 18, serif: true, bold: true });
  text(slide, ctx, "With gwak.gg", 724, 316, 220, 22, { size: 18, serif: true, bold: true });
  [["Wallet A", 116, 374, C.green], ["Wallet B", 232, 456, C.yellow], ["Wallet C", 348, 374, C.blue]].forEach(([label, x, y, color]) => {
    rect(slide, ctx, x, y, 136, 58, "#FBF8F1", { line: ctx.line(color, 2) });
    text(slide, ctx, label, x + 18, y + 18, 100, 18, { size: 13, bold: true, align: "center" });
  });
  rule(slide, ctx, 252, 402, 96, C.rule, 2);
  rule(slide, ctx, 306, 448, 42, C.rule, 2);
  text(slide, ctx, "bridges, duplicate balances,\nmanual gas management", 132, 550, 346, 38, {
    size: 14,
    color: C.soft,
    align: "center",
  });

  rect(slide, ctx, 704, 374, 314, 132, C.deep);
  text(slide, ctx, "$83.40 ready", 724, 410, 274, 34, { size: 26, color: C.white, serif: true, bold: true, align: "center" });
  text(slide, ctx, "USDC balance across all rails", 760, 462, 202, 18, { size: 11, color: "#D8D4CC", align: "center" });
  ["Meme", "Prediction", "Whale"].forEach((label, i) => {
    rect(slide, ctx, 1054, 374 + i * 48, 96, 34, [C.green, C.yellow, C.blue][i]);
    text(slide, ctx, label, 1054, 383 + i * 48, 96, 14, { size: 9.5, color: C.ink, bold: true, align: "center" });
  });
  rule(slide, ctx, 1018, 438, 36, C.rule, 2);
  rect(slide, ctx, 622, 436, 48, 2, C.ink);
  rect(slide, ctx, 666, 431, 10, 10, C.ink);
  footer(slide, ctx, 7, "Wallet layer: Privy embedded Solana wallet, USDC balance, gasless server fee payer");
  return slide;
}
