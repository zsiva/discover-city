import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import { substractMoney } from '../../../actions/player';
import { loadNextCity } from '../../../actions/cities';
import './style.css';

class Airport extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
  }

  async getNextCity() {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
  }

  handleOpen() {
    if (this.props.moneyLeft - 50 > 0) {
      this.props.dispatch(substractMoney(50));
      this.refs.lightbox.open();
    } else {
      this.refs.lightbox3.open();
    }
  }

  handleClick(e) {
    if (e.target.innerText === this.props.nextCity.name) {
      if (this.props.currentCityID === this.props.selectedCities.length - 2) {
        this.refs.lightboxfound.open();
      } else {
        this.getNextCity();
        this.props.dispatch(substractMoney(10));
        this.refs.lightbox2.open();
      }
    } else {
      console.log('No,sorry ');
    }
  }

  render() {
    const { currentCity, selectedCities, isLoading, moneyLeft, nextCity } = this.props;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }

    return (
      <Fragment>
        <Header />
        <section className="ui container">
          <div className="airport">
            <h1>Welcome to the airport of {currentCity.name}</h1>
            <h2>Where do you want to go?</h2>
            <br />
          </div>
        </section>

        <Divider horizontal>Destinations</Divider>
        <Container>
          <Grid columns={3} doubling>
            {nextCity.cityOptions.map((cityOption, it) => (
              <Grid.Column key={it} className="text-center">
                <Button
                  color="green"
                  size="large"
                  onClick={this.handleClick}
                  content={cityOption}
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
        <Divider horizontal>Activities</Divider>
        <Container textAlign="center">
          <Grid columns={2}>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img height="128" width="180" src="./images/shop.png" alt="./images/shop.png" />
                  </Card.Header>
                  <Card.Meta />
                  <Card.Description>Visit the airport shop</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button color="green" size="large">
                    <Button.Content size="large" onClick={this.handleOpen}>
                      Have a {currentCity.food}
                    </Button.Content>
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img
                      height="128"
                      width="180"
                      src={`./${currentCity.hints[0].img}`}
                      alt={`./${currentCity.hints[0].img}`}
                    />
                  </Card.Header>
                  <Card.Meta />
                  <Card.Description>You feel like {currentCity.hints[0].label} ?</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/city">
                    <Button color="green" size="large">
                      <Button.Content size="large" content="Go to the city" />
                    </Button>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>

        <Lightbox ref="lightbox" header={currentCity.name}>
          <p>
            <strong>That {currentCity.food} was delicious and you feel recovered</strong>
            <br />
            <br />You have now {moneyLeft} euros.
            <br />
            <br />Now, get back to work! You are a detective, not a tourist!
          </p>
        </Lightbox>
        <Lightbox ref="lightbox2" header={currentCity.name}>
          <strong>Yes!! He was here but he left already </strong>
          <br />
          <strong>Have a {currentCity.food}, you deserved it</strong>
          <br />
          <p>You have now {moneyLeft} euros</p>
        </Lightbox>
        <Lightbox ref="lightbox3" header={currentCity.name}>
          I am afraid you have no money left to pay for that {currentCity.food}
          <br />
          <br />
          <strong>Come back when you have some money!</strong>
        </Lightbox>
        <Lightbox ref="lightboxfound" header={selectedCities[this.props.currentCityID + 1].name}>
          You found him!! He was hiding in {selectedCities[this.props.currentCityID + 1].name}
          <br />
          <br />
          <strong>O Greeny is really happy to have his gold back!</strong>
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
  };
};

export default connect(mapStateToProps)(Airport);
