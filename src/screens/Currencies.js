import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AllCoinsActions from '../actions';
import { Navigation } from 'react-native-navigation';

import currencies from '../services/currencies.json';

class Currencies extends React.PureComponent {
  _renderCurrencyList = () => {
    const selectedCurrency = this.props.allCoinsState.currency;
    return currencies.map((currency, index) => (
      <View key={index} style={styles.row}>
        <TouchableOpacity style={styles.touchable} onPress={() => this._changeCurrency(currency.ticker)}>
          <Text style={styles.tickerText}>{currency.ticker} ({currency.currency_symbol})</Text>
          { selectedCurrency === currency.ticker ? <Image style={{ width: 22, height: 22 }} source={require('../../img/check-currency.png')}/> : null}
        </TouchableOpacity>
      </View>
    ))
  }

  _changeCurrency = (ticker) => {
    const { changeCurrency } = this.props.allCoinsActions;
    changeCurrency(ticker);
    Navigation.dismissModal();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this._renderCurrencyList()}
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    borderBottomWidth: 0.4,
    borderColor: '#52b5ec',
    marginTop: 16,
    paddingBottom: 16,
  },
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tickerText: {
    color: '#464553',
    fontSize: 16,
  },
});