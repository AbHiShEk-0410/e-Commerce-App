export function queryStringToObject(queryString) {
	let obj = {};
	if (queryString) {
		// eslint-disable-next-line array-callback-return
		queryString
			.slice(1)
			.split("&")
			// eslint-disable-next-line array-callback-return
			.map((item) => {
				const [key, value] = item.split("=");
				// eslint-disable-next-line no-unused-expressions
				value ? (obj[key] = value) : null;
			});
	}
	return obj;
}
