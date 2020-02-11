"use strict";

const mysqlPkg = require('mysql');
const dbConfig = require('../config').mysql;

var mysql = {
  query: function(query, values, callback) {
    if (!callback) {
      callback = values;
      values = [];
    }
    let connection = mysqlPkg.createConnection(dbConfig);

    connection.connect();

    connection.query(query, values, function(err, result) {
      connection.end();
      callback(err, result);
    });
  },

  getConnection: function() {
    let connection = mysqlPkg.createConnection(dbConfig);

    connection.connect();

    return connection;
  }
};

module.exports = mysql;