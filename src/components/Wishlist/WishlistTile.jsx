import veg from "../../images/veg.png";
import nonveg from "../../images/nonveg.png";
import egg from "../../images/egg.png";
import { checkItemInObject } from "../../utilities";
import { useCart } from "../../contexts";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { facts } from "../../constants";
import { useState } from "react";
export function WishlistTile(item) {
	const { cartState } = useCart();
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
				<button className="delete-from-wishlist">
					<FiTrash2 style={{ marginRight: "5px" }} />
					Delete
				</button>
				<button className="cart-handler">
					{checkItemInObject(cartState.cartItems, item) ? (
						<span>
							<FiShoppingCart style={{ marginRight: "5px" }} />
							View Cart
						</span>
					) : (
						"+ Add to cart"
					)}
				</button>
			</div>
		</div>
	);
}
