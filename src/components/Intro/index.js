import React, { Component } from 'react';
import Button from '../Button';

import './style.css';

class Intro extends Component {
  render() {
    const {handleClick} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img className="leprechaun" src="./images/ogreeny.png" alt=""/>
            <h1>OGreeny is looking for his gold.<br />
            <small>Where should he go next?</small></h1>
            <p>Our little lepprechaun Ogreeny was chilling, having a cold Guiness while his money was stolen!</p>
            <p>He has been looking all over the world for it but cannot find it. Help him!</p>
          </div>
          <div className="row">
            <div className="col-12 text-center">
            <Button label="Find the gold!" onClick={handleClick}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
