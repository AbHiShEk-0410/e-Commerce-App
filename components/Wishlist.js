import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { checkItemInObject } from "../utilities/checkItemInObject";

export function Wishlist() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();
  return (
    <div>
      {wishlistState.wishlistItems.map((itemInWishlist) => (
        <div id={itemInWishlist.id}>
          <img src={itemInWishlist.image} alt="img"></img>
          <h1>{itemInWishlist.name}</h1>
          <strong>{itemInWishlist.price}</strong>
          <button
            onClick={() =>
              wishlistDispatch({
                query: "REMOVE_FROM_WISHLIST",
                item: itemInWishlist
              })
            }
          >
            Wishlist
          </button>
          <button
            disabled={checkItemInObject(cartState.idInCart, itemInWishlist)}
            onClick={() =>
              cartDispatch({
                query: "ADD_TO_CART",
                item: itemInWishlist
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}