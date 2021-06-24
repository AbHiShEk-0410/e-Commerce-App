export function checkItemInObject(userCart, item) {
	return !!userCart.find((cartItem) => cartItem.id === item.id);
}
