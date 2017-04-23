const duplexer = require('duplexer')
const toBuffer = require('to-buffer')
const zopfli = require('node-zopfli')
const { PassThrough } = require('stream')

const options = { numiterations: 15 }

module.exports = function(string) {
  return new Promise((resolve, reject) => {
    if (!string) return resolve(0)
    
    zopfli.gzip(toBuffer(string), options, (err, gziped) => {
      /* istanbul ignore if */
      if (err) return reject(err)
      resolve(gziped.length)
    })
  })
}

module.exports.sync = function(string) {
  return zopfli.gzipSync(toBuffer(string), options).length
}

module.exports.stream = function() {
  const input = new PassThrough()
  const output = new PassThrough()
  const wrapper = duplexer(input, output)
  
  let size = 0
  const zopfliStream = zopfli.createGzip(options)
    .on('data', function(buf) {
      size += buf.length
    })
    .on('end', function() {
      wrapper.gzipSize = size
      wrapper.emit('gzip-size', size)
      output.end()
    })
  
  input.pipe(zopfliStream)
  input.pipe(output, { end: false })
  
  return wrapper
}