const emojiNames = require("./emojiArray");
const { download, asyncForEach } = require("./download");
const mkdir = require('./mkdir');
mkdir('emoji');

// make sure 'bttv' directory exists:
try {
  fs.mkdirSync(__dirname + '/../bttv');
  console.log('bttv directory created');
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error(e.message);
  } else {
    console.log('bttv already exists');
  }
}

/**
 * Enter the url path that you want to download the emojis from
 */
const url = "";

if (!url) {
  throw new Error("Missing download url");
}

asyncForEach(emojiNames, async id => {
  id = id.replace(/^:|:$/g, "");
  try {
    await download(url + id + ".png", `../emoji/${id}.png`);
  } catch (e) {
    console.error(e);
  }
});
