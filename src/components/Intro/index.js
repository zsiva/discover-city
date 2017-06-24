import React, { Component } from 'react';
import Button from '../Button';

import './style.css';

class Intro extends Component {
  render() {
    const {handleClick} = this.props;
    return (
      <section className="container">
        <div className="row">
          <div className="col-xs-12">
            <img className="leprechaun" src="./images/ogreeny.png" alt=""/>
            <h1>OGreeny is looking for his gold.</h1>
            <h2>Where should he go next?</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>Our little lepprechaun Ogreeny was chilling, having a cold Guiness while his money was stolen!</p>
            <p>He has been looking all over the world for it but cannot find it. Help him!</p>
          </div>
          <div className="row">
            <div className="col-xs-12 text-center">
            <Button label="Find the gold!" onClick={handleClick}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Intro;
