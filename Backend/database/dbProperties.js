/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const config                                      = require('config');

exports.mongodb = {
  host        : process.env.MONGO_HOST      || config.get('databaseSettings.mongo.host'),
  port        : process.env.MONGO_PORT      || config.get('databaseSettings.mongo.port'),
  user        : process.env.MONGO_USER      || config.get('databaseSettings.mongo.user'),
  password    : process.env.MONGO_PASS      || config.get('databaseSettings.mongo.password'),
  database    : process.env.MONGO_DATABASE  || config.get('databaseSettings.mongo.database'),
  url         : process.env.MONGO_URL       || config.get('databaseSettings.mongo.url')
};

exports.redis  = {
  port        : process.env.REDIS_PORT  || config.get('databaseSettings.redis.port'),
  host        : process.env.REDIS_HOST  || config.get('databaseSettings.redis.host'),
  password    : process.env.REDIS_PWD   || config.get('databaseSettings.redis.password'),
  prefix      : process.env.REDIS_PFIX  || config.get('databaseSettings.redis.prefix')
};