require('dotenv').config()
const chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTM5MGJhMDhhYzdlZTAwMmZiZGI0MGQiLCJpYXQiOjE1ODA4NjUwOTN9.LdhaK-sssILU87aatfI-1t92Mcnrf2fqjnsq5UE0O08"
        chai.request(server)
          .post('/upload/csv')
          .set("Authorization", `Bearer ${token}`)
          .attach('csvFile',
                fs.readFileSync('./test/example.csv'),
                'example.csv')
          .end(function(err, res){
            //   console.log(err)
              console.log(res)
              done()
          });
      });
});