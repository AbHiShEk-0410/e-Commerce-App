import { useState } from "react";
import { FiBookmark, FiTruck } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import veg from "../../images/veg.png";
import { checkItemInObject, wishlistHandler } from "../../utilities";
import { CartButtonHandler } from "./CartButtonHandler";
import { useCart, useWishlist } from "../../contexts";
import nonveg from "../../images/nonveg.png";
import egg from "../../images/egg.png";

export function ProductTile({ itemInProduct: product }) {
	const [loading, setLoading] = useState(false);
	const { wishlistState, wishlistDispatch } = useWishlist();
	const { cartState } = useCart();
	return (
		<div class="product" key={product._id}>
			<img class="product-image" src={product.img} alt="img"></img>
			<div className="product-item-desc">
				<div className="product-info">
					<h1 class="product-name">{product.name}</h1>
					<div class="food-type">
						<img
							src={
								product.type === "vegetable"
									? veg
									: product.type === "non-veg"
									? nonveg
									: product.type === "Spices"
									? veg
									: egg
							}
							alt="food type"
						/>
						<FiBookmark
							onClick={() =>
								wishlistHandler(
									checkItemInObject(wishlistState.wishlistItems, product)
										? "REMOVE_FROM_WISHLIST"
										: "ADD_TO_WISHLIST",
									product,
									wishlistDispatch,
									setLoading
								)
							}
							style={{
								fontSize: "26px",
								cursor: "pointer",
								fill: checkItemInObject(wishlistState.wishlistItems, product)
									? "#0b002a"
									: "white",
							}}
						/>
					</div>
				</div>
				<div className="product-info">
					<FaBalanceScale style={{ fontSize: "26px", color: "#404040" }} />
					<div class="rate-delivery">
						<BiRupee style={{ fontSize: "20px" }} />
						<span>
							{product.price}/{product.unit}
						</span>
					</div>
				</div>
				<div className="product-info">
					<FiTruck style={{ fontSize: "26px", color: "#404040" }} />
					<span class="rate-delivery">
						{product.delivery === null ? "4-7+" : product.delivery} Days
					</span>
				</div>
			</div>
			{CartButtonHandler(
				checkItemInObject(cartState.cartItems, product),
				product,
				loading,
				setLoading
			)}
		</div>
	);
}
