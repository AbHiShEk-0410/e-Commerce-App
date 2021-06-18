function addToCart(productId, userCart) {
	const productInUserCart = userCart.find((item) => item.id === productId);
	if (!productInUserCart) {
		userCart.push({ id: productId, quantity: 1 });
		return userCart;
	} else {
		userCart = userCart.map((item) => {
			if (item.id === productId) {
				return { ...item, quantity: item.quantity + 1 };
			} else {
				return item;
			}
		});
	}
	return userCart;
}
function deletefromCart(productId, userCart) {
	userCart = userCart.filter((item) => item.id !== productId);
	return userCart;
}
function removeFromCart(productId, userCart) {

	const productInUserCart = userCart.find((item) => item.id === productId);
	if (!productInUserCart) {
		return userCart;
	} else if (productInUserCart.quantity === 1) {
		userCart = deletefromCart(userCart, productId);
	} else {
		userCart = userCart.map((item) => {
			if (item.id === productId) {
				return { ...item, quantity: item.quantity - 1 };
			}
		});
	}
	return userCart;
}
exports.addToCart = addToCart;
exports.deletefromCart = deletefromCart;
exports.removeFromCart = removeFromCart;
