//@flow
import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
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
        <p>
          <FormattedMessage id="rules.money" values={{ money: INITIAL_MONEY }} />
        </p>
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
