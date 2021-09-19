import axios from "axios";
export async function wishlistHandler(
	query,
	productDetails,
	wishlistDispatch,
	setLoading
) {
	const accessToken = JSON.parse(localStorage.getItem("accessToken"));
	switch (query) {
		case "ADD_TO_WISHLIST":
			try {
				setLoading(true);
				const serverReponse = await axios.post(
					process.env.REACT_APP_SERVER_URL + "/wishlist/add-to-wishlist",
					{
						product: productDetails,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				wishlistDispatch(serverReponse.data.data);
			} catch (error) {
				console.log(error.response);
			} finally {
				setLoading(false);
			}
			break;
		case "REMOVE_FROM_WISHLIST":
			try {
				setLoading(true);
				const serverReponse = await axios.delete(
					process.env.REACT_APP_SERVER_URL + "/wishlist/remove-from-wishlist",

					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						data: {
							product: productDetails,
						},
					}
				);
				wishlistDispatch(serverReponse.data.data);
			} catch (error) {
				console.log(error.response);
			} finally {
				setLoading(false);
			}
			break;
		default:
			break;
	}
}
