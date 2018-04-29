import React from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AllCoinsActions from '../actions';

import SearchableFlatList from '../components/SearchableFlatList';
import FavouriteCoinInfo from '../components/FavouriteCoinInfo';
import HeaderBar from '../components/HeaderBar';

import cmcJSON from '../services/cmcJSON.json';

class Favourites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinList: props.allCoinsState.coinList,
      favourites: props.allCoinsState.favourites,
    };
  }

  static navigatorStyle = {
    navBarHidden: true,
  };

  componentWillReceiveProps(nextProps) {
    const { currency, start } = this.props.allCoinsState;

    if (nextProps.allCoinsState.currency !== currency) {
      this.props.allCoinsActions.fetchCoinList(nextProps.allCoinsState.currency, start);
    }

    if (nextProps.allCoinsState.coinList !== this.state.coinList) {
      // const favourites = nextProps.allCoinsState.coinList.filter(coin =>
      //   nextProps.allCoinsState.favourites.includes(coin.id)
      // );

      this.setState({
        coinList: nextProps.allCoinsState.coinList,
        // favourites: favourites
      });
    }

    if (nextProps.allCoinsState.favourites !== this.state.favourites) {
      // const favourites = nextProps.allCoinsState.coinList.filter(coin =>
      //   nextProps.allCoinsState.favourites.includes(coin.id)
      // );

      let coinList = this.state.coinList.length > 0 ? this.state.coinList : nextProps.allCoinsState.coinList;

      const favourites = coinList.filter(coin =>
        nextProps.allCoinsState.favourites.includes(coin.id)
      );

      this.setState({
        favourites: favourites
      });
    }

    // NEED TO DO FAVOURITES CHECK ASWELL
  }

  _findCMDid = (item) => {
    return cmcJSON.find(x => x.slug === item.id).id;
  }

  _renderCoinRow = (item, index) => {
    const { currency } = this.props.allCoinsState;
    return (
      <FavouriteCoinInfo rank={index} coin={item} fetchfavouriteStatus={this.props.allCoinsActions.fetchfavouriteStatus} cmcID={this._findCMDid(item)} currency={currency}/>
    );
  }

  _onRefresh = () => {
    const { currency, start } = this.props.allCoinsState;
    const { fetchCoinList } = this.props.allCoinsActions;
    fetchCoinList(currency, start, true);
  }

  render() {
    const { isFetching, searchTerm, coinList, isRefreshing } = this.props.allCoinsState;

    return (
      <View style={styles.container}>
        <HeaderBar />
        {
          this.state.favourites.length === 0
          ?
          <View style={styles.noFavourites}>
            <Text style={styles.noFavouritesText}>No favourites yet</Text>
          </View>
          :
          isFetching && !isRefreshing ?
          <View style={{ marginTop: 16 }}>
            <ActivityIndicator size="large" color="#464553" />
          </View>
          :
          <SearchableFlatList
            searchProperty={"name"}
            searchTerm={searchTerm}
            onRefresh={this._onRefresh}
            refreshing={isRefreshing}
            data={this.state.favourites}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => this._renderCoinRow(item, index)}
          />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noFavourites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavouritesText: {
    fontSize: 18,
  },
});