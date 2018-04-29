import { fork, all } from 'redux-saga/effects';
import allCoins from './allCoins';

const rootSaga = function* root() {
  yield fork(allCoins);
}

export default rootSaga;