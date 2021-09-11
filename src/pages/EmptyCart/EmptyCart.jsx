import "./emptyCart.css";
import emptyCart from "../../images/emptyCart.png";
import { Link } from "react-router-dom";
export default function EmptyCart() {
	return (
		<div className="empty">
			<img className="empty-banner" src={emptyCart} alt="" />
			<h1 className="primary-heading">Your Cart is empty</h1>
			<h3 className="statement">seems like you don't have wishes here.</h3>
			<h3 className="statement">Make a wish!</h3>
			<Link to={{ pathname: "/product" }}>
				<button class="primary-button start-shopping">Start Shopping</button>
			</Link>
		</div>
	);
}
