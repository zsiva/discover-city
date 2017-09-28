import React, { Component } from 'react';
import Button from '../Button';

import './style.css';

class Intro extends Component {
  render() {
    const {handleClick} = this.props;
    return (
      <section className="container intro">
        
        <h1 className="text-center visible-xs">Help O&apos;Greeny</h1>
        <div className="row">
          <div className="col-sm-4 text-center">
            <img className="leprechaun" src="./images/ogreeny2.png" alt="ogreeny"/>
          </div>
          <div className="col-xs-12 col-sm-8 text-center">
            <h1 className="hidden-xs">Help O&apos;Greeny</h1>
            <p className="text-left">Our little lepprechaun Ogreeny was chilling, having a cold Guiness while his money was stolen!</p>
            <p className="text-left">He has been looking all over the world for it but cannot find it. Help him!</p>
            <Button label="Find the gold!" onClick={handleClick}/>
          </div>
        </div>
      </section>
    );
  }
}

export default Intro;
