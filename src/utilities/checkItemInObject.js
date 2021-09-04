export function checkItemInObject(array, item) {
	console.log(array)
	if (array && item) {
		return !!array.find((arrayItem) => arrayItem._id === item._id);
	}
	return false;
}
