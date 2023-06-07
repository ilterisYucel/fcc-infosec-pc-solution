'use strict';
const services = require('../services/services');
const parseBoolean = require('../utils').parseBoolean

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async(req, res) => {
      try{
        const { like } = req.query;
        if(!parseBoolean(like)){
          await services.getPricesWithoutLike(req, res);
        }else{
          await services.getPricesWithLike(req, res);
        }
      }catch{
        res.status(500).send("Internal Server Error")
      }
    });
    
};
