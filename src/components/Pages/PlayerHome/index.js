//@flow
import React, { Component, Fragment } from 'react';
import { Button, List, Label, Segment, Grid } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { startPlayer } from '../../../actions/player';
import { loadGameData } from '../../../actions/game';

import './style.css';
export type PlayerHomePropType = {
  dispatch: Dispatch,
  timeRemaining: number,
  moneyLeft: number,
};

class PlayerHome extends Component<PlayerHomePropType> {
  componentDidMount() {
    this.props.dispatch(loadGameData());
    this.props.dispatch(startPlayer());
  }

  handleOpen = () => this.refs.lightbox.open();
  handleClick = () => console.log('clicked');

  render() {
    let { timeRemaining, moneyLeft } = this.props;
    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

    return (
      <Fragment>
        <header className="header">
          <div className="ui container">Hello detective</div>
        </header>
        <section className="ui container">
          <Grid columns={2}>
            <Grid.Column>
              <Segment raised>
                <Label color="green" ribbon>
                  Profile
                </Label>
                <List>
                  <List.Item>
                    <List.Icon name="star" color="green" />
                    <List.Content>Points: 0</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color="green" name="clock" />
                    <List.Content>Time remaining: {timeRemaining}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color="green" name="money" />
                    <List.Content>Money: {moneyLeft}</List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment>
                <Label color="green" ribbon>
                  Items
                </Label>
                Items
              </Segment>
            </Grid.Column>
          </Grid>

          <div className="actions">
            <Link to="/get-money">
              <Button size="large" color="green" content="Earn some money" />
            </Link>
            <Link to="/get-time">
              <Button size="large" color="green" content="Get extra time" />
            </Link>
            <Link to="/city">
              <Button
                size="large"
                onClick={this.handleClick}
                content="Find him"
                color="green"
                floated="right"
              />
            </Link>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time,
    moneyLeft: state.player.money,
  };
};

export default connect(mapStateToProps)(PlayerHome);
