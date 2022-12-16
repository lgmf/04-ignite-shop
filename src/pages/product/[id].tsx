import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Stripe from "stripe";
import { useAtomValue, useSetAtom } from "jotai";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { formatPrice } from "../../utils/price";
import {
  addItemToCartAtom,
  checkAlreadyAddedToCartAtom,
  removeItemFromCartAtom,
} from "../../store";
import { PrivateLayout } from "../../components/PrivateLayout";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const addItemToCart = useSetAtom(addItemToCartAtom);
  const removeItemFromCart = useSetAtom(removeItemFromCartAtom);
  const checkAlreadyAddedToCart = useAtomValue(checkAlreadyAddedToCartAtom);

  const isAlreadyAddedToCart = checkAlreadyAddedToCart(product.id);

  function handleAddToCart() {
    addItemToCart({
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
    });
  }

  function handleRemoveFromCart() {
    removeItemFromCart({ itemIdToRemove: product.id });
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <PrivateLayout>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>

          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{formatPrice(product.price)}</span>

            <p>{product.description}</p>

            {isAlreadyAddedToCart ? (
              <button onClick={handleRemoveFromCart}>Remover da sacola</button>
            ) : (
              <button onClick={handleAddToCart}>Colocar na sacola</button>
            )}
          </ProductDetails>
        </ProductContainer>
      </PrivateLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MywnCZVJpYzCXO" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
