const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('POST /api/threads/general', function(done) {
    chai.request(server)
      .post(`/api/threads/general`)
      .type('form')
      .send({ text: 'delete_me' })
      .send({ delete_password: '16' })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test('GET /api/threads/general', function(done) {
    chai.request(server)
      .get(`/api/threads/general`)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test('DELETE /api/threads/general', function(done) {
    chai.request(server)
      .delete(`/api/threads/general`)
      .type('form')
      .send({ thread_id: '64871dd675ec89cf07c831f6' })
      .send({ delete_password: 10 })
      .end((err, res) => {
        assert.equal(res.status, 400)
        done();
      })
  });
  test('DELETE /api/threads/general', function(done) {
    chai.request(server)
      .delete(`/api/threads/general`)
      .type('form')
      .send({ thread_id: '64871dd675ec89cf07c831f6' })
      .send({ delete_password: "delete_me" })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test('PUT /api/threads/general', function(done) {
    chai.request(server)
      .put(`/api/threads/general`)
      .type('form')
      .send({ thread_id: '64871b6b94c498a16328f669' })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test('POST /api/replies/general', function(done) {
    chai.request(server)
      .post(`/api/replies/general`)
      .type('form')
      .send({ thread_id: '64871b6b94c498a16328f669' })
      .send({ text: 'delete_me' })
      .send({ delete_password: '12' })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test(`GET /api/replies/general?thread_id=64871b6b94c498a16328f669`, function(done) {
    chai.request(server)
      .get(`/api/replies/general`)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test('DELETE /api/replies/general', function(done) {
    chai.request(server)
      .delete(`/api/replies/general`)
      .type('form')
      .send({ thread_id: '64871b6b94c498a16328f669' })
      .send({ reply_id: '829061ef-3042-4901-9c4e-36e994eb6d47' })
      .send({ delete_password: '11' })
      .end((err, res) => {
        assert.equal(res.status, 400)
        done();
      })
  });
  test('DELETE /api/replies/general', function(done) {
    chai.request(server)
      .delete(`/api/replies/general`)
      .type('form')
      .send({ thread_id: '64871b6b94c498a16328f669' })
      .send({ reply_id: '829061ef-3042-4901-9c4e-36e994eb6d47' })
      .send({ delete_password: '12' })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  test('PUT /api/replies/general', function(done) {
    chai.request(server)
      .put(`/api/threads/general`)
      .type('form')
      .send({ thread_id: '64871b6b94c498a16328f669' })
      .send({ reply_id: '26835b9a-abd4-4671-9369-e45e3148dfe0' })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  after(function() {
    chai.request(server)
      .get('/api')
  });

});
