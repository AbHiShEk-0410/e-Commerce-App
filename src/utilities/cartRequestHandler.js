import axios from "axios";
export async function cartHandler(event, query, productDetails, cartDispatch) {
	event.preventDefault();
	const accessToken = JSON.parse(localStorage.getItem("accessToken"));
	switch (query) {
		case "ADD_TO_CART":
			console.log(accessToken);
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
			}
			break;

		case "REMOVE_FROM_CART":
			console.log(accessToken);
			try {
				const serverReponse = await axios.delete(
					process.env.REACT_APP_SERVER_URL + "/cart/remove-from-cart",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						data: {
							product: productDetails,
						},
					}
				);
				cartDispatch(serverReponse.data.userInfo.cart);
			} catch (error) {
				console.log(error.response);
			}
			break;

		case "DELETE_FROM_CART":
			console.log(accessToken);
			try {
				const serverReponse = await axios.delete(
					process.env.REACT_APP_SERVER_URL + "/cart/delete-from-cart",

					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						data: {
							product: productDetails,
						},
					}
				);
				cartDispatch(serverReponse.data.userInfo.cart);
			} catch (error) {
				console.log(error.response.data);
			}
			break;

		default:
			break;
	}
}
