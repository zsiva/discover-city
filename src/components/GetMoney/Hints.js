import React from 'react';
import { Grid } from 'semantic-ui-react';
import CardCity from '../CardCity';

const Hints = props => (
  <Grid>
    {props.isOn &&
      props.currentCity &&
      props.currentCity.hints.map((hint, i) => (
        <Grid.Column key={i} mobile={8} tablet={4} computer={4}>
          <CardCity {...hint} />
        </Grid.Column>
      ))}
  </Grid>
);

export default Hints;
