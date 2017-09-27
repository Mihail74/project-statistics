import Vue from "vue"
import CreationGameDialog from "./CreationGameDialog.vue"
import restApi from "@/restapi"

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
      restApi.get("/api/games/")
        .then(data => {
          this.games = data.games
        });
    },

    openCreationGameDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}
