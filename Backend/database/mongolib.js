/**
 * Created by Angad on 15 February 2023
 */

'use strict';

const mongoose                      = require("mongoose");

const logging                       = require('../logging/logging');
const dateUtility                   = require('../utility/dateUtility');

const initialize = async (apiReference, config) => {

  mongoose.set('strictQuery', true);
  mongoose.set('debug', true);

  await mongoose.connect(config.url, {
    useUnifiedTopology  : true,
    useNewUrlParser     : true,
    autoIndex           : true
  }, (err, res) => {
    if (err) {
      console.error(err)
      logging.logError(apiReference, { EVENT: "MONGO_CONN_ERR", err,  URL: url });
      return err
    }
    logging.log(apiReference, "MONGO DB CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
    return res
  });
};

exports.initialize          = initialize;