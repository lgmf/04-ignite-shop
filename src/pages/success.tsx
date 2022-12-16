import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImageList,
  SuccessContainer,
} from "../styles/pages/success";
import logoImg from "../assets/logo.svg";

interface SuccessProps {
  costumerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <ImageList>
          {products.map((product, index) => (
            <ImageContainer
              key={product.id}
              css={{
                transform:
                  index === 0 ? "none" : `translateX(-${index * 52}px)`,
              }}
            >
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImageList>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
          <strong>{products.length}</strong> camisetas já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session.customer_details.name;

  const products = session.line_items.data.map(
    (it) => it.price.product as Stripe.Product
  );

  return {
    props: {
      costumerName,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
      })),
    },
  };
};
