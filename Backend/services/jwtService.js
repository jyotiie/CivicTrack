/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const jwt                   = require('jsonwebtoken');
const secretOrPrivateKey    = "A1kKa_S3cR37_#@$h_K3Y";
const simulatedLoginKey     = "A!kKa_S3cR37_#@$h_K3Y_ioipqp90";


const logging               = require("../logging/logging");

const payload = (opts) => {


};

const createJWT = (apiReference, opts, expiryTime) => {
  let secretKey = secretOrPrivateKey;
  const values  = { ... opts };
  logging.log(apiReference, {
    EVENT: "!! CREATING JWT !! ",
    OPTS:  opts
  });
  return jwt.sign(opts, secretKey, { expiresIn: expiryTime || "20 days"})
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
