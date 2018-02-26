import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import Root from './components/Root';
import './index.css';
import { INITIAL_TIME } from './data/constants';
import configureStore from './configure-store';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
  timer: {
    isOn: false,
    time: INITIAL_TIME,
    interval: null,
  },
  gameState: {
    currentCityID: 0,
    gameEnded: false,
  },
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
