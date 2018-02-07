import axios from 'axios'

const API_URL = process.env.PORT || 'http://localhost:3000/';
const LOGIN_URL = API_URL + 'login';
const SIGNUP_URL = API_URL + 'signup/';

export function login (context, creds, config) {
  axios.post(LOGIN_URL, creds)
    .then((data) => {
      localStorage.setItem('token', data.data.token)
      context.$store.dispatch('setAuthentication', true)

      context.$store.dispatch('getUserData', {
        user: localStorage.getItem('id_token'),
        router: context.$router,
        vue: context
      })

      if (config.redirect) {
        context.$router.push({ path: config.redirect })
      }
    })
    .catch((error) => {
      context.error = error.response.data.message
    })
}

export function signup (context, creds, redirect) {
  axios.post(SIGNUP_URL, creds)
    .then((data) => {
      localStorage.setItem('token', data.data.token)
      context.$store.dispatch('setAuthentication', true)
      context.$store.dispatch('setUserData', data.data.user)

      if (redirect) {
        context.$router.push({ path: redirect })
      }
    })
    .catch((error) => {
      context.error = error.response.data.message
    })
}

export function logout (context) {
  localStorage.removeItem('token')
  context.$store.dispatch('setAuthentication', false)
  context.$store.dispatch('setUserData', {})
  context.$router.push({ path: '/' })
}

export function checkAuth (context) {
  var jwt = localStorage.getItem('token')

  if (jwt) {
    context.$store.dispatch('setAuthentication', true)
    return true
  } else {
    context.$store.dispatch('setAuthentication', false)
    return false
  }
}

export function getAuthHeader () {
  return {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
}
