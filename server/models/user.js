const pg = require('pg')
const Sequelize = require('sequelize')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/tollTime'

const sequelize = new Sequelize(connectionString, {
  logging: false,
  operatorsAliases: false,
})

const User = sequelize.define('users', {
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    avatar: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    created: {
      type: Sequelize.DATE,
      field: 'created'
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
})

User.sync()

module.exports = User
