import Image from "next/image";
import Link from "next/link";
import { Bag } from "phosphor-react";
import { useAtomValue, useSetAtom } from "jotai";

import { styled } from "../styles";
import logoImg from "../assets/logo.svg";

import { shoppingCartQuantityAtom, showShoppingCartAtom } from "../store";

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

export function Header() {
  const quantity = useAtomValue(shoppingCartQuantityAtom);
  const setShowShoppingCart = useSetAtom(showShoppingCartAtom);

  const hasItemsOnCart = quantity > 0;

  function handleOpenShoppingCart() {
    setShowShoppingCart(true);
  }

  return (
    <StyledHeader>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <ShowShoppingCartButton
        disabled={!hasItemsOnCart}
        title={
          hasItemsOnCart ? "Mostrar o carrinho" : "Nenhum item no carrinho"
        }
        onClick={handleOpenShoppingCart}
        css={{
          "&::after": {
            content: `${quantity}`,
          },
        }}
      >
        <Bag />
      </ShowShoppingCartButton>
    </StyledHeader>
  );
}
