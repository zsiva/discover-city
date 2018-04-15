//@flow
import React from 'react';
import { Icon, Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css';

export default function Header() {
  return (
    <Menu inverted icon="labeled">
      <Container>
        <Link to="/city">
          <Menu.Item active={window.location.pathname === '/city'}>
            <Icon name="home" size="small" />
            City
          </Menu.Item>
        </Link>
        <Link to="/airport">
          <Menu.Item active={window.location.pathname === '/airport'}>
            <Icon name="plane" />
            Airport
          </Menu.Item>
        </Link>
        <Link to="/police">
          <Menu.Item active={window.location.pathname === '/police'}>
            <Icon name="building outline" />
            Police
          </Menu.Item>
        </Link>
        <Link to="/get-money">
          <Menu.Item active={window.location.pathname === '/get-money'}>
            <Icon name="money" />
            Casino
          </Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Link to="/user">
            <Menu.Item active={window.location.pathname === '/user'}>
              <Icon name="user" />
              Profile
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
