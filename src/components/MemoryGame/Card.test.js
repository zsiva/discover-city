import React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card';

const props = {
  id: '1',
  value: 'bug',
  matched: false,
  flipped: false,
};

const mockCallBack = jest.fn();
describe('Card', () => {
  it('should match snapshot of a card', () => {
    const tree = renderer.create(<Card {...props} checkMatch={mockCallBack} />);
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot of a flipped card', () => {
    const tree = renderer.create(<Card {...props} flipped checkMatch={mockCallBack} />);
    expect(tree).toMatchSnapshot();
  });
});
