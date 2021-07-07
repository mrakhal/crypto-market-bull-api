const { db, dbQuery, createToken } = require("../config");
const CoinMarketCap = require("coinmarketcap-api");
const apiKey = "ac10630a-cce3-48c2-b3d4-083a8323f95e";
const client = new CoinMarketCap(apiKey);

module.exports = {
  getPushToMysql: async (req, res, next) => {
    try {
      client
        .getIdMap({ limit: 150, sort: "cmc_rank" })
        .then((response) => {
          let coinMarket = [];
          response.data.map((item) => {
            coinMarket.push({
              id: item.id,
              name: item.name,
              symbol: item.symbol,
              slug: item.slug,
              rank: item.rank,
              is_active: item.is_active,
              first_historical_data: item.first_historical_data,
              last_historical_data: item.last_historical_data,
            });
          });
          coinMarket.forEach((item) => {
            return dbQuery(
              `Insert into coin_map
                  values (NULL,${db.escape(item.id)},${db.escape(
                item.name
              )},${db.escape(item.symbol)},${db.escape(item.slug)},${db.escape(
                item.rank
              )},${db.escape(item.is_active)},${db.escape(
                item.first_historical_data
              )},${db.escape(item.last_historical_data)});`
            );
          });
          res.send(coinMarket);
        })
        .catch(console.error);
    } catch (error) {
      next(error);
    }
  },
  getMapCoin: async (req, res, next) => {
    try {
      let getCryptoMap = `select * from coin_map`;
      let get = await dbQuery(getCryptoMap);

      res.status(200).send(get);
    } catch (error) {
      next(error);
    }
  },
  getTickers: async (req, res, next) => {
    try {
      client
        .getTickers()
        .then((response) => {
          let coinMarket = [];
          response.data.map((item) => {
            coinMarket.push({
              id: item.id,
              name: item.name,
              symbol: item.symbol,
              slug: item.slug,
              num_market_pairs: item.num_market_pairs,
              max_supply: item.max_supply,
              circulating_supply: item.circulating_supply,
              total_supply: item.total_supply,
              price: item.quote.USD.price,
              volume_24h: item.quote.USD.volume_24h,
              market_cap: item.quote.USD.market_cap,
            });
          });
          coinMarket.forEach((item) => {
            return dbQuery(
              `Insert into coin_tickers values (${db.escape(
                item.id
              )},${db.escape(item.name)},${db.escape(item.symbol)},${db.escape(
                item.slug
              )},${db.escape(item.num_market_pairs)},${db.escape(
                item.max_supply
              )},${db.escape(item.circulating_supply)},${db.escape(
                item.total_supply
              )},${db.escape(item.price)},${db.escape(
                item.volume_24h
              )},${db.escape(item.market_cap)});`
            );
          });

          get = dbQuery(`select * from coin_tickers`);
          res.send(coinMarket);
        })
        .catch(console.error);
    } catch (error) {
      next(error);
    }
  },
  getAllCrypto: async (req, res, next) => {
    try {
      let sql = `select * from coin_map cm join coin_tickers ct on cm.idcoin = ct.idcoin_tickers `;

      let get = await dbQuery(sql);
      res.send(get);
    } catch (error) {
      next(error);
    }
  },
};

// try {
//       client
//         .getTickers()
//         .then((response) => {
//           res.send(response);
//         })
//         .catch(console.error);
//     } catch (error) {
//       next(error);
//     }
