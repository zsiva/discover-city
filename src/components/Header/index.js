//@flow
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css';

export default function Header() {
  return (
    <Menu inverted icon="labeled">
      <Link to="/city">
        <Menu.Item active={window.location.pathname === '/city'}>
          <Icon name="home" />
          City
        </Menu.Item>
      </Link>
      <Link to="/airport">
        <Menu.Item active={window.location.pathname === '/airport'}>
          <Icon name="plane" />
          Airport
        </Menu.Item>
      </Link>
      <Link to="/get-money">
        <Menu.Item active={window.location.pathname === '/get-money'}>
          <Icon name="money" />
          Casino
        </Menu.Item>
      </Link>
      <Link to="/user">
        <Menu.Item active={window.location.pathname === '/user'}>
          <Icon name="user" />
          Profile
        </Menu.Item>
      </Link>
    </Menu>
  );
}
