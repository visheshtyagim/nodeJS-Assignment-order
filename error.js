"use strict";

module.exports= function(err, req, res, next) {
  let response = {};
  let errorStatus = err.status || 500;

  response.error = err.message;
  response.status = {result: 'failure'};
  response.status.message = {title : err.title || 'Error'};
  response.status.message.message = err.message;
  response.code = errorStatus;
  response.errorCode = err.errorCode;

  console.log(err.stack);
  res.status(errorStatus).json(response);
};