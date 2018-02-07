const express = require('express'),
    jwt = require('jsonwebtoken'),
    eJwt = require('express-jwt'),
    cors = require('cors'),
    _ = require('lodash'),
    db = require('../db'),
    bcrypt = require('bcrypt'),
    Sequelize = require('sequelize')

const User = require('../models/user')
const Op = Sequelize.Op

module.exports = (app) => {
  function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), process.env.SECRET, { expiresIn: 30 * 24 })
    // 30 * 24 * 60 * 60
  }

  function isValidPassword (passwordHash, password) {
    return bcrypt.compare(password, passwordHash)
  }

  app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: `You must send the username and the password` })
    }

    User.findOne({
      where: {
        email: req.body.email,
      }
    })
    .then(result => {
      let passwordCheckPromise = new Promise(resolve => {
        if (!isValidPassword(result.password, req.body.password)) {
          return res.status(401).send({ message: "The password entered is not correct" })
        } else {
          resolve()
        }
      })

      passwordCheckPromise.then(() => {
        let userToken = {
          id: result.id,
          username: result.username,
        }

        res.status(200).send({
          token: createToken(userToken),
        })
      })
    })
    .catch(error => {
      return res.status(401).send({ message: "The username or password don't match" })
    })
  })

  app.post('/signup', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "You must send the username and the password" })
    }

    User.findAll({
      where: {
        [Op.or]: {
          email: req.body.email,
          username: req.body.username
        }
      }
    })
    .then(result => {
      if (result.length && result[0].dataValues.username === req.body.username) {
        return res.status(400).send({ message: "A user with that username already exists" })
      }

      if (result.length && result[0].dataValues.email === req.body.email) {
        return res.status(400).send({ message: "A user with that email already exists" })
      }

      db.addUser(req.body)

      db.query("select id from users where id = (select max(id) from users)", null, (err, result) => {
        if (err) {
          return console.error('error running query', err)
        }

        if (result.rows.length < 1) {
          return console.error('select error: user not found')
        }

        let userToken = {
          id: result.rows[0],
          username: result.rows[0],
        }

        res.status(200).send({
          token: createToken(userToken)
        })
      })
    })
    .catch(error => {
      console.error(error)
    })
  })

  app.get('/protected/getProfileData', (req, res) => {
    User.findOne({
      where: {
        id: req.user.id
      }
    })
    .then(result => {
      let displayData = {
        name: result.username,
        email: result.email,
        dateCreated: result.created,
        avatar: result.avatar,
        firstName: result.first_name,
        lastName: result.last_name
      }

      res.send(JSON.stringify(displayData))
    })
    .catch(error => {
      console.log(error)
    })
  })
}
