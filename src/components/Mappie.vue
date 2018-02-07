<template>
  <section class="mappie">

    <buttonie locate text="Locate Your Current Position" color="teal"></buttonie>

    <a class="mappie__reset" v-if="userPoints.pointA.position && userPoints.pointB.position" href="#" @click.prevent="resetMap">Start Over</a>

    <!-- <h4>Are you headed North/South or East/West:</h4>
    <switchie classes="" v-model="direction" checked>{{ directionText }}</switchie> <br> -->

    <h4>Pick your first direction:</h4>
    <switchie classes="" v-model="toggleNorthSouth" checked>{{ ns }}</switchie>

    <div style="min-height: 125px; margin: 0 auto; display: flex; justify-content: center;">
      <span>
        <h3>
          <span v-if="!userPoints.pointA.position && !userPoints.pointB.position">No</span> Selected Points
        </h3>

        <table class="mappie__table">
          <tr>
            <th class="mappie__table--a" v-if="userPoints.pointA.position">Point A</th>
            <th class="mappie__table--b" v-if="userPoints.pointB.position">Point B</th>
          </tr>
          <tr>
            <th class="mappie__table--a" v-if="userPoints.pointA.position">{{ userPoints.pointA.name }}</th>
            <th class="mappie__table--b" v-if="userPoints.pointB.position">{{ userPoints.pointB.name }}</th>
          </tr>
        </table>
      </span>
    </div>

    <gmap-map
      ref="map"
      :center="baseData.center"
      :zoom="baseData.zoom"
      style="width: 100%; height: 600px;"
      :options="mapOptions">

      <gmap-marker
        :clickable="true"
        :draggable="false"
        v-for="(m, i) in sortedMarkers"
        :key="m.position.lat"
        :position="m.position"
        @click="setPoints(m)">
      </gmap-marker>

      <gmap-info-window
        :position="infoWindowPos"
        :options="infoOptions"
        :content="infoContent"
        :opened="openInfoWindow"
        @closeclick="openInfoWindow = false">
      </gmap-info-window>

      <gmap-polyline
        :path="polylinePointsArray"
        :editable="false"
        :deepWatch="true"
        ref="polygon">
      </gmap-polyline>
    </gmap-map>
  </section>
</template>

<script>
  import { eventBus } from '@/event-bus'
  import Switchie from '@/components/Switchie'
  import Buttonie from '@/components/Buttonie'

  export default {
    name: 'Mappie',
    components: {
      Switchie,
      Buttonie
    },
    methods: {
      resetMap () {
        this.$store.dispatch('getMarkers')
        this.polylinePointsArray = []
        this.directionsDisplay.set('directions', null)
        this.hasPickedPointA = false

        this.$store.dispatch('setPointA', {})
        this.$store.dispatch('setPointB', {})
      },

      geolocation () {
        let self = this

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            self.infoWindowPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            self.openInfoWindow = true
            self.infoContent = 'You are here'
            this.$store.dispatch('updateCenter', self.infoWindowPos)
          }, () => {
            // handleLocationError(true, infoWindow, map.getCenter())
          })
        } else {
          // handleLocationError(false, infoWindow, map.getCenter())
        }
      },

      setPoints (locationData) {
        const mapReference = this.$refs.map.$mapObject

        if (!this.$store.state.home.userPoints.pointA.position) {
          this.$store.dispatch('setPointA', locationData)
          this.hasPickedPointA = true
        } else {
          this.$store.dispatch('setPointB', locationData)
        }

        if (this.$store.state.home.userPoints.pointA.position && this.$store.state.home.userPoints.pointB.position) {
          this.directionsService = new google.maps.DirectionsService()

          this.directionsDisplay = new google.maps.DirectionsRenderer({
            map: mapReference
          })

          this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.$store.state.home.userPoints.pointA.position, this.$store.state.home.userPoints.pointB.position)
        }
      },

      calculateAndDisplayRoute (directionsService, directionsDisplay, latLngA, latLngB) {
        let self = this

        directionsService.route({
          origin: latLngA,
          destination: latLngB,
          avoidTolls: false,
          avoidHighways: false,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            let distance = response.routes[0].legs[0].distance
            let duration = response.routes[0].legs[0].duration

            directionsDisplay.setDirections(response)

            response.routes[0].overview_path.forEach(e => {
              self.polylinePointsArray.push({
                lat: e.lat(),
                lng: e.lng()
              })
            })

            this.$store.dispatch('clearMarkers', [])
          }
        })
      }
    },
    computed: {
      markers() {
        return this.$store.getters.markers
      },

      baseData() {
        return this.$store.state.home.baseData
      },

      userPoints() {
        return this.$store.state.home.userPoints
      },

      sortedMarkers() {
        let holderArray = []
        let isEntranceOrExit = 'entrance'
        let northSouthCheck = 'north'

        if (!this.$store.state.home.userPoints.pointA.position && !this.$store.state.home.userPoints.pointB.position) {
          northSouthCheck = this.toggleNorthSouth ? 'north' : 'south'
        }

        if (this.ns === 'Southbound') {
          northSouthCheck = 'south'
        }

        if (this.ns === 'Nouthbound') {
          northSouthCheck = 'north'
        }

        if (this.$store.state.home.userPoints.pointA.position) {
          isEntranceOrExit = 'exit'
        }

        holderArray = this.markers.filter(marker => {
          return marker.direction == northSouthCheck && marker.type === isEntranceOrExit
        })

        return holderArray
      }
    },
    watch: {
      toggleNorthSouth (val) {
        this.ns = val ? 'Northbound' : 'Southbound'
      },

      direction (val) {
        this.directionText = val ? 'North and South' : 'East and West'
      }
    },
    data () {
      return {
        hasPickedPointA: false,
        direction: false,
        toggleNorthSouth: false,
        ns: '',
        directionText: '',
        directionsDisplay: null,
        directionsService: null,
        polylinePointsArray: [],
        infoWindowPos: null,
        openInfoWindow: false,
        currentIndex: null,
        infoContent: null,
        place: 'United States',
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        polylineOptions: {
          strokeColor: '#fff',
          strokeWeight: 4
        },
        mapOptions: {
          draggable: true,
          zoomControl: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          disableDefaultUI: true
        }
      }
    },
    created () {
      eventBus.$on('locateUser', this.geolocation)
      if (!this.$store.state.home.markers.length) {
        this.$store.dispatch('getMarkers')
      }
    }
  }
</script>

<style scoped lang="scss">
  .mappie {
    margin-bottom: 100px;

    &__table {
      margin: 0 auto;
      display: block;
      text-align: center;
      border-spacing: 0;
      border-collapse: collapse;
      margin-bottom: 2rem;

      th {
        padding: 10px;
        min-width: 140px;
      }

      &--a {
        background: #007FEB;
      }

      &--b {
        background: rgba(255, 0, 0, 0.5);
      }
    }

    &__reset {
      margin-bottom: 2rem;
      border: none;
      padding: 15px;
      color: white;
      border-radius: 15px;
      cursor: pointer;
      opacity: 1;
      outline: none;
      transition: opacity 250ms ease;
      background-color: #42b983;
    }
  }
</style>
