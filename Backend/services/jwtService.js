/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const jwt                   = require('jsonwebtoken');
const secretOrPrivateKey    = "A1kKa_S3cR37_#@$h_K3Y";
const simulatedLoginKey     = "A!kKa_S3cR37_#@$h_K3Y_ioipqp90";


const logging               = require("../logging/logging");

const payload = (opts) => {
  let payloadObj = {
    user_id                       : opts.user_id,
    user_type                     : opts.user_type,
    name                          : opts.name,
    email                         : opts.email,
    role_id                       : opts.role_id,
    is_active                     : opts.is_active,
    is_registration_complete      : opts.is_registration_complete
  }
  if(opts.hasOwnProperty("isSimulatedLogin")){
    payloadObj.isSimulatedLogin = opts.isSimulatedLogin;
  }
  if(opts.hasOwnProperty("bypass_logs")){
    payloadObj.bypassLogs = opts.bypass_logs;
  }
  return payloadObj;


};

const createJWT = (apiReference, opts, expiryTime) => {
  let secretKey = opts.hasOwnProperty("isSimulatedLogin") ? simulatedLoginKey : secretOrPrivateKey;
  const values  = { ... opts };
  logging.log(apiReference, {
    EVENT: "!! CREATING JWT !! ",
    OPTS:  opts
  });
  return jwt.sign(payload(values), secretKey, { expiresIn: expiryTime || "20 days"})
};

const verifyJWT = (apiReference, token, secretLogin = false) => {
  logging.log(apiReference, {EVENT: "VERIFY JWT", TOKEN: token});
  let decoded;
  let secretKey = secretLogin ? simulatedLoginKey : secretOrPrivateKey;
  try{
    decoded = jwt.verify(token, secretKey);
  } catch(err){
    console.error("Invalid token!!", token, err);
  }
  logging.log(apiReference, { EVENT: "!! DECODED JWT !! ", OPTS:  decoded });
  return decoded;
};


exports.createJWT         = createJWT;
exports.verifyJWT         = verifyJWT;
