import "./CSS/forgot-password.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { queryStringToObject, checkUserId } from "../utilities";
import { recovery } from "./recovery";
import { containerVariants } from "../constants";
import { Error404 } from "./";

const recoveryPages = {
	findYourAccount: recovery.FindYourAccount,
	verifyYourAccount: recovery.VerifyYourIdentity,
	recoverYourAccount: recovery.RecoverYourAccount,
	error: Error404,
};

export default function ForgotPassword() {
	//Only renders when the url is "/forgot-password and then the first recovery tile will appear"
	const [recoveryTile, setRecoveryTile] = useState("findYourAccount");
	const { search, pathname } = useLocation();

	useEffect(() => {
		const urlObject = queryStringToObject(search);

		if (pathname === "/forgot-password" && search === "") {
			setRecoveryTile("findYourAccount");
		} else if (
			!!urlObject.userId &&
			checkUserId(urlObject.userId) &&
			urlObject.reset === "true" &&
			Object.keys(urlObject).length === 2
		) {
			setRecoveryTile("recoverYourAccount");
		} else if (
			!!urlObject.userId &&
			checkUserId(urlObject.userId) &&
			Object.keys(urlObject).length === 1
		) {
			setRecoveryTile("verifyYourAccount");
		} else {
			setRecoveryTile("error");
		}
	}, [pathname, search]);
	const Component = recoveryPages[recoveryTile];

	return (
		<div className="recovery-parent">
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
		</div>
	);
}
