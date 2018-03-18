import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Responsive } from 'semantic-ui-react';
import Lightbox from '../Lightbox';
import Transport from '../Transport';

export default class LightboxFounded extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnimation: true };
  }
  componentDidMount() {
    console.log(this.state);
    setTimeout(this.setState({ showAnimation: false }), 3000);
  }
  render() {
    const { header, body } = this.props;

    return (
      <Lightbox buttonLabel="Find him!" onHide={this.getNextCity} header={header}>
        {this.showAnimation ? (
          <Transport />
        ) : (
          <Grid>
            <Grid.Column width={8}>
              <img src="./images/thief.png" alt={header} />
            </Grid.Column>
            <Grid.Column width={8}>{body.split('.').map((p, i) => <p key={i}>{p}</p>)}</Grid.Column>
          </Grid>
        )}
      </Lightbox>
    );
  }
}
