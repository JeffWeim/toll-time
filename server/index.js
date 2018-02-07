const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      path = require('path'),
      history = require('connect-history-api-fallback'),
      dotenv = require('dotenv').config(),
      compression = require('compression'),
      pg = require('pg')
      // session = require('express-session'),
      jwt = require('express-jwt'),
      db = require('./db')

const app = express()
const port = process.env.PORT || 3000

let jwtCheck = jwt({
  secret: process.env.SECRET,
  credentialsRequired: true
})

app.use(express.static(path.join(__dirname, './dist')))
app.use(cors({origin: 'http://localhost:8080'}));
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(history())

app.use('/protected/', jwtCheck, function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('You\'ve been signed out. Please log back in.' )
  } else {
    next()
  }
})

// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.SECRET,
//   cookie: { secure: false }
// }))

require('./routes/user')(app)
require('./routes/cost')(app)
require('./routes/markers')(app)

app.get('/', function(req, res) {
  res.sendFile(__dirname + './dist/index.html')
})

app.listen(port)
