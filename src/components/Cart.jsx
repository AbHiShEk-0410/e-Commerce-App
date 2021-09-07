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
import logo from "../images/front-logo.png";

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
				console.log(serverResponse.data)
				cartDispatch(serverResponse.data.cart);
			} catch (error) {
				console.log(error.response.data);
				return [];
			}
		};
		getCartFromServer();
	}, [cartDispatch]);
	console.log(cartState.cartItems);

	return (
		// For whole page
		<div className="cart-page ">
			<div className="cart-listing">
				<div className="cart-items">
					{balance !== 0 &&
						cartState.cartItems.map((itemInCart) => (
							//For particular item
							<div className="cart-tile" id={itemInCart._id}>
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
												className="add-to-wishlist"
												style={{
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
												<BiRupee
													style={{
														fontSize: "max(18px, 1.5vw)",
														marginRight: "-4px",
													}}
												/>
												<h3>{itemInCart.price * itemInCart.quantity}</h3>
											</span>
										</div>
									</div>

									<div className="quantity-regulators">
										<button
											onClick={() =>
												cartHandler(
													itemInCart.quantity === 1
														? "DELETE_FROM_CART"
														: "REMOVE_FROM_CART",
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
												cartHandler("INCREASE_COUNT", itemInCart, cartDispatch)
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
				{balance !== 0 && (
					<div className="billing-tile">
						<div className="billing">
							<div className="price-details">
								<h1>PRICE DETAILS</h1>
								<hr />
								<div className="inline-div">
									<h2>Price ({cartState.cartItems.length} items)</h2>
									<h2>
										<BiRupee />
										{balance}
									</h2>
								</div>
								<div className="inline-div">
									<h2>Delivery Charges</h2>
									<h2>FREE</h2>
								</div>
								<hr />
								<div className="inline-div">
									<h2>Total Amount</h2>
									<h2>
										<BiRupee />
										{balance}
									</h2>
								</div>
								<div className="inline-div"></div>
								<hr />
								<div className=" safe-guard">
									Safe and Secure Payments. Easy returns. 100% Authentic
									products.
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{balance === 0 && <EmptyCart />}
		</div>
	);
}
