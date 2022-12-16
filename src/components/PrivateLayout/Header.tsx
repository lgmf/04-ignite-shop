import Image from "next/image";
import Link from "next/link";
import { Bag } from "phosphor-react";
import { useAtomValue, useSetAtom } from "jotai";

import logoImg from "../../assets/logo.svg";

import { shoppingCartQuantityAtom, showShoppingCartAtom } from "../../store";
import { MainContainer, ShowShoppingCartButton } from "./styles";

export function Header() {
  const quantity = useAtomValue(shoppingCartQuantityAtom);
  const setShowShoppingCart = useSetAtom(showShoppingCartAtom);

  const hasItemsOnCart = quantity > 0;

  function handleOpenShoppingCart() {
    setShowShoppingCart(true);
  }

  return (
    <MainContainer
      css={{
        padding: "2rem 0",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <ShowShoppingCartButton
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
    </MainContainer>
  );
}
