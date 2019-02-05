const emojiNames = require("./emojiArray");
const { download, asyncForEach } = require("./download");

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
