import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import currencies from '../services/currencies.json';

export default class FavouriteCoinInfo extends React.PureComponent {

  _changeFavouriteStatus = () => {
    const { coin, fetchfavouriteStatus } = this.props;
    fetchfavouriteStatus(coin.id);
  }

  _renderFavouritesButton = () => {
    return (
      <View>
        <TouchableOpacity onPress={this._changeFavouriteStatus}>
          <Image style={{ width: 26, height: 26 }} source={require('../../img/trash-favourites.png')}/>
        </TouchableOpacity>
      </View>
    )
  }

  _checkNumberSign = (num) => {
    const number = parseFloat(num);
    if (number < 0) {
      return styles.coinNumberRed;
    } else if (number > 0) {
      return styles.coinNumberGreen;
    } else {
      return styles.coinNumber;
    }
  }

  _renderPriceChange = () => {
    const { coin } = this.props;

    const changes = [
      [
        '1h:',
        coin['percent_change_1h']
      ],
      [
        '24h:',
        coin['percent_change_24h']
      ],
      [
        '7d:',
        coin['percent_change_7d']
      ]
    ];

    return changes.map((change, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.coinLabel}>{change[0]}</Text>
        <Text style={this._checkNumberSign(change[1])}>{ parseFloat(change[1]) > 0 ? `+${change[1]}%` : parseFloat(change[1]) < 0 ? `-${change[1]}%` : change[1]}</Text>
      </View>
    ));
  }

  _toLocaleString = (number) => {
    if (number) {
      if (parseFloat(number) < 1) {
        return number;
      }

      const splitDecimal = number.split('.');
      let first = splitDecimal[0];
      first = first.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      return `${first}${splitDecimal[1] ? '.' + splitDecimal[1] : ''}`;
    }

    return number;
  }

  _toLowerCase = (string) => {
    return string.toLowerCase();
  }

  _getCurrencySymbol = (currency) => {
    return currencies.find(x => x.ticker === currency).currency_symbol;
  }

  _renderCoinInfo = () => {
    const { coin, currency } = this.props;

    const info = [
      [
        `Price: ${this._getCurrencySymbol(currency)}`,
        this._toLocaleString(coin[`price_${this._toLowerCase(currency)}`] ? coin[`price_${this._toLowerCase(currency)}`] : 'price_usd')
      ],
      [
        `Market cap: ${this._getCurrencySymbol(currency)}`,
        this._toLocaleString( coin[`market_cap_${this._toLowerCase(currency)}`] ? coin[`market_cap_${this._toLowerCase(currency)}`] : 'price_usd')
      ],
      [
        'Available supply:',
        this._toLocaleString(coin['available_supply'])
      ],
      [
        `24h Vol: ${this._getCurrencySymbol(currency)}`,
        this._toLocaleString( coin[`24h_volume_${this._toLowerCase(currency)}`] ? coin[`24h_volume_${this._toLowerCase(currency)}`] : 'price_usd')
      ],
    ];

    return info.map((line, index) => (
      <View key={index} style={[styles.row, styles.coinInfoRow]}>
        <Text style={styles.coinLabel}>{line[0]}</Text>
        <Text style={styles.coinNumber}>{line[1]}</Text>
      </View>
    ));
  }

  _getLogoURI = () => {
    const { cmcID } = this.props;
    if (cmcID) {
      return (
        <Image
          style={styles.coinImage}
          source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/32x32/${cmcID}.png`}}
        />
      );
    } else {
      return (
        <Image style={{ width: 26, height: 26 }} source={require('../../img/question-coininfo.png')}/>
      );
    }
  }

  render() {
    const { coin, fetchfavouriteStatus, rank } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.coinImageContainer}>
            <Text style={styles.coinRank}>{rank + 1}</Text>
            {this._getLogoURI()}
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.coinName}>{coin['name']} ({coin['symbol']})</Text>
            </View>
            {this._renderCoinInfo()}
            <View style={[styles.row, styles.coinChangeRow]}>
            {this._renderPriceChange()}
            </View>
          </View>
        </View>
        {this._renderFavouritesButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.4,
    borderColor: '#52b5ec',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  coinInfoRow: {
    marginBottom: 4,
  },
  coinChangeRow: {
    marginTop: 2,
  },
  coinImageContainer: {
    marginRight: 16,
  },
  coinRank: {
    color: '#464553',
    fontSize: 13,
    lineHeight: 15,
    marginRight: 8,
    marginBottom: 12,
  },
  coinImage: {
    width: 26,
    height: 26,
  },
  coinName: {
    color: '#464553',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  coinLabel: {
    color: '#464553',
    marginRight: 4,
    fontSize: 14,
    lineHeight: 14,
  },
  coinNumber: {
    color: '#464553',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
    lineHeight: 14,
  },
  coinNumberRed: {
    color: '#eb657d',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
    lineHeight: 14,
  },
  coinNumberGreen: {
    color: '#b9e986',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
    lineHeight: 14,
  }
});


