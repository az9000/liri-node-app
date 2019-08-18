var fs = require("fs");
var moment = require("moment");
var logFile = "log.txt";

function log(text) {
  fs.exists(logFile, exists => {
    if (exists) {
        const stats = fs.statSync(logFile);
        const fileSizeInMBytes = stats.size / 1000000.0;
        if (fileSizeInMBytes >= 10) {
          logFile = `log_${new Date().getTime()}.txt`;
        }
    }
    var log_msg = `${moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")}: ${text} \n`;
    fs.appendFile(logFile, log_msg, function() {});
  });
}

module.exports = {
  log: log
};
