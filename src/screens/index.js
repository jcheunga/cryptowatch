import {Navigation} from 'react-native-navigation';

import AllCoins from './AllCoins';
import CoinNews from './CoinNews';
import Favourites from './Favourites';
import Currencies from './Currencies';
import CloseButton from './CloseButton';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.AllCoins', () => AllCoins, store, Provider);
  Navigation.registerComponent('app.CoinNews', () => CoinNews, store, Provider);
  Navigation.registerComponent('app.Favourites', () => Favourites, store, Provider);
  Navigation.registerComponent('app.Currencies', () => Currencies, store, Provider);
  Navigation.registerComponent('app.CloseButton', () => CloseButton, store, Provider);
}

