/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const http          = require('http');
const axios         = require('axios');

const logging       = require('../logging/logging');

const startHttpServer = (port) => {
  return new Promise((resolve, reject) => {
    let server = http.createServer(app).listen(port, function () {
      console.error("###################### Express App Connected ##################", app.get('port'), app.get('env'));
      resolve(server);
    });
  });
};

const sendHttpRequest = async (apiReference, opts) => {
  let response = {success: false};
  let options  = { ...  opts.options };
  let serviceResponse = {};
  logging.log(apiReference, {HTTP_REQUEST: options, CALLING_URL: '<###############################>' + options.url});
  try {
    serviceResponse = await axios(options);
    logging.log(apiReference, {HTTP_RESPONSE: serviceResponse});
  } catch (e) {
    logging.logError(apiReference, e);
    serviceResponse = e.response;
    // return response;
  }
  if (serviceResponse.status == 200) {
    response.status  = 200;
    response.success = true;
    response.data = serviceResponse && serviceResponse.data && serviceResponse.data.data;
  } else {
    response.status   = serviceResponse.status;
    response.success  = false;
    response.data     = serviceResponse && serviceResponse.data && serviceResponse.data.data;
    response.error    = serviceResponse && serviceResponse.data && serviceResponse.data.message;
  }
  return response;
};

exports.startHttpServer       = startHttpServer;
exports.sendHttpRequest       = sendHttpRequest;