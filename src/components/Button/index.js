import React, { Component } from 'react';

import './style.css';

class Button extends Component {
  render() {
    const {handleClick, label} = this.props;

    return (
      <button
        className="btn"
        onClick={handleClick}>{label}</button>
    );
  }
}

export default Button;
