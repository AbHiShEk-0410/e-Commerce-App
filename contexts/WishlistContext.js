import { useReducer, useContext, createContext } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  function WishlistReducer({ wishlist, idInWishlist }, { query, item }) {
    // This function is to handle all the functionalities related to wishlist management i.e
    // Remove from Wishlist and Add to Cart

    // idInWishlist => To enable add or remove from wishlist functionality through one button
    switch (query) {
      case "ADD_OR_REMOVE_FROM_WISHLIST":
        if (idInWishlist.includes(item.id) !== undefined) {
          return {
            idInWishlist: idInWishlist.filter((id) => id !== item.id),
            wishlist: wishlist.filter(
              (itemInWishlist) => item.id !== itemInWishlist.id
            )
          };
        } else {
          return {
            idInWishlist: [...idInWishlist, item.id],
            wishlist: [...wishlist, item]
          };
        }
      default:
        return { wishlist, idInWishlist };
    }
  }
  const [wishlistState, wishlistDispatch] = useReducer(WishlistReducer, {
    wishlist: [],
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
