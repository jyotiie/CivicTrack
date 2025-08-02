

'use strict';

const mongoose                      = require("mongoose");

const logging                       = require('../logging/logging');
const dateUtility                   = require('../utility/dateUtility');

const initialize = async (apiReference, config) => {

  mongoose.set('strictQuery', true);
  mongoose.set('debug', true);
  // console.log(config.url,"********");

  await mongoose.connect("mongodb+srv://Shanka:Admin%40123@cluster0.ytwvmol.mongodb.net/CivicTrackDB?retryWrites=true&w=majority&appName=Cluster0", {
    useUnifiedTopology  : true,
    useNewUrlParser     : true,
    autoIndex           : true
  }, (err, res) => {
    if (err) {
      console.error(err)
      logging.logError(apiReference, { EVENT: "MONGO_CONN_ERR", err,  URL: config.url });
      return err
    }
    logging.log(apiReference, "MONGO DB CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
    return res
  });
};

exports.initialize          = initialize;