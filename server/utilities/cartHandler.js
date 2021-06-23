function addToCart(product, userCart) {
	const productInUserCart = userCart.find((item) => item.id === product.id);
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
	//Decrease quantity by one
	const productInUserCart = userCart.find((item) => item.id === product.id);
	if (!productInUserCart) {
		return userCart;
	} else if (productInUserCart.quantity === 1) {
		return deletefromCart(product, userCart);
	} else {
		userCart = userCart.map((item) => {
			if (item.id === product.id) {
				return { ...item, quantity: item.quantity - 1 };
			} else {
				return item;
			}
		});
	}
}

exports.addToCart = addToCart;
exports.deletefromCart = deletefromCart;
exports.removeFromCart = removeFromCart;
