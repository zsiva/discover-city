import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { TEXTS } from '../../../data/texts.js';
import { findTextLang } from '../../../utils/findTextLang';
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
          findTextLang(TEXTS,this.props.playerLanguage,'police_10'),
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
            findTextLang(TEXTS,this.props.playerLanguage,'police_11') +
            (this.props.moneyLeft - 10) +
            ' €',
        });
      } else {
        this.setState({ messageColor: 'red' });
        this.setState({
          message:
            findTextLang(TEXTS,this.props.playerLanguage,'police_12') +
            this.props.moneyLeft +
            ' €.',
        });
      }
    }
  };
  render() {
    const { currentCity, isLoading, nextCity, playerLanguage } = this.props;
    const { visible, visible2, messageVisible } = this.state;
    if (isLoading) {
      return <Spinner text="Loading city info" />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">{findTextLang(TEXTS,playerLanguage,'police_1')} {currentCity.police}</h1>

          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Card centered color="green">
                <Card.Content textAlign="center">
                  <img src="./images/policeoff.png" alt="Police Officer" />

                  <Card.Description>
                    <b>
                    {findTextLang(TEXTS,playerLanguage,'police_2')}
                      <br />
                    {findTextLang(TEXTS,playerLanguage,'police_3')}
                    </b>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button color="green" size="large" fluid onClick={this.showHints}>
                    <Button.Content
                      size="large"
                      content={this.state.visible ? findTextLang(TEXTS,playerLanguage,'police_5') : findTextLang(TEXTS,playerLanguage,'police_4')}
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
                        <b>{findTextLang(TEXTS,playerLanguage,'police_6')}</b>
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="green" size="large" fluid onClick={this.showHintsPlus}>
                      <Button.Content
                        size="large"
                        content={this.state.visible2 ? findTextLang(TEXTS,playerLanguage,'police_5') : findTextLang(TEXTS,playerLanguage,'police_7')}
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
              <Button.Content size="large" content= {findTextLang(TEXTS,playerLanguage,'police_8')} />
            </Button>
          </Link>
          <Link to="/airport">
            <Button color="green" size="large">
              <Button.Content size="large" content= {findTextLang(TEXTS,playerLanguage,'police_9')} />
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
  };
};

export default connect(mapStateToProps)(Police);
