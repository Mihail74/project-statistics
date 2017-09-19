<template>
<md-dialog ref="creationGameDialog">
  <md-dialog-title>Создание новой игры</md-dialog-title>

  <md-dialog-content>
    <form>
      <md-input-container md-clearable ref="gameName">
        <label>Название</label>
        <md-input v-model="name" required></md-input>
      </md-input-container>
    </form>
  </md-dialog-content>

  <md-dialog-actions>
    <md-button class="md-primary" @click="closeDialog()">Отмена</md-button>
    <md-button class="md-primary" @click="createGame()">Создать</md-button>
  </md-dialog-actions>
</md-dialog>
</template>
<script>
import Vue from "vue"

export default {
  name: "creation-game-dialog",

  data() {
    return {
      name: ""
    }
  },

  methods: {
    openDialog() {
      this.$refs["creationGameDialog"].open();
    },

    closeDialog() {
      this.$refs["creationGameDialog"].close();
    },

    createGame() {
      this.closeDialog("creationDialog");

      Vue.http.post("http://localhost:8080/api/games/create", {
          name
        })
        .then(response => {
          this.$emit("gameCreated");
        })
      this.clearInput();
    },
    clearInput() {
      this.$refs["gameName"].clearInput();
    }
  }
}
</script>
<style></style>
