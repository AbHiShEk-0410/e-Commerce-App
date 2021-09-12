import { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";
import { useCart, useWishlist, useSortFilter } from "../../contexts";

import { ProductTile } from "../../components/Product/ProductTile";

export default function Product() {
	const {  wishlistDispatch } = useWishlist();
	const { cartDispatch } = useCart();

	const {
		state: { showFastDelivery, showInventory, sortBy },
		dispatch,
	} = useSortFilter();
	const [data, setData] = useState([]);

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
				console.log(error);
			}
		};
		getCartFromServer();
	}, [cartDispatch]);

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
			}
		};
		getWishlistFromServer();
	}, [wishlistDispatch]);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const response = await axios(
					"https://database-1.joygupta1.repl.co/product"
				);
				setData(response.data.data);
			} catch (error) {
				console.log(error);
				setData([]);
			}
		};
		loadProducts();
	}, []);

	return (
		<div>
			<div class="product-listing">
				{data.map((itemInProduct) => (
					<ProductTile itemInProduct={itemInProduct} />
				))}
			</div>
		
		</div>
	);
}
