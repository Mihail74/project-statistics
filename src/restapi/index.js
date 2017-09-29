import Vue from "vue"
import VueResource from "vue-resource"
import Error from "./error.js"
import store from "@/store"
import router from "@/router"
import authService from "@/services/authorization"

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

  async post(url, body) {
    await this.ensureSignIn();

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

  async get(url) {
    await this.ensureSignIn();
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



  async ensureSignIn() {
    if (authService.isAtiveTokenExist()) {
      return;
    }

    if (authService.canRefreshToken()) {
      //try refresh tokens
      await authService.refreshTokens()
        .then(data => {
          store.dispatch('security/updateTokens', data)
        }, error => {
          this.redirectToSignIn();
        });
    } else {
      this.redirectToSignIn();
    }
  }

  redirectToSignIn() {
    //don't have valid access and refresh tokens.
    //remove it from vuex and router redirect user to signin itself
    store.dispatch('security/clearTokens');
    router.push({ path: '/signin', query: { redirect: router.history.current.path } });
  }
}


export default new RestApi({
  host: "localhost",
  port: "11111"
})
