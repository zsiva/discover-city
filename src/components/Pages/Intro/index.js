//@flow
import React, { Fragment, Component } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Button, Responsive, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { setName, setLanguage } from '../../../actions/player';
import './style.css';

export type IntroPropType = {
  dispatch: Dispatch,
};

export type IntroStateType = {
  name: string,
  language: string,
  displayIntro: boolean,
};

const languageOptions = [
  {
    text: 'English',
    value: 'en',
    image: { src: './images/countryFlags/UNKG0001.GIF' },
  },
  {
    text: 'Español',
    value: 'es',
    image: { src: './images/countryFlags/SPAN0001.GIF' },
  },
];

class Intro extends Component<IntroPropType, IntroStateType> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      language: '',
      displayIntro: false,
    };
  }

  saveName = (e, { value }) => {
    this.props.dispatch(setName(this.state.name));
    this.props.dispatch(setLanguage(this.state.language));
    this.setState({ displayIntro: true });
  };

  handleChange = (e, { value }) => this.setState({ name: value });
  handleChangeLanguage = (e, { value }) => this.setState({ language: value });

  render() {
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
            {!this.state.displayIntro && (
              <Form fluid onSubmit={this.saveName} className="nameForm">
                <Form.Input
                  type="text"
                  icon="user"
                  iconPosition="left"
                  placeholder="Your name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <Form.Select
                  placeholder="Select your language"
                  options={languageOptions}
                  onChange={this.handleChangeLanguage}
                  value={this.state.language}
                />
                <Form.Button content="Save" color="green" size="large" fluid />
              </Form>
            )}
            {this.state.displayIntro && (
              <Fragment>
                <p className="text-left">
                  Our little lepprechaun O&apos;Greeny was chilling, having a cold Guiness while his
                  money was stolen.
                </p>
                <p className="text-left">
                  He has been looking all over the world for it but cannot find it. Help him!
                </p>
                <br />
                <Link to="/user">
                  <Button content="Start game" color="green" />
                </Link>
              </Fragment>
            )}
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
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    playerName: state.player.name,
    playerLanguage: state.player.language,
  };
};

export default connect(mapStateToProps)(Intro);
