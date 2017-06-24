import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './components/Root';
import './index.css';

import configureStore from './configure-store';

import {selectCity, createCityList, addCity} from './actions';

const initialState = {
  gameState:
    {
      cities : ['Berlin', 'London', 'Paris'],
      currentCity: 'Dublin'
    }
};

const store = configureStore(initialState);

console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
