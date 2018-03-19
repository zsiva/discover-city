import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import './style.css';

class City extends Component {
  handleOpen = () => this.refs.lightbox.open();

  render() {
    const { currentCity, selectedCities, isLoading } = this.props;
    //console.log(this.props);
    // const nextCity = selectedCities[currentCityID + 1]

    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <section className="ui container">
          <div className="airport">

            <h1 className="text-left">
              Welcome to the airport of {currentCity.name}
            </h1>
            <h2 className="text-left">
              Where do you want to go?
            </h2>
            <br />
          </div>
        </section>

        <section className="ui container" />
        <Container>
          <Grid columns={3}>
            <Grid.Column>
              <Container textAlign="left">
			            <Button  color="green" size="huge">
				               <Button.Content size="huge" content={selectedCities[1].cityOptions[0]}></Button.Content>
                </Button>
              </Container>
            </Grid.Column>
            <Grid.Column>
            <Container textAlign="center">
                <Button  color="green" size="huge">
                     <Button.Content size="huge" content={selectedCities[1].cityOptions[1]}></Button.Content>
              </Button>
            </Container>
            </Grid.Column>
            <Grid.Column>
            <Container textAlign="right">
                <Button  color="green" size="huge">
                     <Button.Content size="huge" content={selectedCities[1].cityOptions[2]}></Button.Content>
              </Button>
            </Container>
            </Grid.Column>
          </Grid>
        </Container>

		 <Lightbox ref="lightbox" header={currentCity.police}>
          <p>
            <strong>Welcome to the police department of {currentCity.name} </strong>
            <br />
            <br />I heard you are looking for the thief who stole O'Greeny's money
          </p>
          <p>This is the information we have so far.</p>
          <ul>
            <li>{selectedCities[1].hints[0].label}</li>
            <li>{selectedCities[1].hints[1].label}</li>
            <li>{selectedCities[1].hints[2].label}</li>
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
