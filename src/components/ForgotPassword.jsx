import { useState } from "react";
import "./CSS/forgot-password.css";
export default function ForgotPassword() {
	const [recoveryTab, setRecoveryTab] = useState("RecoveryFirst");
	function RecoveryFirst() {
		return (
			<div className="recovery-parent">
				<div className="recovery-tile">
					<div className="recovery-details">
						<h1>Recover Your Account</h1>
						<div className="hr-div"></div>
						<h2>
							Please enter your username or registered email address to search
							your account
						</h2>
						<input
							onChange={(event) => console.log(event.target.value)}
							placeholder="Username or Email"
							type="text"
						/>
					</div>
					<div className="hr-div"></div>
					<div className="recovery-navigator">
						<button
							onClick={() => setRecoveryTab("RecoverySecond")}
							className="primary-button"
						>
							Search
						</button>
						<button className="secondary-button">Cancel</button>
					</div>
				</div>
			</div>
		);
	}
	function RecoverySecond() {
		return (
			<div className="recovery-parent">
				<div className="recovery-tile">
					<div className="recovery-details">
						<h1>
							Please Verify Its You!
							<span>Joy</span>
						</h1>
						<div className="hr-div"></div>
						<h2>Enter answer to the security question</h2>
						<div className="recovery-qna">
							<h3 className="recovery-question">What is your pet name?</h3>
							<input placeholder="Answer" type="text" />
						</div>
					</div>
					<div className="hr-div"></div>
					<div className="recovery-navigator">
						<button
							onClick={() => setRecoveryTab("RecoveryThird")}
							className="primary-button"
						>
							Verify
						</button>
						<button className="secondary-button">Cancel</button>
					</div>
				</div>
			</div>
		);
	}
	function RecoveryThird() {
		return (
			<div className="recovery-parent">
				<div className="recovery-tile">
					<div className="recovery-details">
						<h1>
							We Got You
							<span style={{ color: "#ff6994" }}>Joy ✨</span>
						</h1>
						<div className="hr-div"></div>
						<h2>You are just one step away to recover your account</h2>
						<input
							onChange={(event) => console.log(event.target.value)}
							placeholder="New Password"
							type="text"
						/>
						<input
							onChange={(event) => console.log(event.target.value)}
							placeholder="Confirm New Password"
							type="text"
						/>
					</div>
					<div className="hr-div"></div>
					<div className="recovery-navigator">
						<button
							onClick={() => setRecoveryTab("RecoveryFirst")}
							className="primary-button"
						>
							Change
						</button>
						<button className="secondary-button">Cancel</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{recoveryTab === "RecoveryFirst" && <RecoveryFirst />}
			{recoveryTab === "RecoverySecond" && <RecoverySecond />}
			{recoveryTab === "RecoveryThird" && <RecoveryThird />}
		</>
	);
}
