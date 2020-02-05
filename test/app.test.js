require('dotenv').config()
const chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
const JWT = require("jsonwebtoken")
const fs = require('fs')
chai.use(chaiHttp);
const expec = require('mocha')


// const token = JWT.sign(
//     {
//         // sub: ObjectId,

//     }, 
//     process.env.JWT_SECRET, 
// )
// console.log(token)



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
                console.log(res)
                res.body.should.be.a('string')
                res.should.have.status(200)
                done()
            });
        });
});