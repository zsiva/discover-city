//@flow
import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import MemoryGame from '../../MemoryGame';
import Header from '../../Header';

export default function GetMoney() {
  return (
    <Fragment>
      <Header />
      <Container>
        <MemoryGame />
      </Container>
    </Fragment>
  );
}
