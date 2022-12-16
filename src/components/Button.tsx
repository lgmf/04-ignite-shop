import { styled } from "../styles";

export const Button = styled("button", {
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
