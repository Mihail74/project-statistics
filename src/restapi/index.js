import axios from "axios";
import store from "@/store";
import router from "@/router";
import authService from "@/services/authorization";
import ApiError from "@/restApi/ApiError.js";


class RestApi {
    constructor(config) {
        this.host = "http://" + config.host;
        if (config.port) {
            this.host += ":" + config.port;
        }
        this.axios = axios.create();

        this.axios.interceptors.request.use(function(config) {
            config.headers.Authorization = store.state.security.accessToken;
            return config;
        }, function(err) {
            return Promise.reject(err);
        });
    }

    async post(url, body) {
        await this.ensureLogin();

        return new Promise((resolve, reject) => {
            this.axios.post(this.host + url, body)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(new ApiError(error.response.status, error.response.data.cause));
                });
        });
    }

    async put(url, body) {
        await this.ensureLogin();

        return new Promise((resolve, reject) => {
            this.axios.put(this.host + url, body)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(new ApiError(error.response.status, error.response.data.cause));
                });
        });
    }

    async get(url, params) {
        await this.ensureLogin();

        return new Promise((resolve, reject) => {
            this.axios.get(this.host + url, { params: params })
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(new ApiError(error.response.status, error.response.data.cause));
                });
        });
    }



    async ensureLogin() {
        if (authService.isAtiveTokenExist()) {
            return;
        }

        if (authService.canRefreshToken()) {
            //try refresh tokens
            await authService.refreshTokens()
                .then(data => {
                    store.dispatch("security/updateTokens", data);
                }, () => {
                    this.redirectToLogin();
                });
        } else {
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
    //don't have valid access and refresh tokens.
    //remove it from vuex and router redirect user to Login itself
        store.dispatch("security/clearTokens");
        router.push({ name: "login", query: { redirect: router.history.current.path } });
    }
}


export default new RestApi({
    host: "localhost",
    port: "11111"
});
