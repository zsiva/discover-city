import React, {Component} from 'react';
import {ListGroupItem} from 'react-bootstrap';

class HintRow extends Component {
  constructor(props) {
    super(props);
    this.state = {hidden: 'hidden'}
  }
  componentDidMount () {
      setTimeout(() => {
        this.setState({hidden : ""});
      }, this.props.wait);
  }
  render(){
    const {label} = this.props;

    return (
    <ListGroupItem style={{"visibility": this.state.hidden}}>{label}</ListGroupItem>
    )
  }
};
export default HintRow;
