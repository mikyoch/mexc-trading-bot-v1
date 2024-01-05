const Spot = require('./src/spot')
require("./websocket/ws.js");
const DataFrame = require("./data/realtime.js");

const apiKey = 'mx0vglIcwwQseqL9F6'
const apiSecret = '5679d4b9207341ea89c6d73144dccffd'

const client = new Spot(apiKey, apiSecret, { baseURL: 'https://api.mexc.com' });

let usdt_vault = 300;
let coin_vault = 0;

const run = async () => {
  const { last, ask, bid, delta, isStable, ready } = DataFrame;
  if (isStable && ready && bid < last || last + delta * 5 < bid) {
    console.log("--- buy ---");
    buy(bid);
  }
  if (!isStable && ready && ask > last || last - delta * 10 > ask) {
    console.log("--- sell ---");
    sell(ask);
  }
  console.log(usdt_vault, coin_vault);
  setTimeout(() => {
    run();
  }, 1000);
}

const buy = (price) => {
  DataFrame.isStable = false;
  DataFrame.last = price;
  coin_vault = usdt_vault / price;
  usdt_vault = 0;
};

const sell = (price) => {
  DataFrame.isStable = true;
  DataFrame.last = price;
  usdt_vault = coin_vault * price;
  coin_vault = 0;
};

const getUserBalance = async () => {
  const timestamp = (await client.servertime()).data.data;
  // const data = (await client.)
}

const init = async () => {
  // updateUserBalance();
  run();
};

init();
