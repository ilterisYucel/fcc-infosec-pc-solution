const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  describe('GET /api/stock-prices', function(done){
    it("Get one stock without like", function(done){
      chai.request(server)
      .get(`/api/stock-prices?stock=GOOG`)
      .end((err, res) => {
          assert.equal(res.status, 200)
          done();
        })
    });
  });
  describe('GET /api/stock-prices', function(done){
    it("Get one stock with like", function(done){
      chai.request(server)
      .get(`/api/stock-prices?stock=GOOG&like=true`)
      .end((err, res) => {
          assert.equal(res.status, 200)
          done();
        })
      });
  });
  describe('GET /api/stock-prices', function(done){
    it("Get one stock with again like", function(done){
      chai.request(server)
      .get(`/api/stock-prices?stock=GOOG&like=true`)
      .end((err, res) => {
          assert.equal(res.status, 200)
          done();
        })
      });
  });
  describe('GET /api/stock-prices', function(done){
    it("Get two stock without like", function(done){
      chai.request(server)
      .get(`/api/stock-prices?stock=GOOG&stock=MSFT`)
      .end((err, res) => {
          assert.equal(res.status, 200)
          done();
        })
      });
  });
  describe('GET /api/stock-prices', function(done){
    it("Get two stock with like", function(done){
      chai.request(server)
      .get(`/api/stock-prices?stock=GOOG&stock=MSFT&like=true`)
      .end((err, res) => {
          assert.equal(res.status, 200)
          done();
        })
    });
  });
});
