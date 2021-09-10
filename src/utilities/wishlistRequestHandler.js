import axios from "axios";
export async function wishlistHandler(query, productDetails, wishlistDispatch) {
	const accessToken = JSON.parse(localStorage.getItem("accessToken"));
	switch (query) {
		case "ADD_TO_WISHLIST":
			try {
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
				console.log(serverReponse.data.data);
				wishlistDispatch(serverReponse.data.data);
			} catch (error) {
				console.log(error.response);
			}
			break;
		case "REMOVE_FROM_WISHLIST":
			try {
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
				console.log(serverReponse);
				wishlistDispatch(serverReponse.data.data);
			} catch (error) {
				console.log(error.response);
			}
			break;
		default:
			break;
	}
	console.log(accessToken);
}
