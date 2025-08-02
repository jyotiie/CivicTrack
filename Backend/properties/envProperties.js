/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const config                          = require('config');
require('dotenv').config();

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

exports.port  = process.env.PORT || config.get("PORT");

exports.isEnv             = isEnv;
exports.getEnv            = getEnv;
exports.isEnvLiveOrBeta   = isEnvLiveOrBeta;
exports.isEnvLive         = isEnvLive;
exports.isServer          = isServer;
