<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание новой команды</md-dialog-title>

  <md-dialog-content>
    <form>
      <md-input-container md-clearable ref="name">
        <label>Название</label>
        <md-input v-model="name" required></md-input>
      </md-input-container>

      <game-select ref="game" @change="changeGameSelect" />
      <users-multiselect ref="users" @change="changeUserSelect" />
    </form>
  </md-dialog-content>

  <md-dialog-actions>
    <md-button class="md-primary" @click="closeDialog">Отмена</md-button>
    <md-button class="md-primary" @click="createTeam">Создать</md-button>
  </md-dialog-actions>
</md-dialog>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"
import UsersMultiselect from "@/ui/components/users/multiselect"
import GameSelect from "@/ui/components/games/select"

export default {
  name: "creation-team-dialog",

  data() {
    return {
      name: "",
      selectedUsersID: [],
      selectedGameID: null
    }
  },

  components: {
    UsersMultiselect,
    GameSelect
  },

  methods: {

    changeUserSelect(selectedUsersID) {
      this.selectedUsersID = selectedUsersID;
    },
    changeGameSelect(selectedGameID) {
      this.selectedGameID = selectedGameID;
    },

    createTeam() {
      restApi.post("/api/teams/create", {
          name: this.name,
          gameID: this.selectedGameID,
          membersID: this.selectedUsersID
        })
        .then(data => {
          this.$emit("teamCreated");
          this.closeDialog();
          this.clearInput();
        })
    },

    clearInput() {
      this.name = "";
      this.selectedUsersID = [];
      this.selectedGameID = null;
      this.$refs["users"].clearInput();
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
