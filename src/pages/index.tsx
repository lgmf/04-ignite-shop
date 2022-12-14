import { MouseEvent } from "react";
import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { Bag } from "phosphor-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { stripe } from "../lib/stripe";
import { HomeContainer, Product, ProductFooter } from "../styles/pages/home";
import { useShoppingCart } from "../context/ShoppingCart";
import { formatPrice } from "../utils/price";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  });

  const shoppingCart = useShoppingCart();

  function handleAddToCart(product: Product) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      shoppingCart.dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          imageUrl: product.imageUrl,
          name: product.name,
          price: product.price,
        },
      });
    };
  }

  function disableAddToCartButton(product: Product) {
    return shoppingCart.items.some((item) => item.id === product.id);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <ProductFooter>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </div>

                  <button
                    title="Adicionar ao carrinho"
                    onClick={handleAddToCart(product)}
                    disabled={disableAddToCartButton(product)}
                  >
                    <Bag />
                  </button>
                </ProductFooter>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  };
};
