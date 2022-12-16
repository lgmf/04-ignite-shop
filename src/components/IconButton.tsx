import { styled } from "../styles";

export const IconButton = styled("button", {
  backgroundColor: "$green500",
  color: "$white",
  padding: "0.75rem",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  width: "$md",

  svg: {
    fontSize: "$md",
  },

  "&:disabled": {
    backgroundColor: "$gray300",
    color: "$gray500",
    cursor: "not-allowed",
  },

  variants: {
    color: {
      danger: {
        backgroundColor: "$errorLight",
      },
    },
    size: {
      lg: {
        svg: {
          fontSize: "$lg",
        },
      },
      xl: {
        svg: {
          fontSize: "$xl",
        },
      },
      "2xl": {
        svg: {
          fontSize: "$2xl",
        },
      },
    },
  },
});
