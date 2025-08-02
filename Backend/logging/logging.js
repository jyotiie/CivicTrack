/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const moment                          = require('moment');

const fileSwitches  = {
  startup       : true,
  onboarding    : true,
  app_version   : true
};

const modules = {
  startup     : {
    initialize  : true
  },
  onboarding  : {
    register            : true,
    login               : true,
    logout              : true,
    fetch               : true,
    update              : true,
    remove              : true,
    loginViaAccessToken : true,
    forgot_password     : true,
    reset_password      : true,
    sendOTP             : true,
    loginViaOTP         : true,
    simulatedLogin      : true,
    createSimulatedLoginToken : true
  },
  app_version : {
    get : true
  }
};

const log = (apiReference, log) => {
  if (
    apiReference
    && apiReference.module
    && apiReference.api
    && fileSwitches
    && fileSwitches[apiReference.module] == true
    && modules
    && modules[apiReference.module]
    && modules[apiReference.module][apiReference.api] == true) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.log("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};

const logError = (apiReference, log) => {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};


exports.log      = log;
exports.logError = logError;
