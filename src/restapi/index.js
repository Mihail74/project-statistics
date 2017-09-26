import Vue from "vue"
import Error from "./error.js"

class RestApi {
  constructor(config) {
    this.host = "http://" + config.host;
    if (!!config.port) {
      this.host += ":" + config.port;
    }
  }

  post(url, body) {
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
}


export default new RestApi({
  host: "localhost",
  port: "11111"
})
