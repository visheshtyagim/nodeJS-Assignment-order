'use strict';

const _ = require('lodash');
const orderModel = require('../model').order;

module.exports = {
  create: function(tx, data, callback) {
    data = data || {};
    let fieldsFilter = ['status', 'customer_id', 'subtotal', 'discount', 'shipping_charges', 'payment_status', 'promo_code', 'promo_description', 'grandtotal'];

    data = _.pick(data, fieldsFilter);

    if (_.isEmpty(data)) {
      let error = new Error('No data to insert');
      error.status = 400;
      return callback(error);
    }

    orderModel.create(tx, data, callback);
  },

  byId: function(id, callback) {
    orderModel.byId(Number(id), callback);
  }
};