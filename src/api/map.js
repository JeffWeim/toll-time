import axios from 'axios'
const apiUrl = process.env.API_URL
const googleApiKey = process.env.GOOGLE_API_KEY

export default {
  getMarkers (cb) {
    let markers = []

    axios.get(apiUrl + '/db/getMarkers')
      .then(result => {
        result.data.forEach((el, index) => {
          markers.push({
            position: {
              lat: el.position.lat,
              lng: el.position.lng
            },
            name: el.name,
            type: el.type,
            direction: el.direction
          })
        })

        cb(markers)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
