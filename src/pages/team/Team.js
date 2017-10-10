import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"

export default {
  name: "team",
  props: ['id'],

  data() {
    return {
      team: {
        users: [],
        game: {}
      }
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      restApi.get("/api/teams/", { id: this.id })
        .then(data => {
          this.team = data.team;
        });
    },
    isForming() {
      return this.team.formingStatus == TeamFormingStatus.FORMING;
    },
    formTeam() {
      restApi.post("/api/me/teams/form", { id: this.id })
        .then(data => {
          this.fetchData();
        });
    }
  }
}
