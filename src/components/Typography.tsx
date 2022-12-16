import { styled } from "../styles";

export const Typography = styled("span", {
  variants: {
    variant: {
      caption: {
        fontSize: "$sm",
        letterSpacing: "0.015625rem",
      },
    },
    color: {
      secondary: {
        color: "$gray300",
      },
    },
  },
});
