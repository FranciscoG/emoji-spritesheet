const fs = require("fs");
const request = require("request");

var download = function(uri, filename) {
  return new Promise(function(resolve, reject) {
    request.head(uri, function(err, res, body) {
      console.log(
        "content-type:",
        res.headers["content-type"],
        "content-length:",
        res.headers["content-length"]
      );

      if (err) {
        return reject(err);
      }

      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", function() {
          setTimeout(resolve, 500);
        })
        .on("error", function(error) {
          reject(error);
        });
    });
  });
};

var getJSON = function(jsonURL) {
  return new Promise(function(resolve, reject) {
    request(jsonURL, function(error, response, body) {
      if (error) {
        reject(error, response);
        return;
      }

      if (response.statusCode === 200 && body) {
        try {
          let data = JSON.parse(body);
          resolve(data);
        } catch (e) {
          reject(e, response);
        }
      } else {
        reject(null, response);
      }
    });
  });
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
  download,
  asyncForEach,
  getJSON
};
