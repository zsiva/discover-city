import React, { Component } from "react";
import Button from "../Button";
import Lightbox from "../Lightbox";

import "./style.css";
import { INITIAL_TIME } from "../../data/constants";
class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  render() {
    return (
      <section className="container intro">
        <h1 className="text-center visible-xs">Help O&apos;Greeny</h1>
        <div className="row">
          <div className="col-sm-4 text-center">
            <img
              className="leprechaun"
              src="./images/ogreeny2.png"
              alt="ogreeny"
            />
          </div>
          <div className="col-xs-12 col-sm-8 text-center">
            <h1 className="hidden-xs">Help O&apos;Greeny</h1>
            <p className="text-left">
              Our little lepprechaun O&apos;Greeny was chilling, having a cold
              Guiness while his money was stolen.
            </p>
            <p className="text-left">
              He has been looking all over the world for it but cannot find it.
              Help him!
            </p>
            <br />
            <div className="row text-center">
              <div className="col-xs-6">
                <Button
                  label="Rules"
                  onClick={() => this.refs.rulesLightbox.open()}
                />
              </div>
              <div className="col-xs-6">
                <Button label="Start game" onClick={this.props.handleClick} />
              </div>
            </div>
          </div>
        </div>

        <Lightbox ref="rulesLightbox" header="Rules">
          <p>
            <strong>Summary:</strong>
            <br />You are now a detective. You need to extract clues from the
            cards to find out the thief's whereabouts. <br />
          </p>
          <p>
            <strong>Your task:</strong>
            <br /> Capture the criminal and find the stolen gold.
          </p>

          <strong>Rules:</strong>
          <br />
          <div
            role="img"
            aria-label="Clickable card"
            className="cityImage smallCard pull-right"
          >
            <div className="front" />
          </div>
          <p>
            In each step you will be given 4 clickable cards with hidden hints
            of a city. In each one you will find a picture and some info about
            the place. Once you know where the thief was, choose from one of the
            options below
          </p>
          <p>
            You have {INITIAL_TIME} seconds to complete the find the thief. If
            you answer correctly 5 seconds will added to your timer, a wrong
            answer will substract 5 seconds.
          </p>
        </Lightbox>
      </section>
    );
  }
}

export default Intro;
