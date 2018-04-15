import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { substractMoney } from '../../../actions/player';
import './styles.css';

class Police extends Component {
  handleOpen = () => this.refs.lightbox.open();
  state = {
    visible: false,
    visible2: false,
    message: '',
    messageVisible: false,
    messageColor: 'blue',
  };
  showHints = () => {
    if (this.state.visible === false) {
      this.setState({ visible: true });
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({
        message:
          'The officer shows you the 3 pictures. Can you guess the next city already? Go to the airport!',
      });
    }
  };
  showHintsPlus = () => {
    this.setState({ messageVisible: !this.state.messageVisible });
    if (this.state.visible2 === false) {
      if (this.props.moneyLeft - 10 >= 0) {
        this.setState({ visible2: true });
        this.props.dispatch(substractMoney(10));
        this.setState({
          message:
            'You paid 10 € and you got the name of the pictures. It should help you You have now ' +
            (this.props.moneyLeft - 10) +
            ' €',
        });
      } else {
        this.setState({ messageColor: 'red' });
        this.setState({
          message:
            'Corrupt Police Officer: You need 10 € and your account has ' +
            this.props.moneyLeft +
            ' €. This information is not free!',
        });
      }
    }
  };
  render() {
    const { currentCity, isLoading, nextCity } = this.props;
    const { visible, visible2, messageVisible } = this.state;
    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">Welcome to the {currentCity.police}</h1>

          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card centered color="green">
                <Card.Content textAlign="center">
                  <img src="./images/policeoff.png" alt="Police Officer" />

                  <Card.Description>
                    <b>
                      I heard you are looking for the thief who stole O'Greeny's money
                      <br />Interpol sent us these 3 pictures. It might be his next destination.
                    </b>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button color="green" size="large" fluid onClick={this.showHints}>
                    <Button.Content
                      size="large"
                      content={this.state.visible ? 'GOOD LUCK' : 'REVEAL HINTS'}
                    />
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Transition visible={visible} duration={500}>
                <Card centered color="green">
                  <Card.Content textAlign="center">
                    <img src="./images/policecorr.png" alt="Police Officer" />
                    <Card.Description>
                      <p>
                        <b>PSS PSS</b>
                      </p>
                      <p>
                        <b>I might have some information for you if you pay me</b>
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="green" size="large" fluid onClick={this.showHintsPlus}>
                      <Button.Content
                        size="large"
                        content={this.state.visible2 ? 'GOOD LUCK !' : 'PAY 10€ FOR THE INFO'}
                      />
                    </Button>
                  </Card.Content>
                </Card>
              </Transition>
            </Grid.Column>
          </Grid>
          <Transition animation="pulse" visible={messageVisible} duration={500}>
            <Message size="large" color={this.state.messageColor}>
              <p className="text-center">{this.state.message}</p>
            </Message>
          </Transition>
          <Grid centered>
            {nextCity.hints.map(hint => (
              <Grid.Column mobile={16} tablet={5} computer={4} key={hint.label}>
                <Card centered color="green">
                  <Card.Content textAlign="center">
                    <Transition visible={visible} duration={500}>
                      <img
                        className={visible2 ? 'hintImage' : 'blurImage'}
                        src={`./${hint.img}`}
                        alt="city hints"
                      />
                    </Transition>
                    <Transition visible={visible2} animation="jiggle" duration={500}>
                      <p>{hint.label}</p>
                    </Transition>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
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
    moneyLeft: state.player.money,
    isLoading: state.gameState.isLoading,
    nextCity: state.gameState.nextCity,
  };
};

export default connect(mapStateToProps)(Police);
