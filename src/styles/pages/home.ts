import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,
});

export const ProductFooter = styled("footer", {
  position: "absolute",
  bottom: "0.25rem",
  left: "0.25rem",
  right: "0.25rem",
  padding: "1.25rem",

  borderRadius: 6,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  backgroundColor: "rgba(0, 0, 0, 0.6)",

  transform: "translateY(110%)",
  opacity: 0,
  transition: "all 0.2s ease-in-out",

  div: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",

    strong: {
      fontSize: "$lg",
      lineHeight: "1.6",
      color: "$gray100",
    },

    span: {
      fontSize: "$xl",
      lineHeight: "1.42",
      fontWeight: "bold",
      color: "$green300",
    },
  },
});

export const IconButton = styled("button", {
  backgroundColor: "$green500",
  color: "$white",
  padding: "0.75rem",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  width: "$md",

  svg: {
    fontSize: "$2xl",
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
  },
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  "&:hover": {
    [`& ${ProductFooter}`]: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
