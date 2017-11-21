<template>
<div @keyup.enter="doLogin">
    <md-input-container>
        <label>Имя</label>
        <md-input v-model="name"></md-input>
    </md-input-container>

    <md-input-container>
        <label>Логин</label>
        <md-input v-model="login"></md-input>
    </md-input-container>

    <md-input-container>
        <label>Пароль</label>
        <md-input v-model="password" type="password"></md-input>
    </md-input-container>

    <md-button class="md-raised md-primary modal-button" @click="register()">Зарегестрироваться</md-button>

    <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="snackBarDuration">
        <span>Логин занят</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">ок</md-button>
    </md-snackbar>
</div>
</template>

<script>
import authService from "@/services/authorization"

export default {
    name: "register-tab",

    data() {
        return {
            name: "",
            login: "",
            password: "",
            snackBarDuration: 4000
        }
    },

    methods: {
        register() {
            const credentials = {
                login: this.login,
                password: this.password,
                name: this.name
            };

            authService.register(credentials)
                .then(r => {
                    this.$emit("registered", credentials)
                }, _ => {
                    this.openSnackBar();
                });
        },
        openSnackBar() {
            this.$refs.snackbar.open();
        }
    }
}
</script>
<style scoped>
.modal-button {
    width: 100%;
    margin: 0 auto;
}
</style>
