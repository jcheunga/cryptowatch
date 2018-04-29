import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, Dimensions, StatusBar, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AllCoinsActions from '../actions';
import { Navigation } from 'react-native-navigation';

const { width, height } = Dimensions.get('window');

class HeaderBar extends React.PureComponent {
  _handleSearchTermChange = (searchTerm) => {
    this.props.allCoinsActions.handleSearchTermChange(searchTerm);
  }

  _focusSearchBar = () => {
    this.textInput.focus();
  }

  _showCurrencyModal = () => {
    Navigation.showModal({
      screen: 'app.Currencies',
      title: 'Choose currency',
      navigatorStyle: {
        navBarTextColor: '#ffffff',
        navBarBackgroundColor: '#464553',
      },
      navigatorButtons: {
        leftButtons: [
          {
            id: 'Close',
            component: 'app.CloseButton',
            passProps: {
              Navigation: Navigation,
            },
          }
        ]
      }
    });
  }

  render() {
    const { searchTerm } = this.props.allCoinsState;

    return (
      <View>
        <StatusBar
          backgroundColor="#6a6a75"
          barStyle="light-content"
        />
        <View style={styles.statusBarBackground}></View>
        <View style={styles.row}>
          <View style={styles.textInputRow}>
            <TextInput
              autoCorrect={false}
              placeholder={"Search..."}
              style={styles.searchBar}
              placeholderTextColor={'#ffffff'}
              onChangeText={this._handleSearchTermChange}
              ref={(el) => this.textInput = el}
              value={searchTerm}
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity onPress={this._focusSearchBar}>
              <Image style={{ width: 20, height: 20 }} source={require('../../img/search-searchbar.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={this._showCurrencyModal}>
              <Image style={{ width: 22, height: 22 }} source={require('../../img/dollar-currency.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCoinsState: state.allCoins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    allCoinsActions: bindActionCreators(AllCoinsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#464553',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    height: 54,
  },
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#464553',
  },
  textInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 38,
  },
  searchBar: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 16,
    width: width - 66,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

