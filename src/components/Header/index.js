import React, { Component } from 'react';
import Button from '../Button';
import CountdownTimer from '../CountdownTimer';

import './style.css';

class Header extends Component {
  render() {
    const {handleClick} = this.props;
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <CountdownTimer secondsRemaining={30}/>
            </div>
            <div className="col-xs-6 text-right">
              <Button label="Restart game" size="small"/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
