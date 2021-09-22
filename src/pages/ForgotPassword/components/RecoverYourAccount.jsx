import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { queryStringToObject } from "../../../utilities";
export default function RecoverYourAccount() {
	const [userInput, setUserInput] = useState({
		password: undefined,
		confirmPassword: undefined,
	});
	const { search } = useLocation();
	const { state } = useLocation();
	const navigate = useNavigate();
	const [disableButton, setDisableButton] = useState(true);
	const searchObj = queryStringToObject(search);

	useEffect(() => {
		if (!localStorage.getItem("isUserValid")) {
			navigate("/login"); //Later change to forbidden route
		}
		return () => {
			//If user switch to other route then the token will be removed from local storage
			localStorage.clear();
		};
	}, [navigate]);

	useEffect(() => {
		if (userInput.password === userInput.confirmPassword) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
			console.log("Password does not match");
		}
	}, [userInput]);
	console.log(disableButton);
	async function changePassword() {
		try {
				const serverReponse = await axios.post(
				"https://database-1.joygupta1.repl.co/user/reset-password",
				{
					_id: searchObj.userId,
					password: userInput.password,
				}
			);

			console.log(serverReponse);
			navigate("/login");
		} catch (error) {
			console.log(error.response.data);
		}
	}

	return (
		<div className="recovery-tile">
			<div className="recovery-details reset-password">
				<h1>
					We Got You
					<span style={{ color: "#ff6994" }}>{state.name} ✨</span>
				</h1>
				<div className="hr-div"></div>
				<h2>You are just one step away to recover your account</h2>
				<input
					className="new-password"
					onChange={(event) =>
						setUserInput({ ...userInput, password: event.target.value })
					}
					placeholder="New Password"
					type="text"
				/>

				<input
					onChange={(event) =>
						setUserInput({ ...userInput, confirmPassword: event.target.value })
					}
					placeholder="Confirm New Password"
					type="text"
				/>
			</div>
			<div className="hr-div"></div>
			<div className="recovery-navigator">
				<button
					className="primary-button"
					disabled={disableButton}
					onClick={changePassword}
				>
					Change
				</button>
				<button className="secondary-button">Cancel</button>
			</div>
		</div>
	);
}
