import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Header from "../Header";
import Lightbox from "../Lightbox";
import Spinner from "../Spinner";
import HintRow from "../HintRow";
import Hints from "./Hints";

import { ListGroup } from "react-bootstrap";
import "./style.css";

import { loadNextCity } from "../../actions/cities";
import { stopTimer, startTimer, addTime } from "../../actions/timer";

const CityRow = props => (
  <div className="col-xs-4 text-center option-btn">
    <Button label={props.label} onClick={props.handleClick} />
  </div>
);

class CityLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { header: "", body: "", spinner: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  async handleExit(event) {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
    dispatch(startTimer());
  }

  handleClick(event) {
    const { currentCity, dispatch } = this.props;
    dispatch(stopTimer());

    if (event.currentTarget.innerText === currentCity.name) {
      this.setState({
        ...this.state,
        header: "Yes! He was in " + currentCity.name,
        body:
          "Well done, you earn some extra time!. But he is on the run again. Follow the hints to see where he went next!"
      });
      dispatch(addTime(5));
    } else {
      this.setState({
        ...this.state,
        header: "No, sorry! He was in " + currentCity.name,
        body: "You missed him!. Get some more hints to see where he went next!"
      });
    }
    this.refs.thiefLightbox.open();
  }

  render() {
    const { currentCity, isOn, gameEnded } = this.props;
    return (
      <div>
        <Header />
        {this.state.spinner && <Spinner text="Loading data" />}
        <section className="container">
          <Hints currentCity={currentCity} isOn={isOn} />
          <div className="row text-center">
            <h5>Where is he?</h5>
            {currentCity &&
              currentCity.cityOptions.map((city, index) => (
                <CityRow
                  key={index}
                  label={city}
                  handleClick={this.handleClick}
                />
              ))}
          </div>
        </section>
        <Lightbox
          img="./images/thief.png"
          header={this.state.header}
          ref="thiefLightbox"
          body={this.state.body}
          buttonLabel="Find him!"
          onExiting={this.handleExit}
        />
        <Lightbox
          img="./images/timeup.jpg"
          header="Your time is up!"
          body="Unfortunately the thief got away with O&apos;Greeny&apos;s gold"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
    isOn: state.timer.isOn,
    gameEnded: state.timer.gameEnded
  };
};

export default connect(mapStateToProps)(CityLayout);
