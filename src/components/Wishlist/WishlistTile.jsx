import veg from "../../images/veg.png";
import nonveg from "../../images/nonveg.png";
import egg from "../../images/egg.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cartHandler, checkItemInObject } from "../../utilities";
import { useCart } from "../../contexts";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { wishlistHandler } from "../../utilities";
import { BiRupee } from "react-icons/bi";
import { facts } from "../../constants";
import { useWishlist } from "../../contexts";
export function WishlistTile({ item }) {
	const { wishlistDispatch } = useWishlist();
	const { cartState, cartDispatch } = useCart();
	const [wishlistLoader, setWishlistLoader] = useState(false);

	return (
		<div className="wishlist-tile">
			<div className="wishlist-item">
				<img className="item-img" src={item.img} alt="" />
				<div className="wishlist-item-details">
					<div className="item-name">
						<h1>{item.name}</h1>
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
					</div>
					<div className="item-price">
						{" "}
						<span>
							<BiRupee />
							{item.price}/{item.unit}
						</span>
					</div>
					<div className="about">{facts[item.type]}</div>
				</div>
			</div>
			<div className="wishlist-controllers">
				<button
					onClick={() =>
						wishlistHandler(
							"REMOVE_FROM_WISHLIST",
							item,
							wishlistDispatch,
							setWishlistLoader
						)
					}
					className="delete-from-wishlist"
				>
					<FiTrash2 style={{ marginRight: "5px" }} />
					Delete
				</button>
				<button
					onClick={() =>
						checkItemInObject(cartState.cartItems, item)
							? ""
							: cartHandler(
									"ADD_TO_CART",
									item,
									cartDispatch,
									setWishlistLoader
							  )
					}
					className="cart-handler"
				>
					{checkItemInObject(cartState.cartItems, item) ? (
						<Link
							style={{ color: "inherit", textDecoration: "none" }}
							to={{ pathname: "/cart" }}
						>
							<FiShoppingCart style={{ marginRight: "5px" }} />
							View Cart
						</Link>
					) : (
						<span>+ Add to cart</span>
					)}
				</button>
			</div>
		</div>
	);
}
