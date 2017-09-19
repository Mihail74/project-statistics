import Vue from "vue"
import CreationGameDialog from "./CreationGameDialog.vue"

export default {
  name: "games",

  data() {
    return {
      games: []
    }
  },

  components: {
    CreationGameDialog
  },

  created() {
    this.fetchData();
  },

  methods: {

    fetchData() {

      Vue.http.get("http://localhost:8080/api/games/")
        .then(response => {
          this.games = response.data.games
        })
    },

    openCreationGameDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}
