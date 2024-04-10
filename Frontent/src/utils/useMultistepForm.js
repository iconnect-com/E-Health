// NOTE: create hook to manage multistep form

import { useState } from "react";

export function useMultistepForm(steps) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	// STUB: go to next form page
	function next() {
		setCurrentStepIndex((i) => {
			if (i >= steps.length - 1) return i;
			return i + 1;
		});
	}

	// STUB: go to previous form page
	function back() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}

	// STUB: go to specific form page
	function goTo(index) {
		setCurrentStepIndex(index);
	}

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		steps,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		goTo,
		next,
		back,
	};
}
