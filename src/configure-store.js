import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import timerMiddleware from './middleware/timer';
import thunkMiddleware from 'redux-thunk';

const middleware = applyMiddleware(timerMiddleware, thunkMiddleware);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}
