'use strict';

module.exports = {
  development: {
    allowedHosts: [],
    mysql: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'vishesh'
    },
    email: {
      sender: 'vishesh.tyagi12989@gmail.com',
      subjectPrefix: '',
      appsupport: 'vishesh.tyagi12989@gmail.com',
      transportMethod: 'SMTP',
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: ''
        }
      }
    },
    sms: {
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
      applicationId: 'APP_ID'
    }
  },
  staging: {
    allowedHosts: [],
    mysql: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'vishesh'
    },
    email: {
      sender: 'vishesh.tyagi12989@gmail.com',
      subjectPrefix: '',
      appsupport: 'vishesh.tyagi12989@gmail.com',
      transportMethod: 'SMTP',
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: ''
        }
      }
    },
    sms: {
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
      applicationId: 'APP_ID'
    }
  },
  production: {
    allowedHosts: [],
    mysql: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'vishesh'
    },
    email: {
      sender: 'vishesh.tyagi12989@gmail.com',
      subjectPrefix: '',
      appsupport: 'vishesh.tyagi12989@gmail.com',
      transportMethod: 'SMTP',
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: ''
        }
      }
    },
    sms: {
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
      applicationId: 'APP_ID'
    }
  }
};
