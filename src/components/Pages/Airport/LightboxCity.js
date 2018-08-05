import React from 'react';
import { FormattedMessage } from 'react-intl';
import { planeAnimation } from '../../Transport/animations';
import Lightbox from '../../Lightbox';

const LightboxCity = ({ found, moneyLeft }) => {
  return (
    <Lightbox
      displayButton={false}
      header={
        <FormattedMessage id={found ? 'airport.lightbox_correct' : 'airport.lightbox_incorrect'} />
      }
    >
      <div className="text-center">
        <p>
          <FormattedMessage id={found ? 'airport.found_lightbox' : 'airport.not_found_lightbox'} />
        </p>

        <p>
          <FormattedMessage id="airport.tickets" values={{ money: moneyLeft }} />
        </p>
        {planeAnimation()}
      </div>
    </Lightbox>
  );
};

export default LightboxCity;
