'use strict';

const Q = require('q');
const _ = require('lodash');
const async = require('async');

const utils = require('./utils');
const db = require('../lib/mysql');
const orderAPI = require('../api').order;
const inventoryAPI = require('../api').inventory;
const orderItemAPI = require('../api').order_item;

var order = {
  validation: function(req, res, next) {
    let err;
    let data = utils.jsonParser(req.body);
    let mandatoryFields = ['name', 'email', 'mobile', 'items'];

    /*
      1. Validate data, can add token validation also
      2. Validate Inventory (qty)
      3. If everything Ok then create order + Item Data with status pending. And call inventory ack API to reduce qty.
      4. Seller/Fulfillment will confirm the order then mark status 1
          if reject or canceled then call release/unack qty API to release qty

    */

    function validateData() {
      let deferred = Q.defer();

      let missingMandatoryFields = [];
      if (_.isEmpty(data)) {
        err = new Error('No data');
        err.status = 400;
        deferred.reject(err);
        return deferred.promise;
      }

      mandatoryFields.forEach(function(field) {
        if (data[field] == undefined || !_.trim(data[field])) {
          missingMandatoryFields.push(field);
        }
      });

      if (missingMandatoryFields.length) {
        err = new Error('Missing mandatory fields: ' + missingMandatoryFields.join(','));
        err.status = 400;
        deferred.reject(err);
        return deferred.promise;
      }

      if (!data.items || !data.item.length) {
        // can also validate item data;
        err = new Error('Items data is missing');
        err.status = 400;
        deferred.reject(err);
        return deferred.promise;
      }

      if (!utils.validateEmail(data.email)) {
        err = new Error('Invalid email');
        err.status = 400;
        deferred.reject(err);
        return deferred.promise;
      }

      if (isNaN(data.mobile) || String(data.mobile).length < 10) {
        err = new Error('Invalid mobile');
        err.status = 400;
        deferred.reject(err);
        return deferred.promise;
      }

      deferred.resolve();
      return deferred.promise;
    }

    function checkInventory() {
      let deferred = Q.defer();

      let errFlag = false;
      let counter = data.items.length;

      //Call inventory service to validate item_id + warehouse_id + qty. Inventory will be a independent service.
      data.items.forEach(function(row) {
        inventoryAPI.select(row, function(err, result) {
          if (err) {
            console.log(err);
            errFlag = true;
          } else if (!result || !result.length) {
            errFlag = true;
          } else if (result[0].qty < row.qty) {
            errFlag = true;
          }
          done();
        });
      });

      function done() {
        if (--counter === 0) {
          if (errFlag) {
            err = new Error('Order Failed');
            err.status = 400;
            return deferred.reject(err);
          }
          deferred.resolve();
        }
      }

      return deferred.promise;
    }

    validateData()
    .then(checkInventory)
    .then(function() {
      return next();
    })
    .catch(function (err) {
      return next(err);
    });
  },

  create: function(req, res, next) {
    let err;
    let tx;
    let data = utils.jsonParser(req.body);

    function getConnectionTx() {
      var deferred = Q.defer();

      db.getConnection(function(err, conn) {
        if (err || !conn) {
          return deferred.reject(err || 'cannot get db connection.');
        }

        conn.beginTransaction(function(err) {
          if (err || !conn) {
            return deferred.reject(err || 'unable to start transaction');
          }
          tx = conn;
          deferred.resolve();
        });
      });
      return deferred.promise;
    }

    function createOrder() {
      let deferred = Q.defer();

      orderAPI.create(data, function(err, result) {
        if (err) deferred.reject(err);
        deferred.resolve();
      });

      return deferred.promise;
    }

    function createItem() {
      let deferred = Q.defer();

      async.eachLimit(data.items, 1, function(row, callback) {
        orderItemAPI.create(tx, row, function(err, result) {
        if (err) return callback(err);
        // Inventory ack/update.
        inventoryAPI.update(tx, row, function(err) {
          if (err) return callback(err);
          return callback();
        });
      });
      }, function(error) {
        if (error) return deferred.reject(error);
        deferred.resolve();
      });

      return deferred.promise;
    }

    function sendSMS() {
      let deferred = Q.defer();

      let options = {
        from: 'xxxxxxxx',
        to: data.mobile,
        message: 'Order has been placed successfully!!'
      };

      utils.sendSMS(options, function(err) {
        if (err) //return deferred.reject(err);
        deferred.resolve();
      });

      return deferred.promise;
    }

    function sendMail() {
      let deferred = Q.defer();

      let options = {
        from: 'xxxxxxxx@gmail.com',
        to: data.email,
        subject: 'Order Confirmation',
        text: 'Order has been placed successfully!!',
        html: ''
      };

      utils.sendMail(options, function(err) {
        if (err) //return deferred.reject(err);
        deferred.resolve();
      });

      return deferred.promise;
    }

    getConnectionTx()
    .then(createOrder)
    .then(createItem)
    .then(sendSMS)
    .then(sendMail)
    .then(function() {
      tx.commit(function(err) {
        if (err) {
          console.log(err);
        }
        tx.release();
        res.json({'message': 'Order has been placed successfully!!'});
      });
    })
    .catch(function (err) {
      console.log(err);
      if (tx){
        tx.rollback();
        tx.release();
      }
      return next(err);
    });
  }
};

module.exports = order;