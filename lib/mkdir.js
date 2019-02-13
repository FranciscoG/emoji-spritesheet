const fs = require('fs');

module.exports = function(dir) {
  try {
    fs.mkdirSync(__dirname + "/../" + dir);
    console.log(`${dir} directory created`);
  } catch (e) {
    if (e.code !== "EEXIST") {
      console.error(e.message);
    } else {
      console.log(`${dir} already exists`);
    }
  }
};
