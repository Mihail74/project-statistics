import Vue from "vue"
import restApi from "@/restapi"


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
          console.log(this.team)
        })
    }
  }
}
