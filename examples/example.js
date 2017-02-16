const jsong = require('../index.js')
const fs    = require('fs')

//Encoding demo.png to demo.jsng
jsong.encode('./demo.png', 'Hello World!')
  .then(file => fs.writeFile('demo.jsng', JSON.stringify(file, null, 4), err => {if(err) throw err}))
