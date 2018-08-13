//@flow
import React, { Fragment } from 'react';
import { Container, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Header from '../../Header';
import { INITIAL_MONEY } from '../../../data/constants';

type RulesPropType = {
  playerName: string,
};

function Rules(props: RulesPropType) {
  return (
    <Fragment>
      <Header />
      <Container>
        <h1>
          <FormattedMessage id="profile.header" values={{ name: props.playerName }} />
        </h1>
        <p>
          <FormattedMessage id="rules.intro" />
        </p>
        <h3>
          <FormattedMessage id="rules.task" />
        </h3>
        <p>
          <FormattedMessage id="rules.task1" />
        </p>
        <h3>
          <FormattedMessage id="rules.rules" />
        </h3>
        <List>
          <List.Item>
            <FormattedMessage id="rules.1" values={{ money: INITIAL_MONEY }} />
          </List.Item>
          <List.Item>
            <FormattedMessage id="rules.2" />
          </List.Item>
          <List.Item>
            <FormattedMessage id="rules.3" />
          </List.Item>
        </List>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    playerName: state.player.name,
  };
};

export default connect(mapStateToProps)(Rules);
