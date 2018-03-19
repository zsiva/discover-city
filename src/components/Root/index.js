// @flow
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { startPlayer } from '../../actions/player';
import { loadGameData } from '../../actions/game';

import Intro from '../Pages/Intro';
import PlayerHome from '../Pages/PlayerHome';
import GetMoney from '../Pages/GetMoney';
import City from '../Pages/City';
import Airport from '../Pages/Airport';

import './style.css';

export type RootPropType = {
  currentCity: string,
  dispatch: Dispatch,
};

export function Root(props: RootPropType) {
  props.dispatch(loadGameData());
  props.dispatch(startPlayer());

  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Intro} />} />
        <Route path="/airport" component={Airport} />
        <Route path="/user" component={PlayerHome} />
        <Route path="/city" component={City} />
        <Route
          path="/city"
          render={() => {
            return props.currentCity ? <City /> : <Redirect to="/user" />;
          }}
        />
        <Route
          path="/get-money"
          render={() => {
            return props.currentCity ? <GetMoney /> : <Redirect to="/user" />;
          }}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentCity: state.gameState.currentCity,
  };
};

export default connect(mapStateToProps)(Root);
