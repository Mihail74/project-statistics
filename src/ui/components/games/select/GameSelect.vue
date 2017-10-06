<template>
<md-input-container ref="game-select">
  <label>Игра</label>
  <md-select name="game-select" id="game.id" v-model="selectedID" @change="changeSelected">
    <md-option v-for="game in games" :key="game.id" :value="game.id">
      {{ game.name }}
    </md-option>
  </md-select>
</md-input-container>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "game-select",

  data() {
    return {
      games: [],
      selectedID: null
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    changeSelected(value) {
      this.$emit("change", this.selectedID);
    },

    fetchData() {
      restApi.get("/api/games/").then(data => {
        this.games = data.games
      })
    },

    clearInput() {
      this.selectedID = null;
    }
  }
}
</script>
<style></style>
