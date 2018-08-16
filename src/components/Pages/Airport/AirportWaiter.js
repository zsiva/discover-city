// @flow
import React, { Component, Fragment } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Transition, Button, Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { substractMoney, addDateTime } from '../../../actions/player';
import { AIRPORT_FOOD_COST } from '../../../data/constants';
import AvatarMessage from '../../AvatarMessage';
import './style.css';

export type AirportWaiterPropType = {
  nextCity: { flag: string },
  currentCity: { name: string, food: string },
  isClosed: boolean,
  moneyLeft: number,
  dispatch: Dispatch,
};

export type AirportWaiterStateType = {
  factID: number,
  messageVisible: boolean,
};

class AirportWaiter extends Component<AirportWaiterPropType, AirportWaiterStateType> {
  constructor(props: AirportWaiterPropType) {
    super(props);
    (this: any).getFood = this.getFood.bind(this);
    this.state = {
      factID: 0,
      messageVisible: false,
    };
  }

  getFood() {
    const { dispatch, moneyLeft } = this.props;
    if (moneyLeft >= AIRPORT_FOOD_COST) {
      dispatch(addDateTime(2));
      dispatch(substractMoney(AIRPORT_FOOD_COST));
      this.setState({
        factID: this.state.factID + 1,
      });
    }
    this.setState({ messageVisible: !this.state.messageVisible });
  }
  render() {
    const { nextCity, currentCity, isClosed, moneyLeft } = this.props;

    return (
      <Fragment>
        <Transition animation="pulse" visible={this.state.messageVisible} duration={500}>
          {moneyLeft >= AIRPORT_FOOD_COST ? (
            <Message color="blue">
              <FormattedMessage id="airport.buy_food" values={{ money: moneyLeft }} />
            </Message>
          ) : (
            <Message color="red">
              <FormattedMessage id="airport.no_money" />
            </Message>
          )}
        </Transition>
        <AvatarMessage
          imgSrc={`./images/waiter_${this.state.factID % 3}.png`}
          introText="airport.waiter_intro"
        >
          {this.state.factID > 0 &&
            this.state.factID < 4 && (
              <FormattedMessage id={`cities.${currentCity.name}.${this.state.factID}`}>
                {txt => <p>{txt}</p>}
              </FormattedMessage>
            )}
          {this.state.factID >= 4 && (
            <Fragment>
              <FormattedMessage id="airport.waiter_flag" />
              <img src={`./images/${nextCity.flag}`} alt="country flag" />
            </Fragment>
          )}
          <Button color="green" disabled={isClosed} onClick={this.getFood}>
            <FormattedMessage
              id={`cities.${currentCity.name}.food`}
              values={{ money: AIRPORT_FOOD_COST }}
            />
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
    moneyLeft: state.player.money,
  };
};

export default connect(mapStateToProps)(AirportWaiter);
