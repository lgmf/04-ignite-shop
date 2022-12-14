import Image from "next/image";
import Link from "next/link";
import { Bag } from "phosphor-react";

import { styled } from "../styles";
import logoImg from "../assets/logo.svg";

import { useShoppingCart } from "../context/ShoppingCart";

interface HeaderProps {
  onShowShoppingCartClick: () => void;
}

const StyledHeader = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
});

const ShowShoppingCartButton = styled("button", {
  backgroundColor: "$gray800",
  color: "$white",
  padding: "0.75rem",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  position: "relative",

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

export function Header({ onShowShoppingCartClick }: HeaderProps) {
  const { quantity } = useShoppingCart();

  const hasItemsOnCart = quantity > 0;

  return (
    <StyledHeader>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <ShowShoppingCartButton
        disabled={!hasItemsOnCart}
        title="Mostrar o carrinho"
        css={{
          "&::after": {
            content: hasItemsOnCart ? `${quantity}` : "none",
          },
          svg: {
            color: hasItemsOnCart ? "$gray300" : "$gray500",
          },
        }}
        onClick={onShowShoppingCartClick}
      >
        <Bag />
      </ShowShoppingCartButton>
    </StyledHeader>
  );
}
