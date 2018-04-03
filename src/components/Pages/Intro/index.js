import React, { Fragment } from 'react';
import { Button, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Intro() {
  return (
    <Fragment>
      <section className="ui container">
        <div className="intro">
          <Responsive as="h1" maxWidth={480}>
            Help O&apos;Greeny
          </Responsive>
          <img className="leprechaun" src="./images/ogreeny2.png" alt="ogreeny" />
          <Responsive as="h1" minWidth={481}>
            Help O&apos;Greeny
          </Responsive>
          <p className="text-left">
            Our little lepprechaun O&apos;Greeny was chilling, having a cold Guiness while his money
            was stolen.
          </p>
          <p className="text-left">
            He has been looking all over the world for it but cannot find it. Help him!
          </p>
          <br />
          <Link to="/user">
            <Button content="Start game" color="green" />
          </Link>
        </div>
      </section>

      <footer className="container">
        <small>
          Images by Freepik: &nbsp;
          <a
            rel="noopener noreferrer"
            href="http://www.freepik.com/free-vector/four-leaf-clover-background_765853.htm"
          >
            cards
          </a>&nbsp;
          <a
            rel="noopener noreferrer"
            href="http://www.freepik.com/free-vector/alarm-clock_796418.htm"
          >
            Clock
          </a>&nbsp;
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="http://www.freepik.com/free-vector/st-patrick-s-background-design_1064485.htm"
          >
            Leprechaun
          </a>
        </small>
      </footer>
    </Fragment>
  );
}
