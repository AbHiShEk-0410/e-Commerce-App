import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { cartHandler } from ".";
import { useCart } from "../contexts";
import { Loader } from "../components/Loader/Loader";
export default function CartButtonHandler(
	isItemInCart,
	itemInProduct,
	loading,
	setLoading
) {
	const { cartDispatch } = useCart();
	if (isItemInCart) {
		return (
			<div>
				<Link to="/cart">
					<button class="from-product view-cart ">
						<FiShoppingCart /> View Cart
					</button>
				</Link>
			</div>
		);
	}
	return (
		<div>
			<button
				class="from-product to-cart"
				type="button"
				onClick={() =>
					cartHandler("ADD_TO_CART", itemInProduct, cartDispatch, setLoading)
				}
			>
				{loading ? Loader("bubbleLoader") : "+ Add to cart"}
			</button>
		</div>
	);
}
