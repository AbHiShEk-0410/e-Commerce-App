import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
export function Wishlist() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartDispatch } = useCart();

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
                query: "ADD_OR_REMOVE_FROM_CART",
                item: itemInWishlist
              })
            }
          >
            Wishlist
          </button>
          <button
            onClick={() =>
              cartDispatch({
                query: "ADD_TO_CART",
                item: itemInWishlist
              })
            }
          >Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
