// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Intro from '../Pages/Intro';
import PlayerHome from '../Pages/PlayerHome';
import GetMoney from '../Pages/GetMoney';

import './style.css';

export type RootPropType = {
  currentCity: string,
};

export function Root(props: RootPropType) {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Intro} />} />
        <Route path="/user" component={PlayerHome} />
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
