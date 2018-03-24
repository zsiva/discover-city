//@flow
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css';

export default function Header() {
  return (
    <Menu inverted>
      {window.location.pathname !== '/city' && (
        <Menu.Item>
          <Link to="/city">
            <Icon name="home" />
            City
          </Link>
        </Menu.Item>
      )}
      {window.location.pathname !== '/airport' && (
        <Menu.Item>
          <Link to="/airport">
            <Icon name="plane" />
            Airport
          </Link>
        </Menu.Item>
      )}
      {window.location.pathname !== '/get-money' && (
        <Menu.Item>
          <Link to="/get-money">
            <Icon name="money" />
            Earn money
          </Link>
        </Menu.Item>
      )}
      {window.location.pathname !== '/user' && (
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
