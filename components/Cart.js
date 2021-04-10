import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useEffect, useState } from "react";
import { checkItemInObject } from "../utilities/checkItemInObject";

export function Cart() {
  const { cartState, cartDispatch } = useCart();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const [balance, setBalance] = useState(0);
  function useTotalPriceCalculator() {
    useEffect(() => {
      setBalance(
        cartState.cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        )
      );
    });
  }
  useTotalPriceCalculator();

  return (
    <div>
      Total {balance}
      {cartState.cartItems.map((itemInCart) => (
        <div id={itemInCart.id}>
          <img src={itemInCart.image} alt="img"></img>
          <h1>{itemInCart.name}</h1>
          <strong>{itemInCart.price}</strong>
          <button
            onClick={() =>
              cartDispatch({
                query:
                  itemInCart.quantity === 1
                    ? "REMOVE_FROM_CART"
                    : "SUBTRACT_ONE_MORE",
                item: itemInCart
              })
            }
          >
            -
          </button>
          {itemInCart.quantity}
          <button
            onClick={() =>
              cartDispatch({
                query: "ADD_ONE_MORE",
                item: itemInCart
              })
            }
          >
            +
          </button>
          <button
            onClick={() =>
              cartDispatch({
                query: "REMOVE_FROM_CART",
                item: itemInCart
              })
            }
          >
            Remove from Cart
          </button>
          <button
            onClick={() =>
              wishlistDispatch({
                query: checkItemInObject(wishlistState.idInWishlist, itemInCart)
                  ? "REMOVE_FROM_WISHLIST"
                  : "ADD_TO_WISHLIST",
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