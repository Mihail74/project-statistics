<template>
<form @keyup.enter.prevent="doLogin"  @submit.prevent="">
    <md-input-container>
        <label>Логин</label>
        <md-input v-model="login"></md-input>
    </md-input-container>
    <md-input-container>
        <label>Пароль</label>
        <md-input v-model="password" type="password"></md-input>
    </md-input-container>

    <md-button type="submit" class="md-raised md-primary modal-button" @click="doLogin()" autofocus>Войти</md-button>
    <div class="link">
        <a class="md-caption" href="#/register">Новый пользователь?</a>
    </div>
</form>
</template>

<script>
import restApi from "@/restapi";

export default {
    name: "login-tab",

    data() {
        return {
            login: "",
            password: ""
        }
    },

    methods: {
        doLogin() {
            const credentials = {
                login: this.login,
                password: this.password
            };

            this.$emit("login", credentials);
        }
    }
}
</script>
<style scoped>
.login-modal .modal-button {
    width: 100%;
    margin: 0 auto;
}
.link {
    margin-top: 4px;
    text-decoration: underline;
    text-align: center;
}
</style>
