const db = require('../db')

module.exports = function(app) {
  app.get('/protected/routeCostLookup', (req, res) => {
    let data = {
      pointA: req.pointA,
      pointB: req.pointB
    }

    db.getTollCost(req, res, data)
  })
}
