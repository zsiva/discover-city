//@flow
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import './style.css';

export type CardIconPropType = {
  icon: string,
  flipped: boolean,
  handleClick: () => any,
};

export type CardIconStateType = {
  flipped: boolean,
};

class CardIcon extends Component<CardIconPropType, CardIconStateType> {
  constructor(props: CardIconPropType) {
    super(props);
    this.state = { flipped: false };
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ ...this.state, flipped: !this.state.flipped });
  }

  render() {
    return (
      <div className="card">
        <div
          className={
            this.state.flipped || this.props.flipped ? 'cardContent flipped' : ' cardContent'
          }
          onMouseDown={this.props.handleClick}
        >
          <div className="front" />
          <div className="back icon">
            <Icon size="huge" color="green" name={this.props.icon} />
          </div>
        </div>
      </div>
    );
  }
}

export default CardIcon;
