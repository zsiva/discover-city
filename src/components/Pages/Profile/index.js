//@flow
import React, { Component, Fragment } from 'react';
import { Button, List, Label, Segment, Grid, Form, Select } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { findTextLang } from '../../../utils/findTextLang';
import Header from '../../Header';
import './style.css';

export type ProfilePropType = {
  dispatch: Dispatch,
  timeRemaining: number,
  moneyLeft: number,
  playerName: string,
  playerLanguage: string,
};

function Profile(props: ProfilePropType) {
  let { timeRemaining, moneyLeft, playerName, playerLanguage } = props;
  timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

  return (
    <Fragment>
      <Header />
      <section className="ui container">
        <h1>
          {findTextLang(playerLanguage, 'profile_hello')} {playerName}
        </h1>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment raised>
              <Label color="green" ribbon>
                {findTextLang(playerLanguage, 'profile_profile')}
              </Label>
              <List>
                <List.Item>
                  <List.Icon name="star" color="green" />
                  <List.Content>{findTextLang(playerLanguage, 'profile_points')} 0</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon color="green" name="clock" />
                  <List.Content>
                    {findTextLang(playerLanguage, 'profile_time')} {timeRemaining}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon color="green" name="money" />
                  <List.Content>
                    {findTextLang(playerLanguage, 'profile_money')} {moneyLeft}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment>
              <Label color="green" ribbon>
                {findTextLang(playerLanguage, 'profile_items')}
              </Label>
            </Segment>
          </Grid.Column>
        </Grid>

        <Grid className="actions">
          <Grid.Column mobile={8} tablet={4} computer={4}>
            <Link to="/get-money">
              <Button
                color="green"
                content={findTextLang(playerLanguage, 'profile_earnMoney')}
                fluid
              />
            </Link>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={4} computer={4}>
            <Link to="/rules">
              <Button color="green" content={findTextLang(playerLanguage, 'profile_rules')} fluid />
            </Link>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={4} computer={4}>
            <Link to="/city">
              <Button content={findTextLang(playerLanguage, 'profile_find')} color="green" fluid />
            </Link>
          </Grid.Column>
        </Grid>
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time,
    moneyLeft: state.player.money,
    playerName: state.player.name,
    playerLanguage: state.player.language,
  };
};

export default connect(mapStateToProps)(Profile);
