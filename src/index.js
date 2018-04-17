import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Root from './components/Root';
import './index.css';
import { INITIAL_TIME, INITIAL_MONEY } from './data/constants';
import configureStore from './configure-store';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
  timer: {
    timerIsOn: false,
    time: INITIAL_TIME,
    interval: null,
  },
  gameState: {
    currentCityID: 0,
    gameEnded: false,
  },
  player: {
    money: INITIAL_MONEY,
    name: '',
    points: 0,
    language: 'en',
  },
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Root} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
