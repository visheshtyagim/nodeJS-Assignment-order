"use strict";

const _ = require('lodash');
const mysql = require('../lib/mysql');

var order_item = {
  name: 'order_item',

  columns: ['id', 'order_id', 'product_id', 'vertical_id', 'merchant_id', 'sku', 'name', 'status', 'qty_ordered', 'fulfillment_service', 'promo_code', 'promo_description', 'mrp', 'price', 'conv_fee', 'discount', 
    'selling_price', 'shipping_charges', 'created_at', 'updated_at', 'ship_by_date'],

  create: function(tx, data, callback) {
    if (typeof(callback) != 'function') {
      callback = data;
      data = tx;
      tx = null;
    }

    let query = 'INSERT INTO ' +  order_item.name + ' SET ?';

    if (tx) {
      tx.query(query, data, callback);
    } else {
      mysql.query(query, data, callback);
    }
  },

  byId: function(id, callback) {
    let query = 'SELECT * FROM ' + order_item.name + ' WHERE id = ' + id;

    mysql.query(query, callback);
  }
};

module.exports = order_item;