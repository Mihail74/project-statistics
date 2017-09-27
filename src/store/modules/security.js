export const UPDATE_TOKENS = 'updateTokens'
export const CLEAR_TOKENS = 'clearTokens'

export default {
  namespaced: true,

  state: {
    accessToken: null,
    accessTokenExpiredTime: null,
    refreshToken: null,
    refreshTokenExpiredTime: null,
  },

  mutations: {
    [UPDATE_TOKENS]: (state, tokensData) => {
      state.accessToken = tokensData.accessToken;
      state.accessTokenExpiredTime = tokensData.accessTokenExpiredTime;
      state.refreshToken = tokensData.refreshToken;
      state.refreshTokenExpiredTime = tokensData.refreshTokenExpiredTime;
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

    clearTokens({ commit }) {
      commit(CLEAR_TOKENS);
    }
  },

  getters: {}
}
