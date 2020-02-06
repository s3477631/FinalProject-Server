const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const JWT = require("jsonwebtoken")
const fs = require('fs')
const expec = require('mocha')

require('dotenv').config()

chai.use(chaiHttp);

//This function tests if the csv upload is functioning as expected
describe('test upload csv function', function() {
    it('should give back 200 response code', function(done) {
        // make request to the application
        chai.request(server)
            .post('/upload/csv')
            //setting the authorization bearer token
            .set('authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNhMzgwZTRlODY3YzA1NDIyNjUwYmQiLCJpYXQiOjE1ODA4NzcxMDZ9.vZ_HjTkfDKcsZ4ZJfhQbjcWUH-kMGnfTcVLW7p_P9bo")
            .attach('csvFile',
                fs.readFileSync('./test/example.csv'),
                'example.csv')
            .end(function(err, res){
                //if test returns 200 status code then function is working
                res.should.have.status(200)
                done()
            });
    });
});

//function that tests if login is working as expected
describe('test login function', function() {
    it('should give back 200 response code', function(done) {
        chai.request(server)
            .post('/auth/login')
            //send login details in request body
            .send({'email': 'ferdy@admin.com', 'password': 'ferdyspassword'})
            .end(function(err, res){
                //if function returns a string and 200 status code then its working as expected
                res.body.should.be.a('string')
                res.should.have.status(200)
                done()
            });
    });
});

//function to test registration functionality
describe('test register function', function() {
    it('should give back 200 response code', function(done) {
        //randomly generating username and password, chance of making duplicates is close to zero
        let email = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        let password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        chai.request(server)
            .post('/auth/register')
            .send({'email': `${email}@mail.com`, 'password': `${password}`})
            .end(function(err, res){
                console.log(res)
                res.should.have.status(200)
                done()
            });
    });
});


// describe('test checkbox start time route', function() {
//     it('should give back 200 response code', function(done) {
//         chai.request(server)
//             .post('/checked/start')
//             .end(function(err, res){
//                 res.should.have.status(200)
//                 done()
//             });
//     });
// });

// describe('test checkbox end time route', function() {
//     it('should give back 200 response code', function(done) {
//         chai.request(server)
//             .post('/checked/end')
//             .end(function(err, res){
//                 if (err) { console.log(err)}
//                 res.should.have.status(200)
//                 done()
//             });
//     });
// });