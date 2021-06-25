export function checkItemInObject(array, item) {
	console.log(array, item);
	return !!array.find((arrayItem) => arrayItem.id === item.id);
}
