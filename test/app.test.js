const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const JWT = require("jsonwebtoken")
const fs = require('fs')
const expec = require('mocha')

require('dotenv').config()

chai.use(chaiHttp);

describe('test upload csv function', function() {
    it('should give back 200 response code', function(done) {
        chai.request(server)
            .post('/upload/csv')
            .set('authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNhMzgwZTRlODY3YzA1NDIyNjUwYmQiLCJpYXQiOjE1ODA4NzcxMDZ9.vZ_HjTkfDKcsZ4ZJfhQbjcWUH-kMGnfTcVLW7p_P9bo")
            .attach('csvFile',
                fs.readFileSync('./test/example.csv'),
                'example.csv')
            .end(function(err, res){
                res.should.have.status(200)
                done()
            });
    });
});

describe('test login function', function() {
    it('should give back 200 response code', function(done) {
        chai.request(server)
            .post('/auth/login')
            .send({'email': 'ferdy@admin.com', 'password': 'ferdyspassword'})
            .end(function(err, res){
                res.body.should.be.a('string')
                res.should.have.status(200)
                done()
            });
    });
});

describe('test checkbox start time route', function() {
    it('should give back 200 response code', function(done) {
        chai.request(server)
            .post('/checked/start')
            .end(function(err, res){
                res.should.have.status(200)
                done()
            });
    });
});

describe('test checkbox end time route', function() {
    it('should give back 200 response code', function(done) {
        chai.request(server)
            .post('/checked/end')
            .end(function(err, res){
                if (err) { console.log(err)}
                res.should.have.status(200)
                done()
            });
    });
});