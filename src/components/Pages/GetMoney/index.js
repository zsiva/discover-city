//@flow
import React, { Component, Fragment } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Grid, Container, Statistic } from 'semantic-ui-react';
import Lightbox from '../../Lightbox';
import { startTimer } from '../../../actions/timer';
import Cards from './Cards';
import Spinner from '../../Spinner';

export type GetMoneyPropType = {
  gameEnded: boolean,
  dispatch: Dispatch,
  timeRemaining: number,
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
    const { timeRemaining, isLoading } = this.props;

    // if (gameEnded) {
    //   this.refs.hintsLightbox.open();
    // }
    if (isLoading) {
      return <Spinner text="Loading data" />;
    }

    return (
      <Fragment>
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
          <Cards />
        </Container>
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
    timeRemaining: state.timer.time,
    isLoading: state.gameState.isLoading,
  };
};

export default connect(mapStateToProps)(GetMoney);
