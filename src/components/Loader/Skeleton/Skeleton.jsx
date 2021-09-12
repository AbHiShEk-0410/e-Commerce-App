import "./skeleton.css";
export function Skeleton() {
	return (
		<div>
			<span class="skeleton-loader line"></span>
		</div>
	);
}
export function Circle() {
	return (
		<div>
			<span class="skeleton-loader circle"></span>
		</div>
	);
}
export function Square({ width, height }) {
	return (
		<div>
			<span className="skeleton-loader"></span>
		</div>
	);
}
