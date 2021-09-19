import {
	cartHandler,
	checkItemInObject,
	wishlistHandler,
} from "../../utilities";
import "../Wishlist/wishlist.css";
import { useState } from "react";
import { useCart, useWishlist } from "../../contexts";
import { BsTrash } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { FiBookmark } from "react-icons/fi";
import veg from "../../images/veg.png";
import nonveg from "../../images/nonveg.png";
import egg from "../../images/egg.png";
import "./cartTile.css";

export function CartTile({ item }) {
	const { cartDispatch } = useCart();
	const { wishlistState, wishlistDispatch } = useWishlist();
	const [cartLoader, setCartLoader] = useState(false);
	console.log(cartLoader);

	return (
		<div className="cart-tile" id={item._id}>
			{cartLoader && (
				<div className="loader-parent">
					<div className="loader"></div>
				</div>
			)}
			<div className="item-img">
				<img src={item.img} alt="img"></img>
			</div>
			<div className="item-desc">
				<h1>{item.name}</h1>
				<div className="item-info">
					<div className="food-info">
						<img
							src={
								item.type === "vegetable"
									? veg
									: item.type === "non-veg"
									? nonveg
									: item.type === "Spices"
									? veg
									: egg
							}
							alt="food type"
						/>
						<FiBookmark
							onClick={() =>
								wishlistHandler(
									checkItemInObject(wishlistState.wishlistItems, item)
										? "REMOVE_FROM_WISHLIST"
										: "ADD_TO_WISHLIST",
									item,
									wishlistDispatch,
									setCartLoader
								)
							}
							className="add-to-wishlist"
							style={{
								fill: checkItemInObject(wishlistState.wishlistItems, item)
									? "#0b002a"
									: "white",
							}}
						/>
					</div>
					<div>
						{" "}
						<span className="item-price">
							<BiRupee
								style={{
									fontSize: "max(18px, 1.5vw)",
									marginRight: "-4px",
								}}
							/>
							<h3>{item.price * item.quantity}</h3>
						</span>
					</div>
				</div>

				<div className="quantity-regulators">
					<button
						onClick={() =>
							cartHandler(
								item.quantity === 1 ? "DELETE_FROM_CART" : "REMOVE_FROM_CART",
								item,
								cartDispatch,
								setCartLoader
							)
						}
					>
						-
					</button>
					<span>{item.quantity}</span>

					<button
						onClick={() =>
							cartHandler("INCREASE_COUNT", item, cartDispatch, setCartLoader)
						}
					>
						+
					</button>
				</div>
			</div>
			<div
				onClick={() =>
					cartHandler("DELETE_FROM_CART", item, cartDispatch, setCartLoader)
				}
				className="remove-from-cart"
			>
				<BsTrash className="trash" />
			</div>
		</div>
	);
}
