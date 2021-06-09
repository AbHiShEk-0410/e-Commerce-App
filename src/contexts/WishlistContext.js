import { useReducer, useContext, createContext } from "react";
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    function WishlistReducer({ wishlistItems, idInWishlist }, { query, item }) {
        // This function is to handle all the functionalities related to wishlist management i.e
        // Remove from Wishlist and Add to Cart
        // idInWishlist => To enable add or remove from wishlist functionality through one button

        switch (query) {
            case "ADD_TO_WISHLIST":
                return {
                    idInWishlist: [...idInWishlist, item.id],
                    wishlistItems: [...wishlistItems, item]
                };

            case "REMOVE_FROM_WISHLIST":
                return {
                    idInWishlist: idInWishlist.filter((id) => id !== item.id),
                    wishlistItems: wishlistItems.filter(
                        (itemInCart) => item.id !== itemInCart.id
                    )
                };

            default:
                return { wishlistItems, idInWishlist };
        }
    }

    const [wishlistState, wishlistDispatch] = useReducer(WishlistReducer, {
        wishlistItems: [],
        idInWishlist: []
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