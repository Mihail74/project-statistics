<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание матча</md-dialog-title>

  <md-dialog-content>
    <form>
      <game-select ref="game" @change="changeGameSelect" />
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

export default {
  name: "creation-match-dialog",

  data() {
    return {
      selectedGameID: null
    }
  },

  components: {
    GameSelect
  },

  methods: {

    changeGameSelect(selectedGameID) {
      this.selectedGameID = selectedGameID;
    },

    createMatch() {
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
    },

    openDialog() {
      this.$refs["creationDialog"].open();
    },

    closeDialog() {
      this.$refs["creationDialog"].close();
    },
  }
}
</script>
<style></style>
