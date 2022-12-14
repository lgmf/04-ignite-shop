import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

interface ShoppingCartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface AddItem {
  type: "ADD_ITEM";
  payload: ShoppingCartItem;
}

interface RemoveItem {
  type: "REMOVE_ITEM";
  payload: { id: string };
}

type ShoppingCartItemAction = AddItem | RemoveItem;

interface ShoppingCartContextValue {
  items: ShoppingCartItem[];
  quantity: number;
  total: number;
  dispatch: Dispatch<ShoppingCartItemAction>;
}

const ShoppingCartContext = createContext<ShoppingCartContextValue | null>(
  null
);

function calculateTotal(items: ShoppingCartItem[]) {
  return items.reduce((total, item) => total + item.price, 0);
}

function itemsReducer(
  items: ShoppingCartItem[],
  action: ShoppingCartItemAction
) {
  switch (action.type) {
    case "ADD_ITEM":
      const isAlreadyAdded = items.some(
        (item) => item.id === action.payload.id
      );

      if (isAlreadyAdded) {
        return items;
      }

      return [...items, action.payload];
    case "REMOVE_ITEM":
      return items.filter((item) => item.id !== action.payload.id);
    default:
      return items;
  }
}

export function useShoppingCart() {
  const shoppingCart = useContext(ShoppingCartContext);

  if (!shoppingCart) {
    throw new Error(
      "useShoppingCart must be used by children of ShoppingCartProvider"
    );
  }

  return shoppingCart;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [items, dispatch] = useReducer(itemsReducer, []);

  const value: ShoppingCartContextValue = {
    items,
    quantity: items.length,
    total: calculateTotal(items),
    dispatch,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
