import React, { Component, Fragment } from 'react';
import { Button, Responsive } from 'semantic-ui-react';

import Lightbox from '../Lightbox';

import './style.css';
import { INITIAL_TIME } from '../../data/constants';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleOpen = () => this.refs.lightbox.open();

  render() {
    return (
      <Fragment>
        <section className="container intro">
          <Responsive as="h1" maxWidth={480}>
            Help O&apos;Greeny
          </Responsive>
          <img className="leprechaun" src="./images/ogreeny2.png" alt="ogreeny" />
          <Responsive as="h1" minWidth={481}>
            Help O&apos;Greeny
          </Responsive>
          <p className="text-left">
            Our little lepprechaun O&apos;Greeny was chilling, having a cold Guiness while his money
            was stolen.
          </p>
          <p className="text-left">
            He has been looking all over the world for it but cannot find it. Help him!
          </p>
          <br />
          <Button color="green" content="Rules" onClick={this.handleOpen} />
          <Button onClick={this.props.handleClick} content="Start game" color="green" />
        </section>
        <Lightbox ref="lightbox" open={this.state.isOpen} header="Rules">
          <p>
            <strong>Summary:</strong>
            <br />You are now a detective. You need to extract clues from the cards to find out the
            thief's whereabouts. <br />
          </p>
          <p>
            <strong>Your task:</strong>
            <br /> Capture the criminal and find the stolen gold.
          </p>

          <strong>Rules:</strong>
          <br />
          <div role="img" aria-label="Clickable card" className="cityImage smallCard pull-right">
            <div className="front" />
          </div>
          <p>
            In each step you will be given 4 clickable cards with hidden hints of a city. In each
            one you will find a picture and some info about the place. Once you know where the thief
            was, choose from one of the options below
          </p>
          <p>
            You have {INITIAL_TIME} seconds to complete the find the thief. If you answer correctly
            5 seconds will added to your timer, a wrong answer will substract 5 seconds.
          </p>
        </Lightbox>
      </Fragment>
    );
  }
}

export default Intro;
