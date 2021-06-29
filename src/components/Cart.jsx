import "./CSS/cart.css";
import { useCart, useWishlist } from "../contexts";
import { useEffect, useState } from "react";
import { cartHandler, wishlistHandler } from "../utilities";
import { EmptyCart } from ".";
import { FiBookmark } from "react-icons/fi";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { BiRupee } from "react-icons/bi";
import veg from "../images/veg.png";
import nonveg from "../images/nonveg.png";
import egg from "../images/egg.png";
import { checkItemInObject } from "../utilities";

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
		// For whole page
		<div className="cart-page ">
			<div className="cart-listing">
				<div className="cart-items">
					{balance !== 0 &&
						cartState.cartItems.map((itemInCart) => (
							//For particular item
							<div className="cart-tile" id={itemInCart.id}>
								<div className="item-img">
									<img src={itemInCart.img} alt="img"></img>
								</div>
								<div className="item-desc">
									<h1>{itemInCart.name}</h1>
									<div className="item-info">
										<div className="food-info">
											<img
												src={
													itemInCart.type === "vegetable"
														? veg
														: itemInCart.type === "non-veg"
														? nonveg
														: itemInCart.type === "Spices"
														? veg
														: egg
												}
												alt="food type"
											/>
											<FiBookmark
												onClick={() =>
													wishlistHandler(itemInCart, wishlistDispatch)
												}
												style={{
													cursor: "pointer",
													fontSize: "max(25px, 2vw)",
													fill: checkItemInObject(
														wishlistState.wishlistItems,
														itemInCart
													)
														? "#0b002a"
														: "white",
												}}
											/>
										</div>
										<div>
											{" "}
											<span className="item-price">
												<GiPayMoney
													style={{
														fontSize: "max(23px, 2vw)",
														marginRight: "4px",
														color: "var(--ternary-color)",
														WebkitTransform: "scaleX(-1)",
													}}
												/>
												<BiRupee
													style={{
														fontSize: "max(18px, 1.5vw)",
														marginRight: "-4px",
													}}
												/>
												<h3
													style={{
														fontSize: "max(23px, 2vw)",
													}}
												>
													{itemInCart.price * itemInCart.quantity}
												</h3>
											</span>
										</div>
									</div>

									<div className="quantity-regulators">
										<button
											onClick={() =>
												cartHandler(
													"REMOVE_FROM_CART",
													itemInCart,
													cartDispatch
												)
											}
										>
											-
										</button>
										<span>{itemInCart.quantity}</span>

										<button
											onClick={() =>
												cartHandler("ADD_TO_CART", itemInCart, cartDispatch)
											}
										>
											+
										</button>
									</div>
								</div>
								<div className="remove-from-cart">
									<BsTrash
										className="trash"
										onClick={() =>
											cartHandler("DELETE_FROM_CART", itemInCart, cartDispatch)
										}
									/>
								</div>
							</div> //Parent div
						))}
				</div>
				{balance !== 0 && <div className="billing">cvcv</div>}
			</div>
			{balance === 0 && <EmptyCart />}
		</div>
	);
}
