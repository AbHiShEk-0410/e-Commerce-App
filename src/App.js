import "./App.css";
import {
	Product,
	Wishlist,
	Login,
	Cart,
	Loader,
	Signup,
	PrivateRoute,
	Navbar,
	Error404,
	ForgotPassword,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { useLogin } from "./contexts";

export default function App() {
	const { loader } = useLogin();

	return (
		<div className="App">
			<Navbar />
			{loader && <Loader />}
			<Routes>
				<Route path="/product">
					<Product />
				</Route>
				<PrivateRoute path="/cart">
					<Cart />
				</PrivateRoute>
				<PrivateRoute path="/wishlist">element = {<Wishlist />}</PrivateRoute>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="signup">
					<Signup />
				</Route>
				<Route path="/*">
					<Error404 />
				</Route>
				<Route path="/login/forgot-password">
					<ForgotPassword />
				</Route>
			</Routes>
		</div>
	);
}
