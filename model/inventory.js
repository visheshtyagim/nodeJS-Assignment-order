"use strict";

const _ = require('lodash');
const mysql = require('../lib/mysql');

var inventory = {
  name: 'inventory',

  columns: ['id', 'product_id', 'qty', 'warehouse_id', 'status', 'valid_from', 'valid_upto', 'manage_stock', 'max_dispatch_time', 'created_at', 'updated_at'],

  create: function(tx, data, callback) {
    if (typeof(callback) != 'function') {
      callback = data;
      data = tx;
      tx = null;
    }

    let query = 'INSERT INTO ' +  inventory.name + ' SET ?';

    if (tx) {
      tx.query(query, data, callback);
    } else {
      mysql.query(query, data, callback);
    }
  },

  update: function(tx, data, keys, callback) {
    if (typeof(callback) != 'function') {
      callback = keys;
      keys = data;
      data = tx;
      tx = null;
    }

    let query = 'UPDATE ' +  inventory.name + ' SET ? WHERE ?';

    if (tx) {
      tx.query(query, data, keys, callback);
    } else {
      mysql.query(query, data, keys, callback);
    }
  },

  byId: function(id, callback) {
    let query = 'SELECT * FROM ' + inventory.name + ' WHERE id = ' + id;

    mysql.query(query, callback);
  },

  byProductId: function(product_id, callback) {
    let query = 'SELECT * FROM ' + inventory.name + ' WHERE product_id = ' + product_id;

    mysql.query(query, callback);
  },

  select: function(options, callback) {
    let query = 'SELECT * FROM ' + inventory.name + ' WHERE ?';

    mysql.query(query, options, callback);
  }
};

module.exports = inventory;