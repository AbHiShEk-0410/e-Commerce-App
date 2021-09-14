import axios from "axios";
import { useEffect, useState } from "react";
import { useCart, useWishlist } from "../../contexts";
import { checkItemInObject, wishlistHandler } from "../../utilities";
import { FiShoppingCart, FiBookmark, FiTrash2 } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import EmptyWishlist from "../EmptyWishlist/EmptyWishlist";
import { facts } from "../../constants";
import "./wishlist.css";
import veg from "../../images/veg.png";
import nonveg from "../../images/nonveg.png";
import egg from "../../images/egg.png";

export default function Wishlist() {
	const { wishlistState, wishlistDispatch } = useWishlist();
	const { cartState, cartDispatch } = useCart();
	const [wishlistStatus, setWishlistStatus] = useState(
		wishlistState.wishlistItems === []
	);

	// On ever refresh fetch cart data to update view and cart buttons
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
			}
		};
		getCartFromServer();
	}, [cartDispatch]);

	//For every refresh fetch wishlist data to update view
	useEffect(() => {
		const getWishlistFromServer = async () => {
			const accessToken = JSON.parse(localStorage.getItem("accessToken"));
			try {
				const serverResponse = await axios.get(
					process.env.REACT_APP_SERVER_URL + "/wishlist",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				wishlistDispatch(serverResponse.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getWishlistFromServer();
	}, [wishlistDispatch]);

	// Check whether wishlist is empty or not. If so, render emptyWishlist.jsx
	useEffect(() => {
		setWishlistStatus(wishlistState.wishlistItems.length === 0);
	}, [wishlistState.wishlistItems]);

	return (
		<div className="wishlist-page">
			{!wishlistStatus && (
				<div className="wishlist-content">
					<div className="banner">
						<h1 className="banner-for">My Wishlist</h1>
						<FiBookmark className="banner-logo" />
					</div>
					<hr />
					<div className="wishlist-items">
						{wishlistState.wishlistItems.map((item) => {
							return (
								<div className="wishlist-tile">
									<div className="wishlist-item">
										<img className="item-img" src={item.img} alt="" />
										<div className="wishlist-item-details">
											<div className="item-name">
												<h1>{item.name}</h1>
												<img
													src={
														item.type === "vegetable"
															? veg
															: item.type === "non-veg"
															? nonveg
															: item.type === "Spices"
															? veg
															: egg
													}
													alt="food type"
												/>
											</div>
											<div className="item-price">
												{" "}
												<span>
													<BiRupee />
													{item.price}/{item.unit}
												</span>
											</div>
											<div className="about">{facts[item.type]}</div>
										</div>
									</div>
									<div className="wishlist-controllers">
										<button className="delete-from-wishlist">
											<FiTrash2 style={{ marginRight: "5px" }} />
											Delete
										</button>
										<button className="cart-handler">
											{checkItemInObject(cartState.cartItems, item) ? (
												<span>
													<FiShoppingCart style={{ marginRight: "5px" }} />
													View Cart
												</span>
											) : (
												"+ Add to cart"
											)}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{wishlistStatus && <EmptyWishlist />}
		</div>
	);
}
