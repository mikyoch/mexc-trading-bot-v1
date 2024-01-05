const data = require("../data/realtime.js");

const run = () => {
  console.log(data.ask, data.bid);
  setTimeout(() => {
    run();
  }, 1000);
}