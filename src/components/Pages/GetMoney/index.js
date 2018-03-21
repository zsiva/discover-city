//@flow
import React, { Component, Fragment } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Container, Statistic, Button } from 'semantic-ui-react';
import Lightbox from '../../Lightbox';
import { startTimer } from '../../../actions/timer';
import Cards from '../../Card/Cards';
import Game from '../../Card/Game';
import Spinner from '../../Spinner';
import Header from '../../Header';

export type GetMoneyPropType = {
  gameEnded: boolean,
  dispatch: Dispatch,
  timeRemaining: number,
  isLoading: boolean,
};

export type GetMoneyStateType = {
  openModal: boolean,
  correctAnswers: number,
};

class GetMoney extends Component<GetMoneyPropType, GetMoneyStateType> {
  constructor(props: GetMoneyPropType) {
    super(props);
    this.state = {
      openModal: false,
      correctAnswers: 0,
      previousAnswer: '',
      flipped: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startTimer());
  }

  render() {
    const { timeRemaining, isLoading, gameEnded } = this.props;

    if (gameEnded) {
      this.refs.hintsLightbox.open();
    }
    if (isLoading) {
      return <Spinner text="Loading data" />;
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
              <Statistic.Value>{timeRemaining}</Statistic.Value>
              <Statistic.Label>sec</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </header>
        <Container>
          <Game />
        </Container>
        <Lightbox ref="hintsLightbox" header="Your time is up!">
          <Grid>
            <Grid.Column width={8}>
              <img src="./images/timeup.jpg" alt="time up" />
            </Grid.Column>
            <Grid.Column width={8}>
              <p>Your time is up, you got {this.state.correctAnswers} correct answers.</p>
              <p>{this.state.correctAnswers * 5} extra seconds</p>
              <Link to="/user">
                <Button color="green">
                  <Button.Content content="Back to the profile" />
                </Button>
              </Link>
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
    timeRemaining: state.timer.time,
    isLoading: state.gameState.isLoading,
  };
};

export default connect(mapStateToProps)(GetMoney);
