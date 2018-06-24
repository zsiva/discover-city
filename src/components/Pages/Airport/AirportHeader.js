// @flow
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { calculateDay } from '../../../utils/calculateDay';
import Header from '../../Header';
import './style.css';

export type AirportHeaderPropType = {
  cityName: string,
  hours: number,
};

export default function AirportHeader({ cityName, hours }: AirportHeaderPropType) {
  return (
    <Fragment>
      <Header />
      <section className="ui container">
        <div className="airport">
          <h1>
            <FormattedMessage id="airport.title" values={{ city: cityName }} />
          </h1>
          <h2> {calculateDay(hours).time} </h2>
        </div>
      </section>
    </Fragment>
  );
}
