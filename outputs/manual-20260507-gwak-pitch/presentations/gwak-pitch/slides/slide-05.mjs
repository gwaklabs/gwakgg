import { C, bg, body, footer, kicker, node, rect, rule, text, title } from "./helpers.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Journey");
  title(slide, ctx, "The user journey collapses scattered tabs into one funded loop.", {
    w: 760,
    h: 96,
    size: 37,
  });
  body(slide, ctx, "The same wallet funds every rail, the same feed discovers every opportunity, and the same portfolio tracks the result.", 58, 204, 700, 46, {
    size: 16,
  });

  const steps = [
    ["Log in", "Privy embedded wallet"],
    ["Fund", "USDC balance"],
    ["Discover", "ranked feed"],
    ["Stake", "preset amount"],
    ["Manage", "portfolio and withdrawal"],
  ];
  steps.forEach(([label, sub], i) => {
    const x = 78 + i * 224;
    const fill = i === 2 ? C.deep : C.paper2;
    const color = i === 2 ? C.white : C.ink;
    node(slide, ctx, label, sub, x, 338, 164, 86, fill, color);
    text(slide, ctx, `0${i + 1}`, x + 56, 286, 52, 38, {
      size: 30,
      color: [C.green, C.yellow, C.blue, C.lavender, C.ink][i],
      serif: true,
      bold: true,
      align: "center",
    });
    if (i < steps.length - 1) {
      rule(slide, ctx, x + 164, 381, 60, [C.green, C.yellow, C.blue, C.lavender][i], 3);
    }
  });

  rect(slide, ctx, 180, 520, 920, 66, "#00000000", { line: ctx.line(C.rule, 1) });
  text(slide, ctx, "The workflow is deliberately simple: users should spend time comparing live opportunities, not moving assets between tools.", 214, 535, 852, 42, {
    size: 16,
    color: C.ink,
    serif: true,
    bold: true,
    align: "center",
  });
  footer(slide, ctx, 5, "User journey from repo routes: login, deposit, feed, bet routes, portfolio, withdraw");
  return slide;
}
