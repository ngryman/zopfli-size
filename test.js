import test from 'ava'
import fs from 'fs'
import zopfliSize from './'

const string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

test('get zopfli size', async t => {
  const size = await zopfliSize(string)
  console.log(size, string.length)
  t.true(size < string.length)
})

test('ignore no string', async t => {
  const size = await zopfliSize()
  t.is(size, 0)
})

test('get zopfli size synchronously', t => {
  const size = zopfliSize.sync(string)
  t.true(size < string.length)
})

test.cb('get zopfli size as stream', t => {
  fs.createReadStream('test.js')
    .pipe(zopfliSize.stream())
    .on('end', function() {
      t.true(this.gzipSize < fs.statSync('test.js').size)
      t.end()
    })
})

test.cb('emit a zopfli-size event', t => {
  fs.createReadStream('test.js')
    .pipe(zopfliSize.stream())
    .on('gzip-size', size => {
      t.true(size < fs.statSync('test.js').size)
      t.end()
    })
})
