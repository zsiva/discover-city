import React, { Component } from 'react';
import Intro from '../Intro';
import CityLayout from '../CityLayout';
import Spinner from '../Spinner';

import './style.css';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { intro: true, spinner: false}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({...this.state, spinner: true})
    //Fake laoding data
    setTimeout(() => {
        this.setState({...this.state, intro: false, spinner: false});
    }, 2000);

  }
  render() {
    const {className} = this.props;

    return (
      <div className={["App", className].join(' ')}>
        {this.state.spinner && <Spinner text="Loading game"/>}
        {this.state.intro && !this.state.spinner && <Intro handleClick={this.handleClick}/>}
        {!this.state.intro && <CityLayout />}
        {this.props.children}
      </div>
    );
  }
}

export default Root;
