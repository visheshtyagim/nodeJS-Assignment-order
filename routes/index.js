'use strict';

const error = require('./error');
const order = require('./order');

module.exports = function(app) {
  app.post('/create-order', order.validation, order.create, error);
};