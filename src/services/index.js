import localStorage from './storage';
import coinList from './coinList';

export const api = {
  fetchCoinListService(currency, start) {
    return coinList.getCoinListFromCMC(currency, start)
      .then(list => ({ list }))
      .catch(error => ({ error }));
  },

  // fetchCoinNewsService() {
  //   return firebase.auth().signInAnonymously()
  //     .then(user => ({ user }))
  //     .catch(error => ({ error }));
  // },

  fetchFavouriteStatusService(ticker) {
    // return localStorage.deleteItem()
    return localStorage.getItem()
      .then(
        favourites => {
          if (ticker) {
            const index = favourites.indexOf(ticker);
            if (index !== -1) {
              favourites.splice(index, 1);
            } else {
              favourites.push(ticker);
            }
          }
          localStorage.setItem(favourites);
          return favourites;
        }
      )
      .then(favourites => ({ favourites }))
      .catch(error => ({ error }));
  }
}