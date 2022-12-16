import { atom } from "jotai";
import { ShoppingCartItem } from "./types";

export const showShoppingCartAtom = atom(false);

export const shoppingCartAtom = atom<ShoppingCartItem[]>([]);

export const shoppingCartTotalAtom = atom((get) =>
  get(shoppingCartAtom).reduce((total, item) => total + item.price, 0)
);

export const shoppingCartQuantityAtom = atom(
  (get) => get(shoppingCartAtom).length
);

export const checkAlreadyAddedToCartAtom = atom((get) => {
  const items = get(shoppingCartAtom);

  return (productId: string) => {
    return items.some((item) => item.id === productId);
  };
});

export const addItemToCartAtom = atom<null, ShoppingCartItem>(
  null,
  (get, set, item) => {
    const items = get(shoppingCartAtom);
    set(shoppingCartAtom, [...items, item]);
  }
);

export const removeItemFromCartAtom = atom<null, { itemIdToRemove: string }>(
  null,
  (get, set, { itemIdToRemove }) => {
    const items = get(shoppingCartAtom);
    const next = items.filter((item) => item.id !== itemIdToRemove);

    set(shoppingCartAtom, next);
  }
);
