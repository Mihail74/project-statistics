<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание новой игры</md-dialog-title>

  <md-dialog-content>
    <form>
      <md-input-container md-clearable ref="name">
        <label>Название</label>
        <md-input v-model="name" required></md-input>
      </md-input-container>

      <md-input-container md-clearable ref="description">
        <label>Описание</label>
        <md-input v-model="description" required></md-input>
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
import restApi from "@/restapi"

export default {
  name: "creation-game-dialog",

  data() {
    return {
      name: "",
      description: ""
    }
  },

  methods: {
    openDialog() {
      this.$refs["creationDialog"].open();
    },

    closeDialog() {
      this.$refs["creationDialog"].close();
    },

    createGame() {
      restApi.post("/api/games/create", {
          name: this.name,
          description: this.description
        })
        .then(data => {
            this.$emit("gameCreated");
            this.closeDialog();
            this.clearInput();
          },
          error => {
            alert("Ошибка")
          })
    },
    clearInput() {
      this.$refs["name"].clearInput();
      this.$refs["description"].clearInput();
    }
  }
}
</script>
<style></style>
