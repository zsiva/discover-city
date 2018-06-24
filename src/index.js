import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import { addLocaleData, IntlProvider } from 'react-intl';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import Root from './components/Root';
import ConnectedIntlProvider from './ConnectedIntlProvider';

import './index.css';
import { INITIAL_TIME, INITIAL_MONEY } from './data/constants';
import configureStore from './configure-store';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_DOMAIN, DB_URL, PROJECT_ID, FIREBASE_API_KEY } from './db-config';
import flattenMessages from './utils/flattenMessages';
import messages from './data/messages';

addLocaleData([...en, ...es]);
let locale =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
});

export const db = firebase.firestore();

export const usersRef = db.collection('users');

const initialState = {
  timer: {
    timerIsOn: false,
    time: INITIAL_TIME,
    interval: null,
  },
  gameState: {
    gameEnded: false,
  },
  player: {
    money: INITIAL_MONEY,
    dateTime: 8,
    points: 0,
    language: locale,
  },
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider
      key={locale}
      locale={locale}
      messages={flattenMessages(messages[locale])}
    >
      <Router>
        <Route path="/" component={Root} />
      </Router>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
