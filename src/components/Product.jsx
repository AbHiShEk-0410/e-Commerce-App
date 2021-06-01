import { useState, useEffect } from "react"
import axios from "axios"
import "./CSS/product.css"
import { checkItemInObject, SortFilter, CartButtonHandler } from "../utilities";
import { useCart, useWishlist, useSortFilter } from "../contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();
  const {
    state: { showFastDelivery, showInventory, sortBy },
    dispatch
  } = useSortFilter();
  const [data, setData] = useState([])


  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios("https://database-1.joygupta1.repl.co/product")
        setData(response.data.data)
        console.log(data)
      }
      catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, [])
  console.log(data)

  return (
    <>
      <div>
        {/* Product Listing */}
        <div class="product-listing">
          {data.map((itemInProduct) => (
            <div class="product" key={itemInProduct.id}>
              <img class="product-image" src={itemInProduct.img} alt="img"></img>
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
      </div>
    </>
  );
}
