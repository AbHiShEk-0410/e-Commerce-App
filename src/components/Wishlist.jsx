import axios from "axios";
import { useEffect } from "react";
import { useCart, useWishlist } from "../contexts/";
import {
	checkItemInObject,
	wishlistHandler,
	CartButtonHandler,
} from "../utilities";
import EmptyWishlist from "./EmptyWishlist";

export default function Wishlist() {
	const { wishlistState, wishlistDispatch } = useWishlist();
	const { cartState } = useCart();

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
				wishlistDispatch(serverResponse.data.wishlist);
			} catch (error) {
				console.log(error);
				return [];
			}
		};
		getWishlistFromServer();
	}, [wishlistDispatch]);

	return (
		<div>
			{!wishlistState.wishlistItems &&
				wishlistState.wishlistItems.map((itemInWishlist) => (
					<div id={itemInWishlist.id}>
						<img src={itemInWishlist.image} alt="img"></img>
						<h1>{itemInWishlist.name}</h1>
						<strong>{itemInWishlist.price}</strong>
						<button
							onClick={() => wishlistHandler(itemInWishlist, wishlistDispatch)}
						>
							Wishlist
						</button>
						<div>
							{CartButtonHandler(
								checkItemInObject(cartState.cartItems, itemInWishlist),
								itemInWishlist
							)}
						</div>
					</div>
				))}
			{!!wishlistState.wishlistItems && <EmptyWishlist />}
		</div>
	);
}
