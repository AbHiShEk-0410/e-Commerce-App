import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    let idInCart = []; //To disable the click when the item is added to cart

    function CartReducer(state, { query, item }) {
        // This function is handle all the functionalities related to cart management i.e
        // Add to Cart, Remove from Cart and Increase or Decrease the count of ADDED product

        //Structure of  action = {query : " ", item : " "}
        switch (query) {
            case "ADD_TO_CART":
                idInCart.concat(item.id);
                return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };

            case "ADD_ONE_MORE":
                const increasedCartItems = state.cartItems.map((itemInCart) => {
                    return itemInCart.id === item.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item;
                });
                return { cartItems: increasedCartItems };

            case "SUBTRACT_ONE_MORE":
                const decreasedCartItems = state.cartItems.map((itemInCart) => {
                    if (itemInCart.id === item.id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
                return { cartItems: decreasedCartItems };

            case "REMOVE_FROM_CART":
                return {
                    cartItems: state.cartItems.filter(
                        (itemInCart) => item.id !== itemInCart.id
                    )
                };

            default:
                return state;
        }
    }

    const [cartState, cartDispatch] = useReducer(CartReducer, { cartItems: [] });
    return (
        <CartContext.Provider value={{ cartState, cartDispatch, idInCart }}>
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    return useContext(CartContext);
}
