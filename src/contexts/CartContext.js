import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();
function CartReducer(cartState, newCart) {
	//The only dispatch function to manage whole cart because all the checks are now shifted to carRequestHandler
	return {
		idInCart: cartState.idInCart,
		cartItems: newCart,
	};
}
export function CartProvider({ children }) {

	const [cartState, cartDispatch] = useReducer(CartReducer, {
		cartItems: [],
		idInCart: [],
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
