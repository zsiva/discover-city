import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Responsive, Statistic } from 'semantic-ui-react';
import Lightbox from '../Lightbox';
import Cards from './Cards';
import { loadNextCity } from '../../actions/cities';
import { startTimer } from '../../actions/timer';
import Header from '../Header';

class GetMoney extends Component {
  constructor(props) {
    super(props);
    this.state = { openModal: false, correctAnswers: 0 };
    this.handleClick = this.handleClick.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startTimer());
    this.getNextCity();
  }

  async getNextCity() {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
  }

  handleClick(event) {
    const { currentCity } = this.props;

    if (event.currentTarget.innerText === currentCity.name) {
      this.setState({
        ...this.state,
        correctAnswers: this.state.correctAnswers + 1,
      });
    }
    this.getNextCity();
  }

  render() {
    const { currentCity, timerIsOn, gameEnded } = this.props;

    if (gameEnded) {
      this.refs.hintsLightbox.open();
    }

    return (
      <Fragment>
        <Header />
        <header className="header">
          <Statistic.Group widths="three" color="green" inverted size="small">
            <Statistic>
              <Statistic.Value>{this.state.correctAnswers}</Statistic.Value>
              <Statistic.Label>Answers</Statistic.Label>
            </Statistic>
            <Statistic floated="right">
              <Statistic.Value>0</Statistic.Value>
              <Statistic.Label>sec</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </header>
        <section className="ui container">
          {currentCity && <Cards currentCity={currentCity} />}
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

        <Lightbox ref="hintsLightbox" buttonLabel="Back to profile" header="Your time is up!">
          <Grid>
            <Grid.Column width={8}>
              <img src="./images/timeup.jpg" alt="time up" />
            </Grid.Column>
            <Grid.Column width={8}>
              <p>Your time is up, you got {this.state.correctAnswers} correct answers.</p>
              <p>{this.state.correctAnswers * 5} extra seconds</p>
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
    gameEnded: state.timer.gameEnded,
    timerIsOn: state.timer.timerIsOn,
  };
};

export default connect(mapStateToProps)(GetMoney);
