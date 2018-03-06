import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Responsive, Statistic } from 'semantic-ui-react';
import Lightbox from '../Lightbox';
import Spinner from '../Spinner';
import Hints from './Hints';
import LightboxFounded from './LightboxFounded';
import { loadNextCity } from '../../actions/cities';
import { stopTimer, startTimer, addTime, substractTime } from '../../actions/timer';
import Transport from '../Transport';

class CityLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { header: '', body: '', spinner: false, openModal: false, showAnimation: true };
    this.handleClick = this.handleClick.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
  }

  async getNextCity() {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
    console.log('getting next city');
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
    this.refs.foundedLightbox.open();
    setTimeout(this.setState({ showAnimation: false }), 3000);
    //this.getNextCity();
  }

  render() {
    const { currentCity, timerIsOn, gameEnded, timeRemaining } = this.props;

    if (gameEnded) {
      this.refs.hintsLightbox.open();
    }
    return (
      <Fragment>
        <header className="header">
          <Statistic.Group widths="two" color="green" inverted size="small">
            <Statistic>
              <Statistic.Value text>1</Statistic.Value>
              <Statistic.Label>Corrent answers</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{timeRemaining}</Statistic.Value>
              <Statistic.Label>sec</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </header>
        {this.state.spinner && <Spinner text="Loading data" />}
        <section className="ui container">
          <Hints currentCity={currentCity} timerIsOn={timerIsOn} />
          <br />
          <Responsive minWidth="762">
            <Button.Group color="green" widths="5" size="large">
              {currentCity &&
                currentCity.cityOptions.map((city, index) => (
                  <Fragment>
                    <Button key={index} content={city} onClick={this.handleClick} />
                    {index < 2 && <Button.Or />}
                  </Fragment>
                ))}
            </Button.Group>
          </Responsive>
          <Responsive maxWidth="761">
            <Button.Group color="green" fluid vertical labeled icon size="massive">
              {currentCity &&
                currentCity.cityOptions.map((city, index) => (
                  <Button key={index} icon="map pin" content={city} onClick={this.handleClick} />
                ))}
            </Button.Group>
          </Responsive>
        </section>

        <LightboxFounded
          ref="foundedLightbox"
          buttonLabel="Find him!"
          onHide={this.getNextCity}
          header={this.state.header}
        />

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
    timerIsOn: state.timer.timerIsOn,
    gameEnded: state.timer.gameEnded,
    timeRemaining: state.timer.time,
  };
};

export default connect(mapStateToProps)(CityLayout);
