//@flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import Card, { type CardPropType } from '../../Card';

export type CityPropType = {
  name: string,
  hints: CardPropType[],
  cityOptions: string[],
};

export type CardsPropType = {
  currentCity: CityPropType,
};

const Cards = (props: CardsPropType) => {
  return (
    <Grid>
      {props.currentCity.hints.map((hint, i) => (
        <Grid.Column key={i} mobile={8} tablet={4} computer={4}>
          <Card {...hint} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default Cards;
