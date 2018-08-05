import React from 'react';

import { FormattedMessage } from 'react-intl';
import Lightbox from '../../Lightbox';

const LightboxFound = ({ cityName, onClose }) => {
  return (
    <Lightbox header={<FormattedMessage id={`cities.${cityName}.name`} />} onClose={onClose}>
      <FormattedMessage id="airport.found_city" values={{ city: cityName }} />
      <br />
      <strong>
        <FormattedMessage id="airport.found_gold" />
      </strong>
      <br />
      <img src="./images/Minions.gif" alt="minions success" />
    </Lightbox>
  );
};

export default LightboxFound;
