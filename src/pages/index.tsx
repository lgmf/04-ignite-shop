import { MouseEvent } from "react";
import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { Bag, Trash } from "phosphor-react";
import { useAtomValue, useSetAtom } from "jotai";
import { stripe } from "../lib/stripe";
import { HomeContainer, Product, ProductFooter } from "../styles/pages/home";
import { formatPrice } from "../utils/price";
import {
  addItemToCartAtom,
  checkAlreadyAddedToCartAtom,
  removeItemFromCartAtom,
} from "../store";
import { PrivateLayout } from "../components/PrivateLayout";
import { IconButton } from "../components/IconButton";

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
  const addItemToCart = useSetAtom(addItemToCartAtom);
  const removeItemFromCart = useSetAtom(removeItemFromCartAtom);
  const checkAlreadyAddedToCart = useAtomValue(checkAlreadyAddedToCartAtom);

  function handleAddToCart(product: Product) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      addItemToCart({
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
      });
    };
  }

  function handleRemoveFromCart(id: string) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      removeItemFromCart({ itemIdToRemove: id });
    };
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <PrivateLayout>
        <HomeContainer>
          {products.map((product) => {
            const isAlreadyAddedToCart = checkAlreadyAddedToCart(product.id);

            return (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                prefetch={false}
              >
                <Product>
                  <Image
                    src={product.imageUrl}
                    width={380}
                    height={350}
                    alt=""
                  />

                  <ProductFooter>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{formatPrice(product.price)}</span>
                    </div>

                    {isAlreadyAddedToCart ? (
                      <IconButton
                        title="Remover do carrinho"
                        size="lg"
                        color="danger"
                        onClick={handleRemoveFromCart(product.id)}
                      >
                        <Trash />
                      </IconButton>
                    ) : (
                      <IconButton
                        title="Adicionar ao carrinho"
                        size="lg"
                        onClick={handleAddToCart(product)}
                      >
                        <Bag />
                      </IconButton>
                    )}
                  </ProductFooter>
                </Product>
              </Link>
            );
          })}
        </HomeContainer>
      </PrivateLayout>
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
