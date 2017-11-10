<template>
<div>
  <team-select ref="team" v-bind:gameID="gameID" @change="changeTeamSelect" />
  <md-input-container md-clearable ref="score">
    <label>счет</label>
    <md-input v-model="score" required></md-input>
  </md-input-container>
</div>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"
import TeamSelect from "@/components/teams/select"

export default {
  name: "team-and-score",
  props: ["gameID"],

  components: {
    TeamSelect
  },

  data() {
    return {
      selectedTeamID: null,
      score: null,
    }

  },

  watch: {
    score: function(newScore) {
      this.$emit("changeScore", newScore);
    }
  },

  methods: {
    changeTeamSelect(teamID) {
      this.selectedTeamID = teamID;
      this.$emit("changeTeamID", this.selectedTeamID);
    }
  }
}
</script>
<style></style>
