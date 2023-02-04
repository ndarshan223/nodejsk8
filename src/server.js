// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express         = require('express');        // call express
var app             = express();                 // define our app using express
var bodyParser      = require('body-parser');
var log             = require('./logger');
var Uptime          = require('./uptime');

var uptime = new Uptime();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// This is a place where we could write code to be handled for all requests
	// such as checking for errors or checking for authentication
	// do logging
	next();  // make sure we go to the next routes and don't stop here

});

router.get('/health', function(req, res) {
    res.json({ status: 'UP' });
});

router.get('/hello', function(req, res) {
	  res.json({message: 'Hello World!'});
});

router.get('/', function(req, res) {
	var pjson = require ('../package.json');
	var deployEnv = process.env.DEPLOYMENT_ENV || "unknown";

  log.info(pjson.name + " v" + pjson.version + " running in " + deployEnv);
	res.json({ name: pjson.name, version: pjson.version, uptime: uptime.getUptime() });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================

var server = app.listen(port, function(){
	log.info("Server running on port: " + port);
});

module.exports = server;
