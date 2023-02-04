/*jslint node: true */

// The following environment variables are expected to be defined
// bamboo_version
// bamboo_buildNumber

'use strict';

var SRC = "../../src";

var should 		   = require("should");
var expect 	   	 = require("chai").expect;
var http_request = require ("http-request");
var log          = require(SRC+'/logger');

var url = process.env.TEST_URL || 'http://localhost:8080';
var major_minor_version = process.env.bamboo_version || '1.0';
var patch_version = process.env.bamboo_buildNumber || '0';
var expected_version = major_minor_version + '.' + patch_version;

log.info ("Running smoke tests on ", url);
log.info ("Expecting to find version ", expected_version);


describe("Health Check", function(){

  it("status UP", function(done){


    http_request.getJson (url+"/health", "", "", function(result){
        var expected = "UP";
    	expect(result).to.have.property('status', expected);     
    	done();
    });
  });

});

describe("Info", function(){

  it("found expected version", function(done){

    http_request.getJson (url+"/", "", "", function(result){
      expect(result).to.have.property('version', expected_version);     
      done();
    });
  });

});
