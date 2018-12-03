import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import ConnectedIntlProvider from './ConnectedIntlProvider';

import Root from './components/Root';

import { INITIAL_TIME, INITIAL_MONEY } from './data/constants';
import configureStore from './configure-store';
import registerServiceWorker from './registerServiceWorker';
import flattenMessages from './utils/flattenMessages';
import messages from './data/messages';

import './index.css';

addLocaleData([...en, ...es]);
let locale = 'en-US';

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
