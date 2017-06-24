import React, { Component } from 'react';

import {Modal} from 'react-bootstrap';
import Button from '../Button';

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false};
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
     this.setState({ showModal: false });
   }

   open() {
     this.setState({ showModal: true });
   }

  render() {
    const { header, body, buttonLabel = 'Close' } = this.props;

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {body}
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} label={buttonLabel} />
          </Modal.Footer>
        </Modal>
    );
  }
}

export default Lightbox;
