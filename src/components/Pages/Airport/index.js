import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Divider, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { substractMoney, addDateTime } from '../../../actions/player';
import { loadNextCity } from '../../../actions/cities';
import { isAirportClosed } from '../../../utils/calculateDay';
import { usersRef } from '../../../configure-firebase';
import AirportHeader from './AirportHeader';
import AirportWaiter from './AirportWaiter';
import LightboxFound from './LightboxFound';
import LightboxCity from './LightboxCity';
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
      showFoundLightbox: false,
      showLightboxCity: false,
    };
  }

  async getNextCity() {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
  }

  openCityLightBox() {
    this.setState({ showLightboxCity: true });
    setTimeout(() => {
      this.setState({ showLightboxCity: false });
      this.props.history.push('/city');
    }, 4000);
  }

  savePlayerData() {
    if (this.props.playerName) {
      let playerRef = usersRef.doc();
      playerRef.set({ name: this.props.playerName, points: 168 - this.props.dateTime });
    }
  }

  chooseCity(e) {
    const { moneyLeft, selectedCities, nextCity, currentCityID } = this.props;
    if (moneyLeft - 30 >= 0) {
      if (currentCityID === selectedCities.length - 2) {
        if (e.target.innerText.toLowerCase() === nextCity.name) {
          this.setState({ showFoundLightbox: true });
          this.savePlayerData();
          setTimeout(() => {
            this.props.history.push('/ranking');
          }, 4000);
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
    const { currentCity, isLoading, moneyLeft, nextCity } = this.props;
    const { messageVisible } = this.state;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }

    const isClosed = isAirportClosed(this.props.dateTime);
    return (
      <Fragment>
        <AirportHeader hours={this.props.dateTime} cityName={currentCity.name} />
        <section className="ui container">
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
        </section>

        {this.state.showLightboxCity && (
          <LightboxCity found={this.state.found} moneyLeft={moneyLeft} />
        )}
        {this.state.showFoundLightbox && (
          <LightboxFound cityName={nextCity.name} onClose={this.hideModals} />
        )}
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
  };
};

export default withRouter(connect(mapStateToProps)(Airport));
