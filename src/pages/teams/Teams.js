import Vue from "vue"
import restApi from "@/restapi"
import CreationTeamDialog from "./CreationTeamDialog.vue"

export default {
  name: "teams",

  data() {
    return {
      teams: []
    }
  },

  components: {
    CreationTeamDialog
  },

  created() {
    this.fetchData();
  },

  methods: {

    fetchData() {
      restApi.get("/api/me/teams/").then(data => {
        this.teams = data.teams;
        console.log(data)
      })
    },

    openCreationGameDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}
