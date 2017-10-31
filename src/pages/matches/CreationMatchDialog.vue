<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание матча</md-dialog-title>

  <md-dialog-content>
    <form>
      <game-select ref="game" @change="changeGameSelect" />
      <div v-if="selectedGameID != null">
        <md-button class="md-icon-button md-raised md-primary" @click="addTeamAndScore">
          <md-icon>add</md-icon>
        </md-button>
        <div v-for="ts in teamsAndScore">
          <team-and-score v-bind:gameID="selectedGameID" @changeTeamID="teamID => ts.teamID = teamID" @changeScore="score => ts.score = score" />
        </div>
      </div>
    </form>
  </md-dialog-content>

  <md-dialog-actions>
    <md-button class="md-primary" @click="closeDialog">Отмена</md-button>
    <md-button class="md-primary" @click="createMatch">Создать</md-button>
  </md-dialog-actions>
</md-dialog>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"
import GameSelect from "@/ui/components/games/select"
import TeamAndScore from "./TeamAndScore.vue"
import TeamSelect from "@/ui/components/teams/select"

export default {
  name: "creation-match-dialog",

  data() {
    return {
      selectedGameID: null,
      teamsAndScore: []
    }
  },

  components: {
    GameSelect,
    TeamAndScore
  },

  methods: {

    changeGameSelect(selectedGameID) {
      this.selectedGameID = selectedGameID;
    },

    createMatch() {
      restApi.post("/api/matches/create", {
          gameID: this.selectedGameID,
          membersID: this.selectedUsersID,
          timestamp: new Date().getTime(),
          winnerTeamID: this.getWinnerTeamID(),
          teamsScore : this.teamsAndScore
        })
        .then(data => {
          this.$emit("matchCreated");
          this.closeDialog();
          this.clearInput();
        })
    },

    getWinnerTeamID() {
      let maxID = this.teamsAndScore[0].teamID;
      let max = this.teamsAndScore[0].score;

      for (let i = 1; i < this.teamsAndScore.length; i++) {
        let score = this.teamsAndScore[i].score
        if (score > max) {
          max = score;
          maxID = this.teamsAndScore[i].teamID;
        }
      }
      return maxID;
    },

    addTeamAndScore() {
      this.teamsAndScore.push({
        teamID: null,
        score: null
      })
    },

    clearInput() {
      this.$refs["game"].clearInput();
      this.teamsAndScore = [];
      this.selectedGameID = null
    },

    openDialog() {
      this.$refs["creationDialog"].open();
    },

    closeDialog() {
      this.$refs["creationDialog"].close();
      this.clearInput();
    },
  }
}
</script>
<style></style>
