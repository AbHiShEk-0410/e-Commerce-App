import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider, WishlistProvider, AuthProvider, SortFilterProvider } from "./contexts";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SortFilterProvider>
            <Router>
              <App />
            </Router>
          </SortFilterProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
