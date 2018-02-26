import React, { Component } from 'react';

import { Modal, Button } from 'semantic-ui-react';

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
    const { header, buttonLabel = 'Close', trigger, children } = this.props;

    return (
      <Modal trigger={trigger} open={this.state.isOpen} onClose={this.close}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>{children}</Modal.Content>
        <Modal.Actions>
          <Button content={buttonLabel} color="green" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Lightbox;
