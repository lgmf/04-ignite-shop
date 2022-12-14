import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";

import { ShoppingCartProvider } from "../context/ShoppingCart";
import { Header } from "../components/Header";
import { ShoppingCart } from "../components/ShoppingCart";

globalStyles();

function App({ Component, pageProps }: AppProps) {
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  function handleOpenShoppingCart() {
    setShowShoppingCart(true);
  }

  function handleCloseShoppingCart() {
    setShowShoppingCart(false);
  }

  return (
    <ShoppingCartProvider>
      <Container>
        <Header onShowShoppingCartClick={handleOpenShoppingCart} />

        <Component {...pageProps} />

        <ShoppingCart
          open={showShoppingCart}
          onClose={handleCloseShoppingCart}
        />
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
