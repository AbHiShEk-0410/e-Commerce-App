import { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";
import { useCart, useWishlist, useSortFilter } from "../../contexts";
import { Loader } from "../../components/Loader/Loader";
import { ProductTile } from "../../components/Product/ProductTile";

export default function Product() {
	const { wishlistDispatch } = useWishlist();
	const { cartDispatch } = useCart();
	const [pageLoader, setPageLoader] = useState(false);

	const {
		state: { showFastDelivery, showInventory, sortBy },
		dispatch,
	} = useSortFilter();
	const [data, setData] = useState([]);

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

				cartDispatch(serverResponse.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setPageLoader(false);
			}
		};
		getCartFromServer();
	}, [cartDispatch]);

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

	useEffect(() => {
		setPageLoader(true);
		const loadProducts = async () => {
			try {
				const response = await axios(
					"https://database-1.joygupta1.repl.co/product"
				);
				setData(response.data.data);
			} catch (error) {
				console.log(error);
				setData([]);
			} finally {
				setPageLoader(false);
			}
		};
		loadProducts();
	}, []);

	return pageLoader === false ? (
		<div>
			<div class="product-listing">
				{data.map((itemInProduct) => (
					<ProductTile itemInProduct={itemInProduct} />
				))}
			</div>
		</div>
	) : (
		Loader("spinnerLoader")
	);
}
