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

  <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="snackBarDuration">
    <span>Логин занят</span>
    <md-button class="md-accent" @click="$refs.snackbar.close()">ок</md-button>
  </md-snackbar>
</div>
</template>

<script>
import securityService from "@/services/security"

export default {
  name: "register-tab",

  data() {
    return {
      login: "",
      password: "",
      snackBarDuration: 4000
    }
  },

  methods: {
    register() {
      let credentials = {
        login: this.login,
        password: this.password
      };

      securityService.register(credentials)
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
