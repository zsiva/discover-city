const START_TIMER = "START_TIMER";
const STOP_TIMER = "STOP_TIMER";
const TICK = "TICK";
const ADD_TIME = "ADD_TIME";
const SUBSTRACT_TIME = "SUBSTRACT_TIME";

const startTimer = time => ({ type: START_TIMER, time });
const stopTimer = () => ({ type: STOP_TIMER });
const tick = () => ({ type: TICK });
const addTime = sec => ({ type: ADD_TIME, sec });
const substractTime = sec => ({ type: SUBSTRACT_TIME, sec });
export {
  startTimer,
  stopTimer,
  tick,
  addTime,
  substractTime,
  START_TIMER,
  STOP_TIMER,
  TICK,
  ADD_TIME,
  SUBSTRACT_TIME
};
