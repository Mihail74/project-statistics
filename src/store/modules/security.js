export const UPDATE_ACCESS_TOKEN = 'updateAccessToken'

export default {
  namespaced: true,

  state: {
    accessToken: null
  },

  mutations: {
    [UPDATE_ACCESS_TOKEN]: (state, accessToken) => {
      console.log(accessToken)
      console.log("inside mutations")
      state.accessToken = accessToken;
    }
  },

  actions: {},

  getters: {}
}
