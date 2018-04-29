import React from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AllCoinsActions from '../actions';

import SearchableFlatList from '../components/SearchableFlatList';
import CoinInfo from '../components/CoinInfo';
import HeaderBar from '../components/HeaderBar';

import cmcJSON from '../services/cmcJSON.json';

class AllCoins extends React.Component {
  constructor(props) {
    super(props);

    // MOVE TO APP ENTRY POINT
    props.allCoinsActions.fetchCoinList(props.allCoinsState.currency, props.allCoinsState.start);
    props.allCoinsActions.fetchfavouriteStatus();
  }

  componentWillReceiveProps (nextProps) {
    const { currency, start } = this.props.allCoinsState;

    if (nextProps.allCoinsState.currency !== currency) {
      this.props.allCoinsActions.fetchCoinList(nextProps.allCoinsState.currency, start);
    }
  }

  static navigatorStyle = {
    navBarHidden: true,
  };

  _checkFavouriteStatus = (item) => {
    const { favourites } = this.props.allCoinsState;

    return favourites.includes(item.id);
  }

  _findCMDid = (item) => {
    return cmcJSON.find(x => x.slug === item.id).id;
  }

  _renderCoinRow = (item, index) => {
    const { currency } = this.props.allCoinsState;
    return (
      <CoinInfo favourite={this._checkFavouriteStatus(item)} rank={index} coin={item} fetchfavouriteStatus={this.props.allCoinsActions.fetchfavouriteStatus} cmcID={this._findCMDid(item)} currency={currency}/>
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
          isFetching && !isRefreshing ?
          <View style={{ marginTop: 16 }}>
            <ActivityIndicator size="large" color="#464553" />
          </View>
          :
          <SearchableFlatList
            data={coinList}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => this._renderCoinRow(item, index)}
            searchProperty={"name"}
            searchTerm={searchTerm}
            onRefresh={this._onRefresh}
            refreshing={isRefreshing}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCoins);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});