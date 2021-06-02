import { useState, useEffect } from "react"
import axios from "axios"
import "./CSS/product.css"
import { checkItemInObject, SortFilter, CartButtonHandler } from "../utilities";
import { useCart, useWishlist, useSortFilter } from "../contexts";
import veg from "../images/veg.png"
import nonveg from "../images/nonveg.png"
import egg from "../images/egg.png"
import { FiBookmark, FiTruck } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";

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
  function mock(temp) {
    console.log(temp === "vegetable" ? "veg" : temp)

  }

  return (
    <>
      <div>
        {/* Product Listing */}
        <div class="product-listing">
          {data.map((itemInProduct) => (
            <div class="product" key={itemInProduct.id}>
              <img class="product-image" src={itemInProduct.img} alt="img"></img>
              <div class="product-parent">
                <div class="product-info">
                  <h1 class="product-name">{itemInProduct.name}</h1>
                  <div class="price-tag">
                    <FaBalanceScale style={{ fontSize: "26px", color: "#404040" }} />
                    <div class="product-pricing">
                      <BiRupee style={{ fontSize: "20px" }} />
                      <h2>{itemInProduct.price}</h2>
                      <h3>/{itemInProduct.unit}</h3>
                    </div >
                  </div>
                  <div class = "delivery-status">
                    <FiTruck style = {{fontSize:"26px", color: "#404040"}}/>
                   <h2>{itemInProduct.delivery === null ? "4-7+" : itemInProduct.delivery} Days</h2> 
                  </div>
                </div >
                <div class="product-type">
                  <div class="food-type">
                    <img width="17%" src={
                      itemInProduct.type === "vegetable" ?
                        veg : itemInProduct.type === "non-veg" ?
                          nonveg : itemInProduct.type === "Spices" ?
                            veg : egg
                    } alt="food type" />
                    <FiBookmark
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
                      style={{
                        fontSize: "26px",
                        fill: checkItemInObject(
                          wishlistState.idInWishlist,
                          itemInProduct
                        ) ? "#0b002a" : "white"
                      }}
                    />

                  </div>

                </div>
              </div>
              {CartButtonHandler(checkItemInObject(cartState.idInCart, itemInProduct), itemInProduct)}

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
