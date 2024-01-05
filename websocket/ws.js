const moment = require('moment');
const WebSocket = require('ws');
const pako = require('pako');
const WS_URL = 'wss://wbs.mexc.com/ws';
var DataFrame = require("../data/realtime.js");


var ws = new WebSocket(WS_URL);

const { delta, symbol } = DataFrame;

ws.onopen = () => {
    console.log('Connection open');
    ws.send('{"method":"PING"}')
    BookTicker();
    // Deals()
}

ws.onmessage = e => {
    // console.log(e.data);
    const data = JSON.parse(e.data);
    if (data.c == "spot@public.bookTicker.v3.api@XRPUSDT") {
        DataFrame.ask = Number(data.d.a) - delta;
        DataFrame.bid = Number(data.d.b) + delta;
    }
};

ws.onclose = () => {
    console.log('close');
}

/**
 * deals
 * @param ws
 */
function Deals() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@public.deals.v3.api@${symbol}USDT`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * kline
 * @param ws
 */
function Kline() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@public.kline.v3.api@${symbol}USDT@Min15`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * increasedepth
 * @param ws
 */
function IncreaseDepth() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@public.increase.depth.v3.api@${symbol}USDT`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * limitdepth
 * @param ws
 */
function LimitDepth() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@public.limit.depth.v3.api@${symbol}USDT@5`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * bookTicker
 * @param ws
 */
function BookTicker() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@public.bookTicker.v3.api@${symbol}USDT`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * account
 * WS_URL = 'wss://wbs.mexc.com/ws?listenKey=Your listenkey'
 * @param ws
 */
function Account() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@private.account.v3.api`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * accountdeals
 * WS_URL = 'wss://wbs.mexc.com/ws?listenKey=Your listenkey'
 * @param ws
 */
function AccountDeals() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@private.deals.v3.api`]
    }
    ws.send(JSON.stringify(data));
}

/**
 * orders
 * WS_URL = 'wss://wbs.mexc.com/ws?listenKey=Your listenkey'
 * @param ws
 */
function Orders() {
    var data = {
        "method": "SUBSCRIPTION",
        "params": [`spot@private.orders.v3.api`]
    }
    ws.send(JSON.stringify(data));
}










