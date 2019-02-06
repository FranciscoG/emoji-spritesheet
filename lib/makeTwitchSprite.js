const Spritesmith = require("spritesmith");
const fs = require("fs");
const imagesJson = require("./twitch_images.json");

const folder = __dirname + "/../twitch/";

const files = fs.readdirSync(folder, { withFileTypes: true });

let images = files
  .filter(id => /\.png$/.test(id))
  .map(id => {
    return `${folder}${id}`;
  });

function getID(fileName) {
  let segments = fileName.split("/");
  return segments[segments.length - 1].replace(".png", "");
}
function fixCoords(coord) {
  let newObj = {};
  for (let id in coord) {
    let realId = getID(id);
    let match = imagesJson[realId];
    if (!match || !match.code) {
      continue;
    }
    newObj[match.code] = coord[id];
    newObj[match.code].id = realId;
  }
  fs.writeFileSync(
    __dirname + "/../output/twitch-spritesheet.json",
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
    __dirname + "/../output/twitch-spritesheet.png",
    result.image
  );

  fs.writeFileSync(
    __dirname + "/../output/twitch-ids-spritesheet.json",
    JSON.stringify(result.coordinates)
  );

  fixCoords(result.coordinates);
});
