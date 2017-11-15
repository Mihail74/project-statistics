import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"

export default {
  name: "teams",

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
      restApi.get("/api/teams/")
        .then(data => {
          this.teams = data.teams;
        })
    },
    
    onClick(team) {
      this.$router.push({ name: 'team', params: { id: team.id } })
    },

    getTeamStat(team){
      return Math.floor(team.numberOfWinMatches / team.numberOfMatches * 100);
    },
  }
}
