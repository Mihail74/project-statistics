import Vue from "vue"
import restApi from "@/restapi"
import NewGame from "./newgame/NewGame.vue"
import AllGames from "./allgames/AllGames.vue"

const TAB_INDEX_ROUNTING = {
  "0" : "/pages/games/allgames",
  "1" : "/pages/games/newgame"
}

export default {
  name: "games",

  data() {
    return {
    }
  },

  components: {
    NewGame,
    AllGames
  },

  methods: {

    isPath(path) {
      return this.$route.path === path
    },

    onTabChanged(tabIndex){
      this.$router.push({ path: TAB_INDEX_ROUNTING[tabIndex] })
    }
  }
}
