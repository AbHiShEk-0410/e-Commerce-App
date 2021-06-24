import axios from "axios";
export async function wishlistHandler(productDetails, wishlistDispatch) {
	const accessToken = JSON.parse(localStorage.getItem("accessToken"));
	console.log(accessToken);
	try {
		const serverReponse = await axios.post(
			process.env.REACT_APP_SERVER_URL + "/wishlist/add-or-remove",
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
		 wishlistDispatch(serverReponse.data.userInfo.wishlist);
	} catch (error) {
		console.log(error.response);
	}
}
