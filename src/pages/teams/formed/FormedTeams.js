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
      restApi.get("/api/me/teams/", { "formingStatus": TeamFormingStatus.FORMED })
        .then(data => {
          this.teams = data.teams;
        })
    },
    onClick(team) {
      console.log(team)
    }
  }
}
