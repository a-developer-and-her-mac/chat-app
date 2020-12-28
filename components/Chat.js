import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let userName = this.props.route.params.userName;

    this.props.navigation.setOptions({ title: userName });

    return (
      <View>
      </View>
    )
  }
}