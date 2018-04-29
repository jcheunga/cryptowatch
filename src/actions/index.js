// ACTION TYPES

export const COIN_LIST_REQUEST = "COIN_LIST_REQUEST";
export const COIN_LIST_SUCCESS = "COIN_LIST_SUCCESS";
export const COIN_LIST_FAILURE = "COIN_LIST_FAILURE";

export const COIN_NEWS_REQUEST = "COIN_NEWS_REQUEST";
export const COIN_NEWS_SUCCESS = "COIN_NEWS_SUCCESS";
export const COIN_NEWS_FAILURE = "COIN_NEWS_FAILURE";

export const FAVOURITE_STATUS_REQUEST = "FAVOURITE_STATUS_REQUEST";
export const FAVOURITE_STATUS_SUCCESS = "FAVOURITE_STATUS_SUCCESS";
export const FAVOURITE_STATUS_FAILURE = "FAVOURITE_STATUS_FAILURE";

export const CURRENCY_CHANGE = "CURRENCY_CHANGE";

export const SEARCH_TERM_CHANGE = "SEARCH_TERM_CHANGE";
// ACTION CREATERS

export function fetchCoinList(currency, start, refresh) {
  return {
    type: COIN_LIST_REQUEST,
    payload: { currency, start, refresh }
  }
}

export function fetchCoinNews(ticker) {
  return {
    type: COIN_NEWS_REQUEST,
    payload: { ticker }
  }
}

// DEBOUNCE THIS FUNCTION CALL
export function fetchfavouriteStatus(ticker) {
  return {
    type: FAVOURITE_STATUS_REQUEST,
    payload: { ticker }
  }
}

export function changeCurrency(currency) {
  return {
    type: CURRENCY_CHANGE,
    payload: { currency }
  }
}

export function handleSearchTermChange(searchTerm) {
  return {
    type: SEARCH_TERM_CHANGE,
    payload: { searchTerm }
  }
}