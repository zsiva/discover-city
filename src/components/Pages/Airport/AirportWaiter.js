// @flow
import React, { Component } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Card, Transition, Button, Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { substractMoney, addDateTime } from '../../../actions/player';
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
      this.props.dispatch(addDateTime(2));
      this.props.dispatch(substractMoney(5));
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
      <Card centered>
        <Card.Content textAlign="center">
          <Transition animation="pulse" visible={this.state.messageVisible} duration={500}>
            <Message color={this.state.messageColor}>
              <FormattedMessage id={this.state.message} values={{ money: moneyLeft - 5 }} />
            </Message>
          </Transition>
          <img src={waiter} alt="Waiter" />
          <Card.Meta />
          <Card.Description>
            <b>
              <FormattedMessage id="airport.waiter_intro" />
            </b>
            <br />
            {this.state.factID > 0 && (
              <FormattedMessage id={`cities.${currentCity.name}.${this.state.factID}`} />
            )}
            <Transition visible={this.state.factID >= 3} duration={500}>
              <img src={`./images/${nextCity.flag}`} alt="country flag" />
            </Transition>
          </Card.Description>
        </Card.Content>
        <Card.Content extra className="text-center">
          <Button color="green" size="large" disabled={isClosed} onClick={this.getFood}>
            <FormattedMessage id={`cities.${currentCity.name}.food`} />
          </Button>
        </Card.Content>
      </Card>
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
