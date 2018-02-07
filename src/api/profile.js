import axios from 'axios'
import { getAuthHeader, logout } from '@/api/auth'
import store from '@/store'
const apiUrl = process.env.API_URL

export default {
  getUserData (obj, cb) {
    axios.get(apiUrl + '/protected/getProfileData', { user: obj.user, headers: getAuthHeader() })
      .then(result => {
        cb(result.data)
      })
      .catch(error => {
        obj.vue.$store.dispatch('setLoggedOutMessage', error.response.data)
        logout(obj.router.app)
      })
  }
}
