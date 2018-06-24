// @flow
import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { loadGameData } from '../../actions/game';

import Intro from '../Pages/Intro';
import Profile from '../Pages/Profile';
import Casino from '../Pages/Casino';
import Airport from '../Pages/Airport';
import Police from '../Pages/Police';
import Hotel from '../Pages/Hotel';
import Rules from '../Pages/Rules';
import CityRoad from '../Pages/CityRoad';
import CityCanvas from '../Pages/CityCanvas';
import Ranking from '../Pages/Ranking';

export type RootPropType = {
  currentCity: string,
  dispatch: Dispatch,
};

class Root extends Component<RootPropType> {
  constructor(props: RootPropType) {
    super(props);
    this.props.dispatch(loadGameData());
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Intro} />} />
          <Route path="/airport" component={Airport} />
          <Route path="/user" component={Profile} />
          <Route path="/city" component={CityRoad} />
          <Route path="/city-canvas" component={CityCanvas} />
          <Route path="/hotel" component={Hotel} />
          <Route path="/police" component={Police} />
          <Route path="/get-money" component={Casino} />
          <Route path="/rules" component={Rules} />
          <Route path="/ranking" component={Ranking} />
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
