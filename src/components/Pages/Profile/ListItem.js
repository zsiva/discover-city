// @flow
import React, { type Node } from 'react';
import { List } from 'semantic-ui-react';

export type ListItemPropType = {
  children: Node,
  iconName: string,
};

export default function ListItem(props: ListItemPropType) {
  return (
    <List.Item>
      <List.Icon color="green" name={props.iconName} />
      <List.Content>{props.children}</List.Content>
    </List.Item>
  );
}
