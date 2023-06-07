'use strict';
const parseIp = require('../utils').parseIp
const isString = require('../utils').isString;
const isArray = require('../utils').isArray;


const getPricesWithoutLike = async (req, res) => {
  try{
    
    const { stock } = req.query;
    const db = global.dbConnection.db("stock_price_checker");
    const collection = db.collection("stock_price");
    if(isString(stock)){
      const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
      const { latestPrice } = await response.json();
      const likeCount = await collection.countDocuments({stock: stock});
      res.status(200).json({stockData: {stock:stock, price:latestPrice, likes: likeCount}})
    }else if(isArray(stock)){
      const promise = fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[0]}/quote`);
      const promise1 = fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[1]}/quote`);
      const [response, response1] = await Promise.all([promise, promise1]);
      const [data, data1] = await Promise.all([response.json(), response1.json()])
      const price = data.latestPrice;
      const symbol = data.symbol;
      const price1 = data1.latestPrice;
      const symbol1 = data1.symbol;
      const count = await collection.countDocuments({stock: symbol});
      const count1 = await collection.countDocuments({stock: symbol1});
      res.status(200).json({
        stockData: [
          {
            stock: symbol,
            price: price,
            rel_likes: count - count1
          },
          {
            stock: symbol1,
            price: price1,
            rel_likes: count1 - count
          },
        ]
      })
    }
  }catch(error){
    throw Error
  }
}

const getPricesWithLike = async (req, res) => {
  try{
    
    const { stock } = req.query;
    const db = global.dbConnection.db("stock_price_checker");
    const collection = db.collection("stock_price");
    const requestIp = parseIp(req);
    if(isString(stock)){
      const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
      const { latestPrice } = await response.json();
      const checkCount = await collection.countDocuments({stock: stock, like_ip: requestIp});
      if(!checkCount) await collection.insertOne({stock: stock, like_ip: requestIp});
      const likeCount = await collection.countDocuments({stock: stock});
      res.status(200).json({stockData: {stock:stock, price:latestPrice, likes: likeCount}})
    }else if(isArray(stock)){
      const promise = fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[0]}/quote`);
      const promise1 = fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[1]}/quote`);
      const [response, response1] = await Promise.all([promise, promise1]);
      const [data, data1] = await Promise.all([response.json(), response1.json()])
      const price = data.latestPrice;
      const symbol = data.symbol;
      const price1 = data1.latestPrice;
      const symbol1 = data1.symbol;
      const checkCount = await collection.countDocuments({stock: symbol, like_ip: requestIp});
      const checkCount1 = await collection.countDocuments({stock: symbol1, like_ip: requestIp});
      
      if(!checkCount) await collection.insertOne({stock: symbol, like_ip: requestIp});
      if(!checkCount1) await collection.insertOne({stock: symbol1, like_ip: requestIp});

      const count = await collection.countDocuments({stock: symbol});
      const count1 = await collection.countDocuments({stock: symbol1});
      
      res.status(200).json({
        stockData: [
          {
            stock: symbol,
            price: price,
            rel_likes: count - count1
          },
          {
            stock: symbol1,
            price: price1,
            rel_likes: count1 - count
          },
        ]
      })
    }
  }catch(error){
    console.log(error)
    throw Error
  }
}

module.exports = {
  getPricesWithoutLike,
  getPricesWithLike,
}