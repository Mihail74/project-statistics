import Vue from "vue"
import VueResource from "vue-resource"
import Error from "./error.js"
import store from "@/store"

Vue.use(VueResource);

Vue.http.interceptors.push(function(request, next) {
  let accessToken = store.state.security.accessToken;

  if (accessToken != null) {
    request.headers.set('Authorization', accessToken);
  }

  // continue to next interceptor
  next();
});

class RestApi {
  constructor(config) {
    this.host = "http://" + config.host;
    if (!!config.port) {
      this.host += ":" + config.port;
    }
  }

  post(url, body) {
    this.ensureSignIn();

    return new Promise((resolve, reject) => {
      Vue.http.post(this.host + url, body)
        .then(response => {
            resolve(response.data)
          },
          response => {
            reject(new Error(response.status, response.data.message));
          });
    });
  }

  get(url) {
    this.ensureSignIn();

    return new Promise((resolve, reject) => {
      Vue.http.get(this.host + url)
        .then(response => {
            resolve(response.data)
          },
          response => {
            reject(new Error(response.status, response.data.message));
          });
    });
  }

  ensureSignIn() {
    if (store.state.security.accessToken == null &&
      store.state.security.refreshToken == null) {
      //User doesn't signin before. Skip check.
      return;
    }

    let accessTokenExpiredTime = store.state.security.accessTokenExpiredTime;
    let refreshTokenExpiredTime = store.state.security.refreshTokenExpiredTime;

    if (Date.now() < accessTokenExpiredTime) {
      //Access token doesn't expire. User is signed in
      return;
    }

    if (Date.now() >= accessTokenExpiredTime &&
      Date.now() < refreshTokenExpiredTime) {
      Vue.http.post(this.host + '/token/refresh', { rawRefreshToken: store.state.security.refreshToken })
        .then(data => {
          store.dispatch('security/updateTokens', data)
        }, error => {
          this.clearTokens();
        });
    }
    this.clearTokens();
  }

  clearTokens() {
    //don't have valid access and refresh tokens.
    //remove it from vuex and router redirect user to signin itself
    store.dispatch('security/clearTokens');
  }
}


export default new RestApi({
  host: "localhost",
  port: "11111"
})
