import React, { Component, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import CardIcon from './CardIcon';
import NewCard from './NewCard';
import { shuffleArray } from '../../utils/operations';

const cardIcons = ['birthday', 'alarm', 'bug', 'paint brush', 'unhide', 'pin'];

const cardList = shuffleArray([...cardIcons, ...cardIcons]);

function initiateCards() {
  return cardList.map(card => ({
    value: card,
    matched: false,
    flipped: false,
  }));
}

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      cards: initiateCards(),
      lastCard: null,
      locked: false,
      matches: 0,
    };
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
        <Grid.Column key={index} mobile={8} tablet={4} computer={4}>
          <NewCard
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
    const numPairs = this.state.cards.filter(card => card.matched).length / 2;
    return (
      <Fragment>
        <h5>Num of pairs found: {numPairs}</h5>
        <Grid>{this.renderCards(this.state.cards)}</Grid>
      </Fragment>
    );
  }
}
