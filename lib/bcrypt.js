'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  hash: function(password, callback) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      callback(err, hash);
    });
  },

  compare: function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, res) {
      callback(err, res);
    });
  }
};