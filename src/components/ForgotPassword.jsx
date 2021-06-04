import "./CSS/forgot-password.css";
export default function ForgotPassword() {
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
					<input placeholder="Username or Email" type="text" />
				</div>
				<div className="hr-div"></div>
				<div className="recovery-navigator">
				<button className = "primary-button">Search</button>
					<button className="secondary-button">Cancel</button>
					
				</div>
			</div>
		</div>
	);
}
