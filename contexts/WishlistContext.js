import { useReducer, useContext, createContext, Children } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  let idInWishlist = []; //To enable add or remove from wishlist functionality through one button

  function WishlistReducer(state, { query, item }) {
    // This function is to handle all the functionalities related to wishlist management i.e
    // Remove from Wishlist and Add to Cart
    switch (query) {
      case "ADD_OR_REMOVE_FROM_WISHLIST":
        if (idInWishlist.includes(item.id)) {
          idInWishlist = idInWishlist.filter((id) => id !== item.id);
          return {
            wishlist: state.wishlist.filter(
              (itemInWishlist) => item.id !== itemInWishlist.id
            )
          };
        } else {
          idInWishlist.concat(item.id);
          return { wishlist: [...state.wishlist, item] };
        }
        break:
          return state
      
    }
  }
  const [wishlistState, wishlistDispatch] = useReducer(WishlistReducer, {
    wishlist: []
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
