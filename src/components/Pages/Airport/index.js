import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
        <Header />
        <section className="ui container">
          <div className="airport">
            <h1>
              {findTextLang(playerLanguage, 'airport_1')}{' '}
              {findTextLang(this.props.playerLanguage, currentCity.name)}
            </h1>
            <h2> {calculateDay(this.props.dateTime).time} </h2>
            <h2>{findTextLang(playerLanguage, 'airport_2')}</h2>
          </div>
        </section>

        <Container>
          {isClosed && (
            <Message size="large" color="red">
              <p>{findTextLang(this.props.playerLanguage, 'airport_closed')}</p>
            </Message>
          )}
          <Divider horizontal>{findTextLang(playerLanguage, 'airport_3')}</Divider>
          <Grid centered>
            {nextCity.cityOptions.map((cityOption, it) => (
              <Grid.Column
                key={it}
                className="text-center destButton"
                mobile={5}
                tablet={5}
                computer={4}
              >
                <Button
                  color="green"
                  size="large"
                  onClick={this.chooseCity}
                  content={findTextLang(this.props.playerLanguage, cityOption)}
                  fluid
                  disabled={isClosed}
                />
              </Grid.Column>
            ))}
          </Grid>
          <Divider horizontal>{findTextLang(playerLanguage, 'airport_4')}</Divider>

          <Transition animation="pulse" visible={messageVisible} duration={500}>
            <Message size="large" color={this.state.messageColor}>
              <p>{this.state.message}</p>
            </Message>
          </Transition>
          <Container textAlign="center">
            <Grid columns={2}>
              <Grid.Column>
                <Card centered>
                  <Card.Content textAlign="center">
                    <img src={this.props.waiter} alt="Waiter" />
                    <Card.Meta />
                    <Card.Description>
                      <b>{findTextLang(playerLanguage, 'airport_waiter')}</b>
                      <br />
                      <br />
                      {cityFacts[this.state.factID]}
                      <br />
                      <br />
                      <Transition visible={this.state.factID >= 3} duration={500}>
                        <img src={`./images/${nextCity.flag}`} alt="country flag" />
                      </Transition>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="green" size="large" disabled={isClosed} onClick={this.getFood}>
                      {findTextLang(playerLanguage, 'airport_7')} {currentCity.food}
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card centered>
                  <Card.Content textAlign="center">
                    <img src={`./${currentCity.hints[0].img}`} alt="Ciudad" />
                    <Card.Meta />
                    <Card.Description>{findTextLang(playerLanguage, 'airport_6')}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link to="/city">
                      <Button color="green" size="large">
                        <Button.Content
                          size="large"
                          content={findTextLang(playerLanguage, 'airport_8')}
                        />
                      </Button>
                    </Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Container>
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
