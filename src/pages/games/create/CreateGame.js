import Vue from "vue"
import restApi from "@/restapi"
import ApiError from "@/restApi/ApiError.js"

export default {
  name: "createGame",

  data() {
    return {
      name: null,
      description: null,
      scoreToWin: null,
      teamCountInMatch: null
    }
  },

  methods: {

    createGame() {
      restApi.post("/api/games/create", {
          name: this.name,
          description: this.description,
          scoreToWin: this.scoreToWin,
          teamCountInMatch: this.teamCountInMatch
        })
        .then(data => {
            this.clearInput();
            this.$router.push({ name: "games" })
          },
          apiError => {
            //TODO: доделать обработку ошибок
          });
    },

    clearInput() {
      this.$refs["name"].clearInput();
      this.$refs["description"].clearInput();
      this.$refs["scoreToWin"].clearInput();
      this.$refs["teamCountInMatch"].clearInput();
    }
  }
}
