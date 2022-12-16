import { styled } from "../../styles";

export const LayoutContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minHeight: "100vh",
  gap: "1rem",
});

export const MainContainer = styled("div", {
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
});

export const ShowShoppingCartButton = styled("button", {
  backgroundColor: "$gray800",
  color: "$white",
  padding: "0.75rem",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  position: "relative",

  "&:disabled": {
    cursor: "not-allowed",

    "&::after": {
      content: "none",
    },

    svg: {
      color: "$gray500",
    },
  },

  "&::after": {
    position: "absolute",
    right: -7,
    top: -7,
    backgroundColor: "$green500",
    color: "$white",
    width: 24,
    height: 24,
    borderRadius: "50%",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  svg: {
    fontSize: "$xl",
  },
});
