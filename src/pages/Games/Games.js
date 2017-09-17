import Vue from 'vue'

export default {
  name: 'games',

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

  }
}
