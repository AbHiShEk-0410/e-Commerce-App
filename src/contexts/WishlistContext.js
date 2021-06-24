import { useReducer, useContext, createContext } from "react";
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
	function WishlistReducer(wishlistState, newWishlist) {
		return {
			idInWishlist: wishlistState.idInWishlist,
			wishlistItems: newWishlist,
		};
	}

	const [wishlistState, wishlistDispatch] = useReducer(WishlistReducer, {
		wishlistItems: [],
		idInWishlist: [],
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
