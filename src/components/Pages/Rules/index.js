//@flow
import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../../Header';
import { INITIAL_TIME, INITIAL_MONEY } from '../../../data/constants';

export default function Rules() {
  return (
    <Fragment>
      <Header />
      <Container>
        <h3>Summary:</h3>
        <p>
          You are now a detective and need to extract clues from the police departments on each city
          to find out the thief's whereabouts.
        </p>

        <h3>Your task:</h3>
        <p>Capture the criminal and find the stolen gold.</p>

        <h3>Rules:</h3>
        <p>
          You start with {INITIAL_MONEY} €. In each city there is a casino with different games
          where you can obtain more money. You have {INITIAL_TIME} seconds for each game.
        </p>
      </Container>
    </Fragment>
  );
}
