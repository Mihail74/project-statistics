import Vue from "vue"
import restApi from "@/restapi"
import mixin from "../mixin.js"

export default {
  name: "teams",

  data() {
    return {
      teams: []
    }
  },

  mixins: [mixin],

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

    routeToTeam(team) {
      this.$router.push({ name: 'team', params: { id: team.id } })
    }
  }
}
