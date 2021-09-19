import "./cart.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts";
import { EmptyCart } from "..";
import { CartTile } from "../../components/Cart/CartTile";
import { Billing } from "../../components/Cart/Billing";
export default function Cart() {
	const { cartState, cartDispatch } = useCart();
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
		<div>
			{balance !== 0 && (
				<div className="cart-page">
					<div className="cart-listing">
						<div className="cart-items">
							{cartState.cartItems.map((item) => (
								<CartTile item={item} />
							))}
						</div>
						<div className="billing-tile">
							<Billing balance={balance} />
						</div>
					</div>
				</div>
			)}
			{balance === 0 && <EmptyCart />}
		</div>
	);
}
