const jsong = require('../index.js')
const fs    = require('fs')

//Encoding demo.png to demo.jsnp
jsong.encode('./demo.png', 'Hello World!')
  .then(file => fs.writeFile('demo.jsnp', JSON.stringify(file, null, 4), err => {if(err) throw err}))
