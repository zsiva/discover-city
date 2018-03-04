import React, { Fragment, Component } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import './style.css';
import { trainAnimation, planeAnimation, carAnimation } from './animations';

class Transport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnimation: false,
      transport: 'train',
    };
  }

  setAnimation = e => {
    this.setState({ showAnimation: true, transport: e.target.id });
  };

  renderAnimation = () => {
    switch (this.state.transport) {
      case 'train':
        return trainAnimation();
      case 'plane':
        return planeAnimation();
      case 'car':
        return carAnimation();
        break;
      default:
    }
  };

  render() {
    return (
      <section>
        {this.state.showAnimation ? (
          this.renderAnimation()
        ) : (
          <Fragment>
            <h5>Choose your transportation</h5>
            <Button.Group labeled icon vertical>
              <Button
                color="green"
                icon="train"
                id="train"
                content="Train - 25€"
                onClick={this.setAnimation}
              />
              <br />
              <Button
                color="green"
                icon="plane"
                id="plane"
                content="Plane - 50€"
                onClick={this.setAnimation}
              />
              <br />
              <Button
                color="green"
                icon="car"
                id="car"
                content="Car - 10€"
                onClick={this.setAnimation}
              />
            </Button.Group>
          </Fragment>
        )}
      </section>
    );
  }
}

export default Transport;
