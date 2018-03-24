import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Icon, Card, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';

class City extends Component {
  handleOpen = () => this.refs.lightbox.open();

  render() {
    const { currentCity, selectedCities, isLoading, currentCityID } = this.props;
    //console.log(this.props);
    //const nextCity = selectedCities[currentCityID + 1]

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <Divider horizontal>Welcome to {currentCity.name}</Divider>
          <Grid columns={3} doubling>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img src={`./images/${currentCity.policeimg}`} alt="police department" />
                  </Card.Header>
                  <Card.Meta />
                  <Card.Description>Visit the police station to get some hints</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button animated color="blue" size="large" fluid>
                    <Button.Content visible size="large" content={currentCity.police} />
                    <Button.Content hidden onClick={this.handleOpen}>
                      <Icon name="taxi" />
                    </Button.Content>
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img src="./images/airport.png" alt="Airport" />
                  </Card.Header>
                  <Card.Meta />
                  <Card.Description>Visit the airport to change city</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/airport">
                    <Button animated color="green" size="large" fluid>
                      <Button.Content visible>Airport</Button.Content>
                      <Button.Content hidden>
                        <Icon name="plane" />
                      </Button.Content>
                    </Button>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img src="./images/money.jpg" alt="money jar" />
                  </Card.Header>
                  <Card.Meta />
                  <Card.Description>Earn some money to pay expenses</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/get-money">
                    <Button animated color="green" size="large" fluid>
                      <Button.Content visible size="large" content="Earn money" />
                      <Button.Content hidden>
                        <Icon name="money" />
                      </Button.Content>
                    </Button>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>

        <h3 className="text-center">
          <img src={`./images/${currentCity.flag}`} alt="country flag" />
        </h3>
        <Container textAlign="center">
          <Link to="/user">
            <Button color="green" size="large">
              <Button.Content size="large" content="Back to previous menu" />
            </Button>
          </Link>
        </Container>

        <Lightbox ref="lightbox" header={currentCity.police}>
          <p>
            <strong>Welcome to the police department of {currentCity.name} </strong>
            <br />
            <br />I heard you are looking for the thief who stole O'Greeny's money
          </p>
          <p>This is the information we have so far. He has been seen:</p>
          <ul>
            <li>{selectedCities[currentCityID + 1].hints[0].label}</li>
            <li>{selectedCities[currentCityID + 1].hints[1].label}</li>
            <li>{selectedCities[currentCityID + 1].hints[2].label}</li>
          </ul>
          <p>
            <br /> Good luck <br />
          </p>
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
  };
};

export default connect(mapStateToProps)(City);
