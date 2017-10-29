<template>
<div>test</div>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"

export default {
  name: "team-and-score",
  props: ['gameID'],

  data() {
    return {
      teams: []
    }
  },

  mounted(){
    console.log(this.gameID)
  },

  methods: {
    fetchData() {
      // restApi.get("/api/me/teams/", { formingStatus: TeamFormingStatus.FORMING })
      //   .then(data => {
      //     this.teams = data.teams;
      //   })
    }
  }
}
</script>
<style></style>
