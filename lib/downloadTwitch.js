const jsons = {
  global: "https://twitchemotes.com/api_cache/v3/global.json",
  subscriber: "https://twitchemotes.com/api_cache/v3/subscriber.json",
  sets: "https://twitchemotes.com/api_cache/v3/sets.json",
  images: "https://twitchemotes.com/api_cache/v3/images.json"
};

// src: https://stats.streamelements.com/c/global
// top 10 channels plus a few extra
const topChannels = [
  "Twitch", // the global set
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

/*
TODO:

- download the JSONs into memory (probably only need 2 - 3 of them)
- go through the global plys top Channels and download the emotes for each
*/
