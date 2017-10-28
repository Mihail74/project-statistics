<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание матча</md-dialog-title>

  <md-dialog-content>
    <form>
      <game-select ref="game" v-validate="'required'" @change="changeGameSelect" />
      <div>
        <team-select ref="team" v-validate="'required'" @change="changeTeamSelect" />
        <team-select ref="team2" v-validate="'required'" @change="changeTeam2Select" />
      </div>
      <div class="score">
        <label>Счет в матче</label>        
        <md-input-container md-clearable ref="score">
          <md-input v-model="score" required></md-input>        
        </md-input-container>      
        <md-input-container md-clearable ref="score2">
          <md-input name="score2" v-model="score2" required></md-input>        
        </md-input-container>
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
import Vue from "vue";
import restApi from "@/restapi";
import GameSelect from "@/ui/components/games/select";
import TeamSelect from "@/ui/components/teams/select";

export default {
  name: "creation-match-dialog",

  data() {
    return {
      selectedGameID: null,
      selectedTeamID: null,
      selectedTeam2ID: null,
      score: null,
      score2: null
    };
  },

  components: {
    GameSelect,
    TeamSelect
  },

  methods: {
    changeGameSelect(selectedGameID) {
      this.selectedGameID = selectedGameID;
    },

    changeTeamSelect(selectedTeamID) {
      this.selectedTeamID = selectedTeamID;
    },

    changeTeam2Select(selectedTeam2ID) {
      this.selectedTeam2ID = selectedTeam2ID;
    },

    createMatch() {
      console.log("selectedGameID " + this.selectedGameID);
      console.log("selectedTeamID " + this.selectedTeamID);
      console.log("selectedTeam2ID " + this.selectedTeam2ID);
      console.log("score " + this.score);
      console.log("score2 " + this.score2);
      this.validateBeforeSubmit();
      restApi
        .post("/api/matches/create", {
          gameID: this.selectedGameID,
          teamsScore: [
            {
              score: this.score,
              teamID: this.selectedTeamID
            },
            {
              score: this.score2,
              teamID: this.selectedTeam2ID
            }
          ],
          winnerTeamID:
            this.score > this.score2
              ? this.selectedTeamID
              : this.selectedTeam2ID
        })
        .then(data => {
          this.$emit("matchCreated");
          this.closeDialog();
          this.clearInput();
        });
    },

    clearInput() {
      this.$refs["game"].clearInput();
      this.$refs["team"].clearInput();
      this.$refs["team2"].clearInput();
      this.$refs["score"].clearInput();
      this.$refs["score2"].clearInput();
    },

    openDialog() {
      this.$refs["creationDialog"].open();
    },

    closeDialog() {
      this.$refs["creationDialog"].close();
    }
  }
};
</script>
<style></style>
