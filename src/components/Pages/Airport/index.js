import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Divider } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import './style.css';

class Airport extends Component {
  handleOpen = () => this.refs.lightbox.open();

  handleClick() {console.log(this.props.currentCity.name);
    this.setState({
      ...this.state,
      header: 'Yes! He was in ' + this.props.currentCity.name,
      body:
        'Well done, you earn some extra time!. But he is on the run again. Follow the hints to see where he went next!',
    });
    console.log(this.state);

   }

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

      <Divider horizontal>Destinations</Divider>
        <Container>
          <Grid columns={3}>
            <Grid.Column onClick={() => this.handleClick()}>
              <Container textAlign="left">
			            <Button id="toto" color="green" size="huge">
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
        <Divider horizontal>Activities</Divider>
        <Container textAlign="center">
        <Grid columns={2}>
        <Grid.Column>
          <Button  color="green" size="huge">
                 <Button.Content size="huge" onClick={this.handleOpen}>Have a {currentCity.food}</Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column>
        <Link to="/city">
          <Button  color="green" size="huge">
                 <Button.Content size="huge" content="Back to the city"></Button.Content>
          </Button>
        </Link>
        </Grid.Column>
        </Grid>
        </Container>

        <Lightbox ref="lightbox" header={currentCity.name}>
             <p>
               <strong>That {currentCity.food} was delicious and you feel recovered</strong>
               <br />
               <br />Now, get back to work! You are a detective, not a tourist!
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

export default connect(mapStateToProps)(Airport);
