//@flow
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import './style.css';

export type CardProptype = {
  flipped: boolean,
  matched: boolean,
  value: string,
  id: number,
  checkMatch: (value: string, id: number) => void,
};

export default class Card extends Component<CardProptype> {
  constructor(props: CardProptype) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick(e: SyntheticEvent<HTMLButtonElement>) {
    if (!this.props.flipped) {
      this.props.checkMatch(this.props.value, this.props.id);
    }
  }

  render() {
    return (
      <div className="cardContainer" onMouseDown={this.handleClick}>
        <div className={this.props.flipped ? ' flipped card' : ' card'}>
          <div className="front" />
          <div className="back">
            <Icon size="huge" color="green" name={this.props.value} />
          </div>
        </div>
      </div>
    );
  }
}
