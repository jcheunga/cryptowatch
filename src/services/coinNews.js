async function getCoinNewsFromServer() {
  try {
    let response = await fetch(
      'https://api.coinmarketcap.com/v1/ticker/'
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

const coinList = {
  getCoinNewsFromServer: getCoinNewsFromServer,
};

export default coinList;