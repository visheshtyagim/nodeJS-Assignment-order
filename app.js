'use strict';

const util = require('util');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const app = express();
const router = express.Router();

const config = require('./config');
const apiError = require('./error');

http.globalAgent.maxSockets = 1500;
https.globalAgent.maxSockets = 1500;

// express config for all envs
app.set('port', process.env.PORT || config.port || 9999);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(require('./lib/corsheaders'));

app.use(router);
app.use(function(req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  apiError(error, req, res);
});
app.use(apiError);

require('./routes')(router); // initializes all routes(executes routes/index.js)

http.createServer(app)
  .on('error', function(err) {
    util.log(err);
    process.exit(1);
  })
  .listen(app.get('port'), function() {
    util.log('Server listening on port ' + app.get('port') + ' in ' + (process.env.NODE_ENV || 'development'));
  });