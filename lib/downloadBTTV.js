const { download, asyncForEach, getJSON } = require("./download");
const request = require("request");

const API = "https://api.betterttv.net/2/emotes";

function makeUrl(id) {
  return `https://cdn.betterttv.net/emote/${id}/2x`;
}

/*
[
  {
      "id": "54fa925e01e468494b85b54d",
      "code": "OhMyGoodness",
      "channel": null,
      "restrictions": { "channels": [], "games": [] },
      "imageType": "png"
    },
]
*/

(async function() {
  console.log("beginning request to:", API);

  let data;

  try {
    data = await getJSON(API);
    console.log("request successfully completed");
  } catch (e) {
    console.log("error downloading ", e.message);
    process.exit(0);
  }

  asyncForEach(data.emotes, async el => {
    const _key = el.code.toLowerCase();
    const url = makeUrl(el.id);
    console.log("downloading:", _key, url);
    try {
      await download(url, `${__dirname}/../bttv/${_key}.${el.imageType}`);
    } catch (err) {
      console.error(_key, err);
    }
  });
})();
