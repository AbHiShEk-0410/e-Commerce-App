import { data } from "../utilities/database";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { checkItemInObject } from "../utilities/checkItemInObject";

export function Product() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {data.map((itemInProduct) => (
        <div style={{ border: "1px solid black" }} key={itemInProduct.id}>
          <img width="70%" src={itemInProduct.image} alt="img"></img>
          <h1>{itemInProduct.name}</h1>
          <strong>{itemInProduct.origin}</strong>
          <strong>{itemInProduct.type}</strong>
          <h2>{itemInProduct.brand}</h2>
          <h2>{itemInProduct.price}</h2>
          <h3>{itemInProduct.rating}</h3>
          <strong>{itemInProduct.offer}</strong>
          <p>{itemInProduct.delivery}</p>
          <button
            type="button"
            disabled={checkItemInObject(cartState.idInCart, itemInProduct)}
            onClick={() => {
              cartDispatch({
                query: "ADD_TO_CART",
                item: itemInProduct
              });
            }}
          >
            {checkItemInObject(cartState.idInCart, itemInProduct)
              ? "Added to Cart"
              : "Add to Cart"}
          </button>
          <button
            onClick={() =>
              wishlistDispatch({
                query: checkItemInObject(
                  wishlistState.idInWishlist,
                  itemInProduct
                )
                  ? "REMOVE_FROM_WISHLIST"
                  : "ADD_TO_WISHLIST",
                item: itemInProduct
              })
            }
          >
            Add to wishlist
          </button>
        </div>
      ))}
    </div>
  );
}