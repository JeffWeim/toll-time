const Markers = require('../models/markers')

module.exports = function(app) {
  app.get('/db/getMarkers', (req, res) => {
    Markers.findAll({
      raw: true
    })
    .then(result => {
      res.send(JSON.stringify(result))
    })
    .catch(error => {
      console.log(error)
    })
  })
}
