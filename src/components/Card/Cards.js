import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import CardIcon from './CardIcon';
import { shuffleArray } from '../../utils/operations';

const cardIcons = ['birthday', 'alarm', 'bug', 'paint brush', 'unhide', 'pin'];

const cardList = shuffleArray([...cardIcons, ...cardIcons]);

export type CardsStateType = {
  cards: string[],
  previousAnswer: string,
  flipped: boolean,
};

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousAnswer: '',
      flipped: false,
    };
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick(iconName: string) {
    console.log(iconName, this.state.previousAnswer);
    if (this.state.previousAnswer === iconName) {
      this.setState({ previousAnswer: '', flipped: true });
    } else {
      this.setState({ previousAnswer: iconName });
    }
  }

  render() {
    return (
      <Grid>
        {cardList.map(card => (
          <Grid.Column mobile={8} tablet={4} computer={4} onClick={() => this.handleClick(card)}>
            <CardIcon icon={card} flipped={this.state.flipped} />
          </Grid.Column>
        ))}
        <br />
      </Grid>
    );
  }
}
