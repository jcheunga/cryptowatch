import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class CloseButton extends React.PureComponent {
  _closeModal = () => {
    this.props.Navigation.dismissModal();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this._closeModal}
      >
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Close
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}