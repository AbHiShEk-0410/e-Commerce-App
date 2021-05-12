import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/product.css"
import { data, checkItemInObject, SortFilter, CartButtonHandler } from "../utilities";
import { useCart, useWishlist, useSortFilter } from "../contexts";
import { useState } from "react"
export default function Product() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();
  const {
    state: { showFastDelivery, showInventory, sortBy },
    dispatch
  } = useSortFilter();
  const listItems = SortFilter(
    data,
    sortBy,
    showFastDelivery,
    showFastDelivery
  );
  const [toggle, setToggle] = useState(false);

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
      <div class="product-listing">
        {listItems.map((itemInProduct) => (
          <div class="product" key={itemInProduct.id}>
            <img class="product-image" src={itemInProduct.image} alt="img"></img>
            <h1>{itemInProduct.name}</h1>
            <strong>{itemInProduct.origin}</strong>
            <strong>{itemInProduct.type}</strong>
            <h2>{itemInProduct.brand}</h2>
            <h2>{itemInProduct.price}</h2>
            <h3>{itemInProduct.ratings}</h3>
            <strong>{itemInProduct.offer}</strong>
            <p>{itemInProduct.delivery}</p>
            {CartButtonHandler(checkItemInObject(cartState.idInCart, itemInProduct), itemInProduct)}
            <button
              class="product-to-wishlist"
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
