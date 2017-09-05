import React, { Component } from 'react';
import Intro from '../Intro';
import CityLayout from '../CityLayout';
import Spinner from '../Spinner';
import { loadGameData } from '../../actions/game';
import { connect } from 'react-redux'
import './style.css';

export class Root extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.loadGameData()
  }
  render() {
    const {className, isLoading = false, intro = true} = this.props;

    return (
      <div className={["App", className].join(' ')}>
        {isLoading && <Spinner text="Loading game"/>}
        {intro && <Intro handleClick={this.handleClick}/>}
        {!intro && !isLoading && <CityLayout />}
        {this.props.children}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      isLoading: state.gameState.isLoading,
      errors: state.gameState.hasErrors,
      intro: state.gameState.intro
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadGameData: () => dispatch(loadGameData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
