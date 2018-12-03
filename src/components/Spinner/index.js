// @flow
import React from 'react';
import { type IntlShape } from 'react-intl';
import './style.css';

const Spinner = ({ text }: { text: IntlShape }) => {
  return (
    <div className="text-center spinner">
      <p>{text}</p>
      <div className="loaderBar" />
    </div>
  );
};

export default Spinner;
