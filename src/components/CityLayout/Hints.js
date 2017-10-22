import React from "react";
import { Row } from "react-bootstrap";
import CardCity from "../CardCity";

const Hints = props => (
  <Row>
    {props.isOn &&
      props.currentCity &&
      props.currentCity.hints.map((hint, i) => <CardCity key={i} {...hint} />)}
  </Row>
);

export default Hints;
