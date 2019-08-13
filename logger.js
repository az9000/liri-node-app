var fs = require('fs');
var logFile = 'log.txt';

async function log(text) {
    const stats = fs.statSync(logFile);
    const fileSizeInMBytes = stats.size / 1000000.0;
    
    if (fileSizeInMBytes >= 10) {
        logFile = `log_${new Date().getTime()}.txt`;
    }    
    fs.appendFile(logFile, text + '\n', function() {
        
    });    
}

module.exports = {
    log: log
}