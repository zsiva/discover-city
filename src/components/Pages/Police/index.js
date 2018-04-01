import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Divider, Transition,Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import { substractMoney } from '../../../actions/player';

class Police extends Component {
  handleOpen = () => this.refs.lightbox.open();
  state = { visible: false, visible2: false, message: '', messvisible: false }
  showHints = () => {
    if (this.state.visible === false) {
  this.setState({ visible: true });
  this.setState({ messvisible: true });
  this.setState({ message: 'The officer shows you the 3 pictures. Can you guess the next city already? Go to the airport!'})}
}
  showHintsPlus = () => {
    this.setState({ messvisible: false })
    if (this.state.visible2 === false) {
    if (this.props.moneyLeft - 10 >= 0) {
      this.setState({ visible2: true })
      this.props.dispatch(substractMoney(10));
      this.setState({ message: 'You paid 10 € and you got the name of the pictures. It should help you You have now ' + (this.props.moneyLeft - 10 ) + ' €'})
      } else {
      this.setState({ message: 'Corrupt Police Officer: You need 10 € and your account has ' + (this.props.moneyLeft ) + ' €. This information is not free!' })
    }
  }
}
  render() {
    const { currentCity, selectedCities, moneyLeft, isLoading, currentCityID } = this.props;
    const { visible, visible2, messvisible } = this.state
    //console.log(this.state);
    //const nextCity = selectedCities[currentCityID + 1]
    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header/>
        <Container>
        <Divider horizontal>Welcome to the {currentCity.name} police department</Divider>
        <Transition animation="pulse" visible={messvisible}  duration={500}>
          <Message size='large'>
            <p>
            {this.state.message}
            </p>
          </Message>
        </Transition>
        <Grid columns={3} doubling>
          <Grid.Column>
          <Transition visible={visible}  duration={500}>

        <Card centered color='green'>
          <Card.Content textAlign="center">
          <img
          src="./images/policecorr.png"
          alt={"Police Officer"}/>
            <Card.Header/>
            <Card.Meta/>
            <Card.Description><b>PSS PSS
            <br/>I might have some information for you if you pay me</b></Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Button color="green" size="large" fluid onClick={this.showHintsPlus} >
          <Button.Content size="large" content={this.state.visible2 ? 'GOOD LUCK !' : 'PAY 10€ FOR THE INFO'}/>
          </Button>
          </Card.Content>
        </Card>
</Transition>
        </Grid.Column>
        <Grid.Column>
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
          <Card.Content extra>
          <Button color="green" size="large" fluid onClick={this.showHints} >
          <Button.Content size="large" content={this.state.visible ? 'GOOD LUCK' : 'REVEAL HINTS'}/>
          </Button>
          </Card.Content>
        </Card>
        </Grid.Column>
</Grid>
          <Grid columns={3} doubling>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                <Transition visible={visible}  duration={500}>
                  <Card.Header>
                    <img
                    src={`./${selectedCities[currentCityID + 1].hints[0].img}`}
                    alt={"Hint1"}/>
                  </Card.Header>
                  </Transition>
                  <Card.Meta />
                  <Transition visible={visible2}  duration={500}>
                  <Card.Description>{selectedCities[currentCityID + 1].hints[0].label}</Card.Description>
                  </Transition>
              </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                <Transition visible={visible}  duration={500}>
                  <Card.Header>
                    <img
                    src={`./${selectedCities[currentCityID + 1].hints[1].img}`}
                    alt={"Hint1"}/>
                  </Card.Header>
                  </Transition>
                  <Card.Meta />
                  <Transition visible={visible2}  duration={500}>
                  <Card.Description>{selectedCities[currentCityID + 1].hints[1].label}</Card.Description>
                  </Transition>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                <Transition visible={visible}  duration={500}>
                  <Card.Header>
                    <img
                    src={`./${selectedCities[currentCityID + 1].hints[2].img}`}
                    alt={"Hint1"}/>
                  </Card.Header>
                  </Transition>
                  <Card.Meta />
                  <Transition visible={visible2}  duration={500}>
                  <Card.Description>{selectedCities[currentCityID + 1].hints[2].label}</Card.Description>
                  </Transition>
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
        <Lightbox ref="lightbox3" header={currentCity.name}>
          Sorry, this information is not free
          <br />
          <br />
          <strong>Come back when you have some money!</strong>
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
    moneyLeft: state.player.money,
    isLoading: state.gameState.isLoading,
  };
};

export default connect(mapStateToProps)(Police);
