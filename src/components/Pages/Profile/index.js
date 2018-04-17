//@flow
import React, { Component, Fragment } from 'react';
import { Button, List, Label, Segment, Grid, Form, Select } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setName, setLanguage } from '../../../actions/player';
import { findTextLang } from '../../../utils/findTextLang';
import Header from '../../Header';
import './style.css';

const friendOptions = [
   {
     text: 'English',
     value: 'en',
	 image: { src: './images/countryFlags/UNKG0001.GIF' },
	 },
     {
	 text: 'Español',
     value: 'es',
	 image: { src: './images/countryFlags/SPAN0001.GIF' },
   }
 ]
export type ProfilePropType = {
  dispatch: Dispatch,
  timeRemaining: number,
  moneyLeft: number,
  playerName: string,
};

export type ProfileStateType = {
  name: string,
};

class Profile extends Component<ProfilePropType, ProfileStateType> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
	  language: '',
    };
  }

  handleChange = (e, { value }) => this.setState({ name: value });
  handleChangeL = (e, { value }) => this.setState({ language: value });

  saveName = (e, { value }) => {
	this.props.dispatch(setName(this.state.name));
	this.props.dispatch(setLanguage(this.state.language));
	};

  render() {
    let { timeRemaining, moneyLeft, playerName, playerLanguage } = this.props;
    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;
    const displayIntro = this.props.playerName === '';
	//const displayList = this.props.playerLanguage === '';
    return (
      <Fragment>
        <Header />
        <section className="ui container">
          {displayIntro && (
            <Fragment>
              <p>
                You are now a detective and need to extract clues from the police departments on
                each city to find out the thief s whereabouts.
              </p>
              <p>Go to the rules page to checkout all the instructions.</p>
              <Form onSubmit={this.saveName}>
                <Form.Group>
                  <Form.Input
                    type="text"
                    icon="user"
                    iconPosition="left"
                    placeholder="Your name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />

                  <Form.Button content="Save" />
                </Form.Group>
              </Form>


			<Select placeholder='Select your language' options={friendOptions}
			onChange={this.handleChangeL}
			value={this.state.language}
			/>

            </Fragment>
          )}
          {!displayIntro && (
            <Fragment>
              <h1>{findTextLang(playerLanguage,'profile_hello')} {playerName}</h1>
              <Grid>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <Segment raised>
                    <Label color="green" ribbon>
                      {findTextLang(playerLanguage,'profile_profile')}
                    </Label>
                    <List>
                      <List.Item>
                        <List.Icon name="star" color="green" />
                        <List.Content>{findTextLang(playerLanguage,'profile_points')}  0</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon color="green" name="clock" />
                        <List.Content>{findTextLang(playerLanguage,'profile_time')} {timeRemaining}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon color="green" name="money" />
                        <List.Content>{findTextLang(playerLanguage,'profile_money')} {moneyLeft}</List.Content>
                      </List.Item>
                    </List>
                  </Segment>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <Segment>
                    <Label color="green" ribbon>
                      {findTextLang(playerLanguage,'profile_items')}
                    </Label>

                  </Segment>
                </Grid.Column>
              </Grid>

              <Grid className="actions">
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Link to="/get-money">
                    <Button color="green" content={findTextLang(playerLanguage,'profile_earnMoney')} fluid />
                  </Link>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Link to="/rules">
                    <Button color="green" content={findTextLang(playerLanguage,'profile_rules')} fluid />
                  </Link>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Link to="/city">
                    <Button content={findTextLang(playerLanguage,'profile_find')} color="green" fluid />
                  </Link>
                </Grid.Column>
              </Grid>
            </Fragment>
          )}
        </section>
      </Fragment>
    );
  }
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
