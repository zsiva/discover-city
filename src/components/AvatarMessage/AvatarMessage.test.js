import React from 'react';
import renderer from 'react-test-renderer';

import createComponentWithIntl from '../../utils/createComponentWithIntl';
import AvatarMessage from './';

describe('AvatarMessage', () => {
  it('should match snapshot', () => {
    const component = createComponentWithIntl(
      <AvatarMessage imgSrc="./images/receptionist.png" introText="casino.welcome" />,
      { locale: 'en-US' },
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
