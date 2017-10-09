import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"
import FormingTeams from "./forming/FormingTeams.vue"
import FormedTeams from "./formed/FormedTeams.vue"

const TAB_INDEX_ROUNTING = {
  "0" : "/pages/teams/formed",
  "1" : "/pages/teams/forming"
}

export default {
  name: "teams",

  data() {
    return {
    }
  },

  components: {
    FormingTeams,
    FormedTeams
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
