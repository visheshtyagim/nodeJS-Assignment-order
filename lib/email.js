'use strict';

const nodemailer = require('nodemailer');

const email_config =  require('../config').email;
const mailer = nodemailer.createTransport(email_config.transport);

var email = {
  sendMail: function (mailOptions, callback) {
    mailer.sendMail(mailOptions, callback);
  }
};

module.exports = email;

(function() {
  if (require.main === module) {
    var text = 'Test Mail';

    var mail ={
      subject: 'Test Mail',
      body: text,
      from: 'vishesh.tyagi12989@gmail.com',
      to: 'vishesh.tyagi12989@gmail.com',
      htmls: text
    };
    email.sendMail(mail, console.log);
  }
}());
