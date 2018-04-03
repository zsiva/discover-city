import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { withRouter } from 'react-router';

import Header from '../../Header';
import './styles.css';

class CityRoad extends Component {
  handleOpen = () => this.refs.lightbox.open();
  moveCar = e => {
    const location = e.currentTarget.dataset.to;
    document.getElementById('taxiCity').style.transform = `translateX(${e.clientX}px)`;
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
          <Grid centered textAlign="center" verticalAlign="bottom">
            <Grid.Column mobile={10} tablet={5} computer={5} className="text-center">
              <p>Visit the police station to get some hints</p>
              <div data-to="/police" onClick={this.moveCar}>
                <div className="policeName">{currentCity.police}</div>
                <img src="./images/police.png" alt="police department" />
              </div>
            </Grid.Column>
            <Grid.Column mobile={10} tablet={5} computer={5} className="text-center">
              <p>Visit the airport to go to a different city</p>
              <div data-to="/airport" onClick={this.moveCar}>
                <div className="policeName">Airport</div>
                <img src="./images/airport.png" alt="Airport" />
              </div>
            </Grid.Column>
            <Grid.Column mobile={10} tablet={5} computer={5} className="text-center">
              <p>Earn some money to pay expenses</p>
              <div data-to="/get-money" onClick={this.moveCar}>
                <div className="policeName">Casino</div>
                <img src="./images/casino.png" alt="casino" />
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <div className="roadContainer">
          <img id="taxiCity" src="./images/transport/car.png" alt="car" width="70" height="36" />
          <div className="roadDivider" />

          <div className="road" />
        </div>
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
