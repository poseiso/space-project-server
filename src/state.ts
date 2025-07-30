export let isPaused = false;

export function pauseCalc() {
  isPaused = true;
}

export function resumeCalc() {
  isPaused = false;
}

export function resetCalc() {
  isPaused = false;
}
