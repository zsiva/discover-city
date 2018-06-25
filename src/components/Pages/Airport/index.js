import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Container, Grid, Divider, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import Lightbox from '../../Lightbox';
import { substractMoney, addDateTime } from '../../../actions/player';
import { loadNextCity } from '../../../actions/cities';
import { planeAnimation } from '../../Transport/animations';
import { isAirportClosed } from '../../../utils/calculateDay';
import { usersRef, db } from '../../../';
import AirportHeader from './AirportHeader';
import AirportWaiter from './AirportWaiter';
import './style.css';

class Airport extends Component {
  constructor(props) {
    super(props);
    this.chooseCity = this.chooseCity.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
    this.openCityLightBox = this.openCityLightBox.bind(this);
    this.savePlayerData = this.savePlayerData.bind(this);
    this.state = {
      found: false,
      messageVisible: false,
    };
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
    const { moneyLeft, selectedCities, nextCity, currentCityID } = this.props;
    if (moneyLeft - 30 >= 0) {
      if (currentCityID === selectedCities.length - 2) {
        if (e.target.innerText.toLowerCase() === nextCity.name) {
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
        if (e.target.innerText.toLowerCase() === nextCity.name) {
          this.getNextCity();
          this.setState({ found: true });
        } else {
          this.setState({ found: false });
        }
        this.openCityLightBox();
      }
    } else {
      this.setState({
        messageVisible: !this.state.messageVisible,
      });
    }
  }

  render() {
    const { currentCity, selectedCities, isLoading, moneyLeft, nextCity } = this.props;
    const { messageVisible } = this.state;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }

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
            <Message color="red">
              <FormattedMessage id="airport.plane_no_money" values={{ money: moneyLeft }} />
            </Message>
          </Transition>
          <Grid centered>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <AirportWaiter isClosed={isClosed} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <Divider horizontal>
                <FormattedMessage id="airport.destinations" />
              </Divider>
              {nextCity.cityOptions.map((cityOption, it) => (
                <Button
                  key={it}
                  color="green"
                  size="large"
                  onClick={this.chooseCity}
                  content={cityOption}
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
            this.state.found ? (
              <FormattedMessage id="airport.lightbox_correct" />
            ) : (
              <FormattedMessage id="airport.lightbox_incorrect" />
            )
          }
          displayButton={false}
        >
          <div className="text-center">
            {this.state.found ? (
              <p>
                <FormattedMessage id="airport.found_lightbox" />
              </p>
            ) : (
              <p>
                <FormattedMessage id="airport.not_found_lightbox" />
              </p>
            )}

            <p>
              <FormattedMessage id="airport.tickets" values={{ money: moneyLeft }} />
            </p>
            {planeAnimation()}
          </div>
        </Lightbox>
        <Lightbox
          ref="lightboxfound"
          header={
            <FormattedMessage
              id={`cities.${selectedCities[this.props.currentCityID + 1].name}.name`}
            />
          }
        >
          <FormattedMessage
            id="airport.found_city"
            values={{ city: selectedCities[this.props.currentCityID + 1].name }}
          />
          <br />
          <strong>
            <FormattedMessage id="airport.found_gold" />
          </strong>
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
    playerName: state.player.name,
    dateTime: state.player.dateTime,
    waiter: state.gameState.waiter,
  };
};

export default withRouter(connect(mapStateToProps)(Airport));
