import Vue from "vue"
import restApi from "@/restapi"
import CreationTeamDialog from "./CreationTeamDialog.vue"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"

const TAB_INDEX_ROUNTING = {
  "0" : "/pages/teams/formed",
  "1" : "/pages/teams/forming"
}

export default {
  name: "teams",

  data() {
    return {
      teams: []
    }
  },

  components: {
    CreationTeamDialog
  },

  created() {
    this.fetchData();
  },

  methods: {

    fetchData() {
      restApi.get("/api/me/teams/", { "formingStatus": TeamFormingStatus.FORMING })
        .then(data => {
          this.teams = data.teams;
          console.log(data)
        })
    },

    isPath(path) {
      return this.$route.path === path
    },

    onTabChanged(tabIndex){
      this.$router.push({ path: TAB_INDEX_ROUNTING[tabIndex] })
    },

    openCreationGameDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}
