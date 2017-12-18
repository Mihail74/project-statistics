<template>
<div @keyup.enter="doLogin">
    <md-input-container :class="{'md-input-invalid': errors.has('name')}" ref="name">
        <label>Имя</label>
        <md-input v-model="name" required data-vv-name="name" v-validate="'required'"></md-input>
        <span class="md-error">{{errors.first('name')}}</span>
    </md-input-container>

    <md-input-container :class="{'md-input-invalid': errors.has('login')}" ref="login">
        <label>Логин</label>
        <md-input v-model="login" required data-vv-name="login" v-validate="'required'"></md-input>
        <span class="md-error">{{errors.first('login')}}</span>
    </md-input-container>

    <md-input-container :class="{'md-input-invalid': errors.has('password')}" ref="password">
        <label>Пароль</label>
        <md-input v-model="password" type="password" required data-vv-name="password" v-validate="'required'"></md-input>
        <span class="md-error">{{errors.first('password')}}</span>
    </md-input-container>

    <md-button class="md-raised md-primary modal-button" @click="submit()">Зарегестрироваться</md-button>
    <api-errors :apiErrors="apiErrors" ref="snackbar"></api-errors>
</div>
</template>

<script>
import authService from "@/services/authorization"
import ApiErrors from "@/components/errors/apiErrors";

export default {
    name: "register-tab",

    data() {
        return {
            name: "",
            login: "",
            password: "",
            apiErrors: null
        }
    },
    components: {
        ApiErrors
    },

    methods: {
        submit() {
            this.$validator.validateAll().then((isValid) => {
                if (isValid) {
                    this.register();
                    return;
                }
            });
        },
        register() {
            const credentials = {
                login: this.login,
                password: this.password,
                name: this.name
            };

            authService.register(credentials)
                .then(r => {
                    this.$emit("registered", credentials)
                }).catch(errors => {
                    this.apiErrors = errors
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
