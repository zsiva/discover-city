//@flow
import React, { Component, Fragment } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { usersRef } from '../../..';
import { getUsers } from '../../../actions/game';
import Spinner from '../../Spinner';
import Header from '../../Header';

export type RankingPropType = {
  dispatch: Dispatch,
  usersList: [],
};

class Ranking extends Component<RankingPropType> {
  componentDidMount() {
    let users = [];
    usersRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          users.push({ name: doc.id, ...doc.data() });
        });
      })
      .then(() => {
        users = users.sort((a, b) => b.points - a.points);
        this.props.dispatch(getUsers(users));
      });
  }
  render() {
    if (!this.props.usersList) {
      return <Spinner text="Loading ranking" />;
    }
    return (
      <Fragment>
        <Header />
        <Container>
          <Table celled selectable color="green" unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>P.</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.usersList.map((user, k) => (
                <Table.Row key={k}>
                  <Table.Cell>{k + 1}</Table.Cell>
                  {Object.values(user).map((attr, k2) => <Table.Cell key={k2}>{attr}</Table.Cell>)}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    usersList: state.gameState.usersList,
  };
};

export default connect(mapStateToProps)(Ranking);
