import { Roboto } from "@next/font/google";
import { globalCss } from ".";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button": {
    fontFamily: roboto.style.fontFamily,
    fontWeight: 400,
  },
});
