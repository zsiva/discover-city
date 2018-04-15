import React, { Component } from 'react';

import { Modal, Button } from 'semantic-ui-react';

const defaultProps = {
  buttonLabel: 'Close',
  displayButton: true,
  size: 'small',
};

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const { header, buttonLabel, trigger, children, displayButton, size } = this.props;

    return (
      <Modal trigger={trigger} size={size} open={this.state.isOpen} onClose={this.close}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>{children}</Modal.Content>
        {displayButton && (
          <Modal.Actions>
            <Button content={buttonLabel} color="green" onClick={this.close} />
          </Modal.Actions>
        )}
      </Modal>
    );
  }
}

Lightbox.defaultProps = defaultProps;

export default Lightbox;
