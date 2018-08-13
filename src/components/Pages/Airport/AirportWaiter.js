// @flow
import React, { Component, Fragment } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Transition, Button, Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { substractMoney, addDateTime } from '../../../actions/player';
import AvatarMessage from '../../AvatarMessage';
import './style.css';

export type AirportWaiterPropType = {
  nextCity: { flag: string },
  waiter: string,
  currentCity: { name: string, food: string },
  isClosed: boolean,
  moneyLeft: number,
  dispatch: Dispatch,
};

export type AirportWaiterStateType = {
  factID: number,
  message: string,
  messageColor: string,
  messageVisible: boolean,
};

class AirportWaiter extends Component<AirportWaiterPropType, AirportWaiterStateType> {
  constructor(props: AirportWaiterPropType) {
    super(props);
    (this: any).getFood = this.getFood.bind(this);
    this.state = {
      factID: 0,
      message: 'airport.buy_food',
      messageColor: 'blue',
      messageVisible: false,
    };
  }

  getFood() {
    const { dispatch, moneyLeft } = this.props;
    if (moneyLeft - 5 >= 0) {
      dispatch(addDateTime(2));
      dispatch(substractMoney(5));
      this.setState({
        factID: this.state.factID + 1,
        message: 'airport.buy_food',
      });
    } else {
      this.setState({
        messageColor: 'red',
        message: 'airport.no_money',
      });
    }
    this.setState({ messageVisible: !this.state.messageVisible });
  }
  render() {
    const { waiter, nextCity, currentCity, isClosed, moneyLeft } = this.props;

    return (
      <Fragment>
        <Transition animation="pulse" visible={this.state.messageVisible} duration={500}>
          <Message color={this.state.messageColor}>
            <FormattedMessage id={this.state.message} values={{ money: moneyLeft }} />
          </Message>
        </Transition>
        <AvatarMessage imgSrc={waiter} introText="airport.waiter_intro">
          {this.state.factID > 0 &&
            this.state.factID < 4 && (
              <p>
                <FormattedMessage id={`cities.${currentCity.name}.${this.state.factID}`} />
              </p>
            )}
          {this.state.factID >= 4 && (
            <Fragment>
              <FormattedMessage id="airport.waiter_flag" />
              <Transition visible duration={500}>
                <img src={`./images/${nextCity.flag}`} alt="country flag" />
              </Transition>
            </Fragment>
          )}
          <br />
          <Button color="green" disabled={isClosed} onClick={this.getFood}>
            <FormattedMessage id={`cities.${currentCity.name}.food`} values={{ money: 5 }} />
          </Button>
        </AvatarMessage>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
    nextCity: state.gameState.nextCity,
    waiter: state.gameState.waiter,
    moneyLeft: state.player.money,
  };
};

export default connect(mapStateToProps)(AirportWaiter);
