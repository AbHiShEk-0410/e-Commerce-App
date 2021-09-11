import { BubbleLoader } from "./Bubble/Bubble";

export function Loader(query) {
	switch (query) {
		case "bubbleLoader":
			return BubbleLoader();
		default:
			break;
	}
}
