export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESUME_TIMER = 'RESUME_TIMER';
export const TICK = 'TICK';


// action creators
export const startTimer = (time) => ({ type: START_TIMER, time });
export const stopTimer = () => ({ type: STOP_TIMER });
export const resumeTimer = () => ({ type: RESUME_TIMER });
export const tick = () => ({ type: TICK });
