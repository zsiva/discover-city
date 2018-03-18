import React from 'react';
import { Grid } from 'semantic-ui-react';
import Card from '../Card';

const Hints = props => (
  <Grid>
    {props.timerIsOn &&
      props.currentCity &&
      props.currentCity.hints.map((hint, i) => (
        <Grid.Column key={i} mobile={8} tablet={4} computer={4}>
          <Card {...hint} />
        </Grid.Column>
      ))}
  </Grid>
);

export default Hints;
