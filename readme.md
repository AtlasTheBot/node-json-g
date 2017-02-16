# Node.js encoder/decoder for JSON-G
*Check the specs for JSON-G [here](https://github.com/Roadcrosser/JSON-G)*

~~There's no decoding function yet but it's late and I'm tired~~

Have you ever wanted to store an image in a .json format?

Have you ever wanted to store it in an *extremely* inefficient way?

Have you ever wanted to use a converter that's probably poorly optimized *and* buggy?


Now you can!

Turn any supported image (jpg, png, gif [haven't tested this rip]) into a poorly optimized .jsnp format!

### So how do I use it?

```js
const jsong = require('../index.js')
const fs    = require('fs')

//Encoding demo.png to demo.jsng
jsong.encode('./demo.png', 'Hello World!')
  .then(file => fs.writeFile('demo.jsng', JSON.stringify(file, null, 4), err => {if(err) throw err}))
```
As simple as that.

**jsong.encode(image, comment)**

Encode the image, uses promises because they're the future!

| Param | Type | Description |
| ----- | ---- | ----------- |
| image | path, http url, data url | The image to encode into the *superior* json-g format
| comment | String | The comment to add to the image (Default: `''`)

Return a promise with the encoded image as an object

**jsong.decode(image)**
```js
//TODO: All this
```

### Other stuff

#### This is incredibly poorly optimized...
Do you mean the code or the format?
Because they both suck.

#### Is it blazing-fast?
probably not

#### Is it *some-buzzword*?
see above

#### How do I install this
Easy!

Step 1. Question *why* do you want this

Step 2. Leave this page before it's too late

#### Why?
because we must prove that js and json can do *anything*

#### Wait is it that simple?
yes because i suffered and wrote this instead of you

#### I have an issue with this package...
If it's buggy and returns the wrong thing or crashes, just open an issue and I'll get to it *eventually*

If you have an issue with how poorly written this code is or how terrible the format is, write your complaints in an angry .txt file on your desktop, then delete it.

### License
I am not responsible for anything. Even if this package gains sentience and kills your family, not my fault. Blame Road for that.
