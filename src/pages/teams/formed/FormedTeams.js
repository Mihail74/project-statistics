import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"

export default {
  name: "formed-teams",


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
      restApi.get("/api/me/teams/", { formingStatus: TeamFormingStatus.FORMED })
        .then(data => {
          this.teams = data.teams;
        })
    },
    onClick(team) {
      this.$router.push({ name: 'team', params: { id: team.id } })
    },

    statistic(team) {
      return (team.numberOfMatches == 0 ? 0 : team.numberOfWinMatches / team.numberOfMatches) * 100;
    }
  }
}
