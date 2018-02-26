import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
//import Button from '../Button';
import Header from '../Header';
import Lightbox from '../Lightbox';
import Spinner from '../Spinner';
import Hints from './Hints';

import { loadNextCity } from '../../actions/cities';
import { stopTimer, startTimer, addTime, substractTime } from '../../actions/timer';

class CityLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { header: '', body: '', spinner: false, openModal: false };
    this.handleClick = this.handleClick.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
  }

  async getNextCity() {
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
    this.refs.hintsLightbox.open();
    this.getNextCity();
  }

  render() {
    const { currentCity, isOn, gameEnded } = this.props;
    if (gameEnded) {
      this.refs.hintsLightbox.open();
    }
    return (
      <Fragment>
        <Header />
        {this.state.spinner && <Spinner text="Loading data" />}
        <section className="ui container">
          <Hints currentCity={currentCity} isOn={isOn} />

          <Button.Group color="green" widths="5" size="large">
            {currentCity &&
              currentCity.cityOptions.map((city, index) => (
                <Fragment>
                  <Button key={index} content={city} onClick={this.handleClick} />
                  {index < 2 && <Button.Or />}
                </Fragment>
              ))}
          </Button.Group>
        </section>
        <Lightbox
          ref="hintsLightbox"
          open={gameEnded}
          buttonLabel={gameEnded ? 'Finish game' : 'Find him!'}
          onHide={this.getNextCity}
          header={gameEnded ? 'Your time is up!' : this.state.header}
        >
          <Grid>
            <Grid.Column width={8}>
              <img
                src={gameEnded ? './images/timeup.jpg' : './images/thief.png'}
                alt={this.state.header}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              {gameEnded ? (
                <p>Unfortunately the thief got away with O&apos;Greeny&apos;s gold</p>
              ) : (
                this.state.body.split('.').map((p, i) => <p key={i}>{p}</p>)
              )}
            </Grid.Column>
          </Grid>
        </Lightbox>
      </Fragment>
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
