import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Container, Grid, Card, Divider, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import { substractMoney, addDateTime } from '../../../actions/player';
import { loadNextCity } from '../../../actions/cities';
import { planeAnimation } from '../../Transport/animations';
import { findTextLang } from '../../../utils/findTextLang';
import { calculateDay, isAirportClosed } from '../../../utils/calculateDay';
import { usersRef, db } from '../../../';
import AirportHeader from './AirportHeader';
import './style.css';

class Airport extends Component {
  constructor(props) {
    super(props);
    this.chooseCity = this.chooseCity.bind(this);
    this.getFood = this.getFood.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
    this.openCityLightBox = this.openCityLightBox.bind(this);
    this.savePlayerData = this.savePlayerData.bind(this);
    this.state = { found: false, messageVisible: false, messageColor: 'blue', factID: 0 };
  }

  async getNextCity() {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
  }

  openCityLightBox() {
    this.refs.lightboxCity.open();
    setTimeout(() => {
      this.refs.lightboxCity.close();
      this.props.history.push('/city');
    }, 4000);
  }

  getFood() {
    if (this.props.moneyLeft - 5 >= 0) {
      this.props.dispatch(addDateTime(2));
      this.props.dispatch(substractMoney(5));
      this.setState({
        factID: this.state.factID + 1,
        message:
          findTextLang(this.props.playerLanguage, 'airport_9a') +
          (this.props.moneyLeft - 5) +
          findTextLang(this.props.playerLanguage, 'airport_9b'),
      });
    } else {
      this.setState({
        messageColor: 'red',
        message:
          findTextLang(this.props.playerLanguage, 'airport_10a') +
          this.props.currentCity.food +
          findTextLang(this.props.playerLanguage, 'airport_10b') +
          this.props.moneyLeft +
          '€',
      });
    }
    this.setState({ messageVisible: !this.state.messageVisible });
  }

  savePlayerData() {
    var playerRef = usersRef.doc(this.props.playerName);

    if (playerRef) {
      db.runTransaction(t => {
        return t.get(playerRef).then(doc => {
          const new_count = doc.data().num_games + 1;
          t.update(playerRef, { num_games: new_count });
        });
      });
    } else {
      playerRef.set({ num_games: 1, points: 100 });
    }
  }

  chooseCity(e) {
    if (this.props.moneyLeft - 30 >= 0) {
      if (this.props.currentCityID === this.props.selectedCities.length - 2) {
        if (
          e.target.innerText === findTextLang(this.props.playerLanguage, this.props.nextCity.name)
        ) {
          this.refs.lightboxfound.open();
          this.savePlayerData();
        } else {
          this.props.dispatch(substractMoney(30));
          this.props.dispatch(addDateTime(6));
          this.setState({ found: false });
          this.openCityLightBox();
        }
      } else {
        this.props.dispatch(substractMoney(30));
        this.props.dispatch(addDateTime(6));
        if (
          e.target.innerText === findTextLang(this.props.playerLanguage, this.props.nextCity.name)
        ) {
          this.getNextCity();
          this.setState({ found: true });
        } else {
          this.setState({ found: false });
        }
        this.openCityLightBox();
      }
    } else {
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({ messageColor: 'red' });
      this.setState({
        message: findTextLang(this.props.playerLanguage, 'airport_11') + this.props.moneyLeft + '€',
      });
    }
  }

  render() {
    const {
      currentCity,
      selectedCities,
      isLoading,
      moneyLeft,
      nextCity,
      playerLanguage,
    } = this.props;
    const { messageVisible } = this.state;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }

    var cityFacts = this.props.cityFacts.map(fact => findTextLang(playerLanguage, fact));
    const isClosed = isAirportClosed(this.props.dateTime);
    return (
      <Fragment>
        <AirportHeader hours={this.props.dateTime} cityName={currentCity.name} />

        <Container>
          {isClosed && (
            <Message size="large" color="red">
              <p>
                <FormattedMessage id="airport.closed" />
              </p>
            </Message>
          )}

          <Transition animation="pulse" visible={messageVisible} duration={500}>
            <Message color={this.state.messageColor}>
              <p>{this.state.message}</p>
            </Message>
          </Transition>
          <Grid centered>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src={this.props.waiter} alt="Waiter" />
                  <Card.Meta />
                  <Card.Description>
                    <b>{findTextLang(playerLanguage, 'airport_waiter')}</b>
                    <br />
                    {cityFacts[this.state.factID]}

                    <Transition visible={this.state.factID >= 3} duration={500}>
                      <img src={`./images/${nextCity.flag}`} alt="country flag" />
                    </Transition>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra className="text-center">
                  <Button color="green" size="large" disabled={isClosed} onClick={this.getFood}>
                    {findTextLang(playerLanguage, 'airport_7')} {currentCity.food}
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <Divider horizontal>
                <FormattedMessage id="airport.destinations" />
              </Divider>
              {nextCity.cityOptions.map((cityOption, it) => (
                <Button
                  color="green"
                  size="large"
                  onClick={this.chooseCity}
                  content={findTextLang(this.props.playerLanguage, cityOption)}
                  fluid
                  disabled={isClosed}
                  className="destButton"
                />
              ))}
            </Grid.Column>
          </Grid>
        </Container>

        <Lightbox
          ref="lightboxCity"
          header={
            this.state.found
              ? findTextLang(this.props.playerLanguage, 'correct')
              : findTextLang(this.props.playerLanguage, 'incorrect')
          }
          displayButton={false}
        >
          <div className="text-center">
            {this.state.found ? (
              <p>
                {findTextLang(playerLanguage, 'airport_12yes')}{' '}
                {findTextLang(this.props.playerLanguage, currentCity.name)}{' '}
              </p>
            ) : (
              <p>{findTextLang(playerLanguage, 'airport_12no')}</p>
            )}

            <p>
              {findTextLang(playerLanguage, 'airport_13')} {moneyLeft} €.
            </p>
            {planeAnimation()}
          </div>
        </Lightbox>
        <Lightbox
          ref="lightboxfound"
          header={findTextLang(
            this.props.playerLanguage,
            selectedCities[this.props.currentCityID + 1].name,
          )}
        >
          {findTextLang(playerLanguage, 'airport_found1')}{' '}
          {findTextLang(
            this.props.playerLanguage,
            selectedCities[this.props.currentCityID + 1].name,
          )}
          <br />
          <br />
          <strong>{findTextLang(playerLanguage, 'airport_found2')}</strong>
          <br />
          <br />
          <img src="./images/Minions.gif" alt="minions success" />
        </Lightbox>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
    selectedCities: state.gameState.selectedCities,
    currentCityID: state.gameState.currentCityID,
    isLoading: state.gameState.isLoading,
    moneyLeft: state.player.money,
    nextCity: state.gameState.nextCity,
    cityFacts: state.gameState.cityFacts,
    playerLanguage: state.player.language,
    playerName: state.player.name,
    dateTime: state.player.dateTime,
    waiter: state.gameState.waiter,
  };
};

export default withRouter(connect(mapStateToProps)(Airport));
