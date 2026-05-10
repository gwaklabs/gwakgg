import { C, bg, body, footer, kicker, node, rect, rule, text, title } from "./helpers.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper2);
  kicker(slide, ctx, "System");
  title(slide, ctx, "Live external signals resolve into one Solana execution layer.", {
    w: 760,
    h: 96,
    size: 37,
  });
  body(slide, ctx, "The product does not need to own every venue. It turns external data into ranked cards, then uses Solana-native execution for the actual position.", 58, 204, 730, 48, {
    size: 16,
  });

  text(slide, ctx, "Signal sources", 92, 304, 180, 20, { size: 12, color: C.soft, bold: true });
  text(slide, ctx, "Ranking", 420, 304, 180, 20, { size: 12, color: C.soft, bold: true });
  text(slide, ctx, "Product surface", 708, 304, 180, 20, { size: 12, color: C.soft, bold: true });
  text(slide, ctx, "Execution", 986, 304, 180, 20, { size: 12, color: C.soft, bold: true });

  [["DexScreener", "meme heat", C.green], ["Jupiter Prediction", "event liquidity", C.yellow], ["Hyperliquid", "whale signals", C.blue]].forEach(
    ([label, sub, color], i) => {
      node(slide, ctx, label, sub, 76, 344 + i * 80, 210, 76, "#FFFFFF", C.ink);
      rect(slide, ctx, 76, 344 + i * 80, 5, 76, color);
    },
  );
  node(slide, ctx, "Heat score", "0-100 per signal", 394, 392, 192, 88, C.deep, C.white);
  node(slide, ctx, "Vertical feed", "top opportunities", 690, 392, 192, 88, "#FFFFFF", C.ink);
  node(slide, ctx, "Solana wallet", "Jupiter, Prediction, Flash", 976, 392, 210, 88, C.deep, C.white);
  rule(slide, ctx, 286, 424, 108, C.rule, 2);
  rule(slide, ctx, 586, 436, 104, C.rule, 2);
  rule(slide, ctx, 882, 436, 94, C.rule, 2);
  rule(slide, ctx, 286, 504, 108, C.rule, 2);
  rule(slide, ctx, 286, 584, 108, C.rule, 2);

  rect(slide, ctx, 376, 560, 830, 50, "#00000000", { line: ctx.line(C.rule, 1) });
  text(slide, ctx, "Data sources stay specialized; the user experience becomes unified.", 406, 576, 770, 18, {
    size: 15,
    color: C.ink,
    bold: true,
    align: "center",
  });
  footer(slide, ctx, 6, "Architecture: source APIs, heat scoring, feed routes, Solana execution routes");
  return slide;
}
