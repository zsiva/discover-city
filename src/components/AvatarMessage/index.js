//@flow
import React, { type Node } from 'react';
import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import './styles.css';

export type AvatarMessagePropType = {
  imgSrc: string,
  introText: string,
  children?: Node,
};

const AvatarMessage = (props: AvatarMessagePropType) => {
  const { imgSrc, introText } = props;

  return (
    <div className="avatarWrapper">
      <Image circular size="tiny" src={imgSrc} className="avatarImage" />
      <div className="avatarMessage">
        <FormattedMessage id={introText}>
          {txt => (
            <p>
              <b>{txt}</b>
            </p>
          )}
        </FormattedMessage>

        {props.children}
      </div>
    </div>
  );
};

export default AvatarMessage;
