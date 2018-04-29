import React from 'react';
import { View, Text } from "react-native";

export default class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>1 (Tweet)</Text>
        <Text>1 (Reddit Post)</Text>
      </View>
    );
  }
}

