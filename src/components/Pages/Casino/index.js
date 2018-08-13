//@flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Container, Grid, Card, Button } from 'semantic-ui-react';
import Header from '../../Header';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import AvatarMessage from '../../AvatarMessage';
import TimeHeader from '../../TimeHeader';
import { addDateTime } from '../../../actions/player';

export type CasinoPropType = {
  currentCity: any,
  isLoading: boolean,
  dateTime: number,
};

class Casino extends Component<CasinoPropType> {
  render() {
    const { currentCity, isLoading, dispatch } = this.props;

    if (isLoading) {
      return <Spinner text={<FormattedMessage id={'common.loading'} />} />;
    }

    return (
      <Fragment>
        <Header />
        <Container>
          <TimeHeader messageId="casino.title" />
          <AvatarMessage imgSrc="./images/receptionist.png" introText="casino.welcome" />

          <Grid columns={2}>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src="./images/cities/bg-card.jpg" alt="Card" />
                </Card.Content>
                <Card.Content extra className="text-center">
                  <Link to="/cards" onClick={() => dispatch(addDateTime(2))}>
                    <Button color="green">
                      <Button.Content>
                        <FormattedMessage id="casino.cards" />
                      </Button.Content>
                    </Button>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src={`./${currentCity.hints[2].img}`} alt="Ciudad" />
                  <Card.Meta />
                  <Card.Description>
                    <FormattedMessage id="casino.forget" />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra className="text-center">
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
    isLoading: state.gameState.isLoading,
    nextCity: state.gameState.nextCity,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Casino);
