import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Card, Transition, Message } from 'semantic-ui-react';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import { FormattedMessage } from 'react-intl';
import { substractMoney, addDateTime } from '../../../actions/player';
import './styles.css';
import TimeHeader from '../../TimeHeader';
import AvatarMessage from '../../AvatarMessage';

class Police extends Component {
  handleOpen = () => this.refs.lightbox.open();
  state = {
    copVisible: false,
    corruptCopVisible: false,
    message: '',
    messageVisible: false,
    messageColor: 'blue',
  };
  showHints = () => {
    if (this.state.copVisible === false) {
      this.props.dispatch(addDateTime(1));
      this.setState({ copVisible: true });
      this.setState({ messageVisible: !this.state.messageVisible });
      this.setState({
        message: <FormattedMessage id="police.airport_info" />,
      });
    }
  };
  showHintsPlus = () => {
    this.setState({ messageVisible: !this.state.messageVisible });
    if (this.state.corruptCopVisible === false) {
      if (this.props.moneyLeft - 10 >= 0) {
        this.setState({ corruptCopVisible: true });
        this.props.dispatch(addDateTime(2));
        this.props.dispatch(substractMoney(10));
        this.setState({
          message: (
            <FormattedMessage
              id="police.photo_info"
              values={{ money: this.props.moneyLeft - 10 }}
            />
          ),
        });
      } else {
        this.props.dispatch(addDateTime(1));
        this.setState({ messageColor: 'red' });
        this.setState({
          message: (
            <FormattedMessage id="police.corrupt_cop" values={{ money: this.props.moneyLeft }} />
          ),
        });
      }
    }
  };
  render() {
    const { isLoading, nextCity } = this.props;
    const { copVisible, corruptCopVisible, messageVisible } = this.state;
    if (isLoading) {
      return <Spinner text={<FormattedMessage id={'common.loading'} />} />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <TimeHeader messageId="police.title" />
          <Grid centered>
            <Grid.Column mobile={16} tablet={8} computer={7}>
              <AvatarMessage imgSrc="./images/policeoff.png" introText="police.info">
                <FormattedMessage id={'police.interpol'}>{txt => <p>{txt}</p>}</FormattedMessage>
                {!copVisible ? (
                  <Button
                    color="green"
                    fluid
                    onClick={this.showHints}
                    content={<FormattedMessage id="police.show_hints" />}
                  />
                ) : (
                  <FormattedMessage id="police.luck">{text => <p>{text}</p>}</FormattedMessage>
                )}
              </AvatarMessage>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={7}>
              <Transition visible={copVisible} duration={500}>
                <AvatarMessage imgSrc="./images/policecorr.png" introText="police.corrupt_info">
                  <FormattedMessage id={'police.info_desc'}>{txt => <p>{txt}</p>}</FormattedMessage>
                  {!corruptCopVisible ? (
                    <Button
                      color="green"
                      fluid
                      onClick={this.showHintsPlus}
                      content={<FormattedMessage id="police.info_money" />}
                    />
                  ) : (
                    <FormattedMessage id="police.luck">{text => <p>{text}</p>}</FormattedMessage>
                  )}
                </AvatarMessage>
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
                    <Transition visible={copVisible} duration={500}>
                      <img
                        className={corruptCopVisible ? 'hintImage' : 'blurImage'}
                        src={`./${hint.img}`}
                        alt="city hints"
                      />
                    </Transition>
                    <Transition visible={corruptCopVisible} animation="jiggle" duration={500}>
                      <p>{hint.label}</p>
                    </Transition>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
          <div className="footerButtons">
            <Link to="/city">
              <Button color="green" size="large">
                <Button.Content
                  size="large"
                  content={<FormattedMessage id={'common.back_city'} />}
                />
              </Button>
            </Link>
            <Link to="/airport">
              <Button color="green" size="large">
                <Button.Content
                  size="large"
                  content={<FormattedMessage id={'common.back_airport'} />}
                />
              </Button>
            </Link>
          </div>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    selectedCities: state.gameState.selectedCities,
    moneyLeft: state.player.money,
    isLoading: state.gameState.isLoading,
    nextCity: state.gameState.nextCity,
    playerLanguage: state.player.language,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Police);
