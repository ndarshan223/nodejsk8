/*jslint node: true */

'use strict';

var ROOT = "../..";

var supertest = require("supertest");
var should = require("should");
var sinon = require("sinon");
var expect = require("chai").expect;
var httpMocks = require('node-mocks-http');



var server = supertest.agent("http://localhost:8888");

//begin unit test

describe("Server", function(){

  var server;

  beforeEach(function () {
    server = require(ROOT+'/src/server', { bustCache: true });

  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to /', function(done) {
    supertest(server).get('/').expect('Content-Type', "application/json").expect(200, done);
  });

});
