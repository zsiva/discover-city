import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import createComponentWithIntl from '../../utils/createComponentWithIntl';
import Header from './';

describe('Header', () => {
  it('should match snapshot, English', () => {
    const component = createComponentWithIntl(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { locale: 'en-US' },
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
