//@flow
import React, { type Node, Fragment } from 'react';
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
    <Fragment>
      <Image circular size="tiny" src={imgSrc} className="avatarImage" />
      <div className="avatarMessage">
        <p>
          <b>
            <FormattedMessage id={introText} />
          </b>
        </p>
        {props.children}
      </div>
    </Fragment>
  );
};

export default AvatarMessage;
