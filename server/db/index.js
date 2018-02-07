const { Pool } = require('pg'),
      bcrypt = require('bcrypt')
      cloudinary = require('cloudinary')

var connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/tollTime'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const pool = new Pool({
  connectionString: connectionString
})

module.exports = {
  addUser: function (req) {
    // Create Promise to first upload user image to Cloudinary and then receive the image url in the response, which is then inserted into the DB
    let uploadPromise = new Promise((resolve, reject) => {
      if (req.avatar) {
        cloudinary.uploader.upload(req.avatar, (result) => {
          resolve(result.url)
        })
      } else { // save an API call
        resolve()
      }
    })

    uploadPromise.then((url) => {
      imageUrl = url

      var username = req.username,
          password = createHash(req.password),
          register = req.register,
          email = req.email,
          firstname = req.firstname,
          lastname = req.lastname,
          avatar = imageUrl

      var queryText = 'insert into users (username, password, email_signup, email, first_name, last_name, created, avatar) values($1, $2, $3, $4, $5, $6, NOW(), $7)'

      pool.query(queryText, [username, password, register, email, firstname, lastname, avatar], (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    })

    uploadPromise.catch((err) => {
      console.log(err)
    })
  },

  query: function (text, params, cb) {
    return pool.query(text, params, cb)
  }
}

function createHash (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(15), null);
}
