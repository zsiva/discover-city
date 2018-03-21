import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import { substractMoney } from '../../../actions/player';
import './style.css';

class Airport extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen() {
    if (this.props.moneyLeft > 0) {
      this.props.dispatch(substractMoney(50));
      this.refs.lightbox.open();
    } else {
      this.refs.lightbox3.open();
    }
  }
  handleOpenSouv = () => this.refs.lightboxsouv.open();
  handleOpen2 = () => this.refs.lightbox2.open();
  handleClick() {
    if (this.props.selectedCities[1].cityOptions[0] === this.props.selectedCities[1].name) {
      console.log('YES! you guessed');
    } else {
      console.log('No,sorry ');
    }
  }

  render() {
    const { currentCity, selectedCities, isLoading, moneyLeft } = this.props;

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <section className="ui container">
          <div className="airport">
            <h1 className="text-left">Welcome to the airport of {currentCity.name}</h1>
            <h2 className="text-left">Where do you want to go?</h2>
            <br />
          </div>
        </section>
        <section className="ui container" />

        <Divider horizontal>Destinations</Divider>
        <Container>
          <Grid columns={3}>
            <Grid.Column onClick={() => this.handleClick()}>
              <Container textAlign="left">
                <Button id="toto" color="green" size="huge" onClick={this.handleOpen2}>
                  <Button.Content size="huge" content={selectedCities[1].cityOptions[0]} />
                </Button>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign="center">
                <Button color="green" size="huge">
                  <Button.Content size="huge" content={selectedCities[1].cityOptions[1]} />
                </Button>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign="right">
                <Button color="green" size="huge">
                  <Button.Content size="huge" content={selectedCities[1].cityOptions[2]} />
                </Button>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
        <Divider horizontal>Activities</Divider>
        <Container textAlign="center">
          <Grid columns={2}>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img
                      height="128"
                      width="180"
                      src={`./images/shop.png`}
                      alt={`./images/shop.png`}
                    />
                  </Card.Header>
                  <Card.Meta />
                  <Card.Description>Visit the airport shop</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button color="green" size="huge">
                    <Button.Content size="huge" onClick={this.handleOpen}>
                      Have a {currentCity.food}
                    </Button.Content>
                  </Button>
                  <Divider horizontal />
                  <Button color="green" size="huge">
                    <Button.Content size="huge" onClick={this.handleOpenSouv}>
                      Have a Souvenir
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
                  <Card.Description>
                    You forgot to spend time {currentCity.hints[0].label} ?
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/city">
                    <Button color="green" size="huge">
                      <Button.Content size="huge" content="Back to the city" />
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
          You clicked on {this.props.selectedCities[1].cityOptions[0]} and the city was{' '}
          {this.props.selectedCities[1].name}
          <br />
          <strong>Did you discover?</strong>
          <ul>
            <li> Yes? Have a {this.props.selectedCities[1].food}, you deserved it </li>
            <li> No? Sorry.... keep tring </li>
          </ul>
        </Lightbox>
        <Lightbox ref="lightbox3" header={currentCity.name}>
          I am afraid you have no money left to pay for that {currentCity.food}
          <br />
          <br />
          <strong>Come back when you have some money!</strong>
        </Lightbox>
        <Lightbox ref="lightboxsouv" header={currentCity.name}>
          You have this nice postcard from {currentCity.name}
          <br />
          <img
            height="614"
            width="462"
            src={'./images/Souvenir.gif'}
            alt={'./images/Souvenir.gif'}
          />
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
  };
};

export default connect(mapStateToProps)(Airport);
