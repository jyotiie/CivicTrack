/**
 * Created by Angad on 20 February 2023
 */

'use strict';

const moment              = require('moment-timezone');
const logging             = require('../logging/logging');

exports.convertDatetime = (apiReference, utcDatetime, timezone, format = "YYYY-MM-DD HH:mm")=>{
  try {
    return format ? moment(utcDatetime).tz(timezone).format(format) : moment.tz(utcDatetime, timezone);
  } catch(e){
    logging.log(apiReference, {EVENT: "ERROR IN MOMENTIZING convertDatetime DATE", utcDatetime, timezone, format})
    return false;
  }
}

exports.formatDate = (apiReference, datetime, format)=>{
  try {
    return format ? moment(datetime).format(format) : datetime;
  } catch(e){
    logging.log(apiReference, {EVENT: "ERROR IN MOMENTIZING DATE for formatDate time", DATE: datetime, format})
    return false;
  }
}

exports.convertTimeDiffInMinutes = (apiReference, startTime, endTime) => {
  try {
    startTime = moment(startTime);
    endTime   = moment(endTime);

    let duration  = moment.duration(endTime.diff(startTime));
    let years     = duration.years();
    let months    = duration.months();
    let days      = duration.days();
    let hours     = duration.hours();
    let minutes   = duration.minutes();

    let inMinutes = (years * 525600) + (months * 43800) + (days * 60 * 24) + (hours * 60) + minutes;
    return inMinutes;

  } catch(e) {
    logging.log(apiReference, {EVENT: "ERROR IN MOMENTIZING convertDatetime ", START_DATE: startTime, END_DATE: endTime});
    return 0;
  }
}

exports.checkBetweenTime = (apiReference, time, startTime, endTime) => {
  try {
    return moment(time, "H:mm").isBetween(moment(startTime, "H:mm"),moment(endTime, "H:mm"))
  } catch(e){
    logging.log(apiReference, {EVENT: "ERROR IN CHECKING BETWEEN TIME", DATE: time, START_TIME: startTime, END_TIME: endTime})
    return false;
  }
}