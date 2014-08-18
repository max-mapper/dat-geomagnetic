var magnetic = require('geomagnetic')
var debug = require('debug')('dat-geomagnetic')

module.exports = function(dat, ready) {
  
  // call the dat ready callback immediately so it doesn't wait for us
  ready()
  
  fetch()
  
  function fetch() {
    magnetic(function(err, data) {
      // fetch every minute
      setTimeout(fetch, 60000)
    
      if (err) {
        return console.error('error getting geomagnetic data', err)
      }
    
      data.map(function(d) {
        // data with the same key will conflict and not get imported
        d.key = new Date(d.timestamp).toISOString()
        dat.put(d, function(err, updated) {
          if (err) return debug('error and/or conflict', err)
          debug('put new entry', updated)
        })
      })
    })
  }
}
