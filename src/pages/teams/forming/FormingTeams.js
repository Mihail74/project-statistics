import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"
import CreationTeamDialog from "./CreationTeamDialog.vue"

export default {
  name: "forming-teams",

  data() {
    return {
      teams: []
    }
  },

  components: {
    CreationTeamDialog,
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      restApi.get("/api/me/teams/", { formingStatus: TeamFormingStatus.FORMING })
        .then(data => {
          this.teams = data.teams;
        })
    },
    onClick(team) {
      this.$router.push({ name: 'team', params: { id: team.id } })
    },

    openCreationTeamDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}
