const Spritesmith = require("spritesmith");
const fs = require("fs");
const { getJSON } = require("./download");

const API = "https://api.betterttv.net/2/emotes";

const folder = __dirname + "/../bttv/";
const files = fs.readdirSync(folder, { withFileTypes: true });
if (files.length <= 0) {
  throw new Error(
    "missing png files, please run /lib/downloadBTTV.js before running this script"
  );
}

(async function() {
  let imagesJson;
  try {
    imagesJson = await getJSON(API);
  } catch (e) {
    console.log("error downloading images.json", e.message);
    process.exit(0);
  }

  let images = files
    .filter(file => /\.(png|gif)$/.test(file))
    .map(file => {
      return `${folder}${file}`;
    });

  function getImageName(fileName) {
    let segments = fileName.split("/");
    return segments[segments.length - 1].replace(/\.(png|gif|jpe?g)$/, "");
  }

  function fixCoords(coord) {
    let newObj = {};

    for (let id in coord) {
      let realId = getImageName(id);
      newObj[realId] = coord[id];
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
