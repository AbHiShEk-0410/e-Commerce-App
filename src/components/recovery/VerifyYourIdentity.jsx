import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { queryStringToObject } from "../../utilities";

export default function VerifyYourIdentity() {
	const [userData, setUserData] = useState({});
	const [userInput, setUserInput] = useState(null);
	const navigate = useNavigate();
	const { search } = useLocation();
	const searchObj = queryStringToObject(search);
	useEffect(() => {
		const getDataFromServer = async () => {
			try {
				const dataFromServer = await axios.get(
					`https://database-1.joygupta1.repl.co/user/security-question/${searchObj.userId}`
				);
				setUserData(dataFromServer.data.data);
			} catch ({ response }) {
				console.log(response.data.message);
			}
		};
		getDataFromServer();
	}, []);

	async function validateUser() {
		try {
			const serverResponse = await axios.post(
				"https://database-1.joygupta1.repl.co/user/security-answer-validation",
				{
					id: searchObj.userId,
					answer: userInput,
				}
			);
			console.log(serverResponse);
			if (serverResponse.data.success) {
				localStorage.setItem("isUserValid", JSON.stringify(true));
				navigate(`/forgot-password?userId=${searchObj.userId}&reset=true`, {
					state: {
						name: userData.name,
					},
				});
			} else {
				console.log(serverResponse);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="recovery-tile">
			<div className="recovery-details">
				<h1>
					Please Verify Its You!
					<span>{userData.name}</span>
				</h1>
				<div className="hr-div"></div>
				<h2>Enter answer to the security question</h2>
				<div className="recovery-qna">
					<h3 className="recovery-question">{userData.question}</h3>
					<input
						onChange={(event) => setUserInput(event.target.value)}
						placeholder="Answer"
						type="text"
					/>
				</div>
			</div>
			<div className="hr-div"></div>
			<div className="recovery-navigator">
				<button onClick={validateUser} className="primary-button">
					Verify
				</button>
				<button className="secondary-button">Cancel</button>
			</div>
		</div>
	);
}
