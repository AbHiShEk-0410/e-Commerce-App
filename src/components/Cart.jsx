import { useCart, useWishlist } from "../contexts";
import { useEffect, useState } from "react";
import { checkItemInObject, cartHandler } from "../utilities";
import axios from "axios";
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
				cartDispatch(serverResponse.data.cart);
			} catch (error) {
				console.log(error.response.data);
				return [];
			}
		};
		getCartFromServer();
	}, [cartDispatch, cartState]);

	return (
		<div>
			Total {balance}
			{cartState.cartItems.map((itemInCart) => (
				<div id={itemInCart.id}>
					<img src={itemInCart.image} alt="img"></img>
					<h1>{itemInCart.name}</h1>
					<strong>{itemInCart.price}</strong>
					<button
						onClick={() =>
							cartHandler("REMOVE_FROM_CART", itemInCart, cartDispatch)
						}
					>
						-
					</button>
					{itemInCart.quantity}
					<button
						onClick={() => cartHandler("ADD_TO_CART", itemInCart, cartDispatch)}
					>
						+
					</button>
					<button
						onClick={() =>
							cartHandler("DELETE_FROM_CART", itemInCart, cartDispatch)
						}
					>
						Remove from Cart
					</button>
					<button
						onClick={() =>
							wishlistDispatch({
								query: checkItemInObject(wishlistState.idInWishlist, itemInCart)
									? "REMOVE_FROM_WISHLIST"
									: "ADD_TO_WISHLIST",
								item: itemInCart,
							})
						}
					>
						Wishlist
					</button>
				</div>
			))}
		</div>
	);
}
