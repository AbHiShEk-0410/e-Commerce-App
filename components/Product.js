import { data } from "../utilities/database";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { checkItemInObject } from "../utilities/checkItemInObject";
import {useSortFilter} from "../contexts/SortFilterContext"
import {SortFilter} from "../utilities/SortFilter"


export function Product() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();
  const {state : {showFastDelivery, showInventory, sortBy}, dispatch} = useSortFilter();
  const listItems = SortFilter(data, sortBy, showFastDelivery, showFastDelivery)

  return (
    <>
      <fieldset>
        <legend>Sort By</legend>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          ></input>{" "}
          Price - High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          ></input>{" "}
          Price - Low to High
        </label>
        <label>
          <button onClick={() => dispatch({ type: "SORT", payload: null })}>
            Clear Filter
          </button>
        </label>
      </fieldset>

      <fieldset style={{ marginTop: "1rem" }}>
        <legend> Filters </legend>
        <label>
          <input
            type="checkbox"
            checked={showInventory}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>

        <label>
          <input
            type="checkbox"
            checked={showFastDelivery}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery Only
        </label>
      </fieldset>
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {listItems.map((itemInProduct) => (
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
    </>
  );
}