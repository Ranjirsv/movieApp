var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');


var model = require('../models/schemafav.js');
var model1 = require('../models/schema.js');

var app = require('../index.js');

var moviecontroller = require('../controller/moviecontroller');
var authencontroller = require('../controller/authentication');

var address = request("http://localhost:3000")
var modelStub = sinon.stub(model, 'find');
var modelStub1 = sinon.stub(model1, 'find');

describe('Test my moviecontroller', function(err) {

    describe('Find movies in fav', function(err) {
        beforeEach(function() {
            modelStub.yields(null, [{
                'title': '123'
            }]);
        });

        it('should attempt to find movie in the favourite list', function(done) {
            address
                .get('/movie/view')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

                    if (err) return done(err);
                    //console.log(res.body[0].title);
                    expect(res.body[0].title).to.be.equal("Bellator 123");
                    done();
                });
        });
    });

});
describe('Test my authenticationcontroller', function(err) {

    describe('Find signup details', function(err) {
        beforeEach(function() {
            modelStub1.yields(null, [{
                'username': 'sasi'
            }]);
        });

        it('should match the signup details', function(done) {
            address
                .post('/signup')
                .expect(302)
                
                .end(function(err, res) {

                    if (err) return done(err);
                      
                    done();
                });
        });
    });

});