/**
 * Created by Angad on 7th February 2023
 */

'use strict';

const mongoLib                      = require('./mongolib');
const redisLib                      = require('./redislib');
const dbProperties                  = require('./dbProperties');

exports.initialize                  = initialize;

async function initialize(apiReference) {
  global.mongoCon        = await mongoLib.initialize(apiReference, dbProperties.mongodb);
  global.redisCon        = await redisLib.initialize(apiReference, dbProperties.redis);
}