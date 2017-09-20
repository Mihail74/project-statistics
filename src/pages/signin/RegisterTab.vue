<template>
<div>
  <md-input-container>
    <label>E-mail</label>
    <md-input v-model="login"></md-input>
  </md-input-container>

  <md-input-container>
    <label>Пароль</label>
    <md-input v-model="passord" type="password"></md-input>
  </md-input-container>

  <md-button class="md-raised md-primary modal-button" @click="register()">Зарегестрироваться</md-button>
</div>
</template>

<script>
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
      //TODO: Отправляется запрос на вход
    }
  }
}
</script>
