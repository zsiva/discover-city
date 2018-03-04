import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Intro from '../Intro';
import PlayerHome from '../PlayerHome';
import GetMoney from '../GetMoney';
import Spinner from '../Spinner';

import './style.css';

export function Root(props) {
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
      {props.isLoading && <Spinner text="Loading game" />}
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.gameState.isLoading,
    errors: state.gameState.hasErrors,
    currentCity: state.gameState.currentCity,
  };
};

export default connect(mapStateToProps)(Root);
