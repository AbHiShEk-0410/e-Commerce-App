import { BubbleLoader } from "./Bubble/Bubble";
import { Bar } from "./Bar/Bar";

export function Loader(query) {
	switch (query) {
		case "bubbleLoader":
			return BubbleLoader();
		case "barLoader":
			return Bar();
		default:
			break;
	}
}
