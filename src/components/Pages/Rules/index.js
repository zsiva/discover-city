//@flow
import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Header from '../../Header';
import { INITIAL_MONEY } from '../../../data/constants';
import { findTextLang } from '../../../utils/findTextLang';

function Rules(props) {
  return (
    <Fragment>
      <Header />
      <Container>
        <h1>{findTextLang(props.playerLanguage,'profile_hello')} {props.playerName}</h1>
        <p>{findTextLang(props.playerLanguage,'rules_1')}</p>

        <h3>{findTextLang(props.playerLanguage,'rules_2')}</h3>
        <p>{findTextLang(props.playerLanguage,'rules_3')}</p>

        <h3>{findTextLang(props.playerLanguage,'rules_4')}</h3>
        <p>
        {findTextLang(props.playerLanguage,'rules_5a')} {INITIAL_MONEY}
        {findTextLang(props.playerLanguage,'rules_5b')}
        </p>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    playerName: state.player.name,
    playerLanguage: state.player.language,
  };
};

export default connect(mapStateToProps)(Rules);
