import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { FormattedMessage } from 'react-intl';
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
        <FormattedMessage id="hotel.sleep" values={{ money: this.props.moneyLeft - 25}} />
      });
    } else {
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({ messageColor: 'red' });
      this.setState({
        message:
        <FormattedMessage id="hotel.no_money" values={{ money: this.props.moneyLeft}} />
      });
    }
  }
  render() {
    const { currentCity, isLoading } = this.props;
    const { messageVisible } = this.state;
    if (isLoading) {
      return <Spinner text={<FormattedMessage id={'common.loading'} />} />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">
          <FormattedMessage
            id="hotel.title"
            values={{ city: <FormattedMessage id={`cities.${currentCity.name}.name`} /> }}
          />
          </h1>
          <h2 className="text-center"> {calculateDay(this.props.dateTime).time} </h2>
          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card centered color="green">
                <Card.Content textAlign="center">
                  <img src="./images/receptionist.png" alt="Receptionist" />
                  <Card.Description>
                    <b>
                      <FormattedMessage id="hotel.welcome" />
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
                      <FormattedMessage id="hotel.book" />
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
                  <Card.Description><FormattedMessage id="hotel.forget" /></Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/city-canvas">
                    <Button color="green" size="large">
                      <Button.Content
                        size="large"
                        content={<FormattedMessage id="common.back_city" />}
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
