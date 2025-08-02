/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const config                          = require('config');

function isEnv(env) {
  return process.env.NODE_ENV == env;
}

function isEnvLiveOrBeta() {
  return isEnv('prod') || isEnv('beta');
}

function isEnvLive() {
  return isEnv('prod');
}

function getEnv() {
  return process.env.NODE_ENV;
}

function isServer(server) {
  return process.env.SERVER == server;
}

exports.port  = process.env.AUTH_PORT || config.get("PORT");

exports.SERVICE_URLS = {
  AUTH          : process.env.AUTH_URL          || config.get("serviceUrls.AUTH"),
  NOTIFICATION  : process.env.NOTIFICATION_URL  || config.get("serviceUrls.NOTIFICATION"),
  RESPONDENT    : process.env.RESPONDENT_URL    || config.get("serviceUrls.RESPONDENT"),
  SURVEY        : process.env.SURVEY_URL        || config.get("serviceUrls.SURVEY")
};

exports.fe_url = process.env.FE_URL || config.get('fe_url');

exports.microserviceAuthToken = process.env.MICROSERVICE_AUTH_TOKEN   || config.get("microServiceAuthToken");

exports.isEnv             = isEnv;
exports.getEnv            = getEnv;
exports.isEnvLiveOrBeta   = isEnvLiveOrBeta;
exports.isEnvLive         = isEnvLive;
exports.isServer          = isServer;
