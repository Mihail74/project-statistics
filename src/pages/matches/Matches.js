import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "matches",

  data() {
    return {
      matches: []
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      restApi.get("/api/matches/")
        .then(data => {
          this.matches = data.matches;
        });
    }
  }
}
