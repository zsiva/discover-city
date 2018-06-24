//@flow
import React, { Fragment, Component } from 'react';
import { connect, type Dispatch } from 'react-redux';
import { Button, Responsive, Form } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { createPlayer } from '../../../actions/player';
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
    value: 'en-US',
    image: { src: './images/countryFlags/UNKG0001.GIF' },
  },
  {
    text: 'Español',
    value: 'es-ES',
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

  createPlayer = () => {
    this.props.dispatch(createPlayer({ name: this.state.name, language: this.state.language }));
    this.setState({ displayIntro: true });
  };

  handleName = (e, { value }) => this.setState({ name: value });
  handleLanguage = (e, { value }) => this.setState({ language: value });

  render() {
    return (
      <Fragment>
        <section className="ui container">
          <div className="intro">
            <Responsive as="h1" maxWidth={480}>
              <FormattedMessage id="intro.title" />
            </Responsive>
            <img className="leprechaun" src="./images/ogreeny2.png" alt="ogreeny" />
            <Responsive as="h1" minWidth={481}>
              <FormattedMessage id="intro.title" />
            </Responsive>
            {!this.state.displayIntro && (
              <Form onSubmit={this.createPlayer} className="nameForm">
                <Form.Select
                  fluid
                  placeholder="Select your language"
                  options={languageOptions}
                  onChange={this.handleLanguage}
                  value={this.state.language}
                />
                <Form.Button
                  disabled={!this.state.language}
                  content="Save"
                  color="green"
                  size="large"
                  fluid
                />
              </Form>
            )}
            {this.state.displayIntro && (
              <Fragment>
                <p className="text-left">
                  <FormattedMessage id="intro.desc1" />
                </p>
                <p className="text-left">
                  <FormattedMessage id="intro.desc2" />
                </p>
                <FormattedMessage id="intro.nameplaceholder">
                  {placeholder => (
                    <Form.Input
                      type="text"
                      icon="user"
                      iconPosition="left"
                      placeholder={placeholder}
                      value={this.state.name}
                      onChange={this.handleName}
                    />
                  )}
                </FormattedMessage>
                <br />
                {this.state.name ? (
                  <Link to="/user" onClick={this.createPlayer}>
                    <Button color="green">
                      <FormattedMessage id="intro.button" />
                    </Button>
                  </Link>
                ) : (
                  <Button color="green" disabled>
                    <FormattedMessage id="intro.button" />
                  </Button>
                )}
              </Fragment>
            )}
          </div>
        </section>

        <footer className="ui container">
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
            </a>&nbsp;
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://br.freepik.com/vetores-gratis/paisagem-urbana-no-fundo-design-plano-com-estrada_893949.htm"
            >
              City
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
