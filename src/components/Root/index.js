import React, { Component } from 'react';
import Intro from '../Intro';

import './style.css';

class Root extends Component {
  render() {
    const {className} = this.props;

    return (
      <div className={["App", className].join(' ')}>
        <Intro />
        {this.props.children}

      </div>
    );
  }
}

export default Root;
