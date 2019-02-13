const { download, asyncForEach, getJSON } = require("./download");
const mkdir = require('./mkdir');
mkdir('twitch');

const apis = {
  global: "https://twitchemotes.com/api_cache/v3/global.json",
  subscriber: "https://twitchemotes.com/api_cache/v3/subscriber.json",
  sets: "https://twitchemotes.com/api_cache/v3/sets.json",
  images: "https://twitchemotes.com/api_cache/v3/images.json"
};

// src: https://stats.streamelements.com/c/global
// top 10 channels plus a few extra
const topChannels = [
  "twitch", // the global set
  "summit1g",
  "troflecopter",
  "timthetatman",
  "h3h3Productions",
  "sodapoppin",
  "forsen",
  "yapyap30",
  "moonmoon_ow",
  "twitchplayspokemon",
  "loltyler1",
  "hanryang1125",
  "lirik",
  "reckful",
  "imaqtpie"
];

function makeUrl(id) {
  return `http://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`;
}

(async function() {
  console.log("beginning request to:", apis.subscriber);

  let data;

  try {
    data = await getJSON(apis.subscriber);
    console.log("request successfully completed");
  } catch (e) {
    console.log("error downloading ", e.message);
    process.exit(0);
  }

  for (let channel in data) {
    let name = data[channel].channel_name.toLowerCase();
    if (!data.hasOwnProperty(channel) || topChannels.indexOf(name) === -1) {
      continue;
    }

    console.log(
      "downloading",
      data[channel].emotes.length,
      "images from:",
      name
    );

    asyncForEach(data[channel].emotes, async el => {
      const _key = el.code.toLowerCase();
      const url = makeUrl(el.id);
      console.log("downloading:", _key, url);
      try {
        await download(url, `${__dirname}/../twitch/${el.id}.png`);
      } catch (e) {
        console.error(_key, e);
      }
    });
  }
})();
