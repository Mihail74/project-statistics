<template>
<ul>
  <li v-for="game in games" :key="game.id">
    <p>{{ game.id }} is: {{ game.name }} ; {{game}}</p>
  </li>
</ul>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'games',

  data: function() {
    return {
      games: []
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      let self = this;
      Vue.http.get('http://localhost:8080/api/games/').then(response => {
        console.log(response.data)
        self.games = response.data
        let x = 5;
        x++;

      }, response => {
        // error callback
        console.log(response)
      });
    }
  }
}
</script>
</style>
