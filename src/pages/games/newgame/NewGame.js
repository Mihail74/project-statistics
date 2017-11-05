import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "new-game",

  data() {
    return {
      name: this.name,
      description: this.description,
      scoreToWin: this.scoreToWin,
      teamCountInMatch: this.teamCountInMatch
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
          },
          error => {
            alert("Ошибка")
          })
    },
    
    clearInput() {
      this.$refs["name"].clearInput();
      this.$refs["description"].clearInput();
      this.$refs["scoreToWin"].clearInput();
      this.$refs["teamCountInMatch"].clearInput();
    }
  }
}
