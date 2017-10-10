<template>
<div>
  <md-input-container>
    <label>Логин</label>
    <md-input v-model="login"></md-input>
  </md-input-container>

  <md-input-container>
    <label>Пароль</label>
    <md-input v-model="password" type="password"></md-input>
  </md-input-container>

  <md-button class="md-raised md-primary modal-button" @click="doLogin()">Войти</md-button>
</div>
</template>

<script>
import restApi from "@/restapi";

export default {
  name: "signin-tab",

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
