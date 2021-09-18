import "./cart.css";
import { useCart, useWishlist } from "../../contexts";
import { useEffect, useState } from "react";
import { EmptyCart } from "..";
import axios from "axios";
import { BiRupee } from "react-icons/bi";

import { CartTile } from "../../components/Cart/CartTile";
export default function Cart() {
	const { cartState, cartDispatch } = useCart();
	const { wishlistState, wishlistDispatch } = useWishlist();
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		setBalance(
			cartState.cartItems.reduce(
				(total, item) => total + item.quantity * item.price,
				0
			)
		);
	}, [cartState.cartItems]);
	useEffect(() => {
		const getCartFromServer = async () => {
			const accessToken = JSON.parse(localStorage.getItem("accessToken"));
			try {
				const serverResponse = await axios.get(
					process.env.REACT_APP_SERVER_URL + "/cart",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				cartDispatch(serverResponse.data.data);
			} catch (error) {
				console.log(error.response.data);
				return [];
			}
		};
		getCartFromServer();
	}, [cartDispatch]);

	return (
		// For whole page
		<div>
			{balance !== 0 && (
				<div className="cart-page">
					<div className="cart-listing">
						<div className="cart-items">
							{cartState.cartItems.map(
								(
									itemInCart //For particular item
								) => (
									<CartTile item={itemInCart} />
								)
							)}
						</div>
						<div className="billing-tile">
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
											Safe and Secure Payments. Easy returns. 100% Authentic
											products.
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{balance === 0 && <EmptyCart />}
		</div>
	);
}
