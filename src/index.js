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
import { AUTH_DOMAIN, DB_URL, PROJECT_ID, FIREBASE_API_KEY } from './db-config';

import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
});

const db = firebase.firestore();

export const usersRef = db.collection('users');

const initialState = {
  timer: {
    timerIsOn: false,
    time: INITIAL_TIME,
    interval: null,
  },
  gameState: {
    currentCityID: 0,
    gameEnded: false,
    usersList: [],
  },
  player: {
    money: INITIAL_MONEY,
    name: '',
    dateTime: 8,
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
