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

  <md-button class="md-raised md-primary modal-button" @click="register()">Зарегестрироваться</md-button>
</div>
</template>

<script>
import restApi from "@/restapi";

export default {
  name: "register-tab",

  data() {
    return {
      login: "",
      password: ""
    }
  },

  methods: {
    register() {
      let credentials = {
        login: this.login,
        password: this.password
      };

      restApi.post("/register", credentials)
      .then(r => {
        this.$emit("registered", credentials)
      });
    }
  }
}
</script>
