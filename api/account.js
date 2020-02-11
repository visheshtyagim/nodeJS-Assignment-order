'use strict';

const _ = require('lodash');
const accountModel = require('../model').account;

module.exports = {
  create: function(data, callback) {
    data = data || {};
    let fieldsFilter = ['name', 'email', 'mobile', 'address', 'status'];

    data = _.pick(data, fieldsFilter);

    if (_.isEmpty(data)) {
      let error = new Error('No data to insert');
      error.status = 400;
      return callback(error);
    }

    accountModel.create(data, callback);
  },

  byId: function(id, callback) {
    accountModel.byId(Number(id), callback);
  }
};