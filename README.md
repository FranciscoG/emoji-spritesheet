# Emote and Emoji spritesheet generators

## Emoji

**Important** you must complete the [`url`](lib/downloadEmojis.js#L7) constant/variable in `downloadEmojis.js` to indicate where it should download the emojis from


First download the emoji images. It will iterate through the `./lib/emojiArray.js` and combine them with the `url` provided to download the emojis
```bash
$ node ./lib/downloadEmojis.js
```

then make the spritesheet
```bash
$ node ./lib/makeEmojiSprite.js
```

It creates the following 2 files in the `/output` folder
- a single png spritesheet
- a json object of coordinates and dimensions for each emoji and where they are located on the spritesheet. The keys of the object will be the emoji names.

-----

## Twitch Emotes

This depends on these 2 APIs being available
- https://twitchemotes.com/api_cache/v3/subscriber.json
- https://twitchemotes.com/api_cache/v3/images.json

Also it only downloads from a specific and [limited set of Twitch subscriber channels](/lib/downloadTwitch.js#L13) (and global of course)

First download the emoji images
```bash
$ node ./lib/downloadTwitch.js
```

then make the spritesheet
```bash
$ node ./lib/makeTwitchSprite.js
```

It creates 2 files
- a single png spritesheet
- a json object of coordinates, dimensions, and twitch image ID for each emote and where they are located on the spritesheet. The keys of the object will be the emote names.

