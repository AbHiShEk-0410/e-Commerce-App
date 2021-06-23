import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { cartHandler } from ".";
import { useCart } from "../contexts";
export default function CartButtonHandler(isItemInCart, itemInProduct) {
	const { cartDispatch } = useCart();
	if (isItemInCart) {
		return (
			<>
				<Link to="/cart">
					<button class="from-product view-cart ">
						<FiShoppingCart /> View Cart
					</button>
				</Link>
			</>
		);
	}
	return (
		<>
			<button
				class="from-product to-cart"
				type="button"
				onClick={() => cartHandler("ADD_TO_CART", itemInProduct, cartDispatch)}
			>
				+ Add to Cart
			</button>
		</>
	);
}
