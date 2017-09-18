import Vue from 'vue'

export default {
  name: "games",

  data() {
    return {
      games: []
    }
  },

  created() {
    this.fetchData();
  },

  methods: {

    fetchData() {
      let self = this;
      Vue.http.get('http://localhost:8080/api/games/')
        .then(response => {
          self.games = response.data.games
        })
    },

    openDialog(ref) {
      this.$refs[ref].open();
    },

    closeDialog(ref) {
      this.$refs[ref].close();
    },

    createGame() {
      this.closeDialog('creationDialog');

      let gameNameInput = this.$refs.gameName;
      let name = gameNameInput.value;
      gameNameInput.clearInput();

      Vue.http.post('http://localhost:8080/api/games/create', {
          name,
          "scoreToWin": 1
        })
        .then(response => {
          this.fetchData();
        })
    }
  }
}
