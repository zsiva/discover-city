import React, { Component, Fragment } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMoney } from '../../actions/player';

import Card from './Card';
import { shuffleArray } from '../../utils/operations';
import Spinner from '../Spinner';

const cardIcons = ['birthday', 'alarm', 'bug', 'paint brush', 'unhide', 'pin'];

const initiateCards = () => {
  const cardList = shuffleArray([...cardIcons, ...cardIcons]);

  return cardList.map(card => ({
    value: card,
    matched: false,
    flipped: false,
  }));
};

class MemoryGame extends Component {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);

    this.state = {
      cards: initiateCards(),
      lastCard: null,
      locked: false,
      matches: 0,
      timer: null,
      counter: 21,
      openModal: false,
    };
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    if (this.state.counter === 0) {
      clearInterval(this.state.timer);
      this.props.dispatch(addMoney(this.state.matches * 10));
      this.setState({
        openModal: true,
      });
    } else {
      this.setState({
        counter: this.state.counter - 1,
      });
    }
  }

  checkMatch(value, id) {
    if (this.state.locked) {
      return;
    }

    var cards = this.state.cards;
    cards[id].flipped = true;
    this.setState({ cards, locked: true });
    if (this.state.lastCard) {
      if (value === this.state.lastCard.value) {
        var matches = this.state.matches;
        cards[id].matched = true;
        cards[this.state.lastCard.id].matched = true;
        this.setState({ cards, lastCard: null, locked: false, matches: matches + 1 });
      } else {
        setTimeout(() => {
          cards[id].flipped = false;
          cards[this.state.lastCard.id].flipped = false;
          this.setState({ cards, lastCard: null, locked: false });
        }, 1000);
      }
    } else {
      this.setState({
        lastCard: { id, value },
        locked: false,
      });
    }
  }

  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Grid.Column key={index} mobile={5} tablet={4} computer={4}>
          <Card
            key={index}
            value={card.value}
            id={index}
            matched={card.matched}
            flipped={card.flipped}
            checkMatch={this.checkMatch}
          />
        </Grid.Column>
      );
    });
  }

  reset() {
    this.setState({
      cards: initiateCards(),
      lastCard: null,
      locked: false,
      matches: 0,
    });
  }

  render() {
    if (this.state.counter === 21) {
      return <Spinner text="Loading cards" />;
    }
    return (
      <Fragment>
        <h5>
          Number of pairs found: {this.state.matches}
          <div className="pull-right">Time Left: {this.state.counter}</div>
        </h5>
        <Grid>{this.renderCards(this.state.cards)}</Grid>
        <Modal open={this.state.openModal} size="small">
          <Modal.Header>
            {this.state.counter === 0 ? 'Your time is up!' : 'Great you found all the pairs'}
          </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Column width={8}>
                <img src="./images/timeup.jpg" alt="time up" />
              </Grid.Column>
              <Grid.Column width={8}>
                <p>Your time is up, you got {this.state.matches} correct answers.</p>
                <p>
                  You earned {this.state.matches * 10} €. You now have {this.props.moneyLeft}
                </p>
                <Link to="/user">
                  <Button color="green">
                    <Button.Content content="Back to the profile" />
                  </Button>
                </Link>
              </Grid.Column>
            </Grid>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    moneyLeft: state.player.money,
  };
};
export default connect(mapStateToProps)(MemoryGame);
