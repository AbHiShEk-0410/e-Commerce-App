function addToCart(product, userCart) {
	const productInUserCart = userCart.find((item) => item.id === product.id);
	console.log("product", product);
	if (!productInUserCart) {
		userCart.push({ ...product, quantity: 1 });
		return userCart;
	} else {
		userCart = userCart.map((item) => {
			if (item.id === product.id) {
				return { ...item, quantity: item.quantity + 1 };
			} else {
				return item;
			}
		});
	}
	return userCart;
}

function deletefromCart(product, userCart) {
	//To completely remove product from cart
	userCart = userCart.filter((item) => item.id !== product.id);
	return userCart;
}

function removeFromCart(product, userCart) {
	const productInUserCart = userCart.find((item) => item.id === product.id);
	if (!productInUserCart) {
		return userCart;
	} else if (productInUserCart.quantity === 1) {
		userCart = deletefromCart(userCart, product.id);
	} else {
		userCart = userCart.map((item) => {
			if (item.id === product.id) {
				return { ...item, quantity: item.quantity - 1 };
			} else {
				return item;
			}
		});
	}
	return userCart;
}

exports.addToCart = addToCart;
exports.deletefromCart = deletefromCart;
exports.removeFromCart = removeFromCart;
