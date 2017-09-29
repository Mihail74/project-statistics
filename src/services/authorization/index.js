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
    let accessTokenExpiredTime = store.state.security.accessTokenExpiredTime;
    let refreshTokenExpiredTime = store.state.security.refreshTokenExpiredTime;

    return accessTokenExpiredTime != null &&
      Date.now() < accessTokenExpiredTime;
  }

  canRefreshToken() {
    let accessTokenExpiredTime = store.state.security.accessTokenExpiredTime;
    let refreshTokenExpiredTime = store.state.security.refreshTokenExpiredTime;
    return Date.now() >= accessTokenExpiredTime && Date.now() < refreshTokenExpiredTime;
  }
  
  refreshTokens() {
    return new Promise((resolve, reject) => {
      Vue.http.post(this.host + '/token/refresh', { rawRefreshToken: store.state.security.refreshToken })
        .then(response => {
            resolve(response.data)
          },
          response => {
            reject(new Error(response.status, response.data.message));
          });
    });
  }

  signin(credentials) {
    return new Promise((resolve, reject) => {
      Vue.http.post(this.host + "/signin", credentials)
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
      Vue.http.post(this.host + "/register", credentials)
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
