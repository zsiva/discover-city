import { combineReducers } from 'redux'
import gameState from './game';
import timer from './timer';

const rootReducer = combineReducers({
    gameState,
    timer
});

export default rootReducer;
