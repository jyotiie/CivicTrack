
'use strict';

const c = require('config');
const Joi               = require('joi');

exports.requestMethods  = {
  POST  : 'POST',
  GET   : 'GET',
  PUT   : 'PUT',
  PATCH : 'PATCH',
  DELETE: 'DELETE'
};

exports.responseHttpStatus = {
  BAD_REQUEST              : 400,
  UNAUTHORIZED             : 401,
  SUCCESS                  : 200,
  INTERNAL_SERVER_ERROR    : 500,
  CONFLICT                 : 409,
  NOT_FOUND                : 404
};

exports.modules  = {
  AUTH           : "auth",
  CIVIC_REPORT   : "civicReport",
  APP_VERSION       : "app_version"
};

exports.permissions  = {
  "READ"    : 1,
  "CREATE"  : 2,
  "UPDATE"  : 3,
  "DELETE"  : 4
};

exports.responseStatus = {
  BAD_REQUEST                 : 400,
  UNAUTHORIZED                : 401,
  SESSION_EXPIRED             : 440,
  SUCCESS                     : 200,
  INTERNAL_SERVER_ERROR       : 500,
  CONFLICT                    : 409,
  NOT_FOUND                   : 404,
  PLAN_EXPIRED                : 402
};

exports.responseMessages = {
  SUCCESS                     : "Success",
  FAILURE                     : "Failure",
  UNAUTHORIZED                : "You are not authorized to perform this action.",
  EMAIL_ALREADY_REGISTERED    : "Email already registered with us. Try signing in",
  RESET_PASSWORD_REQUESTED    : "You will receive instructions on your registered email.",
  PARAMETER_MISSING           : "Insufficient information was supplied. Please check and try again.",
  INVALID_AUTH_KEY            : "Invalid Token!",
  REGISTRATION_INCOMPLETE     : "Incomplete registration. Initial setup pending.",
  USER_INACTIVE               : "This account is not active yet. Please contact support.",
  ACCOUNT_INACTIVE            : "This account is not active or blocked by admin. Please contact admin.",
  SESSION_EXPIRED             : "User session expired. Please login again.",
  INTERNAL_SERVER_ERROR       : "Some error occurred.",
  DUPLICATE_ENTRY             : "Something duplicate in database.",
  ALREADY_EXITS               : "User already exists.",
  NOT_FOUND                   : "No Data Found",
  PLAN_EXPIRED                : "Your Trial period has expired! Please select a plan to continue.",
  INVALID_PASSWORD            : "Password must be at least 8 characters long and must contain one lower case, one uppercase, one numeric and one special character.",
  INVALID_EMAIL               : "Please enter a valid email."
};

exports.USER_TYPE = {
  ADMIN       : 1,
  RESPONDENTS : 2,
  USER        : 3,
  BACKDOOR_AGENT : 4
};
