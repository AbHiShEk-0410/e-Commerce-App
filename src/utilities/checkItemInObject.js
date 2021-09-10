export function checkItemInObject(array, item) {

	if (array && item) {
		return !!array.find((arrayItem) => arrayItem._id === item._id);
	}
	return false;
}
