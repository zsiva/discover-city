import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import Header from '../../Header';
import './style.css';
import { calculateDay } from '../../../utils/calculateDay';

class CityCanvas extends Component {
  moveCar = e => {
    const location = e.currentTarget.dataset.to;
    const rect = document.getElementById('cityWrapper').getBoundingClientRect();
    var x = e.clientX - rect.left;

    document.getElementById('taxiCanvas').style.transform = `translateX(${x - 50}px)`;

    setTimeout(() => {
      this.props.history.push(location);
    }, 2200);
  };
  render() {
    const { currentCity, isLoading } = this.props;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    const isNightTime = calculateDay(this.props.dateTime).day === 'night';
    return (
      <Fragment>
        <Header />
        <Container className="text-center">
          <Divider horizontal>Welcome to {currentCity.name}</Divider>
          <div id="cityWrapper">
            <img src="./images/cityLayout-no-build.png" />
            <div data-to="/hotel" onClick={this.moveCar} className="hotel">
              <img src={isNightTime ? './images/hotel_n.png' : './images/hotel.png'} alt="hotel" />
            </div>
            <div data-to="/police" onClick={this.moveCar} className="police">
              <img
                src={isNightTime ? './images/police_n.png' : './images/police.png'}
                alt="police department"
              />
            </div>
            <div className="casino" data-to="/get-money" onClick={this.moveCar}>
              <img
                src={isNightTime ? './images/casino_n.png' : './images/casino.png'}
                alt="casino"
              />
            </div>
            <img id="taxiCanvas" src="./images/transport/car.png" alt="car" />
          </div>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
    isLoading: state.gameState.isLoading,
    dateTime: state.player.dateTime,
  };
};

export default withRouter(connect(mapStateToProps)(CityCanvas));
