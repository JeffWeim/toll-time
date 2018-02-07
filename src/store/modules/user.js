import profile from '@/api/profile'

const user = {
  state: {
    isAuthorized: false,
    userData: {},
    loggedOutMessage: ''
  },
  // Each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will
  // receive the state as the first argument
  //
  // Mutations MUST be synchronous
  mutations: {
    GET_USER_DATA(state, user) {
      state.userData = user
    },
    SET_USER_DATA(state, user) {
      state.userData = user
    },
    SET_AUTHENTICATION(state, isAuthorized) {
      state.isAuthorized = isAuthorized
    },
    SET_LOGGED_OUT_MESSAGE(state, message) {
      state.loggedOutMessage = message
    }
  },
  // Actions can contain asynchronous code
  //
  // Typical Flow is a flow of asynchronous code, that results in committing to a mutation
  actions: {
    getUserData({ dispatch, commit }, obj) {
      profile.getUserData(obj, user => {
        commit('GET_USER_DATA', user)
      })
    },
    setUserData({ dispatch, commit }, user) {
      commit('SET_USER_DATA', user)
    },
    setAuthentication({ dispatch, commit }, isAuthorized) {
      commit('SET_AUTHENTICATION', isAuthorized)
    },
    setLoggedOutMessage({ dispatch, commit }, message) {
      commit('SET_LOGGED_OUT_MESSAGE', message)
    }
  },
  // Think of 'getters' as the computed properties of the Vuex store
  //
  // Getters will also receive other getters as the 2nd argument
  getters: {
    userData: state => state.userData,
    isAuthorized: state => state.isAuthorized
  }
}

export default user;
