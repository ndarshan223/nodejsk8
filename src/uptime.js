'use strict' 

var tc = require('timezonecomplete');
var sprintf   = require("sprintf-js").sprintf;

// constructor
function Uptime () {
  this.startTime = new tc.DateTime();
}

Uptime.prototype.getUptime = function () {
  var now = new tc.DateTime();

  var up = now.diff(this.startTime);

  var total_hours = up.wholeHours();
  var days = Math.floor(total_hours / 24);
  var hours = total_hours % 24;

  var result = days + "d " + sprintf("%02i",hours) + ":" + 
               sprintf("%02i", up.minute()) + ":" + sprintf("%02i",up.second());

  return result;
};

module.exports = Uptime; 
