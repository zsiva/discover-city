//@flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Container, Grid, Card, Button } from 'semantic-ui-react';
import Header from '../../Header';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import { calculateDay } from '../../../utils/calculateDay';

export type CasinoPropType = {
  currentCity: any,
  isLoading: boolean,
  dateTime: number,
};

class Casino extends Component<CasinoPropType> {
  render() {
    const { currentCity, isLoading } = this.props;

    if (isLoading) {
      return <Spinner text={<FormattedMessage id={'common.loading'} />} />;
    }

    return (
      <Fragment>
        <Header />
        <Container>
          <h1 className="text-center">
            <FormattedMessage
              id="casino.title"
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
                      <FormattedMessage id="casino.welcome" />
                    </b>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
        <h3 className="text-center">
          <img src={`./images/${currentCity.flag}`} alt="country flag" />
        </h3>
        <Container textAlign="center">
          <Grid columns={2}>
            <Grid.Column>
              <Card centered>
                <Card.Content textAlign="center">
                  <img src="./images/cities/bg-card.jpg" alt="Card" />
                </Card.Content>
                <Card.Content extra>
                  <Link to="/cards">
                    <Button color="green" size="large">
                      <Button.Content size="large">
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
    isLoading: state.gameState.isLoading,
    nextCity: state.gameState.nextCity,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Casino);
