//@flow
import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css';

export type HeaderPropType = {
  displayUser: boolean,
};

const defaultProps = {
  displayUser: true,
};

export default function Header(props: HeaderPropType) {
  return (
    <header className="header">
      <div className="ui container">
        <p>Hello detective</p>
        {props.displayUser && (
          <Link to="/user">
            <Button color="white">
              <Icon name="user" />
              Profile
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

Header.defaultProps = defaultProps;
