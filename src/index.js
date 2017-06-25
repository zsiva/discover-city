import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './components/Root';
import './index.css';

import configureStore from './configure-store';

import {CITIES} from './data/cities.js';

const initialState = {
  gameState:
    {
      allCities : CITIES,
      nextCity: CITIES.find(city => city.name === 'Berlin'),
      thiefCities: ['Berlin', 'Paris']
    }
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
