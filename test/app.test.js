const chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
const fs = require('fs')

chai.use(chaiHttp);


describe('test upload csv function', function() {
    it('should give back 200 response code', function(done) {
        chai.request(server)
          .post('/upload/csv')
          .set('')
          .attach('csvFile',
                fs.readFileSync('./example.csv'),
                'example.csv')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
});