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
    },

    formatDate(date){
      return new Date(date).toLocaleString("ru", {year: '2-digit', month: 'numeric', day: 'numeric',hour: '2-digit', minute:'2-digit'});
    }
  }
}
