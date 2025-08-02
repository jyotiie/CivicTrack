/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const logging                           = require('../logging/logging');
const jwtService                        = require('../services/jwtService');
const responses                         = require('../responses/responses');
const responseConstants                 = require('../responses/responseConstants');
const redisLib                          = require('../database/redislib');
const envProperties                     = require('../properties/envProperties');

exports.authenticateUser = async (req, res, next) => {
  let apiReference   = req.apiReference;
  let cache          = { ... res.locals };

  logging.log(apiReference, { EVENT: "Locals Values >>> in Authenticate User", Data: cache });

  if (res.locals.bypass_user_auth) {
    return next();
  }

  let decodedToken  = await jwtService.verifyJWT(apiReference, req.headers['access-token']);
  if (!decodedToken) {
    return responses.invalidAuthKey(res);
  }

  if (!decodedToken.is_active) {
    return responses.inactive(res);
  }

  if (res.locals.bypass_registration_check) {
    res.locals.auth_details               = decodedToken;
    res.locals.auth_details['access-token']  = req.headers['access-token'];
    return next();
  }

  let userType = decodedToken.hasOwnProperty("bypassLogs") ? responseConstants.USER_TYPE.BACKDOOR_AGENT : decodedToken.user_type;

  let tokenInRedis = await redisLib.get(apiReference, userType + "_" + decodedToken.user_id);
  logging.log(apiReference, tokenInRedis);
  if (!tokenInRedis) {
    return responses.sessionExpired(res);
  }

  if (decodedToken.user_type === responseConstants.USER_TYPE.RESPONDENTS) {
    if (req.headers['access-token'] !== tokenInRedis) {
      return responses.sessionExpired(res);
    }
  } else {
    try {
      tokenInRedis = JSON.parse(tokenInRedis);
    } catch (error) {
      logging.logError(apiReference, { EVENT: "Already Parsed", ERROR: error });
    }

    if (!tokenInRedis.includes(req.headers['access-token'])) {
      return responses.sessionExpired(res);
    }
  }

  res.locals.auth_details               = decodedToken;
  res.locals.auth_details['access-token']  = req.headers['access-token'];

  return next();
};

const authenticateMicroService = (req, res, next) => {
  let requestHeaders = { ... req.headers};
  let apiReference   = {
    module: "microservice",
    api   : "auth"
  };

  if (requestHeaders.auth_token === envProperties.microserviceAuthToken) {
    res.locals.bypass_user_auth = true;
    logging.log(apiReference, {EVENT: "Setting up Bypass for Microservice", Locals: res.locals});
  }

  return next();
};

exports.authenticateMicroService = authenticateMicroService;