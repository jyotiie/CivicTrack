

'use strict';

const logging                         = require('../../../logging/logging');
const authService                   = require('../services/authService');
const responses                       = require('../../../responses/responses');

exports.login = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.body };
  
  try {
    const response = await authService.login(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "login error", ERROR: error, STACK: error.STACK });
    return responses.internalServerError(res);
  }
};

exports.register = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.body };
  
  try {
    const response = await authService.register(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if( response.success) {
      return responses.success(res, response.data);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "register error", ERROR: error, STACK: error.STACK });
    return responses.internalServerError(res);
  }
}