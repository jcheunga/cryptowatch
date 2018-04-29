import React from "react";
import { View, Text } from "react-native";

export default class CoinNews extends React.PureComponent {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <View>
        <Text>COIN NEWS</Text>
      </View>
    );
  }
}