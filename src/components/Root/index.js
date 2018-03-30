// @flow
import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { startPlayer } from '../../actions/player';
import { loadGameData } from '../../actions/game';

import Intro from '../Pages/Intro';
import Profile from '../Pages/Profile';
import GetMoney from '../Pages/GetMoney';
import City from '../Pages/City';
import Airport from '../Pages/Airport';
import Police from '../Pages/Police';
import Rules from '../Pages/Rules';

import './style.css';

export type RootPropType = {
  currentCity: string,
  dispatch: Dispatch,
};

class Root extends Component<RootPropType> {
  constructor(props: RootPropType) {
    super(props);
    this.props.dispatch(loadGameData());
    this.props.dispatch(startPlayer());
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Intro} />} />
          <Route path="/airport" component={Airport} />
          <Route path="/user" component={Profile} />
          <Route path="/city" component={City} />
          <Route path="/police" component={Police} />
          <Route path="/get-money" component={GetMoney} />
          <Route path="/rules" component={Rules} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCity: state.gameState.currentCity,
  };
};

export default connect(mapStateToProps)(Root);
