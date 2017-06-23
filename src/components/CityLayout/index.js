import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../Button';

//import './style.css';

class CityLayout extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {cities: []};
  }

  handleClick(){

    console.log('test', this.state);
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Select City</h3>
          </div>
          <div className="row">
            <div className="col-4 text-center">
              <Button label="Berlin" onClick={this.handleClick}/>
            </div>
            <div className="col-4 text-center">
              <Button label="London" onClick={this.handleClick}/>
            </div>
            <div className="col-4 text-center">
              <Button label="Paris" onClick={this.handleClick}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CityLayout;
/*
const mapStateToProps = (state, ownProps) => {
  return
  {cities: ['London', 'Berlin', 'Paris', 'Madrid']}
};


export default connect(
  mapStateToProps,
)(CityLayout)*/
