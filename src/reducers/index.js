import { combineReducers } from 'redux'
import gameState from './game';

const rootReducer = combineReducers({
    gameState
});

export default rootReducer;
