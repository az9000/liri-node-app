const fs = require('fs');
const readline = require('readline');

function doIt() {
  // read random.txt
  const fileStream = fs.createReadStream('random.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  return rl;
}

module.exports = {
  do: doIt
}
