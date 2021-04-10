import { useReducer, createContext, useContext } from "react";
const SortFilterContext = createContext();

export function SortFilterProvider({ children }) {

  function SortFilterReducer(state, action) {

    switch (action.type) {
      case "SORT_BY":
        return { ...state, sortBy: action.pyload };

      case "TOGGLE_INVENTORY":
        return { ...state, showInventory: !state.showInventory };

      case "TOGGLE_DELIVERY":
        return { ...state, showFastDelivery: !state.showFastDelivery };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(SortFilterReducer, {
    showFastDelivery: false,
    showInventory: true,
    sortBy: null
  });

  return (
    <SortFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </SortFilterContext.Provider>
  );
}

export function useSortFilter() {

  return useContext(SortFilterContext);
}
