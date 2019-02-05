var Spritesmith = require("spritesmith");
var fs = require("fs");
var emoji = require("./emojiArray");

var sprites = emoji.map(id => {
  return __dirname + "/../emoji/" + id.replace(/^:|:$/g, "") + ".png";
});

Spritesmith.run({ src: sprites }, function handleResult(err, result) {
  // If there was an error, throw it
  if (err) {
    throw err;
  }
  // Output the image
  fs.writeFileSync(
    __dirname + "/../output/emoji-spritesheet.png",
    result.image
  );
  fs.writeFileSync(
    __dirname + "/../output/emoji-spritesheet.json",
    JSON.stringify(result.coordinates)
  );
});
