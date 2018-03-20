//@flow
import React, { Component } from 'react';
import { Icon, Button, Menu } from 'semantic-ui-react';
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
    <Menu inverted>
      <Menu.Item>
        <Link to="/city">
          <Icon name="home" />
          City
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/airport">
          <Icon name="plane" />
          Airport
        </Link>
      </Menu.Item>
      {props.displayUser && (
        <Menu.Item position="right">
          <Link to="/user">
            <Icon name="user" />
            Profile
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

Header.defaultProps = defaultProps;
