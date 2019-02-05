const { download, asyncForEach } = require("./download");
const request = require("request");

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

console.log("beginning request to:", apis.subscriber);
(async function() {
  request(apis.subscriber, async function(error, response, body) {
    console.log("request complete");
    if (error) {
      console.log(error);
      return;
    }
    console.log("no errors", "status code:", response.statusCode);

    if (response.statusCode === 200 && body) {
      console.log("good data");
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log("error parsing body", e.message);
      }

      console.log(data[0]);
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
    }
  });
})();
