import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../Button';
import Header from '../Header';
import Lightbox from '../Lightbox';
import Spinner from '../Spinner';
import HintRow from '../HintRow';

import {ListGroup} from 'react-bootstrap'
import './style.css';

import { loadNextCity } from '../../actions/cities';
import { stopTimer, startTimer } from '../../actions/timer';

const CityRow = (props) =>
  <div className="col-xs-12 col-sm-4 text-center">
    <Button className="option-btn" label={props.label} onClick={props.handleClick}/>
  </div>


class CityLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { header: '', body:'', spinner:false }
    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  async handleExit(event){
    const {dispatch, nextCity} = this.props;
    await dispatch(loadNextCity());
    dispatch(startTimer());
  }

  handleClick(event){
    const {currentCity, dispatch} = this.props;
    dispatch(stopTimer());

    if ( event.currentTarget.innerText === currentCity.name) {
      this.setState({...this.state,
        header: "Yes! He was in " + currentCity.name,
        body: "Well done, you earn some extra time!. But he is on the run again. Follow the hints to see where he went next!"
      })
    } else {
      this.setState({...this.state,
        header: "No, sorry! He was in " + currentCity.name,
        body: "You missed him!. Get some more hints to see where he went next!"
      })
    }
    this.refs.lightbox.open();
  }

  render() {
    const { currentCity, isOn } = this.props;

    return (
      <div>
        <Header />
        {this.state.spinner && <Spinner text="Loading data"/>}
        <section className="container">
          <div className="row">
            <div className="col-xs-4 text-center">
              <h5>The thief was last seen ...</h5>
              <img src="./images/thief-hidden.png" alt="thief hidden"/>
            </div>
            <div className="col-xs-8">
              <ListGroup>
                {isOn && currentCity.hints.map((hint, i) => <HintRow key={i} num={i +1} label={hint} wait={(i+1) * 2000}/>)}
              </ListGroup>
            </div>
          </div>
          <h3 className="text-center">Where is he?</h3>
          <div className="row">
            { currentCity && currentCity.cityOptions.map((city, index) => <CityRow key={index} label={city} handleClick={this.handleClick} />)}
          </div>
        </section>
        <Lightbox
          img='./images/thief.png'
          header={this.state.header} ref="lightbox"
          body={this.state.body}
          buttonLabel="Find him!"
          onExiting={this.handleExit}
          />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
    isOn: state.timer.isOn
  }
}

export default connect(
  mapStateToProps,
)(CityLayout)
