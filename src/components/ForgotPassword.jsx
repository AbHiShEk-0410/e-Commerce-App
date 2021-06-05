import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./CSS/forgot-password.css";
export default function ForgotPassword() {
	console.log("Forgot");
	const location = useLocation();
	const navigate = useNavigate();
	console.log(location);
	const FirstContainer = {
		hidden: {
			opacity: 0,
			x: "100vw",
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: "spring", delay: 0.5 },
		},
		exit: {
			x: "-100vh",
			transition: { ease: "easeInOut" },
		},
	};
	const SecondContainer = {
		hidden: {
			opacity: 0,
			x: "100vw",
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: "spring", delay: 0.5 },
		},
		exit: {
			x: "-100vh",
			transition: { ease: "easeInOut" },
		},
	};
	const ThirdContainer = {
		hidden: {
			opacity: 0,
			x: "100vw",
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: "spring", delay: 0.5 },
		},
		exit: {
			x: "-100vh",
			transition: { ease: "easeInOut" },
		},
	};

	function RecoveryFirst() {
		return (
			<div className="recovery-parent">
				<motion.div
					variants={FirstContainer}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="recovery-tile"
				>
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
							onClick={() => navigate("/forgot-password/user/123")}
							className="primary-button"
						>
							Search
						</button>
						<button className="secondary-button">Cancel</button>
					</div>
				</motion.div>
			</div>
		);
	}
	function RecoverySecond() {
		return (
			<div className="recovery-parent">
				<motion.div
					className="recovery-tile"
					variants={SecondContainer}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
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
							onClick={() => navigate("/forgot-password/reset")}
							className="primary-button"
						>
							Verify
						</button>
						<button className="secondary-button">Cancel</button>
					</div>
				</motion.div>
			</div>
		);
	}
	function RecoveryThird() {
		return (
			<div className="recovery-parent">
				<motion.div
					className="recovery-tile"
					variants={ThirdContainer}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
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
							onClick={() => navigate("/forgot-password")}
							className="primary-button"
						>
							Change
						</button>
						<button className="secondary-button">Cancel</button>
					</div>
				</motion.div>
			</div>
		);
	}

	return (
		<>
			<AnimatePresence exitBeforeEnter>
				<Routes location={location} key={location.key}>
					<Route path="/forgot-password">
						<RecoveryFirst />
					</Route>
					<Route path="/forgot-password/user/:id">
						<RecoverySecond />
					</Route>
					<Route path="/forgot-password/reset">
						<RecoveryThird />
					</Route>
				</Routes>
			</AnimatePresence>
		</>
	);
}
