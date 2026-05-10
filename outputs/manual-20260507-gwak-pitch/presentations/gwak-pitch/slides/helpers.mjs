export const C = {
  paper: "#F7F2EA",
  paper2: "#FBF8F1",
  ink: "#111318",
  deep: "#17181D",
  soft: "#6C6A61",
  rule: "#DED6CA",
  green: "#32D583",
  yellow: "#F2B84B",
  blue: "#3E7BFA",
  lavender: "#8B5CF6",
  red: "#F97066",
  white: "#FFFFFF",
};

export function rect(slide, ctx, x, y, w, h, fill, opts = {}) {
  return ctx.addShape(slide, {
    left: x,
    top: y,
    width: w,
    height: h,
    fill,
    geometry: opts.geometry || "rect",
    line: opts.line || ctx.line(opts.lineColor || "#00000000", opts.lineWidth || 0),
    name: opts.name,
  });
}

export function text(slide, ctx, value, x, y, w, h, opts = {}) {
  return ctx.addText(slide, {
    text: String(value || ""),
    left: x,
    top: y,
    width: w,
    height: h,
    fontSize: opts.size || 18,
    color: opts.color || C.ink,
    bold: Boolean(opts.bold),
    typeface: opts.face || (opts.serif ? "Georgia" : "Avenir Next"),
    align: opts.align || "left",
    valign: opts.valign || "top",
    fill: opts.fill || "#00000000",
    line: opts.line || ctx.line(),
    insets: opts.insets || { left: 0, right: 0, top: 0, bottom: 0 },
    name: opts.name,
  });
}

export function bg(slide, ctx, fill = C.paper) {
  rect(slide, ctx, 0, 0, ctx.W, ctx.H, fill);
}

export function rule(slide, ctx, x, y, w, color = C.rule, h = 1) {
  rect(slide, ctx, x, y, w, h, color);
}

export function kicker(slide, ctx, label, dark = false) {
  const col = dark ? "#CFC8BD" : C.soft;
  rect(slide, ctx, 58, 52, 10, 10, C.green);
  text(slide, ctx, label.toUpperCase().split("").join(" "), 82, 45, 520, 24, {
    size: 9.5,
    color: col,
    bold: true,
    valign: "middle",
  });
}

export function title(slide, ctx, value, opts = {}) {
  text(slide, ctx, value, opts.x || 58, opts.y || 92, opts.w || 820, opts.h || 116, {
    size: opts.size || 39,
    color: opts.color || C.ink,
    serif: true,
    bold: true,
  });
}

export function body(slide, ctx, value, x, y, w, h, opts = {}) {
  text(slide, ctx, value, x, y, w, h, {
    size: opts.size || 15,
    color: opts.color || C.soft,
    bold: opts.bold,
    align: opts.align,
    valign: opts.valign,
  });
}

export function footer(slide, ctx, page, note, dark = false) {
  const y = 676;
  const col = dark ? "#8F8C85" : C.soft;
  rule(slide, ctx, 58, y, 1164, dark ? "#33343A" : C.rule, 1);
  text(slide, ctx, note, 58, y + 12, 840, 18, { size: 7.5, color: col });
  text(slide, ctx, String(page).padStart(2, "0"), 1176, y + 6, 48, 22, {
    size: 12,
    color: col,
    serif: true,
    bold: true,
    align: "right",
  });
}

export function pill(slide, ctx, label, x, y, w, color, opts = {}) {
  rect(slide, ctx, x, y, w, opts.h || 31, opts.fill || "#00000000", {
    line: ctx.line(color, 1),
  });
  text(slide, ctx, label, x + 12, y + 6, w - 24, 16, {
    size: opts.size || 9.5,
    color: opts.color || color,
    bold: true,
    align: "center",
    valign: "middle",
  });
}

export function node(slide, ctx, label, sub, x, y, w, h, fill, color = C.ink) {
  rect(slide, ctx, x, y, w, h, fill, { line: ctx.line(fill === C.deep ? C.deep : C.rule, 1) });
  text(slide, ctx, label, x + 18, y + 16, w - 36, 23, {
    size: 15,
    color,
    bold: true,
    align: "center",
  });
  if (sub) {
    text(slide, ctx, sub, x + 18, y + 43, w - 36, 28, {
      size: 9.5,
      color: fill === C.deep ? "#D8D4CC" : C.soft,
      align: "center",
    });
  }
}

export function miniBar(slide, ctx, label, value, x, y, w, color) {
  text(slide, ctx, label, x, y, 160, 20, { size: 10.5, color: C.soft, bold: true });
  rect(slide, ctx, x + 174, y + 5, w - 174, 9, "#ECE4D8");
  rect(slide, ctx, x + 174, y + 5, Math.max(8, (w - 174) * value), 9, color);
}
