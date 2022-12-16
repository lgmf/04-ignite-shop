import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { X } from "phosphor-react";
import { useState } from "react";

import {
  shoppingCartAtom,
  shoppingCartQuantityAtom,
  shoppingCartTotalAtom,
} from "../../store";
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

  const [shoppingCart, setShoppingCart] = useAtom(shoppingCartAtom);
  const [quantity] = useAtom(shoppingCartQuantityAtom);
  const [total] = useAtom(shoppingCartTotalAtom);

  function handleRemoveFromCart(id: string) {
    return () => {
      setShoppingCart((prev) => prev.filter((item) => item.id !== id));
    };
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const productIds = shoppingCart.map((item) => item.id);

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
        {shoppingCart.map((item) => (
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

        <span>{quantity} itens</span>

        <p>Valor total</p>

        <p>{formatPrice(total)}</p>
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
