import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Icon, Card, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';

class Police extends Component {
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
        <Header/>
        <Container>
        <Divider horizontal>Welcome to the {currentCity.name} police department</Divider>
        <Card centered color='green'>
          <Card.Content textAlign="center">
          <img
          src="./images/policeoff.png"
          alt={"Police Officer"}/>
            <Card.Header/>
            <Card.Meta/>
            <Card.Description><b>I heard you are looking for the thief who stole O'Greeny's money
            <br/>Interpol sent us these 3 pictures. It might be his next destination.</b></Card.Description>
          </Card.Content>
        </Card>
          <Grid columns={3} doubling>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <img
                    src={`./${selectedCities[currentCityID + 1].hints[0].img}`}
                    alt={"Hint1"}/>
                  </Card.Header>
                  <Card.Meta />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                  <img
                  src={`./${selectedCities[currentCityID + 1].hints[1].img}`}
                  alt={"Hint2"}/>
                  </Card.Header>
                  <Card.Meta />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <Card.Header>
                  <img
                  src={`./${selectedCities[currentCityID + 1].hints[2].img}`}
                  alt={"Hint3"}/>
                  </Card.Header>
                  <Card.Meta />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>

        <h3 className="text-center">
          <img src={`./images/${currentCity.flag}`} alt="country flag" />
        </h3>
        <Container textAlign="center">
        <Link to="/city">
          <Button color="green" size="large">
            <Button.Content size="large" content="Go to the city" />
          </Button>
        </Link>
        <Link to="/airport">
          <Button color="green" size="large">
            <Button.Content size="large" content="Go to the airport" />
          </Button>
        </Link>
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

export default connect(mapStateToProps)(Police);
