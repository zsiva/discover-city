import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { FormattedMessage } from 'react-intl';
import { substractMoney, addDateTime } from '../../../actions/player';
import TimeHeader from '../../TimeHeader';
import AvatarMessage from '../../AvatarMessage';

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = { messageVisible: false, messageColor: 'blue' };
  }

  handleOpen() {
    this.setState({ messageVisible: !this.state.messageVisible });
    if (this.props.moneyLeft - 25 >= 0) {
      this.props.dispatch(addDateTime(7));
      this.props.dispatch(substractMoney(25));
      this.setState({
        message: (
          <FormattedMessage id="hotel.sleep" values={{ money: this.props.moneyLeft - 25 }} />
        ),
      });
    } else {
      this.setState({ messageColor: 'red' });
      this.setState({
        message: <FormattedMessage id="hotel.no_money" values={{ money: this.props.moneyLeft }} />,
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
          <TimeHeader messageId="hotel.title" />
          <AvatarMessage imgSrc="./images/receptionist.png" introText="hotel.welcome" />

          <Transition animation="pulse" visible={messageVisible} duration={500}>
            <Message size="large" color={this.state.messageColor}>
              <p className="text-center">{this.state.message}</p>
            </Message>
          </Transition>
        </Container>

        <Container textAlign="center">
          <Grid columns={2}>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src="./images/hotelBed.png" alt="Bed" />
                </Card.Content>
                <Card.Content extra>
                  <Button color="green">
                    <Button.Content onClick={this.handleOpen}>
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
                  <Card.Description>
                    <FormattedMessage id="hotel.forget" />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/city">
                    <Button color="green">
                      <Button.Content content={<FormattedMessage id="common.back_city" />} />
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
