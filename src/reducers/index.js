import { combineReducers } from 'redux';
import gameState from './game';
import timer from './timer';
import player from './player';

const rootReducer = combineReducers({
  gameState,
  timer,
  player,
});

export default rootReducer;
