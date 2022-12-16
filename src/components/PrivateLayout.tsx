import { ReactNode } from "react";
import { useAtom } from "jotai";

import { Header } from "../components/Header";
import { ShoppingCart } from "../components/ShoppingCart";
import { showShoppingCartAtom } from "../store";
import { styled } from "../styles";

interface PrivateLayoutProps {
  children: ReactNode;
}

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minHeight: "100vh",
  paddingTop: "2.5rem",
});

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const [showShoppingCart, setShowShoppingCart] = useAtom(showShoppingCartAtom);

  function handleCloseShoppingCart() {
    setShowShoppingCart(false);
  }

  return (
    <Container>
      <Header />

      {children}

      <ShoppingCart open={showShoppingCart} onClose={handleCloseShoppingCart} />
    </Container>
  );
}
