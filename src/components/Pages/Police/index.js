import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { FormattedMessage } from 'react-intl';
import { substractMoney, addDateTime } from '../../../actions/player';
import { calculateDay } from '../../../utils/calculateDay';
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
      this.props.dispatch(addDateTime(1));
      this.setState({ visible: true });
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({
        message:
        <FormattedMessage id="police.airport_info"/>
      });
    }
  };
  showHintsPlus = () => {
    this.setState({ messageVisible: !this.state.messageVisible });
    if (this.state.visible2 === false) {
      if (this.props.moneyLeft - 10 >= 0) {
        this.setState({ visible2: true });
        this.props.dispatch(addDateTime(2));
        this.props.dispatch(substractMoney(10));
        this.setState({
          message:
            <FormattedMessage id="police.photo_info" values={{ money: this.props.moneyLeft - 10}} />
        });
      } else {
        this.props.dispatch(addDateTime(1));
        this.setState({ messageColor: 'red' });
        this.setState({
          message:
            <FormattedMessage id="police.corrupt_cop" values={{ money: this.props.moneyLeft}} />
        });
      }
    }
  };
  render() {
    const { currentCity, isLoading, nextCity } = this.props;
    const { visible, visible2, messageVisible } = this.state;
    if (isLoading) {
      return <Spinner text={<FormattedMessage id={'common.loading'} />} />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">
          <FormattedMessage
            id="police.title"
            values={{ city: <FormattedMessage id={`cities.${currentCity.name}.name`} /> }}
          />
          </h1>
          <h2 className="text-center"> {calculateDay(this.props.dateTime).time} </h2>
          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card centered color="green">
                <Card.Content textAlign="center">
                  <img src="./images/policeoff.png" alt="Police Officer" />

                  <Card.Description>
                    <b>
                      {<FormattedMessage id={'police.info'} />}
                      <br />
                      {<FormattedMessage id={'police.interpol'} />}
                    </b>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button color="green" size="large" fluid onClick={this.showHints}>
                    <Button.Content
                      size="large"
                      content={
                        this.state.visible
                          ? <FormattedMessage id={'police.luck'} />
                          : <FormattedMessage id={'police.show_hints'} />
                      }
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
                        <b><FormattedMessage id={'police.info_desc'} /></b>
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="green" size="large" fluid onClick={this.showHintsPlus}>
                      <Button.Content
                        size="large"
                        content={
                          this.state.visible2
                            ? <FormattedMessage id={'police.luck'} />
                            : <FormattedMessage id={'police.info_money'} />
                        }
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
          <Link to="/city-canvas">
            <Button color="green" size="large">
              <Button.Content size="large" content={<FormattedMessage id={'common.back_city'} />} />
            </Button>
          </Link>
          <Link to="/airport">
            <Button color="green" size="large">
              <Button.Content size="large" content={<FormattedMessage id={'common.back_airport'} />} />
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
    playerLanguage: state.player.language,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Police);
