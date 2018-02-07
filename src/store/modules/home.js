import map from '@/api/map'

const home = {
  state: {
    markers: [],
    baseData: {
      center: {
        lat: 33.55,
        lng: -117.75
      },
      zoom: 12
    },
    userPoints: {
      pointA: {
        position: null
      },
      pointB: {
        position: null
      }
    }
  },
  // Each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will
  // receive the state as the first argument
  //
  // Mutations MUST be synchronous
  mutations: {
    GET_MARKERS(state, markers) {
      state.markers = markers
    },
    UPDATE_CENTER(state, center) {
      state.baseData.center = center
    },
    SET_POINT_A(state, data) {
      state.userPoints.pointA = data
    },
    SET_POINT_B(state, data) {
      state.userPoints.pointB = data
    },
    CLEAR_MARKERS(state, data) {
      state.markers = data
    }
  },
  // Actions can contain asynchronous code
  //
  // Typical Flow is a flow of asynchronous code, that results in committing to a mutation
  actions: {
    getMarkers({ dispatch, commit }) {
      map.getMarkers(markers => {
          commit('GET_MARKERS', markers)
        }
      )
    },
    updateCenter({ dispatch, commit }, center) {
      commit('UPDATE_CENTER', center)
    },
    setPointA({ dispatch, commit}, data) {
      commit('SET_POINT_A', data)
    },
    setPointB({ dispatch, commit}, data) {
      commit('SET_POINT_B', data)
    },
    clearMarkers({ dispatch, commit }, data) {
      commit('CLEAR_MARKERS', data)
    }
  },
  // Think of 'getters' as the computed properties of the Vuex store
  //
  // Getters will also receive other getters as the 2nd argument
  getters: {
    markers: state => state.markers,
    baseData: state => state.baseData
  }
}

export default home;
