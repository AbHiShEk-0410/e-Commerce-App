import "./CSS/signup.css";
import signup_banner from "../images/singup_banner.png";
import front_logo from "../images/front-logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkSignupParams } from "../utilities";
import axios from "axios";
export default function Signup() {
	const [userDetails, setUserDetails] = useState({});
	const [signupParamsOK, setSignupParamsOK] = useState(false);
	useEffect(() => {
		setSignupParamsOK(checkSignupParams(userDetails).success);
	}, [userDetails]);

	async function userSignup(event) {
		event.preventDefault();
		try {
			const serverResponse = await axios.post(
				"https://database-1.joygupta1.repl.co/signup",
				{
					name: userDetails.name,
					email: userDetails.email,
					password: userDetails.password,
					question: userDetails.question,
					answer: userDetails.answer.toLowerCase(),
				}
			);
		} catch ({ response }) {
			console.log(response.data.message);
		}
	}
	return (
		<div className="signup-page">
			<div className="signup-content">
				<div className="signup-banner">
					<img src={signup_banner} alt="banner"></img>
				</div>
				<div className="signup-card">
					<div className="logo">
						<img src={front_logo} alt="" />
						<h3>bakeful</h3>
					</div>
					<div className="welcome-note">
						<h1>Welcome to the Family</h1>
					</div>
					<div>
						<p className="tag-line">
							{" "}
							A workspace to millions where you cook together, stay together.{" "}
						</p>
					</div>
					<div className="signup-inputs">
						<form class="signup-form" onSubmit={userSignup}>
							<input
								onChange={(event) =>
									setUserDetails({ ...userDetails, name: event.target.value })
								}
								placeholder="Name"
								required
							></input>
							<input
								onChange={(event) =>
									setUserDetails({ ...userDetails, email: event.target.value })
								}
								placeholder="Email address"
								type="email"
								required
							></input>
							<input
								onChange={(event) =>
									setUserDetails({
										...userDetails,
										password: event.target.value,
									})
								}
								placeholder="Password"
								type="password"
								required
								minLength="8"
							></input>
							<input
								onChange={(event) =>
									setUserDetails({
										...userDetails,
										confirmPassword: event.target.value,
									})
								}
								placeholder="Confirm Password"
								type="password"
								required
							></input>
							<select
								className="security-ques"
								onChange={(event) =>
									setUserDetails({
										...userDetails,
										question: event.target.value,
									})
								}
								placeholder="Password"
								type="password"
							>
								<option value="" disabled selected hidden>
									Select security question...
								</option>
								<option value="What is your pet name?">
									What is your pet name?
								</option>
								<option value="What is your favourite food item?">
									What is your favourite food item?
								</option>
								<option value="What would you like to be in future?">
									What would you like to be in future?
								</option>
								<option value="What is your passion hobby?">
									What is your passion hobby?
								</option>
							</select>
							<input
								onChange={(event) =>
									setUserDetails({
										...userDetails,
										answer: event.target.value,
									})
								}
								placeholder="Question's answer"
								type="text"
								required
							></input>
							<input
								// disabled={!signupParamsOK}
								className="login-button"
								type="submit"
								value="Sign Up"
							></input>
						</form>
						<p style={{ color: "#b3a2a2" }}>
							Already have an account?{" "}
							<Link
								to={{
									pathname: "/login",
								}}
							>
								{" "}
								<a className="forgot-password" href="/login">
									Log In
								</a>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
