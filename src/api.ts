//fetcher function

const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTicker(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

//free plan only allows 24 hours of data
// export async function fetchCoinHistory(coinId: string, date: Date) {
//   return await (
//     await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${date.toISOString().slice(0, 10)}`)
//   ).json();
// }

export async function fetchCoinHistory(coinId: string) {
  const tempUrl = `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`;
  return await (await fetch(tempUrl)).json();
}
