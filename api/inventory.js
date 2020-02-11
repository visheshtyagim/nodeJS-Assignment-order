'use strict';

const _ = require('lodash');
const inventoryModel = require('../model').inventory;

module.exports = {
  create: function(tx, data, callback) {
    data = data || {};
    let fieldsFilter = ['product_id', 'qty', 'warehouse_id', 'status', 'valid_from', 'valid_upto', 'manage_stock', 'max_dispatch_time'];

    data = _.pick(data, fieldsFilter);

    if (_.isEmpty(data)) {
      let error = new Error('No data to insert');
      error.status = 400;
      return callback(error);
    }

    inventoryModel.create(tx, data, callback);
  },

  update: function(tx, data, callback) {
    data = data || {};
    let keys = {};
    let updateData = {};
    let keyFields = ['product_id', 'warehouse_id'];
    let fieldsFilter = ['qty', 'status', 'valid_from', 'valid_upto', 'manage_stock', 'max_dispatch_time'];

    keys = _.pick(data, keys);

    updateData = _.pick(data, fieldsFilter);

    if (_.isEmpty(keys)) {
      let error = new Error('Mandatory fields is missing to update inventory');
      error.status = 400;
      return callback(error);
    }

    if (_.isEmpty(updateData)) {
      let error = new Error('No data to update');
      error.status = 400;
      return callback(error);
    }

    inventoryModel.update(tx, updateData, keys, callback);
  },

  byId: function(id, callback) {
    inventoryModel.byId(Number(id), callback);
  },

  byProductId: function(id, callback) {
    inventoryModel.byProductId(Number(id), callback);
  }
};