import "./bubble.css";
export function BubbleLoader() {
	return (
		<div
			style={{
				position: "relative",
				paddingBottom: "15px",
				paddingLeft: "30px",
			}}
		>
			<div className="bubbleLoader"></div>
			<div className="bubbleLoader"></div>
			<div className="bubbleLoader"></div>
			<div className="bubbleLoader"></div>
		</div>
	);
}
