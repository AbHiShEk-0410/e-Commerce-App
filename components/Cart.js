import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export function Cart() {
  const {cartState, cartDispatch} = useCart();
  const {WishlistDispatch} = useWishlist();

  return (
    <div>
      {cartState.cartItems.map((itemInCart) => (
        <div id={itemInCart.id}>
          <img src={itemInCart.image} alt="img"></img>
          <h1>{itemInCart.name}</h1>
          <strong>{itemInCart.price}</strong>
          <button
            onClick={() =>
              cartDispatch({ 
                query: "SUBTRACT_ONE_MORE", 
                item: itemInCart })
            }
          >
            -
          </button>
          {itemInCart.quantity}
          <button
            onClick={() =>
              cartDispatch({ 
                query: "ADD_ONE_MORE", 
                item: itemInCart })
            }
          >
            +
          </button>
          <button
            onClick={() =>
              cartDispatch({ 
                query: "REMOVE_FROM_CART", 
                item: itemInCart })
            }
          >
            Remove from Cart
          </button>
          <button
            onClick={() =>
              WishlistDispatch({
                query: "ADD_OR_REMOVE_FROM_WISHLIST",
                item: itemInCart
              })
            }
          >
            Wishlist
          </button>
        </div>
      ))}
    </div>
  );
}
