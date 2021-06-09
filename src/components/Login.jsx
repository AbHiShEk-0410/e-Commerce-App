import "./CSS/Login.css";
import axios from "axios";
import { useLogin } from "../contexts";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { checkLoginParams } from "../utilities";

export default function Login() {
	const { state } = useLocation();
	const [userDetails, setUserDetails] = useState({});
	const [loginParams, setLoginParams] = useState({});
	const { login, setLogin } = useLogin();
	const navigate = useNavigate();

	useEffect(() => {
		setLogin(JSON.parse(localStorage.getItem("Login")));
	}, [login, setLogin]);

	useEffect(() => {
		setLoginParams(checkLoginParams(userDetails));
	}, [userDetails]);

	async function Signup(event) {
		event.preventDefault();
		try {
			let loginResponse = await axios.post(
				"https://database-1.joygupta1.repl.co/login",
				{
					[loginParams.type]: userDetails.user,
					password: userDetails.password,
				}
			);
			setLogin(true);
			localStorage.setItem("Login", JSON.stringify("true"));
			navigate(state === null ? "/product" : state.from);
		} catch ({ response }) {
			console.log(response.data);
		}
	}
	return (
		<div className="login">
			{/* Branding */}
			<div className="brand">
				<h1 className="brand-name">Bakeful</h1>
				<p>
					Bakeful belives{" "}
					<strong>"NO ONE IS A GREAT COOK, ONE LEARNS BY DOING"</strong>
				</p>
			</div>

			{/* Actual Login */}
			<div className="login-card">
				<div>
					<form className="login-form" onSubmit={Signup}>
						<input
							onChange={(event) =>
								setUserDetails({ ...userDetails, user: event.target.value })
							}
							placeholder="Email address or username"
						></input>
						<input
							onChange={(event) =>
								setUserDetails({ ...userDetails, password: event.target.value })
							}
							placeholder="Password"
							type="password"
						></input>
						<input
							disabled={!loginParams.success}
							className="login-button primary-button"
							type="submit"
							value="Log In"
						></input>
					</form>

					<Link
						className="forgot-password"
						to={{
							pathname: "/forgot-password",
						}}
					>
						<p href="#">Forgotten password?</p>
					</Link>
				</div>
				<div className="separator">
					<hr />
				</div>
				<div>
					<Link
						to={{
							pathname: "/signup",
						}}
					>
						<button className="signup-button secondary-button">
							Create an account
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
