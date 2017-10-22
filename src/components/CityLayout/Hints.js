import React from "react";
import { Row, Col } from "react-bootstrap";
import CardCity from "../CardCity";

const Hints = props => (
  <Row>
    <Col className="text-center" xs={12}>
      <p>Click on the cards to reveal the hints</p>
    </Col>
    {props.isOn &&
      props.currentCity &&
      props.currentCity.hints.map((hint, i) => <CardCity key={i} {...hint} />)}
  </Row>
);

export default Hints;
