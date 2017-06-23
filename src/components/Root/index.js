import React, { Component } from 'react';
import Intro from '../Intro';
import CityLayout from '../CityLayout';

import './style.css';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { intro: true}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({...this.state, intro: false})
  }
  render() {
    const {className} = this.props;

    return (
      <div className={["App", className].join(' ')}>
        {this.state.intro && <Intro handleClick={this.handleClick}/>}
        {!this.state.intro && <CityLayout />}
        {this.props.children}
      </div>
    );
  }
}

export default Root;
