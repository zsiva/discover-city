import {START_TIMER, STOP_TIMER, tick } from '../actions/timer';

const timerMiddleware = store => next => action => {

  if (action.type === START_TIMER) {
    action.interval = setInterval(() => store.dispatch(tick()), 1000);
  } else if (action.type === STOP_TIMER) {
    clearInterval(store.getState().timer.interval);
  }

  next(action);
};

export default timerMiddleware;
