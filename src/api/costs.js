import axios from 'axios'
import { getAuthHeader, logout } from '@/api/auth'
const apiUrl = process.env.API_URL

export default {
  routeCostLookup (obj, cb) {
    axios.get(apiUrl + '/protected/routeCostLookup', { obj: obj, headers: getAuthHeader() })
      .then(result => {
        cb(result)
      })
      .catch(error => {
        logout(obj.router.app)
      })
  }
}
