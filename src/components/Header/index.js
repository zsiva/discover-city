//@flow
import React from 'react';
import { Icon, Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './style.css';

export default function Header() {
  return (
    <Menu inverted icon="labeled">
      <Container>
        <Link to="/city">
          <Menu.Item active={window.location.pathname === '/city'}>
            <Icon name="home" size="small" />
            <FormattedMessage id="header.city" />
          </Menu.Item>
        </Link>
        <Link to="/airport">
          <Menu.Item active={window.location.pathname === '/airport'}>
            <Icon name="plane" />
            <FormattedMessage id="header.airport" />
          </Menu.Item>
        </Link>
        <Link to="/police">
          <Menu.Item active={window.location.pathname === '/police'}>
            <Icon name="building outline" />
            <FormattedMessage id="header.police" />
          </Menu.Item>
        </Link>
        <Link to="/get-money">
          <Menu.Item active={window.location.pathname === '/get-money'}>
            <Icon name="money" />
            <FormattedMessage id="header.casino" />
          </Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Link to="/user">
            <Menu.Item active={window.location.pathname === '/user'}>
              <Icon name="user" />
              <FormattedMessage id="header.profile" />
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
