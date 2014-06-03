var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1'
var port = process.env.PORT || 8080
var magnetic = require('geomagnetic')

var Dat = require('dat')

var dat = new Dat('./data/geomagnetic', function ready(err) {
  dat.listen(port, function() {
    fetch()
  })
})

function fetch() {
  console.log(JSON.stringify({"fetching": new Date()}))
  magnetic(function(err, data) {
    setTimeout(fetch, 60000)
    
    if (err) {
      return console.error(err)
    }
    
    data.map(function(d) {
      d.key = new Date(d.timestamp).toISOString()
      dat.put(d, function(err, updated) {})
    })
  })
}
