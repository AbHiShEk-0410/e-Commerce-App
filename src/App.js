import "./App.css";
import {
	Product,
	Wishlist,
	Login,
	Cart,
	Signup,
	PrivateRoute,
	Navbar,
	Error404,
	ForgotPassword,
} from "./components";
import { Route, Routes } from "react-router-dom";
export default function App() {
	
	return (
		<div className="App">
			<Navbar />
			
			<Routes>
				<Route path="/product">
					<Product />
				</Route>
				<PrivateRoute path="/cart">
					<Cart />
				</PrivateRoute>
				<PrivateRoute path="/wishlist">
					<Wishlist />
				</PrivateRoute>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>
				<Route path="/*">
					<Error404 />
				</Route>
			</Routes>
		</div>
	);
}
