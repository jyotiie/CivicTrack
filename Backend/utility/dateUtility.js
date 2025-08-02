/**
 * Created by Angad on 7th February 2023
 */

const moment              = require('moment');

exports.formats = {
  mysqlFormatDate         : 'YYYY-MM-DD',
  mysqlFormatTime         : 'HH:mm:ss',
  mysqlFormatDateTime     : 'YYYY-MM-DD HH:mm:ss',
  dateTime12Hour          : 'YYYY-MM-DD hh:mm a',
  timeWithMilliSeconds    : 'YYYY-MM-DD HH:mm:ss SSS',
  invoiceMonth            : 'MMM YYYY',
  billingMonth            : 'YYYY-MM',
  yearMonth               : 'YYYYMM',
  billingDate             : 'YYYYMMDD',
  jsFormatDateTime        : 'YYYY-MM-DDTHH:mm:ss',
  mail12Hour              : "MMMM Do YYYY, h:mm A",
  mail24Hour              : "MMMM Do YYYY, H:mm",
  time12Hour              : "hh:mm A",
  time24Hour              : "HH:mm",
  orderHistory12Hour      : "MMMM d, YYYY, h:mm A",
  orderHistory24Hour      : "MMMM d, YYYY, HH:mm",
  dateTimeWithMilliSeconds: "YYYY-MM-DDTHH:mm:ss.SSS",
  timeFormatForDB         : "H:mm"
};

exports.getFormattedDate = (date, format) => {
  return moment(new Date(date)).format(format);
};

exports.timezoneConversion = (localTimestamp, offset = 0)=>{
  return new Date(new Date(localTimestamp).getTime() - (offset * (60*1000)))
};
