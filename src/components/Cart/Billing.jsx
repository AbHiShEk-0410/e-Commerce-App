import { BiRupee } from "react-icons/bi";
import { useCart } from "../../contexts";
export function Billing({ balance }) {
	const { cartState } = useCart();
	return (
		<div className="billing">
			<div className="price-details">
				<h1>PRICE DETAILS</h1>
				<hr />
				<div className="inline-div">
					<h2>Price ({cartState.cartItems.length} items)</h2>
					<h2 className="total-amount">
						<BiRupee />
						{balance}
					</h2>
				</div>
				<div className="inline-div">
					<h2>Delivery Charges</h2>
					<h2 className="total-amount">FREE</h2>
				</div>
				<hr />
				<div className="inline-div final-payment">
					<h2>Total Amount</h2>
					<h2 className="total-amount">
						<BiRupee />
						{balance}
					</h2>
				</div>
				<div className="inline-div"></div>
				<hr />
				<div className="safe-guard">
					<img
						src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/shield_b33c0c.svg"
						alt="seal of trust"
					></img>
					<h3>
						Safe and Secure Payments. Easy returns. 100% Authentic products.
					</h3>
				</div>
			</div>
		</div>
	);
}
