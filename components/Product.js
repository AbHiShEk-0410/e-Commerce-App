import { data } from "../utilities/database";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export function Product() {
  const {cartDispatch} = useCart();
  const {wishlistDispatch} = useWishlist();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {data.map((itemInProducts) => (
        <div style={{ border: "1px solid black" }} key={itemInProducts.id}>
          <img width="70%" src={itemInProducts.image} alt="img"></img>
          <h1>{itemInProducts.name}</h1>
          <strong>{itemInProducts.origin}</strong>
          <strong>{itemInProducts.type}</strong>
          <h2>{itemInProducts.brand}</h2>
          <h2>{itemInProducts.price}</h2>
          <h3>{itemInProducts.rating}</h3>
          <strong>{itemInProducts.offer}</strong>
          <p>{itemInProducts.delivery}</p>
          <button
            onClick={() =>
              cartDispatch({
                query: "ADD_TO_CART",
                item: itemInProducts
              })
            }
          >
            Add to Cart
          </button>
          <button
            onClick={() =>
              wishlistDispatch({
                query: "ADD_OR_REMOVE_FROM_WISHLIST",
                item: itemInProducts
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
