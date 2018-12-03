import React from 'react';
import renderer from 'react-test-renderer';

import Button from './';

describe('Custom button', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Button name="edit" />);
    expect(tree).toMatchSnapshot();
  });
});
