'use strict';

const sms = require('../lib/sms');
const email = require('../lib/email');

var utils = {
  sendMail: function(options, callback) {
    email.sendMail(options, callback);
  },

  sendSMS: function(options, callback) {
    sms.sendSMS(options, callback);
  },

  validateEmail: function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  jsonParser: function(stringifyJSON, defaultValue) {
    let jsonObj;
    defaultValue = defaultValue || {};

    if (typeof stringifyJSON === 'string') {
      try {
        jsonObj = JSON.parse(stringifyJSON) || defaultValue;
      } catch (e) {
        jsonObj = defaultValue;
      }
    } else {
      jsonObj = stringifyJSON || defaultValue;
    }
    return jsonObj;
  },
};

module.exports = utils;