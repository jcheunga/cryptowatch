import * as ActionTypes from '../actions';

const initialState = {
  isFetching: false,
  coinList: [],
  currency: 'USD',
  searchTerm: '',
  start: 0,
  favourites: [],
  news: {},
  selectedTicker: null,
  selectedFavouriteTicker: null,
  errorMessage: null,
  isRefreshing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COIN_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        currency: action.payload.currency,
        start: action.payload.refresh ? '0' : action.payload.start,
        isRefreshing: action.payload.refresh || false,
      };
    case ActionTypes.COIN_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        coinList: action.payload.list,
        isRefreshing: false,
      };
    case ActionTypes.COIN_LIST_FAILURE:
      return {
        ...state,
        coinList: [],
        isFetching: false,
        errorMessage: action.payload.error,
        isRefreshing: false,
      };
    case ActionTypes.COIN_NEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
        selectedTicker: action.payload.ticker
      };
    case ActionTypes.COIN_NEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        news: action.payload.news
      };
    case ActionTypes.COIN_NEWS_FAILURE:
      return {
        ...state,
        isFetching: false,
        news: {},
        errorMessage: action.payload.error
      };
    case ActionTypes.FAVOURITE_STATUS_REQUEST:
      return {
        ...state,
        selectedFavouriteTicker: action.payload.ticker
      };
    case ActionTypes.FAVOURITE_STATUS_SUCCESS:
      return {
        ...state,
        favourites: action.payload.favourites
      };
    case ActionTypes.FAVOURITE_STATUS_FAILURE:
      return {
        ...state,
      };
    case ActionTypes.CURRENCY_CHANGE:
      return {
        ...state,
        currency: action.payload.currency
      };
    case ActionTypes.SEARCH_TERM_CHANGE:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };
    default:
      return state;
  }
};