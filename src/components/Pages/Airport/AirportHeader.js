// @flow
import React, { Fragment } from 'react';
import Header from '../../Header';
import TimeHeader from '../../TimeHeader';
import './style.css';

export type AirportHeaderPropType = {
  cityName: string,
  hours: number,
};

export default function AirportHeader({ cityName, hours }: AirportHeaderPropType) {
  return (
    <Fragment>
      <Header />
      <div className="ui container">
        <TimeHeader messageId="airport.title" />
        <div className="airport" />
      </div>
    </Fragment>
  );
}
