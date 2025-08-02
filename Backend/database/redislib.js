/**
 * Created by Angad on 7th February 2023
 */

"use strict";

const asyncRedis        = require('async-redis');
const logging           = require('../logging/logging');
const dateUtility       = require('../utility/dateUtility');
const dbProperties      = require('./dbProperties');

let PREFIX              = dbProperties.redis.prefix;

const initialize = (apiReference, config) => {
  const client = asyncRedis.createClient({
    host                : config.host,
    port                : config.port,
    password            : config.password,
    socket_keepalive    : true
  });
  client.on("error", function (error) {
    console.error("REDIS ERROR OCCURRED", error);
  });
  PREFIX = config.prefix;
  logging.log(apiReference, "REDIS CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
  return client;
};

const addToken = async (apiReference, data) => {
  logging.log(apiReference, { EVENT: "Add Token to Redis", KEY: PREFIX + data.key, ACCESS_TOKEN: data['access-token'] });
  let tokens = await get(apiReference, data.key);
  logging.log(apiReference, { EVENT: "Tokens in Redis", tokens });

  if (!tokens) {
    tokens = [data['access-token']];
  } else {
    try {
      tokens = JSON.parse(tokens);
    } catch (error) {
      logging.logError(apiReference, { EVENT: "Access Tokens already parsed", error });
    }

    if (tokens.length === 4) {
      tokens.splice(0,1);
    }

    tokens.push(data['access-token']);
  }

  return await set(apiReference, data.key, JSON.stringify(tokens));
};

const removeToken = async (apiReference, key, token) => {
  logging.log(apiReference, { EVENT: 'REMOVE Token From Redis', KEY: key, TOKEN:  token });

  let tokens = await get(apiReference, key);

  if(!tokens)
    return true;

  try {
    tokens = JSON.parse(tokens);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Access Tokens already parsed", error });
  }

  let index = tokens.indexOf(token);
  tokens.splice(index, 1);

  return await set(apiReference, key, JSON.stringify(tokens));
};

const get = async (apiReference, key) => {
  logging.log(apiReference, { EVENT: "GET VALUE FROM REDIS ", KEY: PREFIX + key });
  return await redisCon.get((PREFIX + key));
};

const set = async (apiReference, key, value) => {
  logging.log(apiReference, { EVENT: "SET VALUE IN REDIS ", KEY: key, VALUE: value });
  return await redisCon.set((PREFIX + key), value);
};

const del = async (apiReference, key) => {
  logging.log(apiReference, { EVENT: "DELETE VALUE IN REDIS ", KEY: key});
  return await redisCon.del((PREFIX + key));
};

exports.initialize    = initialize;
exports.get           = get;
exports.set           = set;
exports.del           = del;
exports.addToken      = addToken;
exports.removeToken   = removeToken;
