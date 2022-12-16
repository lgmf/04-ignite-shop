import { ReactNode } from "react";
import { useAtom } from "jotai";

import { showShoppingCartAtom } from "../../store";

import { LayoutContainer, MainContainer } from "./styles";
import { Header } from "./Header";
import { ShoppingCart } from "./ShoppingCart";

interface PrivateLayoutProps {
  children: ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const [showShoppingCart, setShowShoppingCart] = useAtom(showShoppingCartAtom);

  function handleCloseShoppingCart() {
    setShowShoppingCart(false);
  }

  return (
    <LayoutContainer>
      <Header />

      <MainContainer css={{ paddingBottom: "2rem" }}>{children}</MainContainer>

      <ShoppingCart open={showShoppingCart} onClose={handleCloseShoppingCart} />
    </LayoutContainer>
  );
}
