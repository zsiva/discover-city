import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import createComponentWithIntl from '../../utils/createComponentWithIntl';
import Spinner from './';

describe('Spinner', () => {
  it('should be defined', () => {
    expect(Spinner).toBeDefined();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Spinner name="Loading..." />);
    expect(tree).toMatchSnapshot();
  });
});
