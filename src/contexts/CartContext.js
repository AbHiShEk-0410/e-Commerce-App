import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  function CartReducer({ cartItems, idInCart }, { query, item }) {
    // This function is handle all the functionalities related to cart management i.e
    // Add to Cart, Remove from Cart and Increase or Decrease the count of ADDED product

    //Structure of  action = {query : " ", item : " "}
    // idInCart => To keep track whats there in cart

    switch (query) {
      case "ADD_TO_CART":
        return {
          idInCart: [...idInCart, item.id],
          cartItems: [...cartItems, { ...item, quantity: 1 }]
        };

      case "ADD_ONE_MORE":
        const increasedCartItems = cartItems.map((itemInCart) => {
          return itemInCart.id === item.id
            ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
            : itemInCart;
        });
        return { idInCart, cartItems: increasedCartItems };

      case "SUBTRACT_ONE_MORE":
        const decreasedCartItems = cartItems.map((itemInCart) => {
          if (itemInCart.id === item.id) {
            return { ...itemInCart, quantity: itemInCart.quantity - 1 };
          } else {
            return itemInCart;
          }
        });
        return { idInCart, cartItems: decreasedCartItems };

      case "REMOVE_FROM_CART":
        return {
          idInCart: idInCart.filter((id) => id !== item.id),
          cartItems: cartItems.filter((itemInCart) => item.id !== itemInCart.id)
        };

      default:
        return { cartItems, idInCart };
    }
  }

  const [cartState, cartDispatch] = useReducer(CartReducer, {
    cartItems: [],
    idInCart: []
  });
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}