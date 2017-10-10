import Vue from "vue"
import store from "@/store"

class SecurityService {

  constructor(config) {
    this.host = "http://" + config.host;
    if (!!config.port) {
      this.host += ":" + config.port;
    }
  }

  isTokensExist() {
    let accessToken = store.state.security.accessToken;
    let refreshToken = store.state.security.refreshToken;
    return accessToken != null && refreshToken != null;
  }

  isAtiveTokenExist() {
    console.log(store.state.security.accessTokenExpiredTime)
    console.log(store.state.security.accessToken)
    let accessTokenExpiredTime = store.state.security.accessTokenExpiredTime;

    return accessTokenExpiredTime != null && Date.now() < accessTokenExpiredTime;
  }

  canRefreshToken() {
    let refreshTokenExpiredTime = store.state.security.refreshTokenExpiredTime;
    return Date.now() < refreshTokenExpiredTime;
  }

  refreshTokens() {
    return new Promise((resolve, reject) => {
      Vue.http.post(this.host + '/api/auth/token/refresh', { rawRefreshToken: store.state.security.refreshToken })
        .then(response => {
            resolve(response.data)
          },
          response => {
            reject(new Error(response.status, response.data.message));
          });
    });
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      Vue.http.post(this.host + "/api/auth/login", credentials)
        .then(response => {
            resolve(response.data)
          },
          response => {
            reject(new Error(response.status, response.data.message));
          });
    });
  }

  register(credentials) {
    return new Promise((resolve, reject) => {
      Vue.http.post(this.host + "/api/auth/register", credentials)
        .then(response => {
            resolve(response.data)
          },
          response => {
            reject(new Error(response.status, response.data.message));
          });
    });
  }
}


export default new SecurityService({
  host: "localhost",
  port: "11111"
});
