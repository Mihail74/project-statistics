export const UPDATE_TOKENS = "updateTokens";
export const UPDATE_PROFILE = "updateProfile";
export const CLEAR_TOKENS = "clearTokens";
export const CLEAR_PROFILE = "clearProfile";

function getPayload(token){
    return JSON.parse(atob(token.split(".")[1]));
}
function getExpitedTime(token) {
    return getPayload(token).exp * 1000;
}

function getRoles(token){
    return getPayload(token).roles;
}

export default {
    namespaced: true,

    state: {
        accessToken: null,
        accessTokenExpiredTime: null,
        refreshToken: null,
        refreshTokenExpiredTime: null,
        profile: null,
        roles: []
    },

    mutations: {
        [UPDATE_TOKENS]: (state, tokensData) => {
            state.accessToken = tokensData.accessToken;
            state.accessTokenExpiredTime = getExpitedTime(tokensData.accessToken);
            state.refreshToken = tokensData.refreshToken;
            state.refreshTokenExpiredTime = getExpitedTime(tokensData.refreshToken);
            state.roles = getRoles(tokensData.accessToken);
        },

        [UPDATE_PROFILE]: (state, profile) => {
            state.profile = profile;
        },

        [CLEAR_TOKENS]: (state) => {
            state.accessToken = null;
            state.accessTokenExpiredTime = null;
            state.refreshToken = null;
            state.refreshTokenExpiredTime = null;
        },

        [CLEAR_PROFILE]: (state) => {
            state.profile = null;
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
        },

        clearProfile({ commit }) {
            commit(CLEAR_PROFILE);
        }
    },

    getters: {}
};
