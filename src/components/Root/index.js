import React, { Component } from 'react';

import './style.css';

class Root extends Component {
  render() {
    const {className} = this.props;

    return (
      <div className={["App", className].join(' ')}>
        <h2>Select a city</h2>
        {this.props.children}

      </div>
    );
  }
}

export default Root;
