<template>
<md-dialog ref="creationDialog">
  <md-dialog-title>Создание новой команды</md-dialog-title>

  <md-dialog-content>
    <form>
      <md-input-container md-clearable ref="name">
        <label>Название</label>
        <md-input v-model="name" required></md-input>
      </md-input-container>

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

export default {
  name: "creation-team-dialog",

  data() {
    return {
      name: "",
      selectedUsers: []
    }
  },

  components: {
    //TODO: vue-multiselect?
    UsersMultiselect
  },

  methods: {

    changeUserSelect(selectedUsers) {
      this.selectedUsers = selectedUsers;
    },

    createTeam() {
      this.closeDialog();
      console.log(this.selectedUsers)

      this.clearInput();
    },

    clearInput() {
      this.$refs["name"].clearInput();
      this.$refs["users"].clearInput();
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
