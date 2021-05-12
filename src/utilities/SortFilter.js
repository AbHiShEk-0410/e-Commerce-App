export function SortFilter(
    productList,
    sortBy,
    showFastDelivery,
    showInventory
  ) {
    function getSortedData(productList, sortBy) {
      if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
        return [...productList].sort((a, b) => b["price"] - a["price"]);
      } else if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
        return [...productList].sort((a, b) => a["price"] - b["price"]);
      } else {
        return productList;
      }
    }
    function getFilteredData(productList, showFastDelivery, showInventory) {
      return [...productList]
        .filter(({ delivery }) =>
          showFastDelivery ? delivery === "1 Day" : true
        )
        .filter(({ inStock }) => (showInventory ? true : inStock));
    }
    const sortedData = getSortedData(
      productList,
      sortBy,
      showFastDelivery,
      showInventory
    );
    const filteredData = getFilteredData(
      sortedData,
      showFastDelivery,
      showInventory
    );
    return filteredData;
  }
  