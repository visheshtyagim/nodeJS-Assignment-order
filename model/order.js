"use strict";

const _ = require('lodash');
const mysql = require('../lib/mysql');

var order = {
  name: 'order',

  columns: ['id', 'status', 'customer_id', 'subtotal', 'discount', 'shipping_charges', 'payment_status', 'promo_code', 'promo_description', 'grandtotal', 'created_at', 'updated_at'],

  create: function(tx, data, callback) {
    if (typeof(callback) != 'function') {
      callback = data;
      data = tx;
      tx = null;
    }

    let query = 'INSERT INTO ' +  order.name + ' SET ?';

    if (tx) {
      tx.query(query, data, callback);
    } else {
      mysql.query(query, data, callback);
    }
  },

  byId: function(id, callback) {
    let query = 'SELECT * FROM ' + order.name + ' WHERE id = ' + id;

    mysql.query(query, callback);
  },

  constants: {
    STATUS: {
      REJECT: 0,
      ACTIVE: 1,
      PENDING: 2,
      DONE: 3
    }
  }
};

module.exports = order;