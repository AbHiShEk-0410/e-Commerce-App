import "./skeleton.css";
function Line() {
	return (
		<div>
			<span class="skeleton-loader "></span>
		</div>
	);
}
function Circle() {
	return (
		<div>
			<span class="skeleton-loader "></span>
		</div>
	);
}
function Square() {
	return (
		<div>
			<span className="skeleton-loader "></span>
		</div>
	);
}
export const Skeleton = {
	Circle,
	Square,
	Line,
};
