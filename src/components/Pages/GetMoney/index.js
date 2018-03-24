//@flow
import React, { Component, Fragment } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Grid, Container, Button } from 'semantic-ui-react';
import { startTimer } from '../../../actions/timer';
import MemoryGame from '../../MemoryGame';
import Spinner from '../../Spinner';
import Header from '../../Header';

export type GetMoneyPropType = {
  gameEnded: boolean,
  dispatch: Dispatch,
  timeRemaining: number,
  isLoading: boolean,
};

class GetMoney extends Component<GetMoneyPropType> {
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

        <Container>
          <MemoryGame />
        </Container>
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
