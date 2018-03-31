import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button, Container, Grid, Card, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import { substractMoney } from '../../../actions/player';
import { loadNextCity } from '../../../actions/cities';
import { planeAnimation } from '../../Transport/animations';
import './style.css';

class Airport extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.getNextCity = this.getNextCity.bind(this);
    this.state = { found: false };
  }

  async getNextCity() {
    const { dispatch } = this.props;
    await dispatch(loadNextCity());
  }

  handleOpen() {
    if (this.props.moneyLeft - 5 > 0) {
      this.props.dispatch(substractMoney(5));
      this.refs.lightbox.open();
    } else {
      this.refs.lightbox3.open();
    }
  }

  handleClick(e) {
    if (this.props.currentCityID === this.props.selectedCities.length - 2) {
      this.refs.lightboxfound.open();
    } else {
      this.props.dispatch(substractMoney(30));
      if (e.target.innerText === this.props.nextCity.name) {
        this.getNextCity();
        this.setState({ found: true });
      } else {
        this.setState({ found: false });
      }
      this.refs.lightboxCity.open();
      setTimeout(() => {
        this.refs.lightboxCity.close();
        this.props.history.push('/city');
      }, 4000);
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
          </div>
        </section>

        <Divider horizontal>Destinations</Divider>
        <Container>
          <Grid centered>
            {nextCity.cityOptions.map((cityOption, it) => (
              <Grid.Column key={it} className="text-center" mobile={10} tablet={5} computer={4}>
                <Button
                  color="green"
                  size="large"
                  onClick={this.handleClick}
                  content={cityOption}
                  fluid
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
                    <img src="./images/shop.png" alt="./images/shop.png" />
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
                    <img src={`./${currentCity.hints[0].img}`} alt="Ciudad" />
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

        <Lightbox
          ref="lightboxCity"
          header={this.state.found ? 'Correct' : 'Incorrect'}
          displayButton={false}
        >
          <div className="text-center">
            {this.state.found ? (
              <p>Yes!! He was in {currentCity.name} but he left already.</p>
            ) : (
              <p>Sorry, he was not there.</p>
            )}

            <p>You spent 30 € on tickets. You now have {moneyLeft} euros.</p>
            {planeAnimation()}
          </div>
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

export default withRouter(connect(mapStateToProps)(Airport));
