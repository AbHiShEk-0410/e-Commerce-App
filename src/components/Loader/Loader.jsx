import { BubbleLoader } from "./Bubble/Bubble";
import { Bar } from "./Bar/Bar";
import { Spinner } from "./Spinner/Spinner";

export function Loader(query) {
	switch (query) {
		case "bubbleLoader":
			return BubbleLoader();
		case "barLoader":
			return Bar();
		case "spinnerLoader":
			return Spinner();
		default:
			break;
	}
}
