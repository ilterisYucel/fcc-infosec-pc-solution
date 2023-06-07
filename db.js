const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const URL = process.env.DB;

const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(URL)
            .then(connection => {
                resolve(connection);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = connect;