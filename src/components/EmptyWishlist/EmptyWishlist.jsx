import "./emptyWishlist.css";
import emptyWishlist from "../../images/emptyWishlist.png";
export default function EmptyWishlist() {
	return (
		<div className="empty">
			<img className="empty-banner" src={emptyWishlist} alt="banner" />
			<h1 className="primary-heading">Your Wishlist is empty</h1>
			<h3 className="statement">seems like you don't have wishes here.</h3>
			<h3 className="statement">Make a wish!</h3>
			<button class="primary-button start-shopping">Start Shopping</button>
		</div>
	);
}
