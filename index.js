const getPixels  = require('get-pixels')
const savePixels = require('save-pixels')
const path       = require('path')

function decode(image) {
  //TODO
}
/**
 * Encode the image, uses promises because they're the future!
 * @param  {Image_Resolvable} image           The image to encode to the *superior* json-g format
 * @param  {String}           [comment='']    The comment to add to the image
 * @return {Promise}                          Promise with the json-g image as an object
 */
function encode(image, comment = '') {
  return new Promise((resolve, reject) => {
    let jsong = {version: '1.0', comment, transparency: (['.jpg', '.jpeg', '.jpg'].includes(path.extname(image).toLowerCase())) ? false : true}
    getPixels(image, (err, pixels) => {
      if (err) reject(err)

      let pixelsArr   = []
      let pixelCounts = {} //Counts pixels to find most common pixel later on, we use this as the default_color to reduce image size
      //I mean this format is already shit, lets not make it shittier
      let common = {pixel: [0,0,0,255], count: 0}

      for (let i = 0; i < pixels.data.length; i += 4) {
        let pixel = [pixels.data[i], pixels.data[i+1], pixels.data[i+2], pixels.data[i+3]]
        pixelsArr.push(pixel) //rgba
        pixelCounts[pixel] = (pixelCounts[pixel] || 0)+1
        if (common.count < pixelCounts[pixel]) common = {pixel: pixel, count: pixelCounts[pixel]}
      }

      jsong.layers = [{pixels: []}] //only 1 layer because oh god what am i doing
      jsong.layers[0].default_color = {'red': common.pixel[0], 'green': common.pixel[1], 'blue': common.pixel[2], 'alpha': common.pixel[3]}
      jsong.size = {width: pixels.shape[0], height: pixels.shape[1]}

      let ind = -1
      for (let y = 0; y < jsong.size.height; y++) {
        for (let x = 0; x < jsong.size.width; x++) {
          ind++
          if (arrayEqual(common.pixel, pixelsArr[ind])) continue

          jsong.layers[0].pixels.push({
            position: {x, y},
            color: {red: pixelsArr[ind][0], green: pixelsArr[ind][1], blue: pixelsArr[ind][2], alpha: pixelsArr[ind][3] || 255}
          })
        }
      }

      resolve(jsong) //it looks like jdong
    })
  })
}

module.exports.decode = decode
module.exports.encode = encode

//A secret hidden function!
//Also what are you doing here
function arrayEqual(a, b) {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
