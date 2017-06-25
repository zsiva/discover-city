import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../Button';
import Header from '../Header';
import Lightbox from '../Lightbox';

import {ListGroupItem, ListGroup} from 'react-bootstrap'

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
    this.state = { header: '', body:'' }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    const {nextCity} = this.props;
    if ( event.currentTarget.innerText === nextCity.name) {
      this.setState({...this.state,
        header: "Yes! He was in " + nextCity.name,
        body: "Well done, you earn some extra time!. But he is on the run again. Follow the hints to see where he went next!"
      })
    } else {
      this.setState({...this.state,
        header: "No, sorry! He was in " +nextCity.name,
        body: "You missed him!. Get some more hints to see where he went next!"
      })
    }
    this.refs.lightbox.open();
  }

  render() {
    const { nextCity } = this.props;

    return (
      <div>
        <Header />
        <section className="container">
          <div className="row">
            <div className="col-xs-4 text-center">
              <h5>The thief was last seen ...</h5>
              <img src="./images/thief-hidden.png" alt="thief hidden"/>
            </div>
            <div className="col-xs-8">
              <ListGroup>
                {nextCity.hints.map((hint, i) => <HintRow key={i} num={i +1} label={hint} wait={(i+1) * 2000}/>)}
              </ListGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3>Where is he?</h3>
            </div>
            <div className="col-xs-12">
              <div className="row">
                { nextCity.cityOptions.map((city, index) => <CityRow key={index} label={city} handleClick={this.handleClick} />)}
              </div>
            </div>
          </div>
        </section>
        <Lightbox
          img='./images/thief.png'
          header={this.state.header} ref="lightbox"
          body={this.state.body}
          buttonLabel="Find him!"/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    allCities: state.gameState.allCities,
    nextCity: state.gameState.nextCity,
    thiefCities: state.gameState.thiefCities
  }
}

export default connect(
  mapStateToProps,
)(CityLayout)
