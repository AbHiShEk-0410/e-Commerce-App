import "./CSS/forgot-password.css";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	queryStringToObject,
	isItUsernameOrEmail,
	checkUserId,
} from "../utilities";
import { Error404 } from "./";

const containerVariants = {
	initial: {
		x: "50%",
		opacity: 0,
		transition: { ease: "easeInOut" },
	},

	animate: {
		x: 0,
		opacity: 1,
		transition: { ease: "easeInOut", duration: 0.5, type: "spring", stiffness:100 },
	},

	exit: {
		x: "-50%",
		opacity: 0,
		transition: { ease: "easeInOut" },
	},
};
function FindYourAccount() {
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
					<Link
						className="primary-button"
						to={{ pathname: "/forgot-password", search: "?userId=12" }}
					>
						Search
					</Link>
					<button className="secondary-button">Cancel</button>
				</div>
			</div>
		</div>
	);
}
function VerifyYourIdentity() {
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
					<Link
						className="primary-button"
						to={{
							pathname: "/forgot-password",
							search: "?userId=12&resetPassword=true",
						}}
					>
						Verify
					</Link>

					<button className="secondary-button">Cancel</button>
				</div>
			</div>
		</div>
	);
}
function RecoverYourAccount() {
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
					<Link
						className="primary-button"
						to={{ pathname: "/forgot-password" }}
					>
						Change
					</Link>
					<button className="secondary-button">Cancel</button>
				</div>
			</div>
		</div>
	);
}
const pages = {
	findYourAccount: FindYourAccount,
	verifyYourAccount: VerifyYourIdentity,
	recoverYourAccount: RecoverYourAccount,
	error: Error404,
};

export default function ForgotPassword() {
	const [recoveryTile, setRecoveryTile] = useState("findYourAccount");
	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const urlObject = queryStringToObject(search);
		if (pathname === "/forgot-password" && search === "") {
			setRecoveryTile("findYourAccount");
		} else if (
			checkUserId(urlObject.userId) &&
			urlObject.resetPassword === "true"
		) {
			setRecoveryTile("recoverYourAccount");
		} else if (checkUserId(urlObject.userId)) {
			setRecoveryTile("verifyYourAccount");
		} else {
			setRecoveryTile("error");
		}
	}, [pathname, search]);
	const Component = pages[recoveryTile];

	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				key={recoveryTile}
				variants={containerVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<Component />
			</motion.div>
		</AnimatePresence>
	);
}
