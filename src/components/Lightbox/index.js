import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import Button from "../Button";

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
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
    const {
      header,
      body,
      img,
      buttonLabel = "Close",
      onExiting,
      show,
      children
    } = this.props;

    return (
      <Modal
        show={this.state.showModal || show}
        onHide={this.close}
        onExiting={onExiting}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
          {!children && (
            <div className="row">
              {img && (
                <div className="col-xs-6 text-center">
                  <img src={img} alt={header} />
                </div>
              )}
              <div
                className={[img ? "col-xs-6" : "col-xs-12", "text-center"].join(
                  " "
                )}
              >
                {body && body.split(".").map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="text-center">
          <Button onClick={this.close} label={buttonLabel} />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Lightbox;
