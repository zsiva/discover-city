//@flow
import React, { Component } from 'react';
import './style.css';

export type CardPropType = {
  label: string,
  img: string,
};

export type CardStateType = {
  classes: string,
};

class Card extends Component<CardPropType, CardStateType> {
  constructor(props: CardPropType) {
    super(props);
    this.state = { classes: '' };
    (this: any).handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps: CardPropType) {
    console.log(nextProps, this.props);
  }

  handleClick() {
    this.setState({ ...this.state, classes: 'flipped' });
  }

  render() {
    const { img, label } = this.props;
    return (
      <div className="cityCol">
        <div className={['cityImage', this.state.classes].join(' ')} onMouseDown={this.handleClick}>
          <div className="front" />
          <div className="back" style={{ backgroundImage: 'url(' + img + ')' }}>
            <span className="cityLabel">{label}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
