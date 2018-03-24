import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import './style.css';

export default class NewCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!this.props.flipped) {
      this.props.checkMatch(this.props.value, this.props.id);
    }
  }

  render() {
    return (
      <div className="card">
        <div
          className={this.props.flipped ? 'cardContent flipped' : ' cardContent'}
          onMouseDown={this.handleClick}
        >
          <div className="front" />
          <div className="back icon">
            <Icon size="huge" color="green" name={this.props.value} />
          </div>
        </div>
      </div>
    );
  }
}
