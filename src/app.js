import { Navigation } from "react-native-navigation";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';

import { registerScreens } from "./screens";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

let middleware = [
  sagaMiddleware
];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger]
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

registerScreens(store, Provider);

const tabs = [{
  label: 'All Coins',
  screen: 'app.AllCoins',
  icon: require('../img/coin-tab.png'),
  title: 'All Coins',
}, {
  label: 'Favourites',
  screen: 'app.Favourites',
  icon: require('../img/star-tab.png'),
  title: 'Favourites',
}];

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  tabsStyle: {
    tabBarBackgroundColor: '#464553',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#eb657d',
  },
  appStyle: {
    tabBarBackgroundColor: '#464553',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#eb657d',
    statusBarTextColorScheme: 'light',
  },
});
