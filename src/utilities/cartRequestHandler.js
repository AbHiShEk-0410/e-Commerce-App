import axios from "axios";
export async function cartHandler(query, productDetails, cartDispatch) {
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
				cartDispatch([]);
			}
			break;
		case "INCREASE_COUNT":
			try {
				alert("running");
				const serverReponse = await axios.post(
					process.env.REACT_APP_SERVER_URL + "/cart/increase-count",
					{
						product: productDetails,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log("serverReponse", serverReponse);
				cartDispatch(serverReponse.data.userInfo.cart);
			} catch (error) {
				console.log(error);
			}
			break;
		case "REMOVE_FROM_CART":
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
				console.log(serverReponse);

				cartDispatch(
					serverReponse.data.userInfo
						? serverReponse.data.serverReponse.cart
						: []
				);
			} catch (error) {
				console.log(error.response);
				cartDispatch([]);
			}
			break;

		case "DELETE_FROM_CART":
			try {
				const sv = await axios.delete(
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

				cartDispatch(sv.data.data);
			} catch (error) {
				console.log(error);
				cartDispatch([]);
			}
			break;

		default:
			break;
	}
}
