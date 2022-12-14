import axios from "axios";
import Image from "next/image";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";

import { useShoppingCart } from "../../context/ShoppingCart";
import { formatPrice } from "../../utils/price";

import {
  Container,
  CloseButton,
  ItemsList,
  ItemsListItem,
  CheckoutButton,
  Summary,
} from "./styles";

interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
}

export function ShoppingCart({ open, onClose }: ShoppingCartProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const shoppingCart = useShoppingCart();

  function handleRemoveFromCart(id: string) {
    return () => {
      shoppingCart.dispatch({
        type: "REMOVE_ITEM",
        payload: {
          id,
        },
      });
    };
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const productIds = shoppingCart.items.map((item) => item.id);

      const response = await axios.post("/api/checkout", { productIds });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <Container open={open}>
      <CloseButton onClick={onClose}>
        <X />
      </CloseButton>

      <p>Sacola de compras</p>

      <ItemsList>
        {shoppingCart.items.map((item) => (
          <ItemsListItem key={item.id}>
            <div className="img">
              <Image src={item.imageUrl} width={100} height={100} alt="" />
            </div>

            <div className="details">
              <span>{item.name}</span>
              <p>{formatPrice(item.price)}</p>
              <button onClick={handleRemoveFromCart(item.id)}>Remover</button>
            </div>
          </ItemsListItem>
        ))}
      </ItemsList>

      <Summary>
        <span>Quantidade</span>

        <span>{shoppingCart.quantity} itens</span>

        <p>Valor total</p>

        <p>{formatPrice(shoppingCart.total)}</p>
      </Summary>

      <CheckoutButton
        disabled={isCreatingCheckoutSession}
        onClick={handleCheckout}
      >
        Finalizar compra
      </CheckoutButton>
    </Container>
  );
}
