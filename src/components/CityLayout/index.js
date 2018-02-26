import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
//import Button from '../Button';
import Header from '../Header';
import Lightbox from '../Lightbox';
import Spinner from '../Spinner';
import Hints from './Hints';

import './style.css';

import { loadNextCity } from '../../actions/cities';
import { stopTimer, startTimer, addTime, substractTime } from '../../actions/timer';

class CityLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { header: '', body: '', spinner: false };
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
        header: 'Yes! He was in ' + currentCity.name,
        body:
          'Well done, you earn some extra time!. But he is on the run again. Follow the hints to see where he went next!',
      });
      dispatch(addTime(5));
    } else {
      this.setState({
        ...this.state,
        header: 'No, sorry! He was in ' + currentCity.name,
        body: 'You missed him!. Get some more hints to see where he went next!',
      });
      dispatch(substractTime(5));
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

            <Button.Group color="green">
              {currentCity &&
                currentCity.cityOptions.map((city, index) => (
                  <Button key={index} content={city} onClick={this.handleClick} />
                ))}
            </Button.Group>
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
          show={gameEnded}
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
    gameEnded: state.timer.gameEnded,
  };
};

export default connect(mapStateToProps)(CityLayout);
