import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../Button';
import Header from '../Header';
import Lightbox from '../Lightbox';

import {ListGroupItem, ListGroup} from 'react-bootstrap'
import './style.css';

const CityRow = (props) =>
  <div className="col-xs-4 text-center">
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
    const {label, num} = this.props;

    return (
    <ListGroupItem style={{"visibility": this.state.hidden}} header={'Hint ' + num}>{label}</ListGroupItem>
    )
  }
};

class CityLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { header: '' }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    if ( event.currentTarget.innerText === 'Berlin') {
      this.setState({...this.state, header: "Yes! He was in Berlin"})
    } else {
      this.setState({...this.state, header: "No, sorry! You missed him!"})
    }
    this.refs.lightbox.open();
  }

  render() {
    const {cities} = this.props;
    const hints = ['Buying a beer in a Späti near Kottbuser Tor', 'Chilling at TierGarten', 'Going up the Fernsehturm']

    const bodyText = "You earn some extra time! But he is on the run again. Follow the hints to see where he went next!"
    return (
      <div>
        <Header />
        <section className="container">
          <div className="row">
            <div className="col-xs-12 hints-container">
              <h3>The thief was last seen ...</h3>
              <ListGroup>
                {hints.map((hint, i) => <HintRow key={i} num={i +1} label={hint} wait={(i+1) * 2000}/>)}
              </ListGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3>Where is he?</h3>
            </div>
            <div className="col-xs-12">

              <div className="row">
                { cities.map((city, index) => <CityRow key={index} label={city} handleClick={this.handleClick} />)}
              </div>
            </div>
          </div>
        </section>
        <Lightbox img='./images/thief.png' header={this.state.header} ref="lightbox" body={bodyText}/>
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
