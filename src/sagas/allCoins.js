import { fork, call, put, take, takeEvery, select, all } from 'redux-saga/effects';

import * as ActionTypes from '../actions';
import { api } from '../services';

const fetchCoinList = function* fetchCoinList(action) {
  const { list, error } = yield call(api.fetchCoinListService, action.payload.currency, action.payload.start);
  if (list && !error) {
    yield put({ type: ActionTypes.COIN_LIST_SUCCESS, payload: { list }});
  } else {
    yield put({ type: ActionTypes.COIN_LIST_FAILURE, payload: { error }});
  }
}

const fetchCoinNews = function* fetchCoinNews(action) {
  const { news, error } = yield call(api.fetchCoinNewsService, action.payload.ticker);
  if (news && !error) {
    yield put({ type: ActionTypes.COIN_NEWS_SUCCESS, payload: { news }});
  } else {
    yield put({ type: ActionTypes.COIN_NEWS_FAILURE, payload: { error }});
  }
}

const fetchFavouriteStatus = function* fetchFavouriteStatus(action) {
  const { favourites, error } = yield call(api.fetchFavouriteStatusService, action.payload.ticker);
  if (favourites && !error) {
    yield put({ type: ActionTypes.FAVOURITE_STATUS_SUCCESS, payload: { favourites }});
  } else {
    yield put({ type: ActionTypes.FAVOURITE_STATUS_FAILURE, payload: { error }});
  }
}

// // WATCHERS

const handleFetchCoinList = function* handleFetchCoinList() {
  yield takeEvery(ActionTypes.COIN_LIST_REQUEST, fetchCoinList);
}

const handleFetchCoinNews = function* handleFetchCoinNews() {
  yield takeEvery(ActionTypes.COIN_NEWS_REQUEST, fetchCoinNews);
}

const handleFavouriteStatus = function* handleFavouriteStatus() {
  yield takeEvery(ActionTypes.FAVOURITE_STATUS_REQUEST, fetchFavouriteStatus);
}

const rootSaga = function* root() {
  yield all([
    yield fork(handleFetchCoinList),
    yield fork(handleFetchCoinNews),
    yield fork(handleFavouriteStatus),
  ])
}

export default rootSaga;