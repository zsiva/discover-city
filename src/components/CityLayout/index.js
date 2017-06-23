import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../Button';
import './style.css';

const CityRow = (props) =>
  <div className="col-4 text-center">
    <Button label={props.label} onClick={props.handleClick}/>
  </div>

class HintRow extends Component {
  constructor(props) {
    super(props);
    this.state = {hidden: 'hidden'}
  }
  componentWillMount () {
      setTimeout(() => {
        this.setState({hidden : ""});
      }, this.props.wait);
  }
  render(){
    const {label} = this.props;

    return (
        <p style={{"visibility": this.state.hidden}}>{label}</p>
    )
  }
};

class CityLayout extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    if ( event.currentTarget.innerText === 'Berlin') {
      console.log('FOUND');
    }
  }

  render() {
    const {cities} = this.props;
    const hints = ['Buying a beer in a Späti near Kottbuser Tor', 'Second', 'Third']

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 hints-container">
            <p>The thief was last seen ...</p>
            {hints.map((hint, i) => <HintRow key={i} label={hint} wait={(i+1) * 1000}/>)}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Where is he?</h3>
          </div>
          <div className="row">
            { cities.map((city, index) => <CityRow key={index} label={city} handleClick={this.handleClick} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    cities: state.gameState.cities,
    currentCity: state.gameState.currentCity
  }
}

export default connect(
  mapStateToProps,
)(CityLayout)
