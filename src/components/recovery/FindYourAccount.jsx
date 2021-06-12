import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isItUsernameOrEmail } from "../../utilities";

export default function FindYourAccount() {
	const navigate = useNavigate();
	const [userInput, setUserInput] = useState(null);

	async function findUserInDb() {
		//Checking whether userInput is an email or username or something else
		const userInputType = isItUsernameOrEmail(userInput);

		if (userInputType.success) {
			//If the userInput is one of email or username
			try {
				const { data: userData } = await axios.post(
					"https://database-1.joygupta1.repl.co/user/validate",
					{
						[userInputType.type]: userInput,
					}
				);
				navigate(`/forgot-password?userId=${userData.data.id}`);
			} catch (error) {
				console.log("Error ", error.response.data.message);
			}
		} else {
			console.log("Please enter a valid email/username");
		}
	}

	return (
		<div className="recovery-tile">
			<div className="recovery-details">
				<h1>Recover Your Account</h1>
				<div className="hr-div"></div>
				<h2>
					Please enter your username or registered email address to search your
					account
				</h2>
				<input
					onChange={(event) => setUserInput(event.target.value)}
					placeholder="Username or Email"
					type="text"
				/>
			</div>
			<div className="hr-div"></div>
			<div className="recovery-navigator">
				<button className="primary-button" onClick={findUserInDb}>
					Search
				</button>
				<button className="secondary-button">Cancel</button>
			</div>
		</div>
	);
}
