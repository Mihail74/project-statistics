<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание матча</md-dialog-title>

  <md-dialog-content>
    <form>
      <game-select ref="game" @change="changeGameSelect" />
      <div v-if="selectedGameID != null" v-for="ts in teamsAndScore">
        <team-and-score v-bind:gameID="selectedGameID"/>
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
      this.teamsAndScore.push({})
      // restApi.post("/api/teams/create", {
      //     name: this.name,
      //     gameID: this.selectedGameID,
      //     membersID: this.selectedUsersID
      //   })
      //   .then(data => {
      //     this.$emit("matchCreated");
      //     this.closeDialog();
      //     this.clearInput();
      //   })
    },

    clearInput() {
      this.$refs["game"].clearInput();
      this.teamsAndScore=[];
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
