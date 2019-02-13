const Spritesmith = require("spritesmith");
const fs = require("fs");

const folder = __dirname + "/../bttv/";
const files = fs.readdirSync(folder, { withFileTypes: true });
if (files.length <= 0) {
  throw new Error(
    "missing png files, please run /lib/downloadBTTV.js before running this script"
  );
}

(async function() {
  let images = files
    .filter(file => /\.(png|gif)$/.test(file))
    .map(file => {
      return `${folder}${file}`;
    });

  function getImageName(fileName) {
    let segments = fileName.split("/");
    let file = segments[segments.length - 1].replace(/\.(png|gif|jpe?g)$/, "");
    let fileParts = file.split('.');
    fileParts.pop();
    return fileParts.join('.');
  }

  function getID(fileName) {
    let segments = fileName.split("/");
    let file = segments[segments.length - 1].replace(/\.(png|gif|jpe?g)$/, "");
    let fileParts = file.split('.');
    return fileParts[fileParts.length - 1];
  }

  function fixCoords(coord) {
    let newObj = {};

    for (let id in coord) {
      let code = getImageName(id);
      let realId = getID(id);
      newObj[code] = coord[id];
      newObj[code].id  = realId;
    }
    fs.writeFileSync(
      __dirname + "/../output/bttv-spritesheet.json",
      JSON.stringify(newObj)
    );
  }

  Spritesmith.run({ src: images }, function handleResult(err, result) {
    // If there was an error, throw it
    if (err) {
      throw err;
    }
    // Output the image
    fs.writeFileSync(
      __dirname + "/../output/bttv-spritesheet.png",
      result.image
    );

    fixCoords(result.coordinates);
  });
})();
