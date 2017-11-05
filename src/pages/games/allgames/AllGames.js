import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "all-games",

  data() {
    return {
      games: []
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {

    fetchData() {
      restApi.get("/api/games/")
        .then(data => {
          this.games = data.games
        });
    }
  }
}
