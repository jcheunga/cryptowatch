async function getCoinListFromCMC(currency, start) {
  try {
    // Pagination later
    let response = await fetch(
      `https://api.coinmarketcap.com/v1/ticker/?limit=0&convert=${currency}&start=${start}`
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error;
  }
}

const coinList = {
  getCoinListFromCMC: getCoinListFromCMC,
};

export default coinList;