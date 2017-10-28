<template>
<md-input-container ref="team-select">
  <label>Команда</label>
  <md-select name="team-select" id="team.id" v-model="selectedID" @change="changeSelected">
    <md-option v-for="team in teams" :key="team.id" :value="team.id">
      {{ team.name }}
    </md-option>
  </md-select>
</md-input-container>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "team-select",

  data() {
    return {
      teams: [],
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
        this.team = data.teams
      })
    },

    clearInput() {
      this.selectedID = null;
    }
  }
}
</script>
<style></style>
