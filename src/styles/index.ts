import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: "#FFF",

      gray900: "#121214",
      gray800: "#202024",
      gray500: "#8d8d99",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875f",
      green300: "#00b37e",

      gradientPrimary: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",

      errorLight: "#ef5350",
      errorMain: "#d32f2f",
      errorDark: "#c62828",
    },

    fontSizes: {
      sm: "0.875rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },

    sizes: {
      sm: 24,
      md: 32,
    },
  },
});
