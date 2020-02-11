'use strict';

const globalConfig = require('./globalConfig');
const ENVIRONMENT = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = globalConfig[ENVIRONMENT] || {};

/************TEST CODE************/
if (require.main === module) {
  console.log(globalConfig[ENVIRONMENT]);
}