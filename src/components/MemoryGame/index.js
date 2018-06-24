import React, { Component, Fragment } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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
      return <Spinner text={<FormattedMessage id="casino.loading" />} />;
    }
    return (
      <Fragment>
        <h5>
          <FormattedMessage id="casino.pairs_found" /> {this.state.matches}
          <div className="pull-right">
            <FormattedMessage id="casino.time" values={{ seconds: this.state.counter }} />
          </div>
        </h5>
        <Grid>{this.renderCards(this.state.cards)}</Grid>
        <Modal open={this.state.openModal} size="small">
          <Modal.Header>
            {this.state.counter === 0 ? (
              <FormattedMessage id="casino.timeup" />
            ) : (
              <FormattedMessage id="casino.all_found" />
            )}
          </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Column width={8}>
                <img src="./images/timeup.jpg" alt="time up" />
              </Grid.Column>
              <Grid.Column width={8}>
                <p>
                  <FormattedMessage
                    id="casino.timeup_answer"
                    values={{ pairs: this.state.matches }}
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="casino.money"
                    values={{ money: this.state.matches * 10, total: this.props.moneyLeft }}
                  />
                </p>
                <Link to="/user">
                  <Button color="green">
                    <FormattedMessage id="casino.back_profile" />
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
