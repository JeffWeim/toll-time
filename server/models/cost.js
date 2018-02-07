const pg = require('pg')
const Sequelize = require('sequelize')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/tollTime'

const sequelize = new Sequelize(connectionString, {
  logging: false,
  operatorsAliases: false,
})

const Markers = sequelize.define('cost_lookup', {
    position: Sequelize.JSON,
    name: Sequelize.STRING,
    direction: Sequelize.STRING,
    type: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
})

Markers.sync()

module.exports = Markers
