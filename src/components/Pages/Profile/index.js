//@flow
import React, { Component, Fragment } from 'react';
import { Button, List, Label, Segment, Grid } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../Header';

import './style.css';
export type ProfilePropType = {
  dispatch: Dispatch,
  timeRemaining: number,
  moneyLeft: number,
};

class Profile extends Component<ProfilePropType> {
  handleOpen = () => this.refs.lightbox.open();

  render() {
    let { timeRemaining, moneyLeft } = this.props;
    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

    return (
      <Fragment>
        <Header />
        <section className="ui container">
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={8}>
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

            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Segment>
                <Label color="green" ribbon>
                  Items
                </Label>
                Items
              </Segment>
            </Grid.Column>
          </Grid>

          <Grid className="actions">
            <Grid.Column width={8}>
              <Link to="/get-money">
                <Button color="green" content="Earn money" fluid />
              </Link>
            </Grid.Column>
            <Grid.Column width={8}>
              <Link to="/city">
                <Button content="Find him" color="green" fluid />
              </Link>
            </Grid.Column>
          </Grid>
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

export default connect(mapStateToProps)(Profile);
