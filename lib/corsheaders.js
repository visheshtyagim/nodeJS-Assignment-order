"use strict";

var allowedHosts = require('../config').allowedHosts;

module.exports = function (req,res,next) {
  if(allowedHosts.indexOf(req.headers.origin) > -1){
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type,request_type');
  }
  next();
};
