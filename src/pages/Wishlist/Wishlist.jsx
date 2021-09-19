import axios from "axios";
import { useEffect, useState } from "react";
import { useCart, useWishlist } from "../../contexts";
import { FiBookmark } from "react-icons/fi";
import EmptyWishlist from "../EmptyWishlist/EmptyWishlist";
import "./wishlist.css";
import { Loader } from "../../components/Loader/Loader";
import { WishlistTile } from "../../components/Wishlist/WishlistTile";

export default function Wishlist() {
	const { wishlistState, wishlistDispatch } = useWishlist();
	const { cartDispatch } = useCart();
	const [pageLoader, setPageLoader] = useState(false);
	const [wishlistStatus, setWishlistStatus] = useState(
		wishlistState.wishlistItems === []
	);

	// On ever refresh fetch cart data to update view and cart buttons
	useEffect(() => {
		setPageLoader(true);
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
				console.log(serverResponse);
				cartDispatch(serverResponse.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setPageLoader(false);
			}
		};
		getCartFromServer();
	}, [cartDispatch]);

	//For every refresh fetch wishlist data to update view
	useEffect(() => {
		setPageLoader(true);
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
			} finally {
				setPageLoader(false);
			}
		};
		getWishlistFromServer();
	}, [wishlistDispatch]);

	// Check whether wishlist is empty or not. If so, render emptyWishlist.jsx
	useEffect(() => {
		setWishlistStatus(wishlistState.wishlistItems.length === 0);
	}, [wishlistState.wishlistItems]);

	return pageLoader === false ? (
		<div style={{ padding: "0" }} className="wishlist-page">
			{!wishlistStatus && (
				<div className="wishlist-content">
					<div className="banner">
						<h1 className="banner-for">My Wishlist</h1>
						<FiBookmark className="banner-logo" />
					</div>
					<hr />
					<div className="wishlist-items">
						{wishlistState.wishlistItems.map((item) => (
							<WishlistTile item={item} />
						))}
					</div>
				</div>
			)}

			{wishlistStatus && <EmptyWishlist />}
		</div>
	) : (
		Loader("spinnerLoader")
	);
}
