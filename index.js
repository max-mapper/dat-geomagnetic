var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1'
var port = process.env.PORT || 8080
var magnetic = require('geomagnetic')

var Dat = require('dat')

var dat = new Dat('./data/geomagnetic', function ready(err) {
  dat.init(function(err) {
    if (err) console.error(err)
    dat.serve({port: port}, function() {
      setTimeout(fetch, 60000)
    })
  })  
})

function fetch() {
  console.log(JSON.stringify({"starting": new Date()}))
  
  magnetic(function(err, data) {
    if (err) return console.error(err)

    var writeStream = dat.createWriteStream({
      objects: true,
      primary: 'timestamp'
    })
    
    writeStream.on('error', function(e) {
      console.log('Write error', e)
    })
  
    writeStream.on('end', function() {
      console.log(JSON.stringify({"finished": new Date()}))
    })
    
    data.map(function(d) {
      d.timestamp = new Date(d.timestamp).toISOString()
      writeStream.write(d)
    })
    
    writeStream.end()
  })
}
