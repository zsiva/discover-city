import React, { Component } from 'react';
import './style.css';

class CardCity extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: '' };
    this.handleClick = this.handleClick.bind(this);
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

export default CardCity;
