import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import timerMiddleware from './middleware/timer';

const middleware = applyMiddleware(timerMiddleware);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}
