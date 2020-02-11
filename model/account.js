"use strict";

const _ = require('lodash');
const mysql = require('../lib/mysql');

var account = {
  name: 'account',

  columns: ['id', 'name', 'email', 'mobile', 'address', 'status', 'created_at', 'updated_at'],

  create: function(data, callback) {
    let query = 'INSERT INTO ' +  account.name + ' SET ?';

    mysql.query(query, data, callback);
  },

  byId: function(id, callback) {
    let query = 'SELECT * FROM ' + account.name + ' WHERE id = ' + id;

    mysql.query(query, callback);
  }
};

module.exports = account;