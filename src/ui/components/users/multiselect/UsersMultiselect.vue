<template>
<md-input-container ref="users-multiselect">
  <label>Пользователи</label>
  <md-select name="users-multiselect" id="user.id" v-model="selectedID" @change="changeSelected" multiple>
    <md-option v-for="user in users" :key="user.id" :value="user.id">
      {{ user.name }}
    </md-option>
  </md-select>
</md-input-container>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "users-multiselect",

  data() {
    return {
      users: [],
      selectedID: []
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
      restApi.get("/api/users/").then(data => {
        this.users = data.users
      })
    },

    clearInput() {
      this.selectedID = [];
    }
  }
}
</script>
<style></style>
