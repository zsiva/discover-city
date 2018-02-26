import React, { Component } from 'react';

import { Modal, Header, Button } from 'semantic-ui-react';
import { Button as CustomButton } from '../Button';

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClose = () => this.setState({ isOpen: false });

  render() {
    const { header, body, img, buttonLabel = 'Close', open, children } = this.props;

    return (
      <Modal open={this.state.isOpen || open} onClose={this.handleClose} size="small">
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          {children}
          {!children && (
            <div className="row">
              {img && (
                <div className="col-xs-6 text-center">
                  <img src={img} alt={header} />
                </div>
              )}
              <div className={[img ? 'col-xs-6' : 'col-xs-12', 'text-center'].join(' ')}>
                {body && body.split('.').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button content={buttonLabel} color="green" onClick={this.handleClose} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Lightbox;
