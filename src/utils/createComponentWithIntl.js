import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import messages from '../data/messages';
import flattenMessages from '../utils/flattenMessages';

const createComponentWithIntl = (children, props = { locale: 'en-US' }) => {
  return renderer.create(
    <IntlProvider {...props} messages={flattenMessages(messages[props.locale])}>
      {children}
    </IntlProvider>,
  );
};

export default createComponentWithIntl;
