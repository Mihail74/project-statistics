import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"

export default {
  name: "forming-teams",

  data() {
    return {
      teams: []
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      restApi.get("/api/teams/", { formingStatus: TeamFormingStatus.FORMING })
        .then(data => {
          this.teams = data.teams;
        })
    },
    onClick(team) {
      this.$router.push({ name: 'team', params: { id: team.id } })
    }
  }
}
