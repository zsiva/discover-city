import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Responsive } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { withRouter } from 'react-router';

import Header from '../../Header';
import './styles.css';

class CityRoad extends Component {
  handleOpen = () => this.refs.lightbox.open();
  moveCar = e => {
    const location = e.currentTarget.dataset.to;
    if (document.getElementsByClassName('roadContainer').length > 0) {
      document.getElementById('taxiCity').style.transform = `translateX(${e.clientX}px)`;
    } else {
      document.getElementById('taxiCity').style.transform = `translateY(${e.clientY -
        150}px) rotate(90deg)`;
    }

    setTimeout(() => {
      this.props.history.push(location);
    }, 2200);
  };

  render() {
    const { currentCity, isLoading } = this.props;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">
            <img src={`./images/${currentCity.flag}`} alt="country flag" className="headerFlag" />
            Welcome to {currentCity.name}{' '}
            <img src={`./images/${currentCity.flag}`} alt="country flag" className="headerFlag" />
          </h1>
          <div className="cityWrapper">
            <Grid centered textAlign="center" verticalAlign="bottom">
              <Grid.Column mobile={10} tablet={5} computer={5} className="text-center">
                <div data-to="/police" onClick={this.moveCar}>
                  <div className="policeName">{currentCity.police}</div>
                  <img src="./images/police.png" alt="police department" />
                </div>
              </Grid.Column>
              <Grid.Column mobile={10} tablet={5} computer={5} className="text-center">
                <div data-to="/airport" onClick={this.moveCar}>
                  <div className="policeName">Airport</div>
                  <img src="./images/airport.png" alt="Airport" />
                </div>
              </Grid.Column>
              <Grid.Column mobile={10} tablet={5} computer={5} className="text-center">
                <div data-to="/get-money" onClick={this.moveCar}>
                  <div className="policeName">Casino</div>
                  <img src="./images/casino.png" alt="casino" />
                </div>
              </Grid.Column>
            </Grid>
            <Responsive maxWidth={767}>
              <div className="roadVertical">
                <div className="verticalDivider" />
                <img
                  id="taxiCity"
                  src="./images/transport/car.png"
                  alt="car"
                  className="taxiMobile"
                />
              </div>
            </Responsive>
            <Responsive minWidth={768}>
              <div className="roadContainer">
                <img id="taxiCity" src="./images/transport/car.png" alt="car" />
                <div className="roadDivider" />
                <div className="road" />
              </div>
            </Responsive>
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
  };
};

export default withRouter(connect(mapStateToProps)(CityRoad));
