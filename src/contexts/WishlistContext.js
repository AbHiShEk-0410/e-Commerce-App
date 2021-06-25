import { useReducer, useContext, createContext } from "react";
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
	function WishlistReducer(wishlistState, newWishlist) {
		return {
			wishlistItems: newWishlist,
		};
	}

	const [wishlistState, wishlistDispatch] = useReducer(WishlistReducer, {
		wishlistItems: [],
	});

	return (
		<WishlistContext.Provider value={{ wishlistState, wishlistDispatch }}>
			{children}
		</WishlistContext.Provider>
	);
}

export function useWishlist() {
	return useContext(WishlistContext);
}
