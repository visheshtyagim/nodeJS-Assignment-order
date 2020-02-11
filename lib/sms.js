"use strict";

const util = require('util');
const Nexmo = require('nexmo');

const sms_config =  require('../config').sms;

const nexmo = new Nexmo(sms_config, {'debug': true});

var sms = {
  sendSMS: function (smsOpts, callback) {
    var errs = [];
    var count = smsOpts.to.length;

    nexmo.message.sendSms(smsOpts.from, smsOpts.to, smsOpts.message, smsOpts, callback);
  }
};

module.exports = sms;
