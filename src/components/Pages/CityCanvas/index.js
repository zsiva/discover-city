import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import './style.css';

class CityCanvas extends Component {
  render() {
    const { currentCity, isLoading } = this.props;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <Container className="text-center">
          <Divider horizontal>Welcome to {currentCity.name}</Divider>
          <img src="./images/cityLayout.png" className="cityImg" />
        </Container>
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
  };
};

export default connect(mapStateToProps)(CityCanvas);
