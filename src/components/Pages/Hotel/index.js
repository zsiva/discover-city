import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { findTextLang } from '../../../utils/findTextLang';
import { substractMoney, addDateTime } from '../../../actions/player';
import { calculateDay } from '../../../utils/calculateDay';

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = { messageVisible: false, messageColor: 'blue' };
  }

  handleOpen() {
    if (this.props.moneyLeft - 25 >= 0) {
      this.props.dispatch(addDateTime(7));
      this.props.dispatch(substractMoney(25));
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({
        message:
          findTextLang(this.props.playerLanguage, 'hotel_night') +
          (this.props.moneyLeft - 25) +
          '€',
      });
    } else {
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({ messageColor: 'red' });
      this.setState({
        message: findTextLang(this.props.playerLanguage, 'hotel_no') + +this.props.moneyLeft + '€',
      });
    }
  }
  render() {
    const { currentCity, isLoading, playerLanguage } = this.props;
    const { messageVisible } = this.state;
    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">
            {findTextLang(playerLanguage, 'hotel_welcome')}{' '}
            {findTextLang(playerLanguage, currentCity.name)}
          </h1>
          <h2 className="text-center"> {calculateDay(this.props.dateTime).time} </h2>
          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card centered color="green">
                <Card.Content textAlign="center">
                  <img src="./images/receptionist.png" alt="Receptionist" />
                  <Card.Description>
                    <b>
                      {findTextLang(playerLanguage, 'hotel_hello')}
                      <br />
                      {findTextLang(playerLanguage, 'hotel_help')}
                    </b>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          <Transition animation="pulse" visible={messageVisible} duration={500}>
            <Message size="large" color={this.state.messageColor}>
              <p className="text-center">{this.state.message}</p>
            </Message>
          </Transition>
        </Container>
        <h3 className="text-center">
          <img src={`./images/${currentCity.flag}`} alt="country flag" />
        </h3>
        <Container textAlign="center">
          <Grid columns={2}>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src="./images/hotelBed.png" alt="Bed" />
                </Card.Content>
                <Card.Content extra>
                  <Button color="green" size="large">
                    <Button.Content size="large" onClick={this.handleOpen}>
                      {findTextLang(playerLanguage, 'hotel_book')}
                    </Button.Content>
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src={`./${currentCity.hints[1].img}`} alt="Ciudad" />
                  <Card.Meta />
                  <Card.Description>{findTextLang(playerLanguage, 'airport_6')}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/city">
                    <Button color="green" size="large">
                      <Button.Content
                        size="large"
                        content={findTextLang(playerLanguage, 'airport_8')}
                      />
                    </Button>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
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
    playerLanguage: state.player.language,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Hotel);
