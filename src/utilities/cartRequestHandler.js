import axios from "axios";
export async function cartHandler(
	event,
	query,
	productDetails,
	cartDispatch
) {
	event.preventDefault();
	const accessToken = JSON.parse(localStorage.getItem("accessToken"));
	switch (query) {
		case "ADD_TO_CART":
			try {
				const serverReponse = await axios.post(
					process.env.REACT_APP_SERVER_URL + "/cart/add-to-cart",
					{
						product: productDetails,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				cartDispatch(serverReponse.data.userInfo.cart);
			} catch (error) {
				console.log(error.response);
				return null;
			}
			break;

		case "REMOVE_FROM_CART":
			try {
				const serverReponse = await axios.delete(
					process.env.REACT_APP_SERVER_URL + "/cart/remove-from-cart",
					{
						product: productDetails,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log(serverReponse);
			} catch (error) {
				console.log(error.response);
			}
			break;

		case "DELETE_FROM_CART":
			try {
				const serverReponse = await axios.delete(
					process.env.REACT_APP_SERVER_URL + "/cart/delete-from-cart",
					{
						product: productDetails,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log(serverReponse);
			} catch (error) {
				console.log(error.response);
			}
			break;

		default:
			break;
	}
}
