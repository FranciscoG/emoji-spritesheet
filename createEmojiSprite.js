const fs = require("fs");
const request = require("request");
const emojiNames = require("./emoji");

const url = "https://www.dubtrack.fm/assets/emoji/apple/";

var download = function(uri, filename) {
  return new Promise(function(resolve, reject) {
    request.head(uri, function(err, res, body) {
      console.log("content-type:", res.headers["content-type"]);
      console.log("content-length:", res.headers["content-length"]);
      
      if (err) {
        return reject();
      }

      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", function() {
          setTimeout(resolve, 500);
        });
    });
  });
};


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

asyncForEach(emojiNames, async (id) => {
  id = id.replace(/^:|:$/g, '');
  try {
    await download(url + id + '.png', `./images/${id}.png`);
  } catch(e) {
    console.error(e);
  }
});
