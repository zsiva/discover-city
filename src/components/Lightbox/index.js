//@flow
import React, { type Node } from 'react';

import { Modal, Button } from 'semantic-ui-react';

export type LightboxPropType = {
  onClose: () => void,
  buttonLabel: string,
  displayButton: boolean,
  size: string,
  header: string,
  children: Node,
};

const defaultProps = {
  buttonLabel: 'Close',
  displayButton: true,
  size: 'small',
};

const Lightbox = (props: LightboxPropType) => {
  const { header, buttonLabel, children, displayButton, size, onClose } = props;

  return (
    <Modal size={size} open onClose={onClose}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      {displayButton && (
        <Modal.Actions>
          <Button content={buttonLabel} color="green" onClick={onClose} />
        </Modal.Actions>
      )}
    </Modal>
  );
};

Lightbox.defaultProps = defaultProps;

export default Lightbox;
