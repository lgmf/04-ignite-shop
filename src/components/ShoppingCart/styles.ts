import { styled } from "../../styles";

export const Container = styled("aside", {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100%",
  backgroundColor: "$gray800",
  color: "$white",
  width: 480,
  padding: "4.5rem 3rem 3rem",
  transform: "translateX(200%)",
  transition: "transform 300ms ease-in",
  display: "flex",
  flexDirection: "column",

  "& > p": {
    fontSize: "$lg",
    fontWeight: "bold",
    marginBottom: "2rem",
  },

  variants: {
    open: {
      true: {
        transform: "translateY(0)",
      },
    },
  },
});

export const CloseButton = styled("button", {
  background: "transparent",
  border: "none",
  position: "absolute",
  top: 24,
  right: 24,
  fontSize: "$xl",
  color: "$gray500",
  cursor: "pointer",
});

export const ItemsList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const ItemsListItem = styled("li", {
  display: "flex",
  gap: "1.25rem",

  "& > .img": {
    background: "$gradientPrimary",
    borderRadius: 8,
  },

  "& > .details": {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    span: {
      fontSize: "$md",
      lineHeight: 1.6,
      color: "$gray300",
    },

    p: {
      fontSize: "$md",
      lineHeight: 1.6,
      fontWeight: 700,
      color: "$gray100",
    },

    button: {
      marginTop: "auto",
      cursor: "pointer",
      padding: "0.5rem 0",
      color: "$green500",
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 700,
      background: "transparent",
      border: "none",
      alignSelf: "flex-start",
    },
  },
});

export const Summary = styled("div", {
  marginTop: "auto",
  marginBottom: "3.375rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",

  span: {
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",

    "&:nth-child(even)": {
      textAlign: "right",
    },
  },

  p: {
    fontSize: "$lg",
    lineHeight: 1.6,
    fontWeight: 700,
    color: "$gray100",

    "&:nth-child(even)": {
      textAlign: "right",
    },
  },
});

export const CheckoutButton = styled("button", {
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",

  "&:disabled": {
    backgroundColor: "$gray300",
    color: "$gray500",
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    backgroundColor: "$green300",
  },
});
