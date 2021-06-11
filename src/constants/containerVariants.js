export const containerVariants = {
	initial: {
		x: "50%",
		opacity: 0,
		transition: { ease: "easeInOut" },
	},

	animate: {
		x: 0,
		opacity: 1,
		transition: {
			ease: "easeInOut",
			duration: 0.5,
			type: "spring",
			stiffness: 100,
		},
	},

	exit: {
		x: "-50%",
		opacity: 0,
		transition: { ease: "easeInOut" },
	},
};
