'use strict';

const _ = require('lodash');
const orderItemModel = require('../model').order_item;

module.exports = {
  create: function(tx, data, callback) {
    data = data || {};
    let fieldsFilter = ['order_id', 'product_id', 'vertical_id', 'merchant_id', 'sku', 'name', 'status', 'qty_ordered', 'fulfillment_service', 'promo_code', 'promo_description', 'mrp', 'price', 'conv_fee', 'discount', 'selling_price', 'shipping_charges', 'ship_by_date'];

    data = _.pick(data, fieldsFilter);

    if (_.isEmpty(data)) {
      let error = new Error('No data to insert');
      error.status = 400;
      return callback(error);
    }

    orderItemModel.create(tx, data, callback);
  },

  byId: function(id, callback) {
    orderItemModel.byId(Number(id), callback);
  }
};