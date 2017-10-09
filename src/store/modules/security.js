export const UPDATE_TOKENS = 'updateTokens'
export const UPDATE_PROFILE = 'updateProfile'
export const CLEAR_TOKENS = 'clearTokens'

export default {
  namespaced: true,

  state: {
    accessToken: null,
    accessTokenExpiredTime: null,
    refreshToken: null,
    refreshTokenExpiredTime: null,
    profile: null
  },

  mutations: {
    [UPDATE_TOKENS]: (state, tokensData) => {
      state.accessToken = tokensData.accessToken;
      state.accessTokenExpiredTime = tokensData.accessTokenExpiredTime;
      state.refreshToken = tokensData.refreshToken;
      state.refreshTokenExpiredTime = tokensData.refreshTokenExpiredTime;
    },

    [UPDATE_PROFILE]: (state, profile) => {
      state.profile = profile;
    },

    [CLEAR_TOKENS]: (state) => {
      state.accessToken = null;
      state.accessTokenExpiredTime = null;
      state.refreshToken = null;
      state.refreshTokenExpiredTime = null;
    }
  },

  actions: {
    updateTokens({ commit }, tokensData) {
      commit(UPDATE_TOKENS, tokensData);
    },

    updateProfile({ commit }, profile) {
      commit(UPDATE_PROFILE, profile);
    },

    clearTokens({ commit }) {
      commit(CLEAR_TOKENS);
    }
  },

  getters: {}
}
