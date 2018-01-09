import axios from "axios";
import store from "@/store";
import ApiError from "@/restapi/ApiError.js";

class SecurityService {

    constructor() {
        this.host = window.__APP_CONFIG__.api.url;
        this.axios = axios.create();
    }

    isTokensExist() {
        let accessToken = store.state.security.accessToken;
        let refreshToken = store.state.security.refreshToken;
        return accessToken != null && refreshToken != null;
    }

    isAtiveTokenExist() {
        let accessTokenExpiredTime = store.state.security.accessTokenExpiredTime;

        return accessTokenExpiredTime != null && Date.now() < accessTokenExpiredTime;
    }

    canRefreshToken() {
        let refreshTokenExpiredTime = store.state.security.refreshTokenExpiredTime;
        return Date.now() < refreshTokenExpiredTime;
    }

    //TODO: Здесь и ниже нужно в reject Использовать свой класс ошибки
    refreshTokens() {
        return new Promise((resolve, reject) => {
            this.axios.post(`${this.host}/api/auth/token/refresh`, {
                    refreshToken: store.state.security.refreshToken
                })
                .then(response => {
                    resolve(response.data);
                }).catch((error) => {
                    if(error.response.data.errors) {
                        reject(error.response.data.errors)
                    } else {
                        var errors = [{"detail": "Ошибка на стороне сервера и не обработана"}];
                        reject(errors)
                    }
                });
        });
    }

    login(credentials) {
        return new Promise((resolve, reject) => {
            this.axios.post(`${this.host}/api/auth/login`, credentials)
                .then(response => {
                    resolve(response.data);
                }).catch((error) => {
                    if(error.response.data.errors) {
                        reject(error.response.data.errors)
                    } else {
                        var errors = [{"detail": "Ошибка на стороне сервера и не обработана"}];
                        reject(errors)
                    }
                });
        });
    }

    register(credentials) {
        return new Promise((resolve, reject) => {
            this.axios.post(`${this.host}/api/auth/register`, credentials)
                .then(response => {
                    resolve(response.data);
                }).catch((error) => {
                    if(error.response.data.errors) {
                        reject(error.response.data.errors)
                    } else {
                        var errors = [{"detail": "Ошибка на стороне сервера и не обработана"}];
                        reject(errors)
                    }
                });
        });
    }
}


export default new SecurityService();
