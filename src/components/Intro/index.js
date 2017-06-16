import React, { Component } from 'react';
import Typewriter from '../Typewriter';
import Button from '../Button';

import './style.css';

class Intro extends Component {
  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img className="leprechaun" src="./images/ogreeny.png" alt=""/>
            <h1>OGreeny is looking for some gold.<br />
            <small>Where should he go next?</small></h1>
            <Typewriter
              speed={88}
              tag="pre"
              text={["Out little lepprechaun Ogreeny is looking all over the world for gold. Help him find it!"]}
              randomSpeed={true} />
            <Button label="Start game"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
